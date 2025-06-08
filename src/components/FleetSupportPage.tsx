
import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Search, FileText, Wrench, CreditCard, Phone, Mail, Clock, Headphones, LifeBuoy, Users, Zap, CheckCircle } from "lucide-react";

const FleetSupportPage = () => {
  const { toast } = useToast();
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmitTicket = () => {
    toast({
      title: "Ticket Created Successfully",
      description: "✅ Support ticket #TKT12345 has been created. Our team will respond within 2 hours.",
    });
    setShowTicketForm(false);
  };

  const supportOptions = [
    {
      title: "Live Chat Support",
      description: "Get instant help from our support agents",
      icon: MessageCircle,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      borderColor: "border-red-200",
      buttonText: "Start Chat Now",
      buttonStyle: "bg-red-500 hover:bg-red-600 text-white",
      badge: "Available 24/7"
    },
    {
      title: "Expert Consultation",
      description: "Schedule a call with our fleet specialists",
      icon: Headphones,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
      buttonText: "Book Call",
      buttonStyle: "bg-blue-500 hover:bg-blue-600 text-white",
      badge: "Premium Support"
    },
    {
      title: "Technical Assistance",
      description: "Get help with GPS, app issues, and integrations",
      icon: Wrench,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
      buttonText: "Get Tech Help",
      buttonStyle: "bg-purple-500 hover:bg-purple-600 text-white",
      badge: "Quick Resolution"
    },
    {
      title: "Account & Billing",
      description: "Questions about payments, invoices, and billing",
      icon: CreditCard,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
      buttonText: "Billing Support",
      buttonStyle: "bg-green-500 hover:bg-green-600 text-white",
      badge: "Secure & Fast"
    }
  ];

  const quickHelpTopics = [
    {
      title: "Getting Started Guide",
      description: "Complete setup walkthrough for new fleet owners",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "GPS Tracking Setup",
      description: "Step-by-step guide to enable live tracking",
      icon: Zap,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Payment & Commission FAQ",
      description: "Understanding billing cycles and commission structure",
      icon: CreditCard,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Mobile App Troubleshooting",
      description: "Common app issues and quick fixes",
      icon: Wrench,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Fleet Registration Process",
      description: "How to add and verify your vehicles",
      icon: CheckCircle,
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    },
    {
      title: "Enterprise Integration",
      description: "API access and bulk operations guide",
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      value: "1800-LOGISTICS",
      subtitle: "Toll-free number",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Mail,
      title: "Email Support",
      value: "support@truckhai.com",
      subtitle: "Response within 2 hours",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Clock,
      title: "Support Hours",
      value: "24/7 Available",
      subtitle: "Round-the-clock assistance",
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <DashboardLayout 
      userRole="fleet" 
      userName="Fleet Owner" 
      userId="FO123456" 
      isVerified={true}
    >
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">24/7 Fleet Support Center</h1>
            <p className="text-lg text-gray-600">Get instant help, expert guidance, and comprehensive support</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">Support Online</span>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Search className="w-6 h-6 text-red-600" />
              <div className="flex-1">
                <Input
                  placeholder="Search help articles, FAQs, or describe your issue..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0 bg-white shadow-sm text-lg"
                />
              </div>
              <Button className="bg-red-500 hover:bg-red-600 text-white px-8">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support Options Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Support Option</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Card key={index} className={`relative overflow-hidden border ${option.borderColor} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                  <CardContent className="p-6">
                    <div className="absolute top-4 right-4">
                      <span className="text-xs font-semibold px-2 py-1 bg-white rounded-full text-gray-600 shadow-sm">
                        {option.badge}
                      </span>
                    </div>
                    <div className={`w-12 h-12 ${option.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${option.iconColor}`} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{option.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{option.description}</p>
                    <Button className={`w-full ${option.buttonStyle} font-semibold`}>
                      {option.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Help Topics */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Help Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickHelpTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 ${topic.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-5 h-5 ${topic.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">{topic.title}</h3>
                        <p className="text-sm text-gray-600">{topic.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contact Information */}
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className={`w-16 h-16 ${contact.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 ${contact.color}`} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{contact.title}</h3>
                    <p className="font-semibold text-lg text-gray-800 mb-1">{contact.value}</p>
                    <p className="text-sm text-gray-600">{contact.subtitle}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Create Support Ticket */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2">
              <LifeBuoy className="w-6 h-6 text-red-600" />
              <span>Need Detailed Assistance?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">Create a support ticket for complex issues that need detailed investigation</p>
                <p className="text-sm text-gray-500">Our technical team will respond within 2 hours with a comprehensive solution</p>
              </div>
              <Button 
                onClick={() => setShowTicketForm(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3"
              >
                Create Support Ticket
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support Ticket Modal */}
        {showTicketForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Create Support Ticket</CardTitle>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowTicketForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">Priority Level *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - General inquiry</SelectItem>
                        <SelectItem value="medium">Medium - Standard issue</SelectItem>
                        <SelectItem value="high">High - Urgent problem</SelectItem>
                        <SelectItem value="critical">Critical - System down</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing & Payments</SelectItem>
                        <SelectItem value="account">Account Management</SelectItem>
                        <SelectItem value="gps">GPS & Tracking</SelectItem>
                        <SelectItem value="app">Mobile App Issues</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" placeholder="Brief description of your issue" />
                </div>
                
                <div>
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Please provide a detailed description of your issue, including any error messages and steps you've already tried..."
                    rows={6}
                  />
                </div>
                
                <div>
                  <Label htmlFor="attachment">Attach Files (Optional)</Label>
                  <Input id="attachment" type="file" multiple />
                  <p className="text-xs text-gray-500 mt-1">You can attach screenshots, error logs, or any relevant files</p>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowTicketForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitTicket} className="bg-red-500 hover:bg-red-600 text-white">
                    Create Ticket
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

export default FleetSupportPage;
