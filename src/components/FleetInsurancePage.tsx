
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

const FleetInsurancePage = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const insurancePlans = [
    {
      id: 'basic',
      title: 'Fleet Basic',
      subtitle: 'Essential Coverage',
      price: '₹15,000',
      period: 'per vehicle/year',
      coverage: 'Up to ₹10L',
      icon: Shield,
      color: 'blue',
      features: [
        'Comprehensive vehicle coverage',
        'Third-party liability',
        'Basic roadside assistance',
        'Online claim filing',
        'Email support'
      ]
    },
    {
      id: 'premium',
      title: 'Fleet Premium',
      subtitle: 'Complete Protection',
      price: '₹35,000',
      period: 'per vehicle/year',
      coverage: 'Up to ₹50L',
      icon: Star,
      color: 'red',
      popular: true,
      features: [
        'All Basic features',
        'Zero depreciation cover',
        'Engine protection',
        '24/7 roadside assistance',
        'Dedicated fleet manager',
        'Priority claims processing'
      ]
    },
    {
      id: 'enterprise',
      title: 'Fleet Enterprise',
      subtitle: 'Maximum Security',
      price: '₹65,000',
      period: 'per vehicle/year',
      coverage: 'Up to ₹1Cr',
      icon: Users,
      color: 'purple',
      features: [
        'All Premium features',
        'Fleet analytics dashboard',
        'Driver behavior monitoring',
        'Preventive maintenance alerts',
        'Custom policy terms',
        'On-site claim settlement'
      ]
    }
  ];

  const fleetMetrics = [
    {
      title: 'Active Policies',
      value: '28',
      subtitle: 'Out of 35 vehicles',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Claims This Year',
      value: '3',
      subtitle: 'All settled',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Premium Savings',
      value: '₹2.1L',
      subtitle: 'Fleet discount',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Coverage Score',
      value: '94%',
      subtitle: 'Excellent rating',
      icon: CheckCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentClaims = [
    {
      claimId: 'FLC-2024-001',
      vehicle: 'GJ-01-AB-1234',
      type: 'Accident',
      amount: '₹45,000',
      status: 'Settled',
      date: '15 Mar 2024'
    },
    {
      claimId: 'FLC-2024-002',
      vehicle: 'GJ-01-CD-5678',
      type: 'Theft',
      amount: '₹1,20,000',
      status: 'Processing',
      date: '20 Mar 2024'
    },
    {
      claimId: 'FLC-2024-003',
      vehicle: 'GJ-01-EF-9012',
      type: 'Fire',
      amount: '₹85,000',
      status: 'Approved',
      date: '25 Mar 2024'
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Settled': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout 
      userRole="fleet" 
      userName="Fleet Owner" 
      userId="FO123456" 
      isVerified={true}
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Fleet Insurance Hub</h1>
            <p className="text-lg text-gray-600">Comprehensive insurance solutions for your entire fleet</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">Insurance Active</span>
          </div>
        </div>

        {/* Fleet Insurance Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fleetMetrics.map((metric, index) => {
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

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'overview', label: 'Insurance Plans', icon: Shield },
            { id: 'claims', label: 'Claims Management', icon: FileText },
            { id: 'analytics', label: 'Fleet Analytics', icon: TrendingUp }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-red-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <>
            {/* Insurance Plans */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Fleet Insurance Plan</h2>
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
                          Get Custom Quote
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Fleet Insurance Benefits */}
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">Why Choose Our Fleet Insurance?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-blue-900 mb-2">Fleet Discounts</h4>
                      <p className="text-sm text-blue-700">Up to 30% discount on bulk fleet policies</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-blue-900 mb-2">Quick Claims</h4>
                      <p className="text-sm text-blue-700">Average claim settlement in 3-5 days</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-blue-900 mb-2">24/7 Support</h4>
                      <p className="text-sm text-blue-700">Round-the-clock assistance for your fleet</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'claims' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Claims Management</h2>
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                <FileText className="w-4 h-4 mr-2" />
                File New Claim
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Claim ID</th>
                        <th className="text-left py-3 px-4 font-semibold">Vehicle</th>
                        <th className="text-left py-3 px-4 font-semibold">Type</th>
                        <th className="text-left py-3 px-4 font-semibold">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentClaims.map((claim, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{claim.claimId}</td>
                          <td className="py-3 px-4">{claim.vehicle}</td>
                          <td className="py-3 px-4">{claim.type}</td>
                          <td className="py-3 px-4 font-semibold">{claim.amount}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(claim.status)}>
                              {claim.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{claim.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fleet Insurance Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Premium Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Premium analytics chart would go here
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Claims Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Claims analysis chart would go here
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900 mb-1">Premium Calculator</h3>
                  <p className="text-sm text-green-700">Calculate insurance premium for your fleet</p>
                </div>
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  Calculate
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-900 mb-1">Expert Consultation</h3>
                  <p className="text-sm text-purple-700">Speak with our insurance specialists</p>
                </div>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                  Book Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quote Form Modal */}
        {showQuoteForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Get Custom Fleet Quote</CardTitle>
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
                    <Label htmlFor="fleetSize">Fleet Size *</Label>
                    <Input id="fleetSize" placeholder="Number of vehicles" type="number" />
                  </div>
                  <div>
                    <Label htmlFor="vehicleType">Primary Vehicle Type *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="truck">Commercial Trucks</SelectItem>
                        <SelectItem value="mini-truck">Mini Trucks</SelectItem>
                        <SelectItem value="tempo">Tempo/LCV</SelectItem>
                        <SelectItem value="trailer">Trailers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="avgValue">Average Vehicle Value *</Label>
                    <Input id="avgValue" placeholder="₹ Average value per vehicle" />
                  </div>
                  <div>
                    <Label htmlFor="experience">Years in Business *</Label>
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

                <div>
                  <Label htmlFor="routes">Primary Routes/Regions *</Label>
                  <Textarea 
                    id="routes" 
                    placeholder="List your main operating routes or regions..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="additionalInfo">Additional Requirements</Label>
                  <Textarea 
                    id="additionalInfo" 
                    placeholder="Any specific coverage needs or requirements..."
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

export default FleetInsurancePage;
