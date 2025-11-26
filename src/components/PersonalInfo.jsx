import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Input, PrimaryButton } from '../pages/ExpertDashboard';

const PersonalInfo = () => {
    const user = '69255389e1a38f2afd8f663d';

    const initialProfile = {
        personal: {
            name: "",
            phone: "",
            gender: "",
            dob: "",
            country: "", 
            state: "", 
            city: ""
        }
    };
    const [profile, setProfile] = useState(initialProfile);
    const [loading, setLoading] = useState(true);

    const setPersonalField = (field, value) =>
        setProfile((p) => ({ ...p, personal: { ...p.personal, [field]: value } }));

    // -------------------- GET personal info --------------------
    useEffect(() => {
        const fetchPersonalInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/auth/personalinfo`, {
                    headers: { userid: user }
                });

                if (response.data.success && response.data.data) {
                    const data = response.data.data;
                    console.log(response.data.data);

                    setProfile({
                        personal: {
                            name: data.userName || "",
                            phone: data.mobile || "",
                            gender: data.gender || "",
                            dob: data.dob ? data.dob.split("T")[0] : "",
                            country: data.country || "",
                            state: data.state || "",
                            city: data.city || "",
                        }
                    });
                }
            } catch (err) {
                console.error("Failed to fetch personal info:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPersonalInfo();
    }, [user]);

    // -------------------- Save (PUT / upsert) --------------------
    const savePersonal = async () => {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/auth/personalinfo`,
                {
                    userName: profile.personal.name,
                    mobile: profile.personal.phone,
                    gender: profile.personal.gender,
                    dob: profile.personal.dob,
                    country: profile.personal.country,
                    state: profile.personal.state,
                    city: profile.personal.city
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        userid: user
                    }
                }
            );

            const data = response.data;
            if (data.success) {
                alert("Personal info updated successfully!");
            } else {
                alert("Failed to update personal info");
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    if (loading) return <p>Loading personal information...</p>;

    return (
        <>
            <Card>
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-blue-800">Personal Information</h3>
                        <p className="text-sm text-gray-500 mt-1">Name, phone, gender, DOB & location</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={profile.personal?.name || ""}
                        onChange={(v) => setPersonalField("name", v)}
                    />
                    <Input
                        label="Phone"
                        placeholder="Enter your mobile number"
                        value={profile.personal?.phone || ""}
                        onChange={(v) => setPersonalField("phone", v)}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        <div className="flex gap-4 items-center">
                            {["Male", "Female", "Other"].map((g) => (
                                <label key={g} className="flex items-center gap-2 text-sm text-gray-700">
                                    <input
                                        type="radio"
                                        name="gender"
                                        checked={profile.personal?.gender === g}
                                        onChange={() => setPersonalField("gender", g)}
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    {g}
                                </label>
                            ))}
                        </div>
                    </div>
                    <Input
                        label="Date of Birth"
                        type="date"
                        value={profile.personal?.dob || ""}
                        onChange={(v) => setPersonalField("dob", v)}
                    />
                    <Input
                        label="Country"
                        value={profile.personal?.country || ""}
                        onChange={(v) => setPersonalField("country", v)}
                    />
                    <Input
                        label="State"
                        value={profile.personal?.state || ""}
                        onChange={(v) => setPersonalField("state", v)}
                    />
                    <Input
                        label="City"
                        value={profile.personal?.city || ""}
                        onChange={(v) => setPersonalField("city", v)}
                    />
                </div>

                <div className="mt-6 flex justify-end">
                    <PrimaryButton onClick={savePersonal}>Save Changes</PrimaryButton>
                </div>
            </Card>
        </>
    );
};

export default PersonalInfo;
