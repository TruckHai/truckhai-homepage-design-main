
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Camera, CheckCircle, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface FleetPANStepProps {
  data: {
    number: string;
    name: string;
    dob: string;
    image: File | null;
    verified: boolean;
  };
  onNext: (data: any) => void;
  onBack: () => void;
}

const FleetPANStep = ({ data, onNext, onBack }: FleetPANStepProps) => {
  const [formData, setFormData] = useState(data);
  const [isVerifying, setIsVerifying] = useState(false);
  const [nameMatch, setNameMatch] = useState<boolean | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Simulate OCR extraction
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          number: 'ABCDE1234F',
          name: 'RAJESH KUMAR',
          dob: '15/08/1985'
        }));
        // Check name match with Aadhaar
        setNameMatch(true);
      }, 1000);
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate Income Tax API verification
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
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">PAN Verification</h2>
          <p className="text-gray-600">Validate your business identity via PAN</p>
        </div>

        <div className="space-y-6">
          {/* Upload Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Upload PAN Card</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {formData.image ? (
                <div className="space-y-4">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                  <p className="text-sm text-gray-600">PAN card uploaded successfully</p>
                  <p className="text-xs text-gray-500">{formData.image.name}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Upload your PAN card</p>
                    <p className="text-xs text-gray-500 mb-4">Ensure clear photo, no glare</p>
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
          </div>

          {/* Extracted Details */}
          {formData.image && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Extracted Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="panNumber">PAN Number</Label>
                  <Input
                    id="panNumber"
                    value={formData.number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="panName">Name on PAN</Label>
                  <div className="relative">
                    <Input
                      id="panName"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-1"
                    />
                    {nameMatch !== null && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {nameMatch ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {nameMatch !== null && (
                    <p className={`text-xs mt-1 ${nameMatch ? 'text-green-600' : 'text-red-600'}`}>
                      {nameMatch ? '✅ Name matches with Aadhaar' : '⚠️ Name does not match with Aadhaar'}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="panDob">Date of Birth</Label>
                  <Input
                    id="panDob"
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Verification Button */}
              <div className="mt-6">
                {formData.verified ? (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    PAN Verified ✅
                  </Badge>
                ) : (
                  <Button
                    onClick={handleVerify}
                    disabled={isVerifying || !nameMatch}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify with Income Tax API'}
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

export default FleetPANStep;
