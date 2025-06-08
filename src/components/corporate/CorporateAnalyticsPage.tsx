
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Clock, Trophy, BarChart3, Download } from "lucide-react";
import DashboardLayout from '../DashboardLayout';

const CorporateAnalyticsPage = () => {
  const keyMetrics = [
    {
      title: "Total Spend This Month",
      value: "₹ 12,45,000",
      subtext: "Budget: ₹ 15,00,000",
      icon: DollarSign,
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      title: "On-Time Delivery %",
      value: "98.2%",
      subtext: "Across all shipments",
      icon: Clock,
      bgColor: "bg-blue-100", 
      iconColor: "text-blue-600"
    },
    {
      title: "Cost Savings vs Market",
      value: "22%",
      subtext: "Compared to standard rates",
      icon: TrendingUp,
      bgColor: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      title: "Top Vendors",
      value: "ABC Logistics",
      subtext: "₹ 4,50,000 this month",
      icon: Trophy,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  const topRoutes = [
    { route: "Delhi → Mumbai", spend: "₹ 3,45,000", shipments: 12, onTime: "100%" },
    { route: "Bangalore → Chennai", spend: "₹ 2,80,000", shipments: 8, onTime: "95%" },
    { route: "Mumbai → Pune", spend: "₹ 2,15,000", shipments: 15, onTime: "98%" },
    { route: "Delhi → Kolkata", spend: "₹ 1,95,000", shipments: 6, onTime: "92%" },
    { route: "Chennai → Hyderabad", spend: "₹ 1,65,000", shipments: 9, onTime: "96%" }
  ];

  const scheduledReports = [
    { name: "Weekly Spend Summary", frequency: "Weekly", lastSent: "Dec 18, 2024 9:00 AM" },
    { name: "On-Time Delivery Report", frequency: "Monthly", lastSent: "Dec 1, 2024 8:00 AM" },
    { name: "Vendor Performance", frequency: "Monthly", lastSent: "Dec 1, 2024 8:30 AM" }
  ];

  return (
    <DashboardLayout
      userRole="corporate"
      userName="Priya Sharma"
      userId="CC12345678"
      isVerified={false}
      verificationStatus="pending"
    >
      {/* Breadcrumb */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">Dashboard &gt; Analytics & Reports</p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
          <BarChart3 className="w-8 h-8 text-red-500" />
          Analytics & Reports
        </h1>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="p-6 bg-white rounded-xl shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-sm text-gray-500">{metric.subtext}</p>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium mt-2">
                  View Details →
                </button>
              </div>
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Spend Over Time Chart */}
      <Card className="mb-8 p-6 bg-white rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Spend Over Time</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Line chart showing daily spend for current month</p>
            <p className="text-sm text-gray-400">Chart visualization would be integrated here</p>
          </div>
        </div>
      </Card>

      {/* Top Routes Table */}
      <Card className="mb-8 bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Routes by Spend</h3>
            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
              View Full Report
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Route</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Spend (₹)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900"># Shipments</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Avg On-Time %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topRoutes.map((route, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{route.route}</td>
                    <td className="px-6 py-4 text-gray-900">{route.spend}</td>
                    <td className="px-6 py-4 text-gray-900">{route.shipments}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        parseFloat(route.onTime) >= 98 ? 'bg-green-100 text-green-800' :
                        parseFloat(route.onTime) >= 95 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {route.onTime}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Scheduled Reports */}
      <Card className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Scheduled Reports</h3>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              + Create New Report
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Report Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Frequency</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Sent</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {scheduledReports.map((report, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{report.name}</td>
                    <td className="px-6 py-4 text-gray-900">{report.frequency}</td>
                    <td className="px-6 py-4 text-gray-500">{report.lastSent}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-gray-600">
                          ✏️ Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                          🗑️ Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default CorporateAnalyticsPage;
