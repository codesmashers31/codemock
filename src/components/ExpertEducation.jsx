import React, { useState, useEffect } from "react";
import { Card, Input, PrimaryButton, SecondaryButton, IconButton } from "../pages/ExpertDashboard";
import axios from "axios";

const ExpertEducation = () => {
    const user = "69255389e1a38f2afd8f663d";

    const initialProfile = { education: [] };
    const [profile, setProfile] = useState(initialProfile);
    const [loading, setLoading] = useState(true);

    const addEducation = () =>
        setProfile((p) => ({
            ...p,
            education: [...p.education, { degree: "", institution: "", field: "", start: "", end: "" }]
        }));

    const updateEducation = (idx, field, value) => {
        setProfile((p) => {
            const ed = [...p.education];
            ed[idx] = { ...ed[idx], [field]: value };
            return { ...p, education: ed };
        });
    };

    // ---------------- GET education ----------------
    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/expert/education", {
                    headers: { userid: user }
                });

                if (response.data.success) {
                    setProfile({ education: response.data.data });
                }
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    alert(err.response.data.message); // Personal info missing
                } else {
                    console.error("Failed to fetch education:", err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchEducation();
    }, [user]);

    // ---------------- Save / Upsert ----------------
    const saveEducation = async () => {
        try {
            const response = await axios.put(
                "http://localhost:3000/api/expert/education",
                { education: profile.education },
                { headers: { userid: user } }
            );

            if (response.data.success) {
                alert("Education saved successfully!");
            } else {
                alert("Failed to save education");
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    // ---------------- DELETE education ----------------
    const removeEducation = async (idx) => {
        try {
            // Optimistically update local state first
            setProfile((p) => ({
                ...p,
                education: p.education.filter((_, i) => i !== idx)
            }));

            // Call DELETE endpoint to remove from DB
            const response = await axios.delete(
                `http://localhost:3000/api/expert/education/${idx}`,
                { headers: { userid: user } }
            );

            if (!response.data.success) {
                alert("Failed to remove education in DB");
            }
        } catch (err) {
            console.error("Error removing education:", err);
            alert("Server error");
        }
    };


    if (loading) return <p>Loading education...</p>;

    return (
        <Card>
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-blue-800">Education</h3>
                    <p className="text-sm text-gray-500 mt-1">Add degrees and study periods</p>
                </div>
                <div>
                    <SecondaryButton onClick={addEducation}>+ Add</SecondaryButton>
                </div>
            </div>

            {profile.education.length === 0 ? (
                <div className="text-center text-sm text-gray-500 py-4">No education entries yet.</div>
            ) : (
                <div className="space-y-4">
                    {profile.education.map((edu, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-10 relative bg-gray-50">
                            <IconButton onClick={() => removeEducation(i)} className="absolute top-2 right-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </IconButton>

                            <div className="space-y-3">
                                <Input placeholder="Degree" value={edu.degree} onChange={(v) => updateEducation(i, "degree", v)} />
                                <Input placeholder="Institution" value={edu.institution} onChange={(v) => updateEducation(i, "institution", v)} />
                                <Input placeholder="Field of Study" value={edu.field} onChange={(v) => updateEducation(i, "field", v)} />
                                <div className="grid grid-cols-2 gap-3">
                                    <Input placeholder="Start Year" type="number" value={edu.start} onChange={(v) => updateEducation(i, "start", v)} />
                                    <Input placeholder="End Year" type="number" value={edu.end} onChange={(v) => updateEducation(i, "end", v)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6 flex justify-end">
                <PrimaryButton onClick={saveEducation}>Save Changes</PrimaryButton>
            </div>
        </Card>
    );
};

export default ExpertEducation;
