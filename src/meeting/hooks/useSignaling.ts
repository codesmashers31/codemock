import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SIGNALING_SERVER_URL = 'http://localhost:3000';

interface UseSignalingProps {
    meetingId: string;
    role: 'expert' | 'candidate';
    userId: string; // New auth requirement
    onOffer: (data: { sdp: RTCSessionDescriptionInit; caller: string }) => void;
    onAnswer: (data: { sdp: RTCSessionDescriptionInit; caller: string }) => void;
    onIceCandidate: (data: { candidate: RTCIceCandidateInit; caller: string }) => void;
    onBothReady: () => void;
    onUserLeft: (userId: string) => void;
    onMeetingEnded: () => void;
}

export function useSignaling({
    meetingId,
    role,
    userId,
    onOffer,
    onAnswer,
    onIceCandidate,
    onBothReady,
    onUserLeft,
    onMeetingEnded,
}: UseSignalingProps) {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!meetingId || !userId) return;

        // Initialize Socket
        socketRef.current = io(SIGNALING_SERVER_URL, {
            transports: ['websocket'],
        });

        const socket = socketRef.current;

        socket.on('connect', () => {
            console.log('Connected to signaling server:', socket.id);
            socket.emit('join-room', { meetingId, role, userId });
        });

        socket.on('offer', onOffer);
        socket.on('answer', onAnswer);
        socket.on('ice-candidate', onIceCandidate);
        socket.on('both-ready', onBothReady);
        socket.on('user-left', onUserLeft);
        socket.on('meeting-ended', onMeetingEnded);

        return () => {
            socket.disconnect();
        };
    }, [meetingId, role]); // Only re-run if meetingId/role changes

    const sendOffer = (sdp: RTCSessionDescriptionInit) => {
        socketRef.current?.emit('offer', { sdp, meetingId });
    };

    const sendAnswer = (sdp: RTCSessionDescriptionInit) => {
        socketRef.current?.emit('answer', { sdp, meetingId });
    };

    const sendIceCandidate = (candidate: RTCIceCandidate) => {
        if (candidate) {
            socketRef.current?.emit('ice-candidate', { candidate, meetingId });
        }
    };

    const endCall = () => {
        socketRef.current?.emit('end-call', { meetingId });
    };

    return {
        sendOffer,
        sendAnswer,
        sendIceCandidate,
        endCall,
        socket: socketRef.current
    };
}
