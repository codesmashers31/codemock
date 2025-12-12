import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Camera, CameraOff, Mic, MicOff, MoreVertical, PhoneOff, 
  Settings, MessageSquare, Users, Laptop, Maximize2 
} from 'lucide-react';
import { useWebRTC } from '../meeting/hooks/useWebRTC';
import { useSignaling } from '../meeting/hooks/useSignaling';
import { VideoTile } from './meeting/VideoTile';

export default function LiveMeeting() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Connecting...");
  const [isBothReady, setIsBothReady] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const hasOfferedRef = useRef(false);
  
  const meetingId = searchParams.get('meetingId') || '';
  const role = (searchParams.get('role') as 'expert' | 'candidate') || 'candidate';
  const userId = searchParams.get('userId') || '';
  
  // Validate Auth
  useEffect(() => {
     if (!userId) {
         setAccessDenied(true);
         setStatus("Error: Missing User ID");
     }
  }, [userId]);

  // WebRTC Hook
  const {
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
  } = useWebRTC((candidate) => {
    // ICE Candidate Callback
    sendIceCandidate(candidate);
  });

  // Signaling Hook
  const { sendOffer, sendAnswer, sendIceCandidate, endCall, socket } = useSignaling({
    meetingId,
    role,
    userId,
    onBothReady: () => {
      console.log("Both Ready Signal Received");
      setIsBothReady(true);
      hasOfferedRef.current = false;
    },
    onOffer: async ({ sdp, caller }) => {
       if (role === 'candidate') {
         console.log("Received Offer from Expert");
         setStatus("Received Offer...");
         const answer = await handleReceivedOffer(sdp);
         if (answer) {
            sendAnswer(answer);
            setStatus("Connected");
         }
       }
    },
    onAnswer: async ({ sdp, caller }) => {
      if (role === 'expert') {
        console.log("Received Answer from Candidate");
        await handleReceivedAnswer(sdp);
        setStatus("Connected");
      }
    },
    onIceCandidate: ({ candidate, caller }) => {
      handleReceivedIceCandidate(candidate);
    },
    onUserLeft: (userId) => {
      console.log(`User ${userId} left`);
      setStatus("Partner left. Waiting...");
      setIsBothReady(false);
      hasOfferedRef.current = false;
      resetPeerConnection();
    },
    onMeetingEnded: () => {
      alert("Meeting has been ended by the host.");
      cleanup(); 
      navigate(role === 'expert' ? '/dashboard/sessions' : '/my-sessions');
    }
  });

  // Listen for socket errors (Auth, etc)
  useEffect(() => {
    if (socket) {
        socket.on("error", (msg) => {
            console.error("Socket Error:", msg);
            if (msg === "Unauthorized" || msg === "Meeting has ended") {
                setAccessDenied(true);
                setStatus(`Error: ${msg}`);
                alert(msg);
                cleanup();
                navigate(role === 'expert' ? '/dashboard/sessions' : '/my-sessions');
            }
        });
    }
  }, [socket, cleanup, navigate, role]);

  // Initialize Local Media on Mount
  useEffect(() => {
    initLocalMedia().catch(err => console.error("Media Error", err));
  }, [initLocalMedia]);

  // Handle Offer Creation
  useEffect(() => {
    if (isBothReady && localStream && role === 'expert' && !hasOfferedRef.current) {
        console.log("Initiating WebRTC Negotiation...");
        setStatus("Initiating connection...");
        hasOfferedRef.current = true;
        
        createOffer().then(offer => {
            if (offer) {
                console.log("Offer created, sending via socket...");
                sendOffer(offer);
                setStatus("Offer sent...");
            } else {
                console.error("Failed to create offer - see useWebRTC logs");
                hasOfferedRef.current = false; 
            }
        });
    }
  }, [isBothReady, localStream, role, createOffer, sendOffer]);

  const handleLeaveCall = () => {
    cleanup();
    navigate(role === 'expert' ? '/dashboard/sessions' : '/my-sessions');
  };

  const handleEndMeeting = () => {
    if (confirm("Are you sure you want to end the meeting for everyone?")) {
        endCall(); 
        cleanup();
        navigate('/dashboard/sessions');
    }
  };

  if (accessDenied) {
      return <div className="p-10 text-white text-center">Access Denied</div>;
  }

  return (
    <div className="relative w-full h-screen bg-[#121212] overflow-hidden flex flex-col">
      {/* Top Bar */}
      <div className="h-16 px-6 flex items-center justify-between bg-[#1a1a1a] border-b border-gray-800 z-50">
         <div className="text-white font-medium">
            Meeting ID: <span className="text-gray-400 select-all">{meetingId}</span>
            <span className="ml-4 text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded">{status}</span>
         </div>
         <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs">
                {role === 'expert' ? 'E' : 'C'}
            </div>
         </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
        {/* Local Video */}
        <VideoTile 
            name="You" 
            stream={localStream} 
            muted={true} 
            cameraEnabled={isCameraOn}
            micEnabled={isMicOn}
            isMainTile={false}
        />

        {/* Remote Video */}
        <VideoTile 
            name={role === 'expert' ? "Candidate" : "Expert"} 
            stream={remoteStream} 
            muted={false} 
            isMainTile={true}
        />
      </div>

      {/* Controls */}
      <div className="h-20 bg-[#1a1a1a] border-t border-gray-800 flex items-center justify-center gap-4 z-50">
        <button onClick={toggleMic} className={`p-4 rounded-full ${isMicOn ? 'bg-[#2a2a2a] text-white' : 'bg-red-500 text-white'}`}>
            {isMicOn ? <Mic /> : <MicOff />}
        </button>
        <button onClick={toggleCamera} className={`p-4 rounded-full ${isCameraOn ? 'bg-[#2a2a2a] text-white' : 'bg-red-500 text-white'}`}>
            {isCameraOn ? <Camera /> : <CameraOff />}
        </button>
        
        <button onClick={handleLeaveCall} className="px-6 py-3 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 font-medium">
            Leave Call
        </button>

        {role === 'expert' && (
            <button onClick={handleEndMeeting} className="px-6 py-3 rounded-full bg-red-600 text-white hover:bg-red-700 font-medium">
                End Meeting
            </button>
        )}
      </div>
    </div>
  );
}