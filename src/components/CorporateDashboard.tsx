
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, BarChart3, MapPin, Shield, Target, Settings, Upload, TrendingUp, Clock, Users } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const CorporateDashboard = () => {
  const [isVerified, setIsVerified] = React.useState(false);
  const navigate = useNavigate();

  const enterpriseFeatures = [
    {
      icon: FileText,
      title: "📝 Post Individual Load",
      description: "Full load posting & bidding.",
      buttonText: "Post Now →",
      buttonVariant: "default" as const,
      route: "/corporate/post-load"
    },
    {
      icon: Upload,
      title: "📊 Bulk Upload Loads",
      description: "Upload 100+ loads via CSV.",
      buttonText: "Upload Now →",
      buttonVariant: "default" as const,
      route: "/corporate/bulk-upload"
    },
    {
      icon: MapPin,
      title: "📍 View Live Tracking",
      description: "Monitor all active shipments.",
      buttonText: "View Map →",
      buttonVariant: "outline" as const,
      route: "/corporate/live-tracking"
    },
    {
      icon: Shield,
      title: "🛡️ In-Transit Insurance",
      description: "Protect platform & external loads.",
      buttonText: "Get Quote →",
      buttonVariant: "outline" as const,
      route: "/corporate/insurance-hub"
    },
    {
      icon: Target,
      title: "🎯 Bidding Exchange",
      description: "View, compare & award bids.",
      buttonText: "View Exchange →",
      buttonVariant: "default" as const,
      route: "/corporate-bidding-exchange"
    },
    {
      icon: Settings,
      title: "🔄 ERP Integration",
      description: "Connect with SAP, Oracle, custom APIs.",
      buttonText: "Configure →",
      buttonVariant: "outline" as const,
      route: "/corporate/erp-integration"
    },
    {
      icon: BarChart3,
      title: "📈 Analytics & Reports",
      description: "View cost savings & performance.",
      buttonText: "View Reports →",
      buttonVariant: "outline" as const,
      route: "/corporate/analytics"
    },
    {
      icon: Settings,
      title: "⚙️ Settings",
      description: "Manage account preferences.",
      buttonText: "Configure →",
      buttonVariant: "outline" as const,
      route: "/corporate/settings"
    }
  ];

  const metrics = [
    { label: "Active Loads", value: "15", subtext: "8 Bids Pending", color: "text-red-500", icon: FileText },
    { label: "In-Transit", value: "7", subtext: "6 On-Time / 1 Delayed", color: "text-green-500", icon: TrendingUp },
    { label: "Monthly Spend", value: "₹12,45,000", subtext: "22% Saved vs Market", color: "text-red-500", icon: BarChart3 },
    { label: "Vendor Performance", value: "98%", subtext: "Avg. On-Time", color: "text-green-500", icon: Target }
  ];

  const recentActivity = [
    { icon: "🎯", text: "Load DEL→MUM awarded to ABC Logistics – ₹48,000", time: "1 hr ago" },
    { icon: "💰", text: "Advance payment of ₹45,600 processed to XYZ Transport", time: "2 hrs ago" },
    { icon: "🚛", text: "Truck GJ-01-AB-1234 delivered in Chennai", time: "4 hrs ago" },
    { icon: "📋", text: "New vendor application approved", time: "Yesterday" },
    { icon: "📊", text: "Monthly spend report generated", time: "2 days ago" }
  ];

  const handleFeatureClick = (route: string) => {
    navigate(route);
  };

  return (
    <DashboardLayout
      userRole="corporate"
      userName="Priya Sharma"
      userId="CC12345678"
      isVerified={isVerified}
      verificationStatus={isVerified ? 'verified' : 'pending'}
    >
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-2">Corporate Dashboard</h1>
            <p className="text-blue-100 text-lg">
              Manage your enterprise logistics operations efficiently
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Enterprise Metrics */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Key Enterprise Metrics
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {metrics.map((metric, index) => {
                  const IconComponent = metric.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md rounded-xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            metric.color === 'text-red-500' ? 'bg-red-50' : 'bg-green-50'
                          }`}>
                            <IconComponent className={`w-5 h-5 ${metric.color}`} />
                          </div>
                        </div>
                        <div className={`text-2xl font-bold mb-1 ${metric.color}`}>
                          {metric.value}
                        </div>
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          {metric.label}
                        </div>
                        <div className="text-xs text-gray-500">
                          {metric.subtext}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Enterprise Features Grid */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Enterprise Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {enterpriseFeatures.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md rounded-xl group cursor-pointer"
                        onClick={() => handleFeatureClick(feature.route)}>
                    <CardHeader className="pb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center mb-3 group-hover:from-red-100 group-hover:to-red-200 transition-all">
                        <feature.icon className="w-6 h-6 text-red-500" />
                      </div>
                      <CardTitle className="text-sm font-semibold leading-tight">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 mb-4 text-xs leading-relaxed">
                        {feature.description}
                      </p>
                      <Button
                        variant={feature.buttonVariant}
                        size="sm"
                        className={`w-full text-xs font-medium ${
                          feature.buttonVariant === 'default' 
                            ? 'bg-red-500 hover:bg-red-600 text-white shadow-sm' 
                            : 'border-red-500 text-red-500 hover:bg-red-50 hover:border-red-600'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFeatureClick(feature.route);
                        }}
                      >
                        {feature.buttonText}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Corporate Bidding Panel */}
            {isVerified && (
              <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-800 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    🎯 Current RFQs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-purple-700">DEL→MUM-001 – 12 bids (lowest ₹42K)</span>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        <Clock className="w-3 h-3 mr-1" />
                        Closes in 4h
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-purple-700">BLR→CHN-002 – 8 bids (lowest ₹35K)</span>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        <Clock className="w-3 h-3 mr-1" />
                        Closes in 6h
                      </Badge>
                    </div>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4"
                      onClick={() => navigate('/corporate-bidding-exchange')}
                    >
                      View Bidding Exchange →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Recent Activity & Quick Stats */}
          <div className="space-y-6">
            <Card className="bg-white border-0 shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <span className="text-lg">{activity.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.text}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Account Manager */}
            {isVerified && (
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-lg text-green-800 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Your Account Manager
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                      PS
                    </div>
                    <h3 className="font-semibold text-green-800">Priya Sharma</h3>
                    <p className="text-sm text-green-700 mb-3">Senior Account Manager</p>
                    <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                      Contact Priya
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cost Savings Summary */}
            <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg text-orange-800 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  This Month's Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-orange-700">Market Rate</span>
                    <span className="text-sm font-semibold text-orange-800">₹15,96,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-orange-700">TruckHai Rate</span>
                    <span className="text-sm font-semibold text-green-600">₹12,45,000</span>
                  </div>
                  <hr className="border-orange-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-orange-800">Total Savings</span>
                    <span className="text-lg font-bold text-green-600">₹3,51,000</span>
                  </div>
                  <div className="text-center">
                    <Badge className="bg-green-500 text-white">22% Saved</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CorporateDashboard;
