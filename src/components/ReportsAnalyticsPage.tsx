
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, TrendingUp, Users, Target, Award } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import DashboardLayout from './DashboardLayout';

const ReportsAnalyticsPage = () => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const monthlyLoadData = [
    { month: 'Jan', loads: 32 },
    { month: 'Feb', loads: 45 },
    { month: 'Mar', loads: 38 },
    { month: 'Apr', loads: 52 },
    { month: 'May', loads: 41 },
    { month: 'Jun', loads: 47 }
  ];

  const earningsData = [
    { month: 'Jan', earnings: 180000, commissions: 25000 },
    { month: 'Feb', earnings: 220000, commissions: 32000 },
    { month: 'Mar', earnings: 195000, commissions: 28000 },
    { month: 'Apr', earnings: 245000, commissions: 38000 },
    { month: 'May', earnings: 210000, commissions: 31000 },
    { month: 'Jun', earnings: 235000, commissions: 35000 }
  ];

  const topCarriers = [
    { name: 'Rajesh Transport', loads: 28, onTime: 94, rating: 4.8 },
    { name: 'Kumar Logistics', loads: 24, onTime: 89, rating: 4.6 },
    { name: 'Singh Transport', loads: 22, onTime: 92, rating: 4.7 },
    { name: 'Sharma Freight', loads: 19, onTime: 87, rating: 4.5 },
    { name: 'Gupta Carriers', loads: 17, onTime: 91, rating: 4.6 }
  ];

  return (
    <DashboardLayout
      userRole="broker"
      userName="Rajesh Kumar"
      userId="BR123456"
      isVerified={false}
      verificationStatus="not-started"
    >
      {/* Breadcrumb */}
      <div className="mb-6">
        <p className="text-sm text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Dashboard &gt; Reports &amp; Analytics
        </p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
          📊 Reports &amp; Analytics
        </h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-md rounded-xl">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-red-500" />
              </div>
              <div className="text-3xl font-bold text-red-500 mb-1" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
                45
              </div>
              <div className="text-sm font-medium text-gray-700">Total Loads Posted</div>
              <div className="text-xs text-gray-500">This Month</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-md rounded-xl">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-green-500 mb-1" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
                88%
              </div>
              <div className="text-sm font-medium text-gray-700">On-Time Delivery</div>
              <div className="text-xs text-gray-500">Industry Avg: 82%</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-md rounded-xl">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-blue-500 mb-1" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
                ₹5,444
              </div>
              <div className="text-sm font-medium text-gray-700">Avg Commission</div>
              <div className="text-xs text-gray-500">Per Load</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-md rounded-xl">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-purple-500 mb-1" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
                65%
              </div>
              <div className="text-sm font-medium text-gray-700">Repeat Carrier Rate</div>
              <div className="text-xs text-gray-500">Quality Metric</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Date Range Picker */}
      <Card className="bg-white border-0 shadow-md rounded-xl mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-50">
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Load Volume */}
        <Card className="bg-white border-0 shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
              Monthly Load Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyLoadData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="loads" stroke="#FF3B30" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Earnings & Commissions Trend */}
        <Card className="bg-white border-0 shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
              Earnings &amp; Commissions Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="earnings" fill="#4F46E5" />
                <Bar dataKey="commissions" fill="#FF3B30" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Carriers Table */}
      <Card className="bg-white border-0 shadow-md rounded-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
              Top 10 Carriers This Quarter
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Carrier Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700"># Loads Completed</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">On-Time %</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Performance</th>
                </tr>
              </thead>
              <tbody>
                {topCarriers.map((carrier, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-red-600">
                            {carrier.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{carrier.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{carrier.loads}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${carrier.onTime}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{carrier.onTime}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-900">{carrier.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        carrier.onTime >= 90 
                          ? 'bg-green-100 text-green-800'
                          : carrier.onTime >= 85
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {carrier.onTime >= 90 ? 'Excellent' : carrier.onTime >= 85 ? 'Good' : 'Needs Improvement'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ReportsAnalyticsPage;
