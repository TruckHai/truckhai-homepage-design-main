
import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, Truck, Bell, Shield, CreditCard, MapPin, Settings, Save } from 'lucide-react';

const FleetSettingsPage = () => {
  const [notifications, setNotifications] = useState({
    loadAlerts: true,
    paymentReminders: true,
    maintenanceAlerts: true,
    bidUpdates: false
  });

  const [autoBidSettings, setAutoBidSettings] = useState({
    enabled: false,
    maxBidAmount: 50000,
    preferredRoutes: ['DEL-MUM', 'BLR-CHN'],
    autoAcceptThreshold: 80
  });

  const settingSections = [
    {
      id: 'profile',
      title: 'Fleet Profile',
      icon: User,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="ABC Logistics Pvt Ltd" />
            </div>
            <div>
              <Label htmlFor="contact-person">Contact Person</Label>
              <Input id="contact-person" defaultValue="Rajesh Kumar" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+91 98765 43210" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" defaultValue="rajesh@abclogistics.com" />
            </div>
          </div>
          <div>
            <Label htmlFor="address">Business Address</Label>
            <Textarea id="address" defaultValue="123, Transport Nagar, New Delhi - 110001" />
          </div>
        </div>
      )
    },
    {
      id: 'fleet',
      title: 'Fleet Configuration',
      icon: Truck,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">Total Fleet Size</h4>
              <p className="text-sm text-gray-600">35 vehicles registered</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="default-rate">Default Rate per KM (₹)</Label>
              <Input id="default-rate" defaultValue="25" type="number" />
            </div>
            <div>
              <Label htmlFor="fuel-surcharge">Fuel Surcharge (%)</Label>
              <Input id="fuel-surcharge" defaultValue="8" type="number" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="maintenance-mode" />
            <Label htmlFor="maintenance-mode">Enable predictive maintenance alerts</Label>
          </div>
        </div>
      )
    },
    {
      id: 'notifications',
      title: 'Notification Preferences',
      icon: Bell,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="load-alerts">New Load Alerts</Label>
              <Switch 
                id="load-alerts" 
                checked={notifications.loadAlerts}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, loadAlerts: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="payment-reminders">Payment Reminders</Label>
              <Switch 
                id="payment-reminders" 
                checked={notifications.paymentReminders}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, paymentReminders: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-alerts">Maintenance Alerts</Label>
              <Switch 
                id="maintenance-alerts" 
                checked={notifications.maintenanceAlerts}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, maintenanceAlerts: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="bid-updates">Bid Updates</Label>
              <Switch 
                id="bid-updates" 
                checked={notifications.bidUpdates}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, bidUpdates: checked }))}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'auto-bid',
      title: 'Auto-Bid Settings',
      icon: Settings,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h4 className="font-medium">Auto-Bid Status</h4>
              <p className="text-sm text-gray-600">Automatically bid on suitable loads</p>
            </div>
            <Switch 
              checked={autoBidSettings.enabled}
              onCheckedChange={(checked) => setAutoBidSettings(prev => ({ ...prev, enabled: checked }))}
            />
          </div>
          {autoBidSettings.enabled && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="max-bid">Maximum Bid Amount (₹)</Label>
                <Input 
                  id="max-bid" 
                  type="number" 
                  value={autoBidSettings.maxBidAmount}
                  onChange={(e) => setAutoBidSettings(prev => ({ ...prev, maxBidAmount: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="auto-accept">Auto-Accept Threshold (%)</Label>
                <Input 
                  id="auto-accept" 
                  type="number" 
                  value={autoBidSettings.autoAcceptThreshold}
                  onChange={(e) => setAutoBidSettings(prev => ({ ...prev, autoAcceptThreshold: parseInt(e.target.value) }))}
                />
                <p className="text-xs text-gray-500 mt-1">Automatically accept loads above this profit margin</p>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'payment',
      title: 'Payment & Billing',
      icon: CreditCard,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bank-name">Bank Name</Label>
              <Input id="bank-name" defaultValue="State Bank of India" />
            </div>
            <div>
              <Label htmlFor="account-number">Account Number</Label>
              <Input id="account-number" defaultValue="••••••••••5678" type="password" />
            </div>
            <div>
              <Label htmlFor="ifsc">IFSC Code</Label>
              <Input id="ifsc" defaultValue="SBIN0001234" />
            </div>
            <div>
              <Label htmlFor="gst">GST Number</Label>
              <Input id="gst" defaultValue="07AABCU9603R1ZX" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="auto-payment" />
            <Label htmlFor="auto-payment">Enable automatic payment processing</Label>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Privacy Settings
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50">
              Delete Account
            </Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <DashboardLayout 
      userRole="fleet" 
      userName="Fleet Owner" 
      userId="FO123456" 
      isVerified={true}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fleet Settings</h1>
            <p className="text-gray-600 mt-1">Manage your fleet preferences and configuration</p>
          </div>
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {settingSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.id} className="bg-white shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon className="w-5 h-5 text-red-600" />
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {section.content}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FleetSettingsPage;
