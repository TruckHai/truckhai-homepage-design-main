
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

interface NavigationActionsProps {
  onContactClick: () => void;
  onLoginClick: () => void;
  onNotificationClick: () => void;
}

const NavigationActions = ({ onContactClick, onLoginClick, onNotificationClick }: NavigationActionsProps) => {
  return (
    <div className="hidden lg:flex items-center space-x-4">
      {/* Contact Us Button */}
      <Button 
        onClick={onContactClick}
        variant="outline"
        className="font-semibold text-sm px-6 py-2.5 border-2 transition-all duration-200 hover:scale-102"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '14px',
          borderColor: '#FF3B30',
          color: '#FF3B30',
          borderRadius: '12px',
          backgroundColor: 'transparent'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 59, 48, 0.05)';
          e.currentTarget.style.borderColor = '#E0362A';
          e.currentTarget.style.color = '#E0362A';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.borderColor = '#FF3B30';
          e.currentTarget.style.color = '#FF3B30';
        }}
      >
        Contact Us
      </Button>

      {/* Login Button */}
      <Button 
        onClick={onLoginClick}
        className="font-semibold text-sm px-6 py-2.5 border-none transition-all duration-200 hover:scale-102"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '14px',
          backgroundColor: '#FF3B30',
          color: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#E0362A';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#FF3B30';
        }}
      >
        Login
      </Button>

      {/* Notifications Icon */}
      <button 
        onClick={onNotificationClick}
        className="p-1.5 transition-colors duration-200 hover:text-[#FF3B30] focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:ring-offset-2"
      >
        <Bell className="w-5 h-5" style={{ color: '#1A1A1A' }} />
      </button>
    </div>
  );
};

export default NavigationActions;
