
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Edit, Shield, CreditCard, DollarSign, Eye, ArrowLeft, Sparkles } from 'lucide-react';

interface ReviewSubmitStepProps {
  onComplete: () => void;
  onBack: () => void;
}

const ReviewSubmitStep = ({ onComplete, onBack }: ReviewSubmitStepProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const verificationSections = [
    {
      id: 'aadhaar',
      title: 'Aadhaar Verification',
      icon: Shield,
      status: 'verified',
      data: {
        name: 'Amit Kumar Sharma',
        number: '1234 5678 9012',
        address: '123, MG Road, Pune'
      }
    },
    {
      id: 'pan',
      title: 'PAN Verification',
      icon: CreditCard,
      status: 'verified',
      data: {
        number: 'ABCDE1234F',
        name: 'AMIT KUMAR SHARMA',
        dob: '15/08/1985'
      }
    },
    {
      id: 'bank',
      title: 'Bank Verification',
      icon: DollarSign,
      status: 'verified',
      data: {
        bank: 'HDFC Bank',
        account: '****1234',
        ifsc: 'HDFC0001234'
      }
    },
    {
      id: 'selfie',
      title: 'Selfie Verification',
      icon: Eye,
      status: 'verified',
      data: {
        liveness: 'Verified',
        faceMatch: 'Matched with Aadhaar'
      }
    }
  ];

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfetti(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 3000);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
            <CheckCircle className="w-8 h-8 text-green-600" />
            {showConfetti && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-yellow-500 animate-ping" />
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h2>
          <p className="text-gray-600">Please review your verification details before submitting</p>
        </div>

        {/* Verification Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {verificationSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.id} className="border rounded-xl p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  {Object.entries(section.data).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{key}:</span>
                      <span className="text-gray-900 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-green-800">All Verifications Complete!</h3>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {verificationSections.map((section) => (
              <div key={section.id} className="text-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs text-green-700 font-medium">{section.title.split(' ')[0]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submission Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Verification typically takes 24–48 hours</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>You'll be notified via SMS & email</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Your dashboard will update automatically</span>
            </li>
          </ul>
        </div>

        {/* Submit Button */}
        {!isSubmitting && !showConfetti && (
          <div className="text-center">
            <Button 
              onClick={handleSubmit}
              className="bg-red-500 hover:bg-red-600 text-white px-12 h-12 text-lg font-semibold rounded-xl"
            >
              Submit for Verification
            </Button>
          </div>
        )}

        {/* Submitting State */}
        {isSubmitting && (
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Submitting your verification...</p>
          </div>
        )}

        {/* Success State */}
        {showConfetti && (
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-green-600 mb-2">Verification Submitted Successfully!</h3>
            <p className="text-gray-600">You'll hear from us soon...</p>
          </div>
        )}

        {/* Navigation */}
        {!isSubmitting && !showConfetti && (
          <div className="flex justify-between pt-8">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSubmitStep;
