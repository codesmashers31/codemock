import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Card, Input, PrimaryButton } from '../pages/ExpertDashboard';

const ExpertVerification = () => {
  const [profile, setProfile] = useState({
    verification: {
      companyIdFile: null,
      aadharFile: null,
      linkedin: '',
    },
  });

  const companyIdRef = useRef(null);
  const aadharRef = useRef(null);

  const handleCompanyIdFile = (file) =>
    setProfile((p) => ({ ...p, verification: { ...p.verification, companyIdFile: file } }));

  const handleAadharFile = (file) =>
    setProfile((p) => ({ ...p, verification: { ...p.verification, aadharFile: file } }));

  const saveVerification = async () => {
    try {
      const formData = new FormData();
      if (profile.verification.companyIdFile) {
        formData.append('companyIdFile', profile.verification.companyIdFile);
      }
      if (profile.verification.aadharFile) {
        formData.append('aadharFile', profile.verification.aadharFile);
      }
      formData.append('linkedin', profile.verification.linkedin);

      // Add userid header as needed, replace userId with actual user ID
      const userId = 'YOUR_USER_ID';

      const response = await axios.put('http://localhost:3000/api/auth/verification', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          userid: userId,
        },
      });

      alert('Verification saved successfully!');
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error saving verification:', error);
      alert('Failed to save verification.');
    }
  };

  return (
    <>
      <Card>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-800">Verification</h3>
          <p className="text-sm text-gray-500 mt-1">Company ID, Aadhar and LinkedIn</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company ID Proof</label>
            <input
              ref={companyIdRef}
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(e) => handleCompanyIdFile(e.target.files?.[0])}
              className="text-sm text-gray-600 w-full border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {profile.verification.companyIdFile && (
              <div className="text-sm text-green-600 mt-2 font-medium">✓ File selected</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Card</label>
            <input
              ref={aadharRef}
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(e) => handleAadharFile(e.target.files?.[0])}
              className="text-sm text-gray-600 w-full border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {profile.verification.aadharFile && (
              <div className="text-sm text-green-600 mt-2 font-medium">✓ File selected</div>
            )}
          </div>

          <Input
            label="LinkedIn URL"
            placeholder="https://linkedin.com/in/yourprofile"
            value={profile.verification.linkedin}
            onChange={(v) =>
              setProfile((p) => ({ ...p, verification: { ...p.verification, linkedin: v } }))
            }
          />
        </div>

        <div className="mt-6 flex justify-end">
          <PrimaryButton onClick={saveVerification}>Save Changes</PrimaryButton>
        </div>
      </Card>
    </>
  );
};

export default ExpertVerification;
