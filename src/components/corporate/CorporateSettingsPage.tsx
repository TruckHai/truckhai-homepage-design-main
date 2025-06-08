
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Eye, EyeOff, Shield, Bell, CreditCard, Building, Key } from "lucide-react";
import DashboardLayout from '../DashboardLayout';

const CorporateSettingsPage = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'payment' | 'company' | 'api'>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: Camera },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'company', label: 'Company Details', icon: Building },
    { id: 'api', label: 'API Credentials', icon: Key },
  ];

  const notificationSettings = [
    { id: 'newLoadMatch', label: 'New Load Match Alerts', email: true, sms: true, whatsapp: false },
    { id: 'insuranceExpiry', label: 'Insurance Expiry Alerts', email: true, sms: false, whatsapp: false },
    { id: 'paymentStatus', label: 'Payment Status Updates', email: true, sms: true, whatsapp: false },
    { id: 'weeklySpend', label: 'Weekly Spend Summary', email: true, sms: false, whatsapp: false },
    { id: 'systemAnnouncements', label: 'System Announcements', email: true, sms: false, whatsapp: false },
    { id: 'securityAlerts', label: 'Security Alerts', email: true, sms: false, whatsapp: false },
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
        <p className="text-sm text-gray-600">Dashboard &gt; Settings</p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
          ⚙️ Account Settings
        </h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'outline'}
            onClick={() => setActiveTab(tab.id as any)}
            className={`${
              activeTab === tab.id 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <Card className="p-6 bg-white rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
          
          {/* Avatar Section */}
          <div className="flex items-center mb-6">
            <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-4xl font-bold">
              P
            </div>
            <div className="ml-6">
              <Button variant="outline" className="text-gray-600">
                <Camera className="w-4 h-4 mr-2" />
                Change Avatar
              </Button>
              <p className="text-sm text-gray-500 mt-1">JPEG or PNG, max 2MB</p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                defaultValue="Priya Sharma"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                defaultValue="priya.sharma@techsolutions.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <div className="flex space-x-2">
                <input
                  type="tel"
                  defaultValue="+91-9876543210"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                  Verify
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer ID
              </label>
              <input
                type="text"
                value="CC12345678"
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
          </div>

          {/* Company Information (Read-only) */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-md font-semibold text-gray-900 mb-4">Company Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value="Tech Solutions India Pvt Ltd"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GST Number
                </label>
                <input
                  type="text"
                  value="29ABCDE1234F1Z5"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Save Changes
            </Button>
            <Button variant="outline" className="text-gray-600">
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {activeTab === 'security' && (
        <div className="space-y-6">
          {/* Change Password */}
          <Card className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password *
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <div className="mt-1 text-sm text-green-600">Strong</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white">
              Save Password
            </Button>
          </Card>

          {/* Two-Factor Authentication */}
          <Card className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Two-Factor Authentication (2FA)</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">2FA Status:</p>
                <p className="text-sm text-gray-600">
                  {twoFactorEnabled ? 'Two-factor authentication is enabled' : 'Two-factor authentication is disabled'}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                  {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </Badge>
                <Button
                  variant={twoFactorEnabled ? 'outline' : 'default'}
                  className={twoFactorEnabled ? 'border-red-300 text-red-600 hover:bg-red-50' : 'bg-red-500 hover:bg-red-600 text-white'}
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                >
                  {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'notifications' && (
        <Card className="p-6 bg-white rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
          
          <div className="space-y-6">
            {notificationSettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{setting.label}</p>
                </div>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={setting.email}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={setting.sms}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">SMS</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={setting.whatsapp}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">WhatsApp</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <Button className="mt-6 bg-red-500 hover:bg-red-600 text-white">
            Save Preferences
          </Button>
        </Card>
      )}

      {activeTab === 'payment' && (
        <Card className="p-6 bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Add New Payment Method
            </Button>
          </div>

          <div className="space-y-4">
            <Card className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">HDFC Bank</p>
                  <p className="text-sm text-gray-600">Account: ****1234 | IFSC: HDFC0001234</p>
                  <p className="text-sm text-gray-500">Current Account</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="text-gray-600">
                    ✏️ Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                    🗑️ Remove
                  </Button>
                </div>
              </div>
            </Card>

            <div className="text-center py-8 text-gray-500">
              <p>📭 No additional payment methods added yet.</p>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'company' && (
        <Card className="p-6 bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Company Details</h3>
            <Badge className="bg-green-100 text-green-800">
              Verified ✅
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value="Tech Solutions India Pvt Ltd"
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GST Number *
              </label>
              <input
                type="text"
                value="29ABCDE1234F1Z5"
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registered Address *
              </label>
              <textarea
                value="Electronic City, Bangalore, Karnataka - 560100"
                disabled
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type *
              </label>
              <select 
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              >
                <option>MNC</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry Sector *
              </label>
              <select 
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              >
                <option>IT</option>
              </select>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Company details are verified and cannot be modified. Contact support if changes are needed.
          </p>
        </Card>
      )}

      {activeTab === 'api' && (
        <Card className="p-6 bg-white rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">API Credentials</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 pr-6 font-medium text-gray-900">API Key</td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <code className="px-2 py-1 bg-gray-100 rounded text-sm">tk_**********************</code>
                      <Button size="sm" variant="outline" className="text-gray-600">
                        Show
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 pr-6 font-medium text-gray-900">Secret Key</td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <code className="px-2 py-1 bg-gray-100 rounded text-sm">**********************</code>
                      <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                        Regenerate
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 pr-6 font-medium text-gray-900">Webhook URL</td>
                  <td className="py-4">
                    <input
                      type="text"
                      placeholder="https://your-domain.com/webhook"
                      className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">API Permissions</h4>
            <div className="space-y-2">
              {['Read Loads', 'Read Trucks', 'Place Orders', 'Update Status'].map((permission) => (
                <label key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{permission}</span>
                </label>
              ))}
            </div>
          </div>

          <Button className="mt-6 bg-red-500 hover:bg-red-600 text-white">
            Save Permissions
          </Button>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default CorporateSettingsPage;
