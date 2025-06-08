
import React from 'react';

interface NavLink {
  name: string;
  anchor: string;
}

interface NavigationLinksProps {
  navLinks: NavLink[];
  activeLink: string;
  onNavClick: (link: NavLink) => void;
}

const NavigationLinks = ({ navLinks, activeLink, onNavClick }: NavigationLinksProps) => {
  return (
    <div className="hidden lg:flex items-center space-x-8">
      {navLinks.map((link) => (
        <button
          key={link.name}
          onClick={() => onNavClick(link)}
          className={`relative font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:ring-offset-2 ${
            activeLink === link.name ? 'text-[#1A1A1A]' : 'text-[#1A1A1A] hover:text-[#FF3B30]'
          }`}
          style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', lineHeight: '24px' }}
        >
          {link.name}
          {activeLink === link.name && (
            <div 
              className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full animate-in slide-in-from-left-2 duration-200"
              style={{ backgroundColor: '#FF3B30' }}
            />
          )}
          <div 
            className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full transform scale-x-0 transition-transform duration-200 origin-left hover:scale-x-100"
            style={{ backgroundColor: '#FF3B30' }}
          />
        </button>
      ))}
    </div>
  );
};

export default NavigationLinks;
