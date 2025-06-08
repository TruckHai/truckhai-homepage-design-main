
import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, TrendingUp, CheckCircle, Clock, FileText, Calculator, Phone, Mail, AlertTriangle, Star, Users, Zap } from "lucide-react";

const BrokerInsurancePage = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const insurancePlans = [
    {
      id: 'basic',
      title: 'Broker Basic',
      subtitle: 'Essential Coverage',
      price: '₹5,000',
      period: 'per year',
      coverage: 'Up to ₹5L',
      icon: Shield,
      color: 'blue',
      features: [
        'Professional liability coverage',
        'Client transaction protection',
        'Basic legal support',
        'Online claim filing',
        'Email support'
      ]
    },
    {
      id: 'premium',
      title: 'Broker Premium',
      subtitle: 'Complete Protection',
      price: '₹15,000',
      period: 'per year',
      coverage: 'Up to ₹25L',
      icon: Star,
      color: 'red',
      popular: true,
      features: [
        'All Basic features',
        'Errors & omissions coverage',
        'Cyber liability protection',
        '24/7 legal helpline',
        'Dedicated broker support',
        'Priority claims processing'
      ]
    },
    {
      id: 'enterprise',
      title: 'Broker Enterprise',
      subtitle: 'Maximum Security',
      price: '₹35,000',
      period: 'per year',
      coverage: 'Up to ₹1Cr',
      icon: Users,
      color: 'purple',
      features: [
        'All Premium features',
        'Business interruption coverage',
        'International transaction protection',
        'Compliance assistance',
        'Custom policy terms',
        'On-site risk assessment'
      ]
    }
  ];

  const brokerMetrics = [
    {
      title: 'Active Policies',
      value: '5',
      subtitle: 'Professional coverage',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Claims Filed',
      value: '0',
      subtitle: 'This year',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Coverage Value',
      value: '₹25L',
      subtitle: 'Total protection',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Risk Score',
      value: 'Low',
      subtitle: 'Excellent rating',
      icon: CheckCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const handleGetQuote = (planId: string) => {
    setSelectedPlan(planId);
    setShowQuoteForm(true);
  };

  const handleSubmitQuote = () => {
    toast({
      title: "Quote Request Submitted",
      description: "Our insurance specialist will contact you within 2 hours with a customized quote.",
    });
    setShowQuoteForm(false);
  };

  return (
    <DashboardLayout 
      userRole="broker" 
      userName="Broker" 
      userId="BR123456" 
      isVerified={true}
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Broker Insurance Hub</h1>
            <p className="text-lg text-gray-600">Professional liability and business protection insurance</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">Protected</span>
          </div>
        </div>

        {/* Broker Insurance Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brokerMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                      <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                      <p className="text-xs text-gray-500">{metric.subtitle}</p>
                    </div>
                    <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Insurance Plans */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Broker Insurance Plan</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {insurancePlans.map((plan) => {
              const Icon = plan.icon;
              return (
                <Card key={plan.id} className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-red-500' : ''}`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-semibold">
                      POPULAR
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 bg-${plan.color}-50 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 text-${plan.color}-600`} />
                    </div>
                    <CardTitle className="text-xl">{plan.title}</CardTitle>
                    <p className="text-sm text-gray-600">{plan.subtitle}</p>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-gray-900">{plan.price}</div>
                      <div className="text-sm text-gray-500">{plan.period}</div>
                      <div className="text-sm font-medium text-green-600 mt-1">Coverage: {plan.coverage}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      onClick={() => handleGetQuote(plan.id)}
                      className={`w-full mt-6 ${plan.popular ? 'bg-red-500 hover:bg-red-600 text-white' : 'border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}
                    >
                      Get Quote
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Why Brokers Choose Our Insurance?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-blue-900 mb-2">Professional Coverage</h4>
                  <p className="text-sm text-blue-700">Comprehensive liability protection for brokers</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-blue-900 mb-2">Quick Processing</h4>
                  <p className="text-sm text-blue-700">Fast approval and claim settlement</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-blue-900 mb-2">Expert Support</h4>
                  <p className="text-sm text-blue-700">Dedicated broker insurance specialists</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quote Form Modal */}
        {showQuoteForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Get Broker Insurance Quote</CardTitle>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowQuoteForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual Broker</SelectItem>
                        <SelectItem value="firm">Brokerage Firm</SelectItem>
                        <SelectItem value="agency">Transport Agency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="annualRevenue">Annual Revenue *</Label>
                    <Input id="annualRevenue" placeholder="₹ Annual business revenue" />
                  </div>
                  <div>
                    <Label htmlFor="clientBase">Client Base Size *</Label>
                    <Input id="clientBase" placeholder="Number of regular clients" type="number" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="services">Services Offered *</Label>
                  <Textarea 
                    id="services" 
                    placeholder="Describe your brokerage services..."
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowQuoteForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitQuote} className="bg-red-500 hover:bg-red-600 text-white">
                    Get Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BrokerInsurancePage;
