
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

interface FleetOwnerRegistrationProps {
  onSuccess: () => void;
}

const FleetOwnerRegistration = ({ onSuccess }: FleetOwnerRegistrationProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    fleetSize: '',
    truckTypes: [] as string[],
    documents: null as File | null,
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const truckOptions = [
    'Tata Ace', 'Mahindra Pickup', 'Eicher Pro', 'Ashok Leyland', 'Bharat Benz', 'Volvo'
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

  const toggleTruckType = (truck: string) => {
    const newTypes = formData.truckTypes.includes(truck)
      ? formData.truckTypes.filter(t => t !== truck)
      : [...formData.truckTypes, truck];
    setFormData({ ...formData, truckTypes: newTypes });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.mobile.length === 10;
      case 2:
        return formData.fleetSize;
      case 3:
        return formData.truckTypes.length > 0;
      case 4:
        return true; // Documents are optional
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
          <h3 className="font-medium text-gray-900">Fleet Information</h3>
          <Select onValueChange={(value) => setFormData({ ...formData, fleetSize: value })}>
            <SelectTrigger>
              <SelectValue placeholder="How many trucks do you own?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5">1-5 trucks</SelectItem>
              <SelectItem value="6-20">6-20 trucks</SelectItem>
              <SelectItem value="21-50">21-50 trucks</SelectItem>
              <SelectItem value="50+">50+ trucks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Truck Types</h3>
          <p className="text-sm text-gray-600">Select the types of trucks in your fleet</p>
          <div className="grid grid-cols-2 gap-2">
            {truckOptions.map((truck) => (
              <button
                key={truck}
                onClick={() => toggleTruckType(truck)}
                className={`p-3 text-sm border rounded-lg transition-colors ${
                  formData.truckTypes.includes(truck)
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {truck}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.truckTypes.map((truck) => (
              <Badge key={truck} variant="secondary" className="bg-red-100 text-red-700">
                {truck}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Documents (Optional)</h3>
          <p className="text-sm text-gray-600">Upload your RC or transport permit for faster verification</p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFormData({ ...formData, documents: e.target.files?.[0] || null })}
            />
          </div>
          {formData.documents && (
            <p className="text-sm text-green-600">✓ {formData.documents.name} uploaded</p>
          )}
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

export default FleetOwnerRegistration;
