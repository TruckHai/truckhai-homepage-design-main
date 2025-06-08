
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, CheckCircle, Upload, AlertCircle, ArrowLeft, ArrowRight, Eye } from 'lucide-react';

interface FleetSelfieStepProps {
  data: {
    image: File | null;
    verified: boolean;
    liveness: boolean;
  };
  onNext: (data: any) => void;
  onBack: () => void;
}

const FleetSelfieStep = ({ data, onNext, onBack }: FleetSelfieStepProps) => {
  const [formData, setFormData] = useState(data);
  const [isCapturing, setIsCapturing] = useState(false);
  const [livenessStatus, setLivenessStatus] = useState<'idle' | 'detecting' | 'success' | 'failed'>('idle');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      startLivenessDetection();
    }
  };

  const handleCameraCapture = () => {
    setIsCapturing(true);
    // Simulate camera capture
    setTimeout(() => {
      const mockFile = new File([''], 'selfie.jpg', { type: 'image/jpeg' });
      setFormData(prev => ({ ...prev, image: mockFile }));
      setIsCapturing(false);
      startLivenessDetection();
    }, 2000);
  };

  const startLivenessDetection = () => {
    setLivenessStatus('detecting');
    // Simulate liveness detection
    setTimeout(() => {
      setLivenessStatus('success');
      setFormData(prev => ({ ...prev, liveness: true }));
      
      // Then verify face match
      setTimeout(() => {
        setFormData(prev => ({ ...prev, verified: true }));
      }, 1000);
    }, 3000);
  };

  const handleRetry = () => {
    setFormData(prev => ({ ...prev, image: null, verified: false, liveness: false }));
    setLivenessStatus('idle');
  };

  const handleNext = () => {
    onNext(formData);
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Live Selfie Verification</h2>
          <p className="text-gray-600">Please take a live selfie for identity confirmation</p>
        </div>

        <div className="space-y-6">
          {/* Camera/Upload Section */}
          {!formData.image ? (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Capture Your Selfie</h3>
              
              {/* Guidelines */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">Guidelines for best results:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Ensure good lighting on your face</li>
                  <li>• Look directly at the camera</li>
                  <li>• Remove sunglasses or hat</li>
                  <li>• Keep your face centered in the frame</li>
                </ul>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                {isCapturing ? (
                  <div className="space-y-4">
                    <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                      <Camera className="w-12 h-12 text-gray-400 animate-pulse" />
                    </div>
                    <p className="text-sm text-gray-600">Capturing your selfie...</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-24 h-24 bg-orange-100 rounded-full mx-auto flex items-center justify-center">
                      <Camera className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-4">Take a live selfie for verification</p>
                      <div className="space-x-4">
                        <Button onClick={handleCameraCapture} className="bg-orange-500 hover:bg-orange-600 text-white">
                          <Camera className="w-4 h-4 mr-2" />
                          Use Camera
                        </Button>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <Button variant="outline">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Photo
                          </Button>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Verification Process */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Verification in Progress</h3>
                
                {/* Liveness Detection */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <Eye className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Liveness Detection</span>
                    </div>
                    <div>
                      {livenessStatus === 'idle' && (
                        <Badge variant="outline">Pending</Badge>
                      )}
                      {livenessStatus === 'detecting' && (
                        <Badge className="bg-blue-100 text-blue-800 animate-pulse">Detecting...</Badge>
                      )}
                      {livenessStatus === 'success' && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Face Match */}
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Face Match with Aadhaar</span>
                    </div>
                    <div>
                      {!formData.liveness && (
                        <Badge variant="outline">Waiting</Badge>
                      )}
                      {formData.liveness && !formData.verified && (
                        <Badge className="bg-blue-100 text-blue-800 animate-pulse">Matching...</Badge>
                      )}
                      {formData.verified && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Matched
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                {formData.verified && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Liveness Verified ✅</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      Your identity has been successfully verified
                    </p>
                  </div>
                )}

                {/* Retry Option */}
                {formData.image && !formData.verified && (
                  <div className="mt-4">
                    <Button variant="outline" onClick={handleRetry} size="sm">
                      Take Another Photo
                    </Button>
                  </div>
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

export default FleetSelfieStep;
