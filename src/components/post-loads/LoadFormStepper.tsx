
import React from 'react';
import { CheckCircle, AlertCircle, Circle } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  optional?: boolean;
}

interface LoadFormStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
  errors: Record<string, string>;
}

const LoadFormStepper = ({ steps, currentStep, onStepClick, errors }: LoadFormStepperProps) => {
  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const hasStepErrors = (stepId: number) => {
    // Check if any errors belong to this step
    const stepErrorKeys = {
      1: ['loadId', 'loadType'],
      2: ['pickupLocation', 'deliveryLocation', 'pickupDate', 'deliveryDate'],
      3: ['cargoDescription', 'weight', 'cargoValue'],
      4: ['truckType'],
      5: ['contactName', 'contactPhone', 'budgetMin', 'budgetMax'],
      6: []
    };
    
    return stepErrorKeys[stepId as keyof typeof stepErrorKeys]?.some(key => errors[key]);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const hasErrors = hasStepErrors(step.id);
          
          return (
            <React.Fragment key={step.id}>
              <div
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  status === 'current' 
                    ? 'bg-red-50 border-2 border-red-200' 
                    : status === 'completed'
                    ? 'bg-green-50 border border-green-200 hover:bg-green-100'
                    : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => onStepClick(step.id)}
              >
                <div className="flex-shrink-0">
                  {hasErrors ? (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  ) : status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : status === 'current' ? (
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{step.id}</span>
                    </div>
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                
                <div className="min-w-0">
                  <p className={`text-sm font-medium ${
                    status === 'current' 
                      ? 'text-red-700' 
                      : status === 'completed'
                      ? 'text-green-700'
                      : 'text-gray-600'
                  }`}>
                    {step.title}
                    {step.optional && (
                      <span className="text-xs text-gray-500 ml-1">(Optional)</span>
                    )}
                  </p>
                  {hasErrors && (
                    <p className="text-xs text-red-500">Has errors</p>
                  )}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="w-8 h-0.5 bg-gray-200" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default LoadFormStepper;
