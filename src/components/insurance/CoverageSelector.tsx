
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckIcon, CheckCircleIcon, InfoIcon } from './InsuranceIcons';

interface CoverageOption {
  id: string;
  title: string;
  limit: string;
  premium: string;
  icon: string;
  features: string[];
  recommended?: boolean;
}

interface CoverageSelectorProps {
  coverageOptions: CoverageOption[];
  selectedCoverage: string;
  onCoverageChange: (coverage: string) => void;
  onShowComparison: () => void;
}

const CoverageSelector: React.FC<CoverageSelectorProps> = ({
  coverageOptions,
  selectedCoverage,
  onCoverageChange,
  onShowComparison
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Coverage Options *
        </label>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-blue-600"
          onClick={onShowComparison}
        >
          <InfoIcon className="w-4 h-4 mr-1" />
          Compare All Plans
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coverageOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => onCoverageChange(option.id)}
            className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedCoverage === option.id
                ? 'border-red-500 bg-red-50 shadow-lg transform scale-105'
                : 'border-gray-200 hover:border-red-300'
            }`}
          >
            {option.recommended && (
              <div className="absolute -top-2 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Recommended
              </div>
            )}
            
            <div className="text-center mb-3">
              <div className="text-2xl mb-2">{option.icon}</div>
              <h3 className="font-semibold text-gray-900">{option.title}</h3>
              <span className="text-sm text-gray-600">({option.limit})</span>
            </div>
            
            <div className="text-center mb-3">
              <p className="text-2xl font-bold text-red-600">₹{option.premium}</p>
            </div>
            
            <div className="space-y-1">
              {option.features.map((feature, idx) => (
                <p key={idx} className="text-xs text-gray-600 flex items-center">
                  <CheckIcon className="w-3 h-3 text-green-500 mr-1" />
                  {feature}
                </p>
              ))}
            </div>

            {selectedCoverage === option.id && (
              <div className="absolute top-2 right-2">
                <CheckCircleIcon className="w-6 h-6 text-red-500" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoverageSelector;
