import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Card, SecondaryButton } from "../pages/ExpertDashboard";

function ProgressRing({ size = 110, stroke = 8, percent = 0, children }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div style={{ width: size, height: size }} className="relative">
      <svg width={size} height={size} className="block">
        <defs>
          <linearGradient id="prg" x1="0" x2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f1f5f9"
          strokeWidth={stroke}
          fill="transparent"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#prg)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          fill="transparent"
          className="transition-all duration-500 ease-out"
        />
      </svg>

      <div
        className="absolute inset-0 flex items-center justify-center rounded-full overflow-hidden border-4 border-white shadow-sm"
        style={{
          width: size - stroke * 2,
          height: size - stroke * 2,
          left: stroke,
          top: stroke,
        }}
      >
        {children}
      </div>

      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
        {percent}% complete
      </div>
    </div>
  );
}

const ExpertProfileHeader = () => {
  const user = "69255389e1a38f2afd8f663d"; // Replace with dynamic userId

  const [profile, setProfile] = useState({
    personal: {
      name: "",
      photoUrl: "",
    },
    professional: {
      title: "",
      company: "",
    },
  });

  const [completion, setCompletion] = useState(0);

  const photoInputRef = useRef();

  // FETCH PROFILE
const fetchProfile = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/auth/profile", {
      headers: {
        userid: user,  
      },
    });

    if (res.data.success) {
      setProfile({
        personal: {
          name: res.data.profile.name,
          photoUrl: res.data.profile.photoUrl,
        },
        professional: {
          title: res.data.profile.title,
          company: res.data.profile.company,
        },
      });

      setCompletion(res.data.completion);
    }
  } catch (err) {
    console.error("Error fetching profile:", err);
  }
};


  useEffect(() => {
    fetchProfile();
  }, []);

  const handlePhoto = (file) => {
    if (!file) return;
    console.log("Upload photo API will go here");
  };

  return (
    <>
      <Card className="text-center">
        <div className="flex flex-col items-center">
          <ProgressRing percent={completion} size={120} stroke={8}>
            {profile.personal?.photoUrl ? (
              <img
                src={profile.personal.photoUrl}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 rounded-full">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
          </ProgressRing>

          <div className="mt-6 text-center">
            <div className="text-xl font-semibold text-gray-900">
              {profile.personal?.name || "Your Name"}
            </div>

            <div className="text-lg font-medium text-blue-600 mt-1">
              {profile.professional?.title || "Your Title"}
            </div>

            <div className="text-sm text-gray-500 mt-1">
              {profile.professional?.company || "Company"}
            </div>
          </div>

          <div className="mt-6 w-full">
            <input
              ref={photoInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handlePhoto(e.target.files?.[0])}
            />
            <SecondaryButton
              onClick={() => photoInputRef.current?.click()}
              className="w-full"
            >
              Change Photo
            </SecondaryButton>
          </div>

          <div className="mt-6 text-sm font-medium text-gray-700">
            {completion}% complete
          </div>

          <div className="mt-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-md border border-blue-100">
            To begin scheduling and receiving mock interviews, please complete your profile.
          </div>
        </div>
      </Card>
    </>
  );
};

export default ExpertProfileHeader;
