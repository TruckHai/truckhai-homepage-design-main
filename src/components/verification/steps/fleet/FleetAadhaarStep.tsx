
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, Upload, Camera, CheckCircle, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface FleetAadhaarStepProps {
  data: {
    number: string;
    name: string;
    dob: string;
    address: string;
    image: File | null;
    verified: boolean;
  };
  onNext: (data: any) => void;
  onBack: () => void;
}

const FleetAadhaarStep = ({ data, onNext, onBack }: FleetAadhaarStepProps) => {
  const [formData, setFormData] = useState(data);
  const [isVerifying, setIsVerifying] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('File size should be less than 5MB');
        return;
      }
      setUploadError('');
      setFormData(prev => ({ ...prev, image: file }));
      
      // Simulate OCR extraction
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          number: '1234 5678 9012',
          name: 'Rajesh Kumar',
          dob: '15/08/1985',
          address: 'Mumbai, Maharashtra 400001'
        }));
      }, 1000);
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate UIDAI API verification
    setTimeout(() => {
      setFormData(prev => ({ ...prev, verified: true }));
      setIsVerifying(false);
    }, 2000);
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
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Aadhaar Verification</h2>
          <p className="text-gray-600">Verify your identity securely via Aadhaar</p>
        </div>

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Upload Aadhaar Card</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {formData.image ? (
                <div className="space-y-4">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                  <p className="text-sm text-gray-600">Aadhaar uploaded successfully</p>
                  <p className="text-xs text-gray-500">{formData.image.name}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Upload front side of your Aadhaar card</p>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button variant="outline" className="mr-2">
                        <Camera className="w-4 h-4 mr-2" />
                        Take Photo
                      </Button>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload File
                      </Button>
                    </label>
                  </div>
                </div>
              )}
            </div>
            {uploadError && (
              <div className="flex items-center space-x-2 mt-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{uploadError}</span>
              </div>
            )}
          </div>

          {/* Extracted Details */}
          {formData.image && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Extracted Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
                  <Input
                    id="aadhaarNumber"
                    value={formData.number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Verification Button */}
              <div className="mt-6">
                {formData.verified ? (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Aadhaar Verified ✅
                  </Badge>
                ) : (
                  <Button
                    onClick={handleVerify}
                    disabled={isVerifying}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify with UIDAI'}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={!formData.verified}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FleetAadhaarStep;
