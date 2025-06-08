
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, Eye, RotateCcw } from 'lucide-react';

interface SelfieVerificationStepProps {
  onNext: () => void;
  onBack: () => void;
}

const SelfieVerificationStep = ({ onNext, onBack }: SelfieVerificationStepProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [faceMatched, setFaceMatched] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [blinkDetected, setBlinkDetected] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        setShowCamera(false);
        
        // Stop camera stream
        const stream = videoRef.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        
        handleLivenessCheck();
      }
    }
  };

  const handleLivenessCheck = () => {
    setIsVerifying(true);
    // Simulate blink detection
    setTimeout(() => {
      setBlinkDetected(true);
      setIsLive(true);
      // Simulate face matching with Aadhaar
      setTimeout(() => {
        setFaceMatched(true);
        setIsVerified(true);
        setIsVerifying(false);
      }, 2000);
    }, 1500);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
        handleLivenessCheck();
      };
      reader.readAsDataURL(file);
    }
  };

  const retryCapture = () => {
    setCapturedImage(null);
    setIsLive(false);
    setIsVerifying(false);
    setIsVerified(false);
    setFaceMatched(false);
    setBlinkDetected(false);
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Selfie Verification</h2>
          <p className="text-gray-600">Take a live selfie to verify your identity</p>
          <p className="text-xs text-gray-500 mt-2">👁️ Look directly at the camera and blink once</p>
        </div>

        {/* Camera/Upload Section */}
        {!capturedImage ? (
          <div className="space-y-6">
            {!showCamera ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <div className="space-y-4">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Live Selfie Capture</h3>
                    <p className="text-sm text-gray-600">We'll detect your face and verify liveness</p>
                  </div>
                  <div className="flex justify-center space-x-3">
                    <Button onClick={startCamera} className="bg-orange-500 hover:bg-orange-600 text-white">
                      <Camera className="w-4 h-4 mr-2" />
                      Start Camera
                    </Button>
                    <Button variant="outline" className="relative">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative bg-black rounded-xl overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 border-4 border-orange-500 rounded-xl pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-white rounded-full opacity-50"></div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <Button onClick={capturePhoto} size="lg" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full">
                      <Camera className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Position your face in the oval and blink once</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Captured Image */}
            <div className="border rounded-xl p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Captured Selfie</h3>
                <div className="flex space-x-2">
                  {isVerified && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <Button size="sm" variant="outline" onClick={retryCapture}>
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Retake
                  </Button>
                </div>
              </div>
              <img src={capturedImage} alt="Selfie" className="w-full h-64 object-cover rounded-lg" />
            </div>

            {/* Verification Steps */}
            <div className="space-y-3">
              {/* Liveness Check */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  {isVerifying && !isLive ? (
                    <>
                      <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm text-gray-700">Checking liveness...</span>
                    </>
                  ) : isLive ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <span className="text-sm text-green-700 font-medium">Liveness Verified ✅</span>
                        {blinkDetected && (
                          <p className="text-xs text-green-600">Blink detected - you're live!</p>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <span className="text-sm text-red-700">Liveness check failed</span>
                    </>
                  )}
                </div>
              </div>

              {/* Face Matching */}
              {isLive && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    {isVerifying && !faceMatched ? (
                      <>
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-gray-700">Matching with Aadhaar photo...</span>
                      </>
                    ) : faceMatched ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <span className="text-sm text-green-700 font-medium">Face matched with Aadhaar ✅</span>
                          <p className="text-xs text-green-600">Identity confirmed</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-red-700">Face matching failed</span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} width={640} height={480} style={{ display: 'none' }} />

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

export default SelfieVerificationStep;
