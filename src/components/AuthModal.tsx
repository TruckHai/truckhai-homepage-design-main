
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { User, Building, Truck, Mail, Phone, ArrowLeft, Info } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import BrokerRegistration from './registration/BrokerRegistration';
import FleetOwnerRegistration from './registration/FleetOwnerRegistration';
import CorporateRegistration from './registration/CorporateRegistration';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: 'broker' | 'fleet' | 'corporate') => void;
}

const AuthModal = ({ isOpen, onClose, onLoginSuccess }: AuthModalProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loginStep, setLoginStep] = useState<'method' | 'otp'>('method');
  const [registrationStep, setRegistrationStep] = useState<'role' | 'onboarding'>('role');
  const [selectedRole, setSelectedRole] = useState<'broker' | 'fleet' | 'corporate' | null>(null);
  const [activeUserType, setActiveUserType] = useState<'broker' | 'fleet' | 'corporate'>('broker');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  const userRoles = [
    {
      key: 'broker' as const,
      title: 'Broker',
      icon: User,
      description: 'Connect loads with trucks',
      color: 'bg-blue-50 border-blue-200 hover:border-blue-400'
    },
    {
      key: 'fleet' as const,
      title: 'Fleet Owner',
      icon: Truck,
      description: 'List your trucks and get loads',
      color: 'bg-green-50 border-green-200 hover:border-green-400'
    },
    {
      key: 'corporate' as const,
      title: 'Corporate',
      icon: Building,
      description: 'Enterprise freight solutions',
      color: 'bg-purple-50 border-purple-200 hover:border-purple-400'
    }
  ];

  const handlePhoneSubmit = () => {
    if (phoneNumber.length === 10) {
      setCountdown(120);
      setLoginStep('otp');
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
      alert('Verification link sent to your email!');
    }
  };

  const handleOtpVerify = () => {
    if (otp.length === 6) {
      onLoginSuccess(activeUserType);
      onClose();
      
      switch (activeUserType) {
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

  const handleRoleSelection = (role: 'broker' | 'fleet' | 'corporate') => {
    setSelectedRole(role);
    setRegistrationStep('onboarding');
  };

  const handleRegistrationSuccess = () => {
    if (selectedRole) {
      onLoginSuccess(selectedRole);
      onClose();
      
      switch (selectedRole) {
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

  const resetModal = () => {
    setActiveTab('login');
    setLoginStep('method');
    setRegistrationStep('role');
    setSelectedRole(null);
    setPhoneNumber('');
    setEmail('');
    setOtp('');
    setCountdown(0);
    setIsEmailLogin(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
              {activeTab === 'login' ? 'Welcome Back to TruckHai' : 'Join TruckHai Today'}
            </DialogTitle>
            <p className="font-poppins text-sm text-gray-600 mt-2">
              {activeTab === 'login' ? 'Choose your method to continue' : 'Get started with your freight journey'}
            </p>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="relative">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="relative">
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6">
              {loginStep === 'method' && (
                <>
                  {/* Role Tabs for Login */}
                  <div className="flex border-b border-gray-200 mb-6">
                    {userRoles.map((role) => (
                      <button
                        key={role.key}
                        onClick={() => {
                          setActiveUserType(role.key);
                          setIsEmailLogin(role.key === 'corporate');
                        }}
                        className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                          activeUserType === role.key
                            ? 'text-gray-900'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {role.title}
                        {activeUserType === role.key && (
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
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <Info className="w-3 h-3 mr-1" />
                            We'll send a one-time password (OTP) to verify you
                          </div>
                        </div>

                        <Button
                          onClick={handlePhoneSubmit}
                          disabled={phoneNumber.length !== 10}
                          className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all hover:scale-105"
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
                            <Mail className="w-4 h-4 mr-2" />
                            Email
                          </Button>
                          <Button
                            variant="outline"
                            className="h-12 border-gray-300 hover:border-red-500 hover:text-red-500"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            WhatsApp
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              {loginStep === 'otp' && (
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLoginStep('method')}
                      className="mr-2 p-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                      <h3 className="font-medium">Enter OTP</h3>
                      <p className="text-sm text-gray-600">Sent to +91 {phoneNumber}</p>
                    </div>
                  </div>

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
                </div>
              )}
            </TabsContent>

            <TabsContent value="register" className="space-y-6">
              {registrationStep === 'role' && (
                <>
                  <div className="text-center mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">Choose Your Role</h3>
                    <p className="text-sm text-gray-600">Select how you want to use TruckHai</p>
                  </div>

                  <div className="space-y-3">
                    {userRoles.map((role) => {
                      const IconComponent = role.icon;
                      return (
                        <Card
                          key={role.key}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1 ${role.color}`}
                          onClick={() => handleRoleSelection(role.key)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                <IconComponent className="w-5 h-5 text-gray-700" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{role.title}</h4>
                                <p className="text-sm text-gray-600">{role.description}</p>
                              </div>
                              <div className="text-gray-400">→</div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <p className="text-center text-xs text-gray-500 mt-4">
                    Already have an account?{' '}
                    <button
                      onClick={() => setActiveTab('login')}
                      className="text-red-500 hover:underline"
                    >
                      Sign in here
                    </button>
                  </p>
                </>
              )}

              {registrationStep === 'onboarding' && selectedRole && (
                <div>
                  <div className="flex items-center mb-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setRegistrationStep('role')}
                      className="mr-2 p-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                      <h3 className="font-medium">
                        {selectedRole === 'broker' && 'Broker Registration'}
                        {selectedRole === 'fleet' && 'Fleet Owner Registration'}
                        {selectedRole === 'corporate' && 'Corporate Registration'}
                      </h3>
                    </div>
                  </div>

                  {selectedRole === 'broker' && (
                    <BrokerRegistration onSuccess={handleRegistrationSuccess} />
                  )}
                  {selectedRole === 'fleet' && (
                    <FleetOwnerRegistration onSuccess={handleRegistrationSuccess} />
                  )}
                  {selectedRole === 'corporate' && (
                    <CorporateRegistration onSuccess={handleRegistrationSuccess} />
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
