
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { X, Shield, Award, Users, Headphones, ArrowRight, CheckCircle } from 'lucide-react';
import AadhaarVerificationStep from './steps/AadhaarVerificationStep';
import PANVerificationStep from './steps/PANVerificationStep';
import BankVerificationStep from './steps/BankVerificationStep';
import SelfieVerificationStep from './steps/SelfieVerificationStep';
import ReviewSubmitStep from './steps/ReviewSubmitStep';

interface BrokerVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationComplete: () => void;
}

const BrokerVerificationModal = ({ isOpen, onClose, onVerificationComplete }: BrokerVerificationModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [verificationData, setVerificationData] = useState({
    aadhaar: null,
    pan: null,
    bank: null,
    selfie: null
  });

  const steps = [
    { id: 'start', title: 'Get Started', icon: Shield },
    { id: 'aadhaar', title: 'Aadhaar', icon: Shield },
    { id: 'pan', title: 'PAN', icon: Award },
    { id: 'bank', title: 'Bank', icon: Users },
    { id: 'selfie', title: 'Selfie', icon: CheckCircle },
    { id: 'review', title: 'Review', icon: CheckCircle }
  ];

  const benefits = [
    { icon: Shield, title: "Corporate Bidding Access", desc: "Participate in high-value enterprise freight auctions" },
    { icon: Award, title: "Verified Badge", desc: "Stand out with a verified broker badge" },
    { icon: Headphones, title: "Premium Support", desc: "Priority customer support and dedicated account manager" }
  ];

  const testimonial = {
    quote: "Getting verified opened up premium corporate contracts worth ₹50L+ monthly. Game changer!",
    author: "Rajesh Kumar, Verified Broker",
    rating: 5
  };

  const renderStartScreen = () => (
    <div className="flex h-full">
      {/* Left Side - Main Content */}
      <div className="flex-1 p-12 flex flex-col justify-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Verified to Unlock 
            <span className="text-red-500"> Premium Features</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Corporate bidding access, Verified badge, Premium support
          </p>
          
          {/* Progress Steps Preview */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-sm font-medium text-gray-700">Verification Steps:</span>
            </div>
            <div className="flex space-x-2">
              {steps.slice(1).map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">{index + 1}</span>
                  </div>
                  {index < steps.length - 2 && (
                    <div className="w-4 h-0.5 bg-gray-200 mx-1"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={() => setCurrentStep(1)}
            className="w-full bg-red-500 hover:bg-red-600 text-white h-12 text-lg font-semibold rounded-xl group"
          >
            Start Verification
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            ⏱️ Takes 5-10 minutes • 🔒 Bank-grade security
          </p>
        </div>
      </div>

      {/* Right Side - Benefits & Testimonial */}
      <div className="w-96 bg-gradient-to-br from-red-50 to-orange-50 p-8 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">Why Get Verified?</h3>
          <div className="space-y-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{benefit.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-white/80 rounded-xl p-6 border border-red-100">
          <div className="flex mb-3">
            {[...Array(testimonial.rating)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-sm">⭐</span>
            ))}
          </div>
          <p className="text-sm text-gray-700 italic mb-4">"{testimonial.quote}"</p>
          <p className="text-xs font-medium text-gray-900">{testimonial.author}</p>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderStartScreen();
      case 1:
        return <AadhaarVerificationStep onNext={() => setCurrentStep(2)} onBack={() => setCurrentStep(0)} />;
      case 2:
        return <PANVerificationStep onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />;
      case 3:
        return <BankVerificationStep onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} />;
      case 4:
        return <SelfieVerificationStep onNext={() => setCurrentStep(5)} onBack={() => setCurrentStep(3)} />;
      case 5:
        return <ReviewSubmitStep onComplete={onVerificationComplete} onBack={() => setCurrentStep(4)} />;
      default:
        return renderStartScreen();
    }
  };

  const getProgressValue = () => {
    if (currentStep === 0) return 0;
    return ((currentStep - 1) / 4) * 100;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[90vh] p-0 overflow-hidden">
        {/* Header with Progress */}
        {currentStep > 0 && (
          <div className="border-b border-gray-200 p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Broker Verification</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Step {currentStep} of 5</span>
                <span className="text-gray-600">{Math.round(getProgressValue())}% Complete</span>
              </div>
              <Progress value={getProgressValue()} className="h-2" />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {renderStepContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BrokerVerificationModal;
