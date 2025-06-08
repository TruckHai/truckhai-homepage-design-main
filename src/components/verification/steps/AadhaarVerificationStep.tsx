
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, Camera, Shield, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

interface AadhaarVerificationStepProps {
  onNext: () => void;
  onBack: () => void;
}

const AadhaarVerificationStep = ({ onNext, onBack }: AadhaarVerificationStepProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState({
    name: '',
    address: '',
    aadhaarNumber: ''
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        // Simulate OCR extraction
        setTimeout(() => {
          setExtractedData({
            name: 'Amit Kumar Sharma',
            address: '123, MG Road, Pune, Maharashtra - 411001',
            aadhaarNumber: '1234 5678 9012'
          });
          handleVerification();
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerification = () => {
    setIsVerifying(true);
    // Simulate UIDAI API verification
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 2000);
  };

  const handleRetry = () => {
    setShowFallback(true);
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
          <p className="text-gray-600">Upload a clear image of your Aadhaar card front side</p>
        </div>

        {/* Upload Area */}
        {!uploadedImage ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6">
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-gray-600" />
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-gray-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Upload Aadhaar Card</h3>
                <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
              </div>
              <div className="flex justify-center space-x-3">
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
                <Button variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="border rounded-xl p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Uploaded Document</h3>
                {isVerified && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <img src={uploadedImage} alt="Aadhaar" className="w-full h-48 object-cover rounded-lg" />
            </div>

            {/* Extracted Data Form */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Extracted Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={extractedData.name}
                    onChange={(e) => setExtractedData({...extractedData, name: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={extractedData.address}
                    onChange={(e) => setExtractedData({...extractedData, address: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="aadhaar">Aadhaar Number</Label>
                  <Input
                    id="aadhaar"
                    value={extractedData.aadhaarNumber}
                    onChange={(e) => setExtractedData({...extractedData, aadhaarNumber: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                {isVerifying ? (
                  <>
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-700">Verifying with UIDAI...</span>
                  </>
                ) : isVerified ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-700 font-medium">Aadhaar Verified ✅</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-sm text-red-700">Verification Failed</span>
                  </>
                )}
              </div>
            </div>

            {/* Fallback Option */}
            {showFallback && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Having trouble with Aadhaar?</h4>
                    <p className="text-sm text-yellow-700 mt-1">You can proceed with alternative documents</p>
                    <Button size="sm" variant="outline" className="mt-3">
                      Try Another Document
                    </Button>
                  </div>
                </div>
              </div>
            )}
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

export default AadhaarVerificationStep;
