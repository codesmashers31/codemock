import { useState, useRef, useCallback, useEffect } from 'react';

const STUN_SERVERS = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
    ],
};

export function useWebRTC(onIceCandidateSend: (candidate: RTCIceCandidate) => void) {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(true);

    const pcRef = useRef<RTCPeerConnection | null>(null);
    const candidateQueue = useRef<RTCIceCandidateInit[]>([]);

    // 1. Initialize Local Media
    const initLocalMedia = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            setLocalStream(stream);
            setIsMicOn(true);
            setIsCameraOn(true);
            return stream;
        } catch (error) {
            console.error("Error accessing media devices:", error);
            return null;
        }
    }, []);

    // 2. Initialize PeerConnection (Singleton)
    const getOrCreatePeerConnection = useCallback(() => {
        if (pcRef.current) return pcRef.current;

        console.log("Creating new RTCPeerConnection");
        const pc = new RTCPeerConnection(STUN_SERVERS);

        // ICE Candidates
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                console.log(`Generated ICE Candidate: ${event.candidate.type} ${event.candidate.protocol}`);
                onIceCandidateSend(event.candidate);
            } else {
                console.log("ICE Candidate Gathering Complete");
            }
        };

        // Remote Track Handling - Critical Fix
        pc.ontrack = (event) => {
            console.log("Track received:", event.streams[0]);
            if (event.streams && event.streams[0]) {
                setRemoteStream(event.streams[0]);
            }
        };

        // Monitor Connection State
        pc.oniceconnectionstatechange = () => {
            console.log(`ICE Connection State: ${pc.iceConnectionState}`);
        };

        pc.onconnectionstatechange = () => {
            console.log(`Peer Connection State: ${pc.connectionState}`);
        };

        pcRef.current = pc;
        return pc;
    }, [onIceCandidateSend]);

    // Helper: Add Tracks to PC
    const addLocalTracksToPC = useCallback((pc: RTCPeerConnection, stream: MediaStream) => {
        stream.getTracks().forEach((track) => {
            // Check if track already exists to avoid duplication
            const senders = pc.getSenders();
            const exists = senders.some(s => s.track === track);
            if (!exists) {
                console.log(`Adding ${track.kind} track to PC`);
                pc.addTrack(track, stream);
            }
        });
    }, []);

    // 3. Expert: Create Offer
    const createOffer = useCallback(async () => {
        const pc = getOrCreatePeerConnection();

        // Reliability: Create Data Channel to ensure ICE gathering triggers even if no media
        const dc = pc.createDataChannel("chat");
        dc.onopen = () => console.log("Data Channel Opened");

        if (localStream) {
            addLocalTracksToPC(pc, localStream);
        } else {
            console.warn("Creating offer with NO local stream (Receive Only)");
            pc.addTransceiver('video', { direction: 'recvonly' });
            pc.addTransceiver('audio', { direction: 'recvonly' });
        }

        try {
            const offer = await pc.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true
            });
            console.log("Offer created with SDP:", offer.sdp?.slice(0, 100) + "...");
            await pc.setLocalDescription(offer);
            return offer;
        } catch (error) {
            console.error("Error creating offer:", error);
            return null;
        }
    }, [localStream, getOrCreatePeerConnection, addLocalTracksToPC]);

    // 4. Candidate: Handle Offer & Create Answer
    const handleReceivedOffer = useCallback(async (offer: RTCSessionDescriptionInit) => {
        const pc = getOrCreatePeerConnection();

        if (localStream) {
            addLocalTracksToPC(pc, localStream);
        } else {
            console.warn("Handling offer with NO local stream - adding recvonly transceivers");
            // Critical: Must add transceivers to tell WebRTC we want to receive
            // Check if we already have them to avoid duplicates if re-negotiating? 
            // Simplified: Just add them, usually safe if single negotiation.
            pc.addTransceiver('video', { direction: 'recvonly' });
            pc.addTransceiver('audio', { direction: 'recvonly' });
        }

        try {
            await pc.setRemoteDescription(new RTCSessionDescription(offer));

            // Process Queued Candidates
            while (candidateQueue.current.length > 0) {
                const c = candidateQueue.current.shift();
                if (c) await pc.addIceCandidate(new RTCIceCandidate(c));
            }

            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            return answer;
        } catch (error) {
            console.error("Error handling offer:", error);
            return null;
        }
    }, [localStream, getOrCreatePeerConnection, addLocalTracksToPC]);

    // 5. Expert: Handle Answer
    const handleReceivedAnswer = useCallback(async (answer: RTCSessionDescriptionInit) => {
        const pc = pcRef.current;
        if (!pc) return;

        try {
            await pc.setRemoteDescription(new RTCSessionDescription(answer));

            // Process Queued Candidates (Rare for answer side but good practice)
            while (candidateQueue.current.length > 0) {
                const c = candidateQueue.current.shift();
                if (c) await pc.addIceCandidate(new RTCIceCandidate(c));
            }
        } catch (error) {
            console.error("Error handling answer:", error);
        }
    }, []);

    // 6. Handle ICE Candidate
    const handleReceivedIceCandidate = useCallback(async (candidate: RTCIceCandidateInit) => {
        const pc = pcRef.current;
        if (!pc) {
            // Queue if PC not created yet (rare)
            candidateQueue.current.push(candidate);
            return;
        }

        try {
            if (pc.remoteDescription) {
                await pc.addIceCandidate(new RTCIceCandidate(candidate));
            } else {
                console.log("Buffering ICE candidate (no remote description)");
                candidateQueue.current.push(candidate);
            }
        } catch (error) {
            console.error("Error adding ICE candidate:", error);
        }
    }, []);

    // 7. Toggle Logic (Enabled/Disabled)
    const toggleMic = useCallback(() => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMicOn(audioTrack.enabled);
            }
        }
    }, [localStream]);

    const toggleCamera = useCallback(() => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsCameraOn(videoTrack.enabled);
            }
        }
    }, [localStream]);

    // Track stream in ref for cleanup access
    const localStreamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        localStreamRef.current = localStream;
    }, [localStream]);

    const cleanup = useCallback(() => {
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop());
            setLocalStream(null);
        }
        if (pcRef.current) {
            pcRef.current.close();
            pcRef.current = null;
        }
        setRemoteStream(null);
        // Clear candidates
        candidateQueue.current = [];
    }, []);

    const resetPeerConnection = useCallback(() => {
        if (pcRef.current) {
            pcRef.current.close();
            pcRef.current = null;
        }
        setRemoteStream(null);
        candidateQueue.current = [];
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            cleanup();
        };
    }, [cleanup]);

    return {
        localStream,
        remoteStream,
        isMicOn,
        isCameraOn,
        initLocalMedia,
        createOffer,
        handleReceivedOffer,
        handleReceivedAnswer,
        handleReceivedIceCandidate,
        toggleMic,
        toggleCamera,
        cleanup,
        resetPeerConnection
    };
}
