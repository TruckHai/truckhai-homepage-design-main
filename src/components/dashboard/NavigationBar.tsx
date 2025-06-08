import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, User, Settings, Shield, LogOut } from 'lucide-react';
import BrokerVerificationModal from '../verification/BrokerVerificationModal';
import CorporateVerificationModal from '../verification/CorporateVerificationModal';
import FleetVerificationModal from '../verification/FleetVerificationModal';

interface NavigationBarProps {
  userRole: 'broker' | 'fleet' | 'corporate';
  userName: string;
  userId: string;
  verificationStatus: 'verified' | 'pending' | 'not-started';
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  showProfileDropdown: boolean;
  setShowProfileDropdown: (show: boolean) => void;
  unreadNotifications: number;
}

const NavigationBar = ({
  userRole,
  userName,
  userId,
  verificationStatus,
  showNotifications,
  setShowNotifications,
  showProfileDropdown,
  setShowProfileDropdown,
  unreadNotifications
}: NavigationBarProps) => {
  const navigate = useNavigate();
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showCorporateVerificationModal, setShowCorporateVerificationModal] = useState(false);
  const [showFleetVerificationModal, setShowFleetVerificationModal] = useState(false);
  const [currentVerificationStatus, setCurrentVerificationStatus] = useState(verificationStatus);

  const getDashboardTitle = () => {
    switch (userRole) {
      case 'broker':
        return 'Broker Dashboard';
      case 'fleet':
        return 'Fleet Dashboard';
      case 'corporate':
        return 'Corporate Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const handleVerificationClick = () => {
    if (currentVerificationStatus === 'not-started') {
      if (userRole === 'broker') {
        setShowVerificationModal(true);
      } else if (userRole === 'fleet') {
        setShowFleetVerificationModal(true);
      }
    }
  };

  const handleVerificationComplete = () => {
    setCurrentVerificationStatus('pending');
    setShowVerificationModal(false);
    setShowFleetVerificationModal(false);
  };

  const handleCorporateVerificationClick = () => {
    if (currentVerificationStatus === 'not-started' || currentVerificationStatus === 'pending') {
      setShowCorporateVerificationModal(true);
    }
  };

  const handleCorporateVerificationComplete = () => {
    setCurrentVerificationStatus('pending');
    setShowCorporateVerificationModal(false);
  };

  const getVerificationPill = () => {
    if (currentVerificationStatus === 'verified') {
      return (
        <Badge className="bg-green-500 text-white hover:bg-green-600 cursor-pointer text-xs px-3 py-1 font-medium">
          ✅ Verified
        </Badge>
      );
    } else if (currentVerificationStatus === 'pending') {
      return (
        <Badge 
          className="bg-yellow-500 text-white hover:bg-yellow-600 animate-pulse cursor-pointer text-xs px-3 py-1 font-medium"
          onClick={userRole === 'corporate' ? handleCorporateVerificationClick : handleVerificationClick}
        >
          🕒 Verification In Progress
        </Badge>
      );
    } else {
      return (
        <Badge 
          className="bg-red-500 text-white hover:bg-red-600 cursor-pointer text-xs px-3 py-1 font-medium"
          onClick={userRole === 'corporate' ? handleCorporateVerificationClick : handleVerificationClick}
        >
          🔴 Not Verified
        </Badge>
      );
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg border-b border-gray-200/80 shadow-sm">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left Section - Logo & Brand */}
          <div className="flex items-center space-x-4 min-w-0 flex-shrink-0">
            <img 
              src="/lovable-uploads/0f33fd90-daca-4dae-a603-17b84d56547d.png" 
              alt="Truck Hai Logo" 
              className="h-8 w-auto cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => navigate('/')}
            />
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-gray-900">{getDashboardTitle()}</h1>
            </div>
          </div>

          {/* Center - Global Search */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search loads, trucks, drivers..."
                className="pl-10 pr-4 h-10 w-full bg-gray-50/80 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 text-sm placeholder:text-gray-500 shadow-sm"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Notifications */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 h-10 w-10 hover:bg-gray-100 rounded-xl transition-all duration-200 relative shadow-sm border border-gray-200/60"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium shadow-sm">
                    {unreadNotifications}
                  </span>
                )}
              </Button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
                    <p className="text-xs text-gray-500 mt-1">{unreadNotifications} unread</p>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    <div className="p-4 hover:bg-gray-50 border-b border-gray-50 transition-colors">
                      <p className="text-sm font-medium text-gray-900">New load posted</p>
                      <p className="text-xs text-gray-600 mt-1">Mumbai to Delhi - ₹45,000</p>
                      <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50 border-b border-gray-50 transition-colors">
                      <p className="text-sm font-medium text-gray-900">Payment received</p>
                      <p className="text-xs text-gray-600 mt-1">Commission for Load #LD001</p>
                      <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50 transition-colors">
                      <p className="text-sm font-medium text-gray-900">Verification pending</p>
                      <p className="text-xs text-gray-600 mt-1">Complete KYC to unlock features</p>
                      <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Verification Status */}
            <div className="hidden sm:block">
              {getVerificationPill()}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-3 p-2 h-10 hover:bg-gray-100 rounded-xl transition-all duration-200 shadow-sm border border-gray-200/60"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </Button>

              {/* Profile Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 top-full mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{userName}</h3>
                        <p className="text-xs text-gray-500">{userRole.charAt(0).toUpperCase() + userRole.slice(1)} ID: {userId}</p>
                      </div>
                    </div>
                    <div className="mt-3 sm:hidden">
                      {getVerificationPill()}
                    </div>
                  </div>
                  <div className="py-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Settings className="w-4 h-4" />
                      <span>Account Settings</span>
                    </button>
                    <button 
                      className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={handleVerificationClick}
                    >
                      <Shield className="w-4 h-4" />
                      <span>KYC Verification</span>
                    </button>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Verification Modals */}
      <BrokerVerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        onVerificationComplete={handleVerificationComplete}
      />

      <CorporateVerificationModal
        isOpen={showCorporateVerificationModal}
        onClose={() => setShowCorporateVerificationModal(false)}
        onVerificationComplete={handleCorporateVerificationComplete}
      />

      <FleetVerificationModal
        isOpen={showFleetVerificationModal}
        onClose={() => setShowFleetVerificationModal(false)}
        onVerificationComplete={handleVerificationComplete}
      />
    </>
  );
};

export default NavigationBar;
