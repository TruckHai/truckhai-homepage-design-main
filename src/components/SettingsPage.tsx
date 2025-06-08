
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Settings, User, Shield, Bell, CreditCard, Camera, Edit, Trash2, Plus } from "lucide-react";
import DashboardLayout from './DashboardLayout';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    emailNewLoad: true,
    smsNewBid: false,
    whatsappPayment: true,
    emailPromotions: false
  });

  const paymentMethods = [
    {
      id: 1,
      bankName: 'State Bank of India',
      accountNumber: '****1234',
      ifsc: 'SBIN0001234',
      accountType: 'Current'
    },
    {
      id: 2,
      bankName: 'HDFC Bank',
      accountNumber: '****5678',
      ifsc: 'HDFC0001234',
      accountType: 'Savings'
    }
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard }
  ];

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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
          Dashboard &gt; Settings
        </p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
          ⚙️ Account Settings
        </h1>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <Card className="bg-white border-0 shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-red-600">R</span>
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Rajesh Kumar</h3>
                <p className="text-gray-600 mb-2">Broker ID: BR123456</p>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                  Change Avatar
                </Button>
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <Input defaultValue="Rajesh Kumar" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <Input type="email" defaultValue="rajesh.kumar@email.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="flex">
                  <Input defaultValue="+91 98765 43210" />
                  <Button variant="outline" className="ml-2 border-red-500 text-red-500 hover:bg-red-50">
                    Verify
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <Input type="date" defaultValue="1985-06-15" />
              </div>
            </div>

            {/* Company Information */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <Input defaultValue="Kumar Logistics Pvt Ltd" disabled />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GST Number
                  </label>
                  <Input defaultValue="29ABCDE1234F1Z5" disabled />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Address
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    rows={3}
                    defaultValue="123 Business Park, Sector 18, Gurgaon, Haryana - 122001"
                    disabled
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          {/* Change Password */}
          <Card className="bg-white border-0 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password *
                </label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password *
                </label>
                <Input type="password" placeholder="Enter new password" />
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters with uppercase, lowercase, and number
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password *
                </label>
                <Input type="password" placeholder="Confirm new password" />
              </div>

              <div className="flex justify-end">
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  Save Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card className="bg-white border-0 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
                Two-Factor Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">SMS Authentication</h3>
                  <p className="text-sm text-gray-600">
                    Get security codes via SMS to your registered phone number
                  </p>
                  <Badge className="mt-2 bg-red-100 text-red-800">
                    Currently Disabled
                  </Badge>
                </div>
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <Card className="bg-white border-0 shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">New Load Posted</h3>
                  <p className="text-sm text-gray-600">Get notified when loads matching your criteria are posted</p>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={notifications.emailNewLoad}
                      onChange={() => handleNotificationToggle('emailNewLoad')}
                      className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm">Email</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">New Bid Received</h3>
                  <p className="text-sm text-gray-600">Get notified when carriers bid on your loads</p>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={notifications.smsNewBid}
                      onChange={() => handleNotificationToggle('smsNewBid')}
                      className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm">SMS</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Payment Status Updates</h3>
                  <p className="text-sm text-gray-600">Get notified about commission payments and invoices</p>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={notifications.whatsappPayment}
                      onChange={() => handleNotificationToggle('whatsappPayment')}
                      className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm">WhatsApp</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Promotional Offers</h3>
                  <p className="text-sm text-gray-600">Receive updates about new features and special offers</p>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={notifications.emailPromotions}
                      onChange={() => handleNotificationToggle('emailPromotions')}
                      className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm">Email</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'payment' && (
        <Card className="bg-white border-0 shadow-md rounded-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
                Payment Methods
              </CardTitle>
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New Account
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{method.bankName}</h3>
                      <p className="text-sm text-gray-600">
                        {method.accountType} Account: {method.accountNumber}
                      </p>
                      <p className="text-xs text-gray-500">IFSC: {method.ifsc}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default SettingsPage;
