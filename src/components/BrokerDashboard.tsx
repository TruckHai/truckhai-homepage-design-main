import React from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Package, Truck, TrendingUp, Shield, Zap, BarChart3, FileText, Users, Mail, Phone } from "lucide-react";

const BrokerDashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Post a Load",
      description: "Create load posting for fleet owners",
      icon: Package,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
      hoverBg: "hover:bg-blue-100",
      buttonText: "Post Load →",
      buttonStyle: "bg-red-500 hover:bg-red-600 text-white",
      route: "/post-loads"
    },
    {
      title: "Find Available Trucks",
      description: "Browse and hire trucks for shipments",
      icon: Truck,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
      hoverBg: "hover:bg-green-100",
      buttonText: "Find Trucks →",
      buttonStyle: "border-2 border-green-500 text-green-600 bg-white hover:bg-green-50",
      route: "/hire-trucks"
    },
    {
      title: "Track Commission",
      description: "Monitor earnings and transaction history",
      icon: TrendingUp,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
      hoverBg: "hover:bg-purple-100",
      buttonText: "View Earnings →",
      buttonStyle: "border-2 border-purple-500 text-purple-600 bg-white hover:bg-purple-50",
      route: "/commission-tracking"
    },
    {
      title: "Insurance Services",
      description: "Professional liability & business insurance",
      icon: Shield,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200",
      hoverBg: "hover:bg-orange-100",
      buttonText: "Get Coverage →",
      buttonStyle: "border-2 border-orange-500 text-orange-600 bg-white hover:bg-orange-50",
      route: "/broker-insurance"
    },
    {
      title: "Corporate Bidding",
      description: "Participate in enterprise freight auctions",
      icon: Zap,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      borderColor: "border-red-200",
      hoverBg: "hover:bg-red-100",
      buttonText: "Join Bidding →",
      buttonStyle: "border-2 border-red-500 text-red-600 bg-white hover:bg-red-50",
      route: "/corporate-bidding-exchange"
    },
    {
      title: "Analytics & Reports",
      description: "Business insights and performance metrics",
      icon: BarChart3,
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
      borderColor: "border-gray-200",
      hoverBg: "hover:bg-gray-100",
      buttonText: "View Reports →",
      buttonStyle: "border-2 border-gray-500 text-gray-600 bg-white hover:bg-gray-50",
      route: "/reports-analytics"
    }
  ];

  const recentActivities = [
    {
      icon: Package,
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
      description: "New load posted: Electronics from Delhi to Mumbai",
      timestamp: "2h ago"
    },
    {
      icon: Truck,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
      description: "Truck hired for textile shipment",
      timestamp: "4h ago"
    },
    {
      icon: Users,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
      description: "New corporate client signed up",
      timestamp: "6h ago"
    },
    {
      icon: FileText,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
      description: "Commission payout processed",
      timestamp: "1d ago"
    },
    {
      icon: Mail,
      iconColor: "text-red-500",
      bgColor: "bg-red-50",
      description: "Urgent: Respond to new inquiry",
      timestamp: "2d ago"
    }
  ];

  const brokerMetrics = [
    {
      title: "Loads Posted",
      value: "45",
      subtitle: "This Month",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      pillColor: "bg-blue-100 text-blue-800"
    },
    {
      title: "Trucks Hired",
      value: "28",
      subtitle: "This Month",
      icon: Truck,
      color: "text-green-600",
      bgColor: "bg-green-50",
      pillColor: "bg-green-100 text-green-800"
    },
    {
      title: "Avg. Commission",
      value: "₹12,500",
      subtitle: "Per Transaction",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      pillColor: "bg-purple-100 text-purple-800"
    },
    {
      title: "Client Rating",
      value: "4.8",
      subtitle: "Out of 5",
      icon: Phone,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      pillColor: "bg-orange-100 text-orange-800"
    }
  ];

  const handleActionClick = (route: string) => {
    navigate(route);
  };

  return (
    <DashboardLayout
      userRole="broker"
      userName="Freight Broker"
      userId="BR123456"
      isVerified={true}
    >
      <div className="space-y-8">
        {/* Broker Metrics - KPI Band */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brokerMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className={`absolute top-0 right-0 w-16 h-16 ${metric.bgColor} rounded-bl-3xl opacity-20`}></div>
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon className={`w-5 h-5 ${metric.color}`} />
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${metric.pillColor}`}>
                          {metric.subtitle}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Quick Actions - 3 columns on desktop */}
          <div className="xl:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Card key={index} className={`bg-white rounded-xl shadow-sm border ${action.borderColor} ${action.hoverBg} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-start justify-between">
                          <div className={`w-12 h-12 ${action.bgColor} rounded-xl flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 ${action.iconColor}`} />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg mb-2">{action.title}</h3>
                          <p className="text-sm text-gray-600 mb-4 leading-relaxed">{action.description}</p>
                          <Button
                            onClick={() => handleActionClick(action.route)}
                            className={`w-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${action.buttonStyle}`}
                            style={{ borderRadius: '12px', padding: '12px' }}
                          >
                            {action.buttonText}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recent Activity Feed - 1 column on desktop */}
          <div className="xl:col-span-1">
            <Card className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {recentActivities.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4 p-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-25 transition-colors duration-200">
                        <div className={`w-10 h-10 ${activity.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${activity.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 leading-relaxed mb-1">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.timestamp}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                  <Button
                    variant="outline"
                    className="w-full text-sm font-semibold text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                    onClick={() => navigate('/fleet-support')}
                  >
                    Contact Support →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BrokerDashboard;
