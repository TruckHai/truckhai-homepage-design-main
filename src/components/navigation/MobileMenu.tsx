
import React from 'react';
import { Button } from "@/components/ui/button";

interface NavLink {
  name: string;
  anchor: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavLink[];
  activeLink: string;
  onNavClick: (link: NavLink) => void;
  onContactClick: () => void;
  onLoginClick: () => void;
}

const MobileMenu = ({ isOpen, navLinks, activeLink, onNavClick, onContactClick, onLoginClick }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
      <div className="px-6 py-6 space-y-4">
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => onNavClick(link)}
            className={`block w-full text-left font-medium transition-colors duration-200 focus:outline-none  ${
              activeLink === link.name ? 'text-[#FF3B30]' : 'text-[#1A1A1A] hover:text-[#FF3B30]'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {link.name}
          </button>
        ))}
        
        <div className="pt-4 border-t border-gray-200 space-y-3">
          <Button 
            onClick={onContactClick}
            variant="outline"
            className="w-full font-medium text-sm py-3"
            style={{
              fontFamily: 'Poppins, sans-serif',
              borderColor: '#FF3B30',
              color: '#FF3B30',
              borderRadius: '12px'
            }}
          >
            Contact Us
          </Button>
          <Button 
            onClick={onLoginClick}
            className="w-full font-semibold text-sm py-3"
            style={{
              fontFamily: 'Poppins, sans-serif',
              backgroundColor: '#FF3B30',
              color: '#FFFFFF',
              borderRadius: '12px'
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
