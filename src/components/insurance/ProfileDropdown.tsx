
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserIcon, SettingsIcon, ShieldIcon, LogOutIcon } from './InsuranceIcons';

interface ProfileDropdownProps {
  showProfile: boolean;
  onToggle: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ showProfile, onToggle }) => {
  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm" 
        className="p-2"
        onClick={onToggle}
      >
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          R
        </div>
      </Button>

      {showProfile && (
        <div className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900">Rajesh Kumar</h3>
            <p className="text-sm text-gray-500">rajesh@transport.com</p>
            <p className="text-xs text-gray-500">Broker ID: BR123456</p>
            <Badge className="mt-2 bg-red-100 text-red-700">🔴 Not Verified</Badge>
          </div>
          <div className="p-2">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <UserIcon className="w-4 h-4 mr-2" />
              My Profile
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <SettingsIcon className="w-4 h-4 mr-2" />
              Account Settings
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <ShieldIcon className="w-4 h-4 mr-2" />
              KYC Verification
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-red-600">
              <LogOutIcon className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
