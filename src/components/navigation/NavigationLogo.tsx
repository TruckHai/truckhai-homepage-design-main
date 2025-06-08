
import React from 'react';

interface NavigationLogoProps {
  onLogoClick: () => void;
}

const NavigationLogo = ({ onLogoClick }: NavigationLogoProps) => {
  return (
    <div className="flex items-center">
      <img 
        src="/lovable-uploads/0f33fd90-daca-4dae-a603-17b84d56547d.png" 
        alt="Truck Hai Logo" 
        className="h-8 w-auto cursor-pointer transition-transform duration-200 hover:scale-105"
        onClick={onLogoClick}
      />
    </div>
  );
};

export default NavigationLogo;
