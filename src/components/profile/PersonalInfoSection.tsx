import { useState } from "react";
import { Save, Upload } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function PersonalInfoSection({ profileData, onUpdate }) {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        phone: profileData?.personalInfo?.phone || "",
        dateOfBirth: profileData?.personalInfo?.dateOfBirth ? new Date(profileData.personalInfo.dateOfBirth).toISOString().split('T')[0] : "",
        gender: profileData?.personalInfo?.gender || "",
        country: profileData?.personalInfo?.country || "",
        state: profileData?.personalInfo?.state || "",
        city: profileData?.personalInfo?.city || "",
        bio: profileData?.personalInfo?.bio || ""
    });
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const response = await axios.put(
                "http://localhost:3000/api/user/profile/personal",
                formData,
                { headers: { userid: user?.id } }
            );

            if (response.data.success) {
                alert("Personal info updated successfully!");
                onUpdate();
            }
        } catch (error) {
            console.error("Error updating personal info:", error);
            alert("Failed to update personal info");
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("profileImage", file);

            const response = await axios.post(
                "http://localhost:3000/api/user/profile/image",
                formData,
                {
                    headers: {
                        userid: user?.id,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            if (response.data.success) {
                alert("Profile image uploaded successfully!");
                onUpdate();
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                <p className="text-gray-600 mt-1">Update your personal details and contact information</p>
            </div>

            {/* Profile Image Upload */}
            <div className="border-b border-gray-200 pb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Profile Image</label>
                <div className="flex items-center gap-4">
                    <img
                        src={profileData?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData?.name || "User")}&background=374151&color=fff&bold=true`}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    />
                    <label className="cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploading}
                        />
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                            <Upload className="w-4 h-4" />
                            {uploading ? "Uploading..." : "Upload New Photo"}
                        </div>
                    </label>
                </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="United States"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="California"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="San Francisco"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Tell us about yourself..."
                />
                <p className="text-sm text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                    <Save className="w-4 h-4" />
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
}
