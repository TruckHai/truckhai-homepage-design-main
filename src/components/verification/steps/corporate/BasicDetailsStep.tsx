
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Building2, User, MapPin, Phone, CheckCircle, ArrowRight } from 'lucide-react';

interface BasicDetailsStepProps {
  data: {
    companyName: string;
    gstin: string;
    primaryContact: string;
    branchLocation: string;
    authorizedPerson: string;
    designation: string;
  };
  onNext: (data: any) => void;
}

const BasicDetailsStep = ({ data, onNext }: BasicDetailsStepProps) => {
  const [formData, setFormData] = useState(data);
  const [isVerified, setIsVerified] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVerifyGST = () => {
    // Simulate GST verification
    setTimeout(() => {
      setIsVerified(true);
    }, 1500);
  };

  const handleNext = () => {
    onNext(formData);
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Basic Details</h2>
          <p className="text-gray-600">Please verify and update your company information</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Company Details */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-blue-600" />
              Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="gstin">GSTIN</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input
                    id="gstin"
                    value={formData.gstin}
                    onChange={(e) => handleInputChange('gstin', e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleVerifyGST}
                    disabled={isVerified}
                  >
                    {isVerified ? <CheckCircle className="w-4 h-4 text-green-500" /> : 'Verify'}
                  </Button>
                </div>
                {isVerified && (
                  <Badge className="bg-green-100 text-green-800 mt-1">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    GST Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-blue-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primaryContact">Primary Contact</Label>
                <Input
                  id="primaryContact"
                  value={formData.primaryContact}
                  onChange={(e) => handleInputChange('primaryContact', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="branchLocation">Branch Location</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <Input
                    id="branchLocation"
                    value={formData.branchLocation}
                    onChange={(e) => handleInputChange('branchLocation', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Authorized Person */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Authorized Representative
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="authorizedPerson">Full Name</Label>
                <Input
                  id="authorizedPerson"
                  value={formData.authorizedPerson}
                  onChange={(e) => handleInputChange('authorizedPerson', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-8">
          <Button onClick={handleNext} className="bg-red-500 hover:bg-red-600 text-white px-8">
            Confirm & Proceed
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsStep;
