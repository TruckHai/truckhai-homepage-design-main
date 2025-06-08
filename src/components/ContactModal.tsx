
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Send, User, Building } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Here you would typically send the data to your backend
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-0 shadow-2xl">
        <DialogHeader className="text-center pb-6 border-b border-gray-100">
          <DialogTitle 
            className="text-3xl font-bold text-[#1A1A1A] mb-2"
            style={{ fontFamily: 'SF Pro Rounded, system-ui, sans-serif' }}
          >
            Get in Touch
          </DialogTitle>
          <p 
            className="text-[#4A4A4A] text-lg"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Ready to revolutionize your freight operations? Let's talk.
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 
              className="text-xl font-semibold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'SF Pro Rounded, system-ui, sans-serif' }}
            >
              Contact Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#FF3B30]/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#FF3B30]" />
                </div>
                <div>
                  <p className="font-medium text-[#1A1A1A]">Phone</p>
                  <p className="text-[#4A4A4A]">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#FF3B30]/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#FF3B30]" />
                </div>
                <div>
                  <p className="font-medium text-[#1A1A1A]">Email</p>
                  <p className="text-[#4A4A4A]">contact@truckhai.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#FF3B30]/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#FF3B30]" />
                </div>
                <div>
                  <p className="font-medium text-[#1A1A1A]">Address</p>
                  <p className="text-[#4A4A4A]">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-[#FF3B30]/5 to-[#FF3B30]/10 rounded-2xl">
              <h4 className="font-semibold text-[#1A1A1A] mb-2">Why Choose TruckHai?</h4>
              <ul className="text-sm text-[#4A4A4A] space-y-1">
                <li>• 24/7 Customer Support</li>
                <li>• Verified Fleet Network</li>
                <li>• Real-time Tracking</li>
                <li>• Competitive Pricing</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#1A1A1A] font-medium">
                  Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-[#4A4A4A]" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 border-gray-200 focus:border-[#FF3B30] focus:ring-[#FF3B30] rounded-lg"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#1A1A1A] font-medium">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-[#4A4A4A]" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 border-gray-200 focus:border-[#FF3B30] focus:ring-[#FF3B30] rounded-lg"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-[#1A1A1A] font-medium">
                  Company Name
                </Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 w-4 h-4 text-[#4A4A4A]" />
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="pl-10 border-gray-200 focus:border-[#FF3B30] focus:ring-[#FF3B30] rounded-lg"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#1A1A1A] font-medium">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-[#4A4A4A]" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10 border-gray-200 focus:border-[#FF3B30] focus:ring-[#FF3B30] rounded-lg"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-[#1A1A1A] font-medium">
                Subject *
              </Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="border-gray-200 focus:border-[#FF3B30] focus:ring-[#FF3B30] rounded-lg"
                placeholder="What can we help you with?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-[#1A1A1A] font-medium">
                Message *
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="border-gray-200 focus:border-[#FF3B30] focus:ring-[#FF3B30] rounded-lg resize-none"
                placeholder="Tell us more about your freight requirements..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FF3B30] hover:bg-[#E0362A] text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
