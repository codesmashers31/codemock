// src/components/ExpertProfileHeader.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Card, SecondaryButton } from "../pages/ExpertDashboard";

function ProgressRing({ size = 110, stroke = 8, percent = 0, children }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div style={{ width: size, height: size }} className="relative">
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="prg" x1="0" x2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>

        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#f1f5f9" strokeWidth={stroke} fill="transparent" />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#prg)"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
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
    </div>
  );
}

const ExpertProfileHeader = () => {

  
      const { user } = useAuth();
        //console.log(user._id);
      const user_id = user._id
  
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const photoInputRef = useRef(null);

  const [profile, setProfile] = useState({ name: "", title: "", company: "", photoUrl: "" });
  const [completion, setCompletion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const fallbackName = user?.name || "";

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError("No token found. Please login.");
      setProfile(prev => ({ ...prev, name: fallbackName }));
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:3000/api/expert/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });

      //console.log("GET http://localhost:3000/api/expert/profile =>", res?.data);

      if (res.data?.success) {
        const p = res.data.profile || {};
        setProfile({
          name: p.name || fallbackName,
          title: p.title || "",
          company: p.company || "",
          photoUrl: p.photoUrl || ""
        });
        setCompletion(typeof res.data.completion === "number" ? res.data.completion : 0);
      } else {
        setError(res.data?.message || "Failed to fetch profile");
        setProfile(prev => ({ ...prev, name: fallbackName }));
      }
    } catch (err) {
      console.error("fetchProfile error:", err);
      const msg = err?.response?.data?.message || err.message || "Error fetching profile";
      setError(msg);
      setProfile(prev => ({ ...prev, name: fallbackName }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);

  const handlePhotoUpload = async (file) => {
    if (!file) return;
    if (!token) {
      setError("No token found. Please login.");
      return;
    }
    setUploading(true);
    setError(null);

    try {
      const fd = new FormData();
      fd.append("photo", file);

      const res = await axios.post("http://localhost:3000/api/expert/profile/photo", fd, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });

      //console.log("POST http://localhost:3000/api/expert/profile/photo =>", res?.data);

      if (res.data?.success) {
        const p = res.data.profile || {};
        setProfile(prev => ({
          ...prev,
          name: p.name || prev.name,
          title: p.title || prev.title,
          company: p.company || prev.company,
          photoUrl: p.photoUrl || prev.photoUrl
        }));
        setCompletion(typeof res.data.completion === "number" ? res.data.completion : completion);
      } else {
        setError(res.data?.message || "Upload failed");
      }
    } catch (err) {
      console.error("handlePhotoUpload error:", err);
      const msg = err?.response?.data?.message || err.message || "Upload failed";
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="text-center relative">
      <div className="flex flex-col items-center">
        {/* <p>{profile.photoUrl}</p> */}
        <ProgressRing percent={completion} size={120} stroke={8}>

          
          {profile.photoUrl ? (
            <img src={profile.photoUrl} className="w-full h-full object-cover rounded-full" alt="profile" />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 rounded-full">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
          )}
        </ProgressRing>

        <div className="mt-4 text-xl font-semibold text-gray-900">
          {profile.name || fallbackName || "Your Name"}
        </div>

        <div className="text-lg text-blue-600 mt-1">
          {profile.title || "Your Title"}
        </div>

        <div className="text-sm text-gray-500 mt-1">
          {profile.company || "Company"}
        </div>

        <div className="mt-6 w-full">
          <input ref={photoInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => handlePhotoUpload(e.target.files[0])} />
          <SecondaryButton onClick={() => photoInputRef.current?.click()} disabled={uploading || loading} className="w-full">
            {uploading ? "Uploading..." : "Change Photo"}
          </SecondaryButton>
        </div>

        <div className="mt-5 text-sm font-medium text-gray-700">{completion}% complete</div>

        {error && (
          <div className="mt-3 text-xs text-red-600 flex flex-col items-center">
            <div>{error}</div>
            <button className="mt-2 text-sm underline text-blue-600" onClick={() => fetchProfile()} disabled={loading}>Retry</button>
          </div>
        )}

        {loading && <div className="mt-3 text-xs text-gray-500">Loading profile...</div>}
      </div>
    </Card>
  );
};

export default ExpertProfileHeader;
