
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, CreditCard, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, FileText } from 'lucide-react';

interface PANVerificationStepProps {
  onNext: () => void;
  onBack: () => void;
}

const PANVerificationStep = ({ onNext, onBack }: PANVerificationStepProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState({
    panNumber: '',
    name: '',
    dateOfBirth: ''
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [nameMatched, setNameMatched] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        // Simulate OCR extraction
        setTimeout(() => {
          setExtractedData({
            panNumber: 'ABCDE1234F',
            name: 'AMIT KUMAR SHARMA',
            dateOfBirth: '15/08/1985'
          });
          handleVerification();
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerification = () => {
    setIsVerifying(true);
    // Simulate Income Tax API verification
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      setNameMatched(true);
    }, 2000);
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">PAN Verification</h2>
          <p className="text-gray-600">Upload a clear image of your PAN card</p>
          <p className="text-xs text-gray-500 mt-2">💡 Ensure clear photo, no glare</p>
        </div>

        {/* Upload Area */}
        {!uploadedImage ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6">
            <div className="space-y-4">
              <FileText className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Upload PAN Card</h3>
                <p className="text-sm text-gray-600">Clear photo without glare or shadows</p>
              </div>
              <Button variant="outline" className="relative">
                <Upload className="w-4 h-4 mr-2" />
                Choose File
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="border rounded-xl p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">PAN Card</h3>
                {isVerified && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <img src={uploadedImage} alt="PAN Card" className="w-full h-48 object-cover rounded-lg" />
            </div>

            {/* Extracted Data Form */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Extracted Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="pan">PAN Number</Label>
                  <Input
                    id="pan"
                    value={extractedData.panNumber}
                    onChange={(e) => setExtractedData({...extractedData, panNumber: e.target.value})}
                    className="mt-1 font-mono"
                  />
                </div>
                <div>
                  <Label htmlFor="panName">Name (as per PAN)</Label>
                  <Input
                    id="panName"
                    value={extractedData.name}
                    onChange={(e) => setExtractedData({...extractedData, name: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    value={extractedData.dateOfBirth}
                    onChange={(e) => setExtractedData({...extractedData, dateOfBirth: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  {isVerifying ? (
                    <>
                      <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm text-gray-700">Verifying with Income Tax Department...</span>
                    </>
                  ) : isVerified ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-green-700 font-medium">PAN Verified ✅</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <span className="text-sm text-red-700">Verification Failed</span>
                    </>
                  )}
                </div>
              </div>

              {/* Name Matching */}
              {isVerified && (
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <span className="text-sm text-green-700 font-medium">Name matched with Aadhaar ✅</span>
                      <p className="text-xs text-green-600 mt-1">Cross-verification successful</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={onNext} 
            disabled={!isVerified}
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

export default PANVerificationStep;
