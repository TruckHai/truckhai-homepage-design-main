
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Truck, MapPin, Shield, Building, TrendingUp, Upload, Camera, Phone, Mail, CreditCard, User } from "lucide-react";

interface FleetOwnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const FleetOwnerModal = ({ isOpen, onClose, onLoginSuccess }: FleetOwnerModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    gstNumber: '',
    businessAddress: '',
    yearsInBusiness: '',
    fleetSize: '',
    serviceAreas: [],
    truckTypes: []
  });

  const steps = [
    { number: 1, label: 'Phone', completed: currentStep > 1 },
    { number: 2, label: 'Details', completed: currentStep > 2 },
    { number: 3, label: 'Fleet Setup', completed: currentStep > 3 },
    { number: 4, label: 'Verification', completed: currentStep > 4 }
  ];

  const progressValue = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handlePhoneSubmit = () => {
    if (phoneNumber.length === 10) {
      setCountdown(60);
      setCurrentStep(1.5); // OTP step
      // Simulate countdown
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleOtpVerify = () => {
    if (otp.length === 6) {
      // Simulate new user detection
      setIsNewUser(true);
      setCurrentStep(2);
    }
  };

  const handleRegistrationComplete = () => {
    setCurrentStep(3);
  };

  const handleFleetSetupComplete = () => {
    setCurrentStep(4);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="font-sf-pro text-xl font-semibold text-truck-black">Enter Your Mobile Number</h3>
              <p className="font-poppins text-sm text-gray-600">New fleet owner? We'll set you up instantly!</p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <div className="flex items-center border border-gray-300 rounded-xl focus-within:border-truck-red focus-within:ring-2 focus-within:ring-truck-red/20">
                  <div className="flex items-center px-3 py-3 border-r border-gray-300">
                    <span className="text-2xl mr-2">🇮🇳</span>
                    <span className="font-poppins text-gray-700">+91</span>
                  </div>
                  <Input
                    placeholder="Enter mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border-0 rounded-none rounded-r-xl focus-visible:ring-0 font-poppins"
                    maxLength={10}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handlePhoneSubmit}
                disabled={phoneNumber.length !== 10}
                className="w-full h-12 bg-truck-red hover:bg-red-600 text-white font-poppins font-semibold rounded-xl"
              >
                Get My OTP
              </Button>
            </div>
          </div>
        );

      case 1.5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="font-sf-pro text-xl font-semibold text-truck-black">Enter the 6-digit OTP</h3>
              <p className="font-poppins text-sm text-gray-600">We just sent you an OTP to +91 {phoneNumber}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  className="gap-2"
                >
                  <InputOTPGroup className="gap-2">
                    {[...Array(6)].map((_, i) => (
                      <InputOTPSlot 
                        key={i} 
                        index={i}
                        className="w-12 h-12 border-2 border-gray-300 rounded-xl text-center font-poppins text-lg focus:border-truck-red"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <div className="text-center">
                {countdown > 0 ? (
                  <p className="font-poppins text-sm text-gray-600">Resend code in {countdown}s</p>
                ) : (
                  <button className="font-poppins text-sm text-truck-red hover:underline">
                    Resend OTP
                  </button>
                )}
              </div>
              
              <Button 
                onClick={handleOtpVerify}
                disabled={otp.length !== 6}
                className="w-full h-12 bg-truck-red hover:bg-red-600 text-white font-poppins font-semibold rounded-xl"
              >
                Verify & Continue
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="font-sf-pro text-xl font-semibold text-truck-black">Welcome to Truck Hai, Fleet Owner!</h3>
              <p className="font-poppins text-sm text-gray-600">Let's set up your fleet account in just a few steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="font-poppins text-sm font-medium text-gray-700 mb-1 block">First Name *</label>
                  <Input
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="h-12 border-gray-300 rounded-xl focus:border-truck-red focus:ring-truck-red/20"
                  />
                </div>
                
                <div>
                  <label className="font-poppins text-sm font-medium text-gray-700 mb-1 block">Last Name *</label>
                  <Input
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="h-12 border-gray-300 rounded-xl focus:border-truck-red focus:ring-truck-red/20"
                  />
                </div>

                <div>
                  <label className="font-poppins text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="h-12 border-gray-300 rounded-xl focus:border-truck-red focus:ring-truck-red/20"
                  />
                </div>

                <div>
                  <label className="font-poppins text-sm font-medium text-gray-700 mb-1 block">Company Name *</label>
                  <Input
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    className="h-12 border-gray-300 rounded-xl focus:border-truck-red focus:ring-truck-red/20"
                  />
                </div>

                <div>
                  <label className="font-poppins text-sm font-medium text-gray-700 mb-1 block">GST Number *</label>
                  <Input
                    placeholder="12-digit GSTIN"
                    value={formData.gstNumber}
                    onChange={(e) => setFormData({...formData, gstNumber: e.target.value.toUpperCase()})}
                    className="h-12 border-gray-300 rounded-xl focus:border-truck-red focus:ring-truck-red/20"
                    maxLength={15}
                  />
                </div>
              </div>

              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="font-sf-pro text-lg">Your Profile at a Glance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-poppins text-sm text-gray-600">Name:</span>
                    <span className="font-poppins text-sm font-medium">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-poppins text-sm text-gray-600">Company:</span>
                    <span className="font-poppins text-sm font-medium">{formData.companyName || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-poppins text-sm text-gray-600">GSTIN:</span>
                    <span className="font-poppins text-sm font-medium">
                      {formData.gstNumber ? '•••••••••' + formData.gstNumber.slice(-3) : '-'}
                    </span>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-poppins text-sm text-gray-600">Profile Strength</span>
                      <span className="font-poppins text-sm font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button 
              onClick={handleRegistrationComplete}
              disabled={!formData.firstName || !formData.lastName || !formData.companyName || !formData.gstNumber}
              className="w-full h-12 bg-truck-red hover:bg-red-600 text-white font-poppins font-semibold rounded-xl"
            >
              Next: Fleet Setup
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h3 className="font-sf-pro text-xl font-semibold text-truck-black">Your Fleet Owner Account Is Live!</h3>
                <p className="font-poppins text-sm text-gray-600 mt-2">
                  Congratulations. Your Fleet ID is <strong>FO123456</strong>. Welcome aboard!
                </p>
              </div>
            </div>

            <Button 
              onClick={onLoginSuccess}
              className="w-full h-12 bg-truck-red hover:bg-red-600 text-white font-poppins font-semibold rounded-xl"
            >
              Go to Dashboard
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="font-sf-pro text-2xl font-bold text-truck-black text-center">
              Fleet Owner Login
            </DialogTitle>
          </DialogHeader>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step.completed ? 'bg-truck-red text-white' :
                      currentStep === step.number || (currentStep === 1.5 && step.number === 1) ? 'border-2 border-truck-red bg-white text-truck-red' :
                      'border-2 border-gray-300 bg-white text-gray-400'
                    }`}>
                      {step.completed ? <CheckCircle className="w-5 h-5" /> : step.number}
                    </div>
                    <span className="font-poppins text-xs text-gray-600 mt-1">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${
                      step.completed ? 'bg-truck-red' : 'bg-gray-300'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
            <Progress value={progressValue} className="h-1" />
          </div>

          {renderStepContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FleetOwnerModal;
