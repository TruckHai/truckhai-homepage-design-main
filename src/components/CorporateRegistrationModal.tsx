
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Phone, Mail, Building, Upload, Clock, Shield } from "lucide-react";

interface CorporateRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistrationSuccess: () => void;
}

const CorporateRegistrationModal = ({ isOpen, onClose, onRegistrationSuccess }: CorporateRegistrationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationMethod, setRegistrationMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [formData, setFormData] = useState({
    // Operator Details
    firstName: '',
    lastName: '',
    designation: '',
    department: '',
    employeeId: '',
    // Company Details
    companyName: '',
    companyType: '',
    industrySector: '',
    companyAddress: '',
    branchLocation: '',
    gstNumber: '',
    // Financial Details
    panNumber: '',
    cinNumber: '',
    annualTurnover: '',
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    accountType: '',
    paymentMethods: [],
    // Operational Details
    monthlyBudget: '',
    primaryRoutes: [],
    truckTypes: [],
    shipmentVolume: ''
  });

  const steps = [
    { number: 1, label: 'Select Method', completed: currentStep > 1 },
    { number: 2, label: 'Registration Form', completed: currentStep > 2 },
    { number: 3, label: 'Verification', completed: currentStep > 3 }
  ];

  const progressValue = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleMethodSelection = (method: string) => {
    setRegistrationMethod(method);
  };

  const handlePhoneSubmit = () => {
    if (phoneNumber.length === 10) {
      setCountdown(60);
      setCurrentStep(1.5);
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
      setCurrentStep(2);
    }
  };

  const handleEmailSubmit = () => {
    if (email && email.includes('@')) {
      setCurrentStep(2);
    }
  };

  const renderMethodSelection = () => {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-sf-pro text-xl font-semibold text-truck-black">Corporate Registration</h3>
          <p className="font-poppins text-sm text-gray-600">Choose a verification method to begin. You can add alternate contacts later.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
              registrationMethod === 'phone' ? 'border-truck-red ring-2 ring-truck-red/20' : 'border-gray-300'
            }`}
            onClick={() => handleMethodSelection('phone')}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`w-6 h-6 rounded-full border-2 ${
                  registrationMethod === 'phone' ? 'border-truck-red bg-truck-red' : 'border-gray-300'
                } flex items-center justify-center`}>
                  {registrationMethod === 'phone' && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="w-8 h-8 text-truck-red" />
                    <h4 className="font-sf-pro text-lg font-semibold text-truck-black">Phone Number Registration</h4>
                  </div>
                  <p className="font-poppins text-sm text-gray-600">Quick OTP—ideal for local decision makers (India +91).</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
              registrationMethod === 'email' ? 'border-truck-red ring-2 ring-truck-red/20' : 'border-gray-300'
            }`}
            onClick={() => handleMethodSelection('email')}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`w-6 h-6 rounded-full border-2 ${
                  registrationMethod === 'email' ? 'border-truck-red bg-truck-red' : 'border-gray-300'
                } flex items-center justify-center`}>
                  {registrationMethod === 'email' && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Mail className="w-8 h-8 text-truck-red" />
                    <h4 className="font-sf-pro text-lg font-semibold text-truck-black">Email Registration</h4>
                  </div>
                  <p className="font-poppins text-sm text-gray-600">Professional email verification—preferred for corporate domains.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-center font-poppins text-sm text-gray-600">
          Need help? Call our Enterprise Team: 1800-123-456
        </p>

        <Button 
          onClick={() => setCurrentStep(registrationMethod === 'phone' ? 1.1 : 1.2)}
          disabled={!registrationMethod}
          className="w-full h-12 bg-truck-red hover:bg-red-600 text-white font-poppins font-semibold rounded-xl"
        >
          Continue
        </Button>
      </div>
    );
  };

  const renderPhoneVerification = () => {
    if (currentStep === 1.1) {
      return (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-sf-pro text-xl font-semibold text-truck-black">Enter Your Corporate Mobile Number</h3>
            <p className="font-poppins text-sm text-gray-600">Enter your corporate mobile number to receive an OTP.</p>
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

            <div className="space-y-2">
              <Select>
                <SelectTrigger className="h-12 border-gray-300 rounded-xl">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="procurement-manager">Procurement Manager</SelectItem>
                  <SelectItem value="logistics-head">Logistics Head</SelectItem>
                  <SelectItem value="operations-manager">Operations Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-poppins text-sm font-medium text-gray-700">Are you authorized to make procurement decisions?</Label>
              <RadioGroup defaultValue="" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="auth-yes" />
                  <Label htmlFor="auth-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="auth-no" />
                  <Label htmlFor="auth-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button 
              onClick={handlePhoneSubmit}
              disabled={phoneNumber.length !== 10}
              className="w-full h-12 bg-truck-red hover:bg-red-600 text-white font-poppins font-semibold rounded-xl"
            >
              Send OTP
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-sf-pro text-xl font-semibold text-truck-black">Enter OTP</h3>
          <p className="font-poppins text-sm text-gray-600">We have sent a 6-digit code to +91 {phoneNumber}</p>
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
              <p className="font-poppins text-sm text-gray-600">Resend in {countdown}s</p>
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
  };

  const renderEmailVerification = () => {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-sf-pro text-xl font-semibold text-truck-black">Enter Your Corporate Email</h3>
          <p className="font-poppins text-sm text-gray-600">Enter your corporate email to receive a secure verification link.</p>
        </div>
        
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 border-gray-300 rounded-xl focus:border-truck-red focus:ring-truck-red/20"
          />

          <Input
            placeholder="Procurement Manager, Logistics Head, etc."
            className="h-12 border-gray-300 rounded-xl focus:border-truck-red focus:ring-truck-red/20"
          />

          <Select>
            <SelectTrigger className="h-12 border-gray-300 rounded-xl">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="procurement">Procurement</SelectItem>
              <SelectItem value="logistics">Logistics</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            onClick={handleEmailSubmit}
            disabled={!email || !email.includes('@')}
            className="w-full h-12 bg-truck-red hover:bg-red-600 text-white font-poppins font-semibold rounded-xl"
          >
            Send Verification Email
          </Button>

          {email && email.includes('@') && (
            <p className="font-poppins text-sm text-gray-600 text-center">
              Verification email sent to {email}. Link expires in 24 hrs.
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderRegistrationForm = () => {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-sf-pro text-xl font-semibold text-truck-black">Business Registration</h3>
          <p className="font-poppins text-sm text-gray-600">Complete your corporate profile to access our platform.</p>
        </div>

        <div className="space-y-6">
          {/* Operator Details */}
          <div className="space-y-4">
            <h4 className="font-sf-pro text-lg font-semibold text-truck-black">Operator Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="h-12 border-gray-300 rounded-xl focus:border-truck-red focus:ring-truck-red/20"
              />
              <Input
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="h-12 border-gray-300 rounded-xl focus:border-truck-red focus:ring-truck-red/20"
              />
            </div>
            <Input
              placeholder="Designation / Role"
              value={formData.designation}
              onChange={(e) => setFormData({...formData, designation: e.target.value})}
              className="h-12 border-gray-300 rounded-xl focus:border-truck-red focus:ring-truck-red/20"
            />
            <Select onValueChange={(value) => setFormData({...formData, department: value})}>
              <SelectTrigger className="h-12 border-gray-300 rounded-xl">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="procurement">Procurement</SelectItem>
                <SelectItem value="logistics">Logistics</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Company Details */}
          <div className="space-y-4">
            <h4 className="font-sf-pro text-lg font-semibold text-truck-black">Company Details</h4>
            <Input
              placeholder="Company Name"
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              className="h-12 border-gray-300 rounded-xl focus:border-truck-red focus:ring-truck-red/20"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select onValueChange={(value) => setFormData({...formData, companyType: value})}>
                <SelectTrigger className="h-12 border-gray-300 rounded-xl">
                  <SelectValue placeholder="Company Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mnc">MNC</SelectItem>
                  <SelectItem value="sme">SME</SelectItem>
                  <SelectItem value="msme">MSME</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setFormData({...formData, industrySector: value})}>
                <SelectTrigger className="h-12 border-gray-300 rounded-xl">
                  <SelectValue placeholder="Industry Sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="pharma">Pharma</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea
              placeholder="Company Address"
              value={formData.companyAddress}
              onChange={(e) => setFormData({...formData, companyAddress: e.target.value})}
              className="border-gray-300 rounded-xl focus:border-truck-red focus:ring-truck-red/20"
            />
            <Input
              placeholder="GST Number"
              value={formData.gstNumber}
              onChange={(e) => setFormData({...formData, gstNumber: e.target.value.toUpperCase()})}
              className="h-12 border-gray-300 rounded-xl focus:border-truck-red focus:ring-truck-red/20"
            />
          </div>

          {/* Financial Details */}
          <div className="space-y-4">
            <h4 className="font-sf-pro text-lg font-semibold text-truck-black">Financial Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="PAN Number"
                value={formData.panNumber}
                onChange={(e) => setFormData({...formData, panNumber: e.target.value.toUpperCase()})}
                className="h-12 border-gray-300 rounded-xl focus:border-truck-red focus:ring-truck-red/20"
              />
              <Select onValueChange={(value) => setFormData({...formData, annualTurnover: value})}>
                <SelectTrigger className="h-12 border-gray-300 rounded-xl">
                  <SelectValue placeholder="Annual Turnover" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-50l">Under ₹50 L</SelectItem>
                  <SelectItem value="50l-5cr">₹50 L - ₹5 Cr</SelectItem>
                  <SelectItem value="over-5cr">Over ₹5 Cr</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Operational Details */}
          <div className="space-y-4">
            <h4 className="font-sf-pro text-lg font-semibold text-truck-black">Operational Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select onValueChange={(value) => setFormData({...formData, monthlyBudget: value})}>
                <SelectTrigger className="h-12 border-gray-300 rounded-xl">
                  <SelectValue placeholder="Monthly Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-1l">Under ₹1 L</SelectItem>
                  <SelectItem value="1l-5l">₹1 L - ₹5 L</SelectItem>
                  <SelectItem value="over-5l">Over ₹5 L</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setFormData({...formData, shipmentVolume: value})}>
                <SelectTrigger className="h-12 border-gray-300 rounded-xl">
                  <SelectValue placeholder="Volume of Shipments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-5">Under 5 loads</SelectItem>
                  <SelectItem value="5-20">5 - 20 loads</SelectItem>
                  <SelectItem value="over-20">Over 20 loads</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="font-poppins text-sm text-gray-700">
              I agree to the <span className="text-truck-red">Terms & Conditions</span>
            </Label>
          </div>

          <Button 
            onClick={() => setCurrentStep(3)}
            className="w-full h-12 bg-truck-red hover:bg-red-600 text-white font-poppins font-semibold rounded-xl"
          >
            Submit Registration
          </Button>
        </div>
      </div>
    );
  };

  const renderVerificationDashboard = () => {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
            <Clock className="w-10 h-10 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-sf-pro text-xl font-semibold text-truck-black">Verification in Progress</h3>
            <p className="font-poppins text-sm text-gray-600 mt-2">
              We are verifying your documents—expect updates in 3–5 business days.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Aadhaar Verification', status: 'completed' },
            { label: 'PAN Verification', status: 'completed' },
            { label: 'GST & CIN Verification', status: 'in-progress' },
            { label: 'Verification Call', status: 'pending' },
            { label: 'Bank Account Verification', status: 'pending' },
            { label: 'Background & Credit Check', status: 'pending' }
          ].map((step, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                {step.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                {step.status === 'in-progress' && <div className="w-5 h-5 border-2 border-truck-red border-t-transparent rounded-full animate-spin" />}
                {step.status === 'pending' && <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />}
              </div>
              <span className="font-poppins text-sm text-gray-700">{step.label}</span>
            </div>
          ))}
        </div>

        <p className="text-center font-poppins text-sm text-gray-600">
          Need help? Email support@truckhai.com or call +91 1800-XYZ-123
        </p>

        <Button 
          onClick={onRegistrationSuccess}
          className="w-full h-12 bg-truck-red hover:bg-red-600 text-white font-poppins font-semibold rounded-xl"
        >
          Continue to Dashboard
        </Button>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderMethodSelection();
      case 1.1:
      case 1.5:
        return renderPhoneVerification();
      case 1.2:
        return renderEmailVerification();
      case 2:
        return renderRegistrationForm();
      case 3:
        return renderVerificationDashboard();
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
              Corporate Registration
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
                      currentStep === step.number ? 'border-2 border-truck-red bg-white text-truck-red' :
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

export default CorporateRegistrationModal;
