
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: 'broker' | 'fleet' | 'corporate') => void;
}

const LoginModal = ({ isOpen, onClose, onLoginSuccess }: LoginModalProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'broker' | 'fleet' | 'corporate'>('broker');
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  const handlePhoneSubmit = () => {
    if (phoneNumber.length === 10) {
      setCountdown(120);
      setStep('otp');
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleEmailSubmit = () => {
    if (email.includes('@') && email.includes('.')) {
      // Simulate email verification sent
      alert('Verification link sent to your email!');
    }
  };

  const handleOtpVerify = () => {
    if (otp.length === 6) {
      onLoginSuccess(activeTab);
      onClose();
      
      // Navigate to appropriate dashboard based on role
      switch (activeTab) {
        case 'broker':
          navigate('/broker-dashboard');
          break;
        case 'fleet':
          navigate('/fleet-dashboard');
          break;
        case 'corporate':
          navigate('/corporate-dashboard');
          break;
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetModal = () => {
    setStep('login');
    setPhoneNumber('');
    setEmail('');
    setOtp('');
    setCountdown(0);
    setIsEmailLogin(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetModal();
        onClose();
      }
    }}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-lg shadow-lg" style={{
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        borderRadius: '8px'
      }}>
        <div className="p-8">
          <DialogHeader className="text-center mb-6">
            <img 
              src="/lovable-uploads/0f33fd90-daca-4dae-a603-17b84d56547d.png" 
              alt="TruckHai Logo" 
              className="h-5 mx-auto mb-6"
            />
            <DialogTitle className="font-sf-pro text-xl font-medium text-gray-900">
              {step === 'login' ? 'Login to TruckHai' : 'Verify Your Number'}
            </DialogTitle>
            {step === 'login' && (
              <p className="font-poppins text-sm text-gray-600 mt-2">
                Choose your method to continue
              </p>
            )}
          </DialogHeader>

          {step === 'login' && (
            <>
              {/* Role Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                {[
                  { key: 'broker', label: 'Broker' },
                  { key: 'fleet', label: 'Fleet Owner' },
                  { key: 'corporate', label: 'Corporate' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key as 'broker' | 'fleet' | 'corporate');
                      setIsEmailLogin(tab.key === 'corporate');
                    }}
                    className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                      activeTab === tab.key
                        ? 'text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.key && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />
                    )}
                  </button>
                ))}
              </div>

              {/* Login Form */}
              <div className="space-y-6">
                {!isEmailLogin ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number
                      </label>
                      <div className="flex rounded-lg border border-gray-300 bg-gray-50 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20">
                        <div className="flex items-center px-3 border-r border-gray-300">
                          <span className="text-lg mr-2">🇮🇳</span>
                          <span className="text-gray-700 text-sm">+91</span>
                        </div>
                        <Input
                          type="tel"
                          placeholder="Enter 10-digit number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="border-0 bg-transparent flex-1 focus-visible:ring-0"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handlePhoneSubmit}
                      disabled={phoneNumber.length !== 10}
                      className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
                    >
                      Send OTP
                    </Button>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Corporate Email
                      </label>
                      <Input
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 bg-gray-50 border-gray-300 rounded-lg focus:border-red-500 focus:ring-red-500/20"
                      />
                    </div>

                    <Button
                      onClick={handleEmailSubmit}
                      disabled={!email.includes('@') || !email.includes('.')}
                      className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
                    >
                      Send Verification Link
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                      Or{' '}
                      <button
                        onClick={() => setIsEmailLogin(false)}
                        className="text-red-500 hover:underline"
                      >
                        verify via phone instead
                      </button>
                    </p>
                  </>
                )}

                {!isEmailLogin && (
                  <>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="h-12 border-gray-300 hover:border-red-500 hover:text-red-500"
                      >
                        📧 Email
                      </Button>
                      <Button
                        variant="outline"
                        className="h-12 border-gray-300 hover:border-red-500 hover:text-red-500"
                      >
                        📱 WhatsApp
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {step === 'otp' && (
            <div className="space-y-6">
              <p className="text-center text-gray-600">
                Enter the 6-digit OTP sent to +91 {phoneNumber}
              </p>

              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  className="gap-2"
                >
                  <InputOTPGroup className="gap-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="w-10 h-10 border border-gray-300 rounded-lg text-center focus:border-red-500"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-gray-600">
                    ⏱ Resend in {formatTime(countdown)}
                  </p>
                ) : (
                  <button className="text-sm text-red-500 hover:underline">
                    Resend SMS
                  </button>
                )}
              </div>

              <Button
                onClick={handleOtpVerify}
                disabled={otp.length !== 6}
                className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
              >
                Verify OTP
              </Button>

              <p className="text-center text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button className="text-red-500 hover:underline">Resend SMS</button>
                {' '}or{' '}
                <button className="text-red-500 hover:underline">Call Me</button>
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
