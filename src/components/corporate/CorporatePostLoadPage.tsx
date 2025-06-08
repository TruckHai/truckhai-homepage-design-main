
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from '../DashboardLayout';
import { ClipboardList, MapPin, Calendar, Truck, Shield, Save, Eye, Send } from 'lucide-react';

const CorporatePostLoadPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Load Posted Successfully",
        description: "✅ Load posted—RFQ LD-TS-2024-001",
      });
      setIsSubmitting(false);
    }, 2000);
  };

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
        <p className="text-sm text-gray-600">Dashboard &gt; Post Load</p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
          <ClipboardList className="w-8 h-8 text-red-500" />
          Post Your Load
        </h1>
      </div>

      {/* Load Posting Form */}
      <Card className="bg-white rounded-xl shadow-sm">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Load Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Load Details</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Load Reference ID</label>
                  <div className="flex space-x-2">
                    <Input placeholder="LD-TS-2024-001" className="flex-1" />
                    <Button type="button" variant="outline" size="sm">
                      <ClipboardList className="w-4 h-4 mr-2" />
                      Custom
                    </Button>
                    <Button type="button" variant="outline" size="sm">
                      Auto-generate
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Load Type*</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" name="loadType" value="full" defaultChecked className="text-red-500" />
                      <span className="flex items-center">
                        <Truck className="w-4 h-4 mr-2" />
                        FULL Load (Complete truck booking)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" name="loadType" value="part" className="text-red-500" />
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Part Load (Shared truck space)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Pickup Location*</label>
                  <div className="flex space-x-2">
                    <Input placeholder="Electronic City, Bangalore" className="flex-1" />
                    <Button type="button" variant="outline" size="sm">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Delivery Location*</label>
                  <div className="flex space-x-2">
                    <Input placeholder="Delivery location" className="flex-1" />
                    <Button type="button" variant="outline" size="sm">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button type="button" variant="link" className="text-red-600 text-sm p-0">
                    + Add multiple stops
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Pickup Date & Time*</label>
                  <div className="flex space-x-2">
                    <Input type="datetime-local" className="flex-1" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="flexible" />
                    <label htmlFor="flexible" className="text-sm text-gray-600">Flexible timing</label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Delivery Date & Time*</label>
                  <div className="flex space-x-2">
                    <Input type="datetime-local" className="flex-1" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="deadline" />
                    <label htmlFor="deadline" className="text-sm text-gray-600">Fixed deadline</label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Cargo Description*</label>
                <Textarea 
                  placeholder="IT Equipment – Servers, networking hardware" 
                  className="resize-none"
                  maxLength={200}
                />
                <p className="text-xs text-gray-500">Character limit: 200</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Weight & Dimensions</label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    <Input placeholder="Weight (kg)" />
                    <Input placeholder="Length (m)" />
                    <Input placeholder="Width (m)" />
                    <Input placeholder="Height (m)" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    Cargo Value (for insurance)
                    <Shield className="w-4 h-4 ml-2 text-gray-400" />
                  </label>
                  <Input placeholder="₹50,00,000" />
                  <p className="text-xs text-gray-500">Affects insurance premium</p>
                </div>
              </div>
            </div>

            {/* Section 2: Requirements & Commercial */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Requirements & Commercial</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Vehicle Requirements*</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="large">
                        <span className="flex items-center">
                          <Truck className="w-4 h-4 mr-2" />
                          Large Covered Truck (16+ tons)
                        </span>
                      </SelectItem>
                      <SelectItem value="medium">Medium (7.5–16T)</SelectItem>
                      <SelectItem value="small">Small (3–7.5T)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Special Requirements</label>
                  <div className="space-y-2">
                    {[
                      { id: 'gps', label: 'GPS tracking mandatory', checked: true },
                      { id: 'verified', label: 'Verified driver only', checked: true },
                      { id: 'loading', label: 'Loading assistance', checked: false },
                      { id: 'temp', label: 'Temperature controlled', checked: false },
                      { id: 'security', label: '24/7 security escort', checked: false },
                      { id: 'multiple', label: 'Multiple pickup points', checked: false }
                    ].map((req) => (
                      <div key={req.id} className="flex items-center space-x-2">
                        <Checkbox id={req.id} defaultChecked={req.checked} />
                        <label htmlFor={req.id} className="text-sm text-gray-600">{req.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Budget Range (Guide for bidders)</label>
                  <div className="flex space-x-2">
                    <Input placeholder="₹65,000" />
                    <span className="flex items-center text-gray-500">to</span>
                    <Input placeholder="₹75,000" />
                  </div>
                  <p className="text-xs text-gray-500">Market rate: ₹68,000–72,000</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Department & Cost Center</label>
                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">IT Operations</SelectItem>
                        <SelectItem value="supply">Supply Chain</SelectItem>
                        <SelectItem value="logistics">Logistics</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cost center" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cc1">CC-IT-001</SelectItem>
                        <SelectItem value="cc2">CC-SCM-002</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Contact Person for Coordination*</label>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Input placeholder="Amit Kumar" />
                  <Input placeholder="+91-9876543213" />
                  <Input placeholder="amit.kumar@techsolutions.com" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <div className="flex space-x-4">
                <Button type="button" variant="outline">
                  <Save className="w-4 h-4 mr-2" />
                  Save as Template
                </Button>
                <Button type="button" variant="secondary">
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button type="button" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-red-500 hover:bg-red-600 text-white min-w-32"
              >
                {isSubmitting ? (
                  'Posting...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Post for Bidding
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default CorporatePostLoadPage;
