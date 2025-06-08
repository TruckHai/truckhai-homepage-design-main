
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Building, Camera, CheckCircle, Upload, AlertCircle } from "lucide-react";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerificationModal = ({ isOpen, onClose }: VerificationModalProps) => {
  const [currentStep, setCurrentStep] = useState<'overview' | 'aadhaar' | 'pan' | 'bank' | 'selfie' | 'processing'>('overview');
  const [verificationStatus, setVerificationStatus] = useState({
    aadhaar: false,
    pan: false,
    bank: false,
    selfie: false
  });

  const benefits = [
    "Participate in corporate bidding",
    "Verified badge on your profile",
    "Access to premium truck owners",
    "Higher priority in matching",
    "Dedicated support line"
  ];

  const documents = [
    { icon: CreditCard, label: "Aadhaar Card", key: 'aadhaar' },
    { icon: Building, label: "PAN Card", key: 'pan' },
    { icon: Building, label: "Bank Account Details", key: 'bank' },
    { icon: Camera, label: "Live Selfie", key: 'selfie' }
  ];

  const handleDocumentUpload = (docType: string) => {
    // Simulate document upload and verification
    setTimeout(() => {
      setVerificationStatus(prev => ({
        ...prev,
        [docType]: true
      }));
      
      // Move to next step or processing
      const steps = ['aadhaar', 'pan', 'bank', 'selfie'];
      const currentIndex = steps.indexOf(docType);
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1] as any);
      } else {
        setCurrentStep('processing');
      }
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-sf-pro text-xl font-semibold text-truck-black mb-4">
                Unlock Premium Features
              </h3>
              <p className="font-poppins text-gray-600 mb-6">
                Complete these steps in 15 minutes—approval in 2–3 days.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-sf-pro text-lg font-semibold text-truck-black">Benefits:</h4>
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-truck-red rounded-full"></div>
                  <span className="font-poppins text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h4 className="font-sf-pro text-lg font-semibold text-truck-black">Required Documents:</h4>
              <div className="grid grid-cols-2 gap-4">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <doc.icon className="w-5 h-5 text-truck-red" />
                    <span className="font-poppins text-sm text-gray-700">{doc.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setCurrentStep('aadhaar')}
              className="w-full h-12 bg-truck-red hover:bg-red-600 text-white font-poppins font-semibold rounded-xl"
            >
              Start Verification
            </Button>
          </div>
        );

      case 'aadhaar':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-sf-pro text-xl font-semibold text-truck-black mb-2">
                Upload Aadhaar Card
              </h3>
              <p className="font-poppins text-gray-600">
                Take a clear photo of your Aadhaar card or upload from gallery
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="font-poppins text-gray-600 mb-4">
                Click to upload or drag and drop your Aadhaar card
              </p>
              <Button
                onClick={() => handleDocumentUpload('aadhaar')}
                variant="outline"
                className="border-truck-red text-truck-red hover:bg-truck-red hover:text-white"
              >
                Choose File
              </Button>
            </div>
          </div>
        );

      case 'pan':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-sf-pro text-xl font-semibold text-truck-black mb-2">
                Upload PAN Card
              </h3>
              <p className="font-poppins text-gray-600">
                Upload a clear photo of your PAN card
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <Button
                onClick={() => handleDocumentUpload('pan')}
                variant="outline"
                className="border-truck-red text-truck-red hover:bg-truck-red hover:text-white"
              >
                Choose File
              </Button>
            </div>
          </div>
        );

      case 'bank':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-sf-pro text-xl font-semibold text-truck-black mb-2">
                Bank Account Verification
              </h3>
              <p className="font-poppins text-gray-600">
                Enter your bank details for verification
              </p>
            </div>

            <div className="space-y-4">
              <Input
                placeholder="Bank Name"
                className="h-12 border border-gray-300 rounded-xl font-poppins focus:border-truck-red focus:ring-truck-red"
              />
              <Input
                placeholder="Account Number"
                className="h-12 border border-gray-300 rounded-xl font-poppins focus:border-truck-red focus:ring-truck-red"
              />
              <Input
                placeholder="IFSC Code"
                className="h-12 border border-gray-300 rounded-xl font-poppins focus:border-truck-red focus:ring-truck-red"
              />
              <Input
                placeholder="Account Holder Name"
                className="h-12 border border-gray-300 rounded-xl font-poppins focus:border-truck-red focus:ring-truck-red"
              />
              <Button
                onClick={() => handleDocumentUpload('bank')}
                className="w-full h-12 bg-truck-red hover:bg-red-600 text-white font-poppins font-semibold rounded-xl"
              >
                Verify Account
              </Button>
            </div>
          </div>
        );

      case 'selfie':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-sf-pro text-xl font-semibold text-truck-black mb-2">
                Selfie Verification
              </h3>
              <p className="font-poppins text-gray-600">
                Take a live selfie for identity verification
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="font-poppins text-gray-600 mb-4">
                Align your face within the oval and follow the prompts
              </p>
              <Button
                onClick={() => handleDocumentUpload('selfie')}
                className="bg-truck-red hover:bg-red-600 text-white rounded-xl"
              >
                Capture Selfie
              </Button>
            </div>
          </div>
        );

      case 'processing':
        return (
          <div className="space-y-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <div>
              <h3 className="font-sf-pro text-xl font-semibold text-truck-black mb-2">
                Verification Submitted!
              </h3>
              <p className="font-poppins text-gray-600">
                We're verifying your documents. You'll hear from us soon!
              </p>
            </div>

            <div className="space-y-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <doc.icon className="w-5 h-5 text-truck-red" />
                    <span className="font-poppins text-sm text-gray-700">{doc.label}</span>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              ))}
            </div>

            <Button
              onClick={onClose}
              className="w-full h-12 bg-truck-red hover:bg-red-600 text-white font-poppins font-semibold rounded-xl"
            >
              Back to Dashboard
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-sf-pro text-2xl font-bold text-truck-black">
            Broker Verification
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        {currentStep !== 'overview' && currentStep !== 'processing' && (
          <div className="flex items-center justify-center space-x-2 mb-6">
            {['aadhaar', 'pan', 'bank', 'selfie'].map((step, index) => (
              <React.Fragment key={step}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  verificationStatus[step as keyof typeof verificationStatus] 
                    ? 'bg-green-500 text-white' 
                    : currentStep === step 
                      ? 'bg-truck-red text-white' 
                      : 'bg-gray-300 text-gray-600'
                }`}>
                  {verificationStatus[step as keyof typeof verificationStatus] ? '✓' : index + 1}
                </div>
                {index < 3 && <div className="w-8 h-0.5 bg-gray-300"></div>}
              </React.Fragment>
            ))}
          </div>
        )}

        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
};

export default VerificationModal;
