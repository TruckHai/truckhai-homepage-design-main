
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface BrokerRegistrationProps {
  onSuccess: () => void;
}

const BrokerRegistration = ({ onSuccess }: BrokerRegistrationProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    businessName: '',
    gstNumber: '',
    city: '',
    routes: [] as string[],
    vehicleTypes: [] as string[],
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const vehicleOptions = [
    'Open Truck', 'Container', 'Trailer', 'Mini Truck', 'Tempo', 'Auto'
  ];

  const routeOptions = [
    'Mumbai-Delhi', 'Delhi-Kolkata', 'Chennai-Bangalore', 'Pune-Mumbai', 'Hyderabad-Chennai'
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onSuccess();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleSelection = (array: string[], item: string, field: 'routes' | 'vehicleTypes') => {
    const newArray = array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
    setFormData({ ...formData, [field]: newArray });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.mobile.length === 10;
      case 2:
        return formData.businessName && formData.city;
      case 3:
        return formData.routes.length > 0;
      case 4:
        return formData.vehicleTypes.length > 0;
      case 5:
        return formData.password && formData.confirmPassword && 
               formData.password === formData.confirmPassword && formData.agreeToTerms;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Personal Information</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <Input
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
          <div className="flex rounded-lg border border-gray-300 bg-gray-50">
            <div className="flex items-center px-3 border-r border-gray-300">
              <span className="text-sm">+91</span>
            </div>
            <Input
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="border-0 bg-transparent focus-visible:ring-0"
              maxLength={10}
            />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Business Details</h3>
          <Input
            placeholder="Business Name"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          />
          <Input
            placeholder="GST Number (Optional)"
            value={formData.gstNumber}
            onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
          />
          <Input
            placeholder="City/Location"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Routes of Operation</h3>
          <p className="text-sm text-gray-600">Select routes you typically operate on</p>
          <div className="space-y-2">
            {routeOptions.map((route) => (
              <button
                key={route}
                onClick={() => toggleSelection(formData.routes, route, 'routes')}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${
                  formData.routes.includes(route)
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {route}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.routes.map((route) => (
              <Badge key={route} variant="secondary" className="bg-red-100 text-red-700">
                {route}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Vehicle Types</h3>
          <p className="text-sm text-gray-600">What vehicle types are you interested in?</p>
          <div className="grid grid-cols-2 gap-2">
            {vehicleOptions.map((vehicle) => (
              <button
                key={vehicle}
                onClick={() => toggleSelection(formData.vehicleTypes, vehicle, 'vehicleTypes')}
                className={`p-3 text-sm border rounded-lg transition-colors ${
                  formData.vehicleTypes.includes(vehicle)
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {vehicle}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === 5 && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Secure Your Account</h3>
          <Input
            type="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
          {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <p className="text-sm text-red-600">Passwords do not match</p>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the Terms & Conditions and Privacy Policy
            </Label>
          </div>
        </div>
      )}

      <div className="flex space-x-3">
        {currentStep > 1 && (
          <Button variant="outline" onClick={handleBack} className="flex-1">
            Back
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!isStepValid()}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white"
        >
          {currentStep === totalSteps ? 'Complete Registration' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

export default BrokerRegistration;
