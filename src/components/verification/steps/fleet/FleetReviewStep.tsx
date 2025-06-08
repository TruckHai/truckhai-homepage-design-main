
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, ArrowLeft, Shield, FileText, CreditCard, Camera, Truck } from 'lucide-react';

interface FleetReviewStepProps {
  data: any;
  onComplete: () => void;
  onBack: () => void;
}

const FleetReviewStep = ({ data, onComplete, onBack }: FleetReviewStepProps) => {
  const handleSubmit = () => {
    // Simulate submission
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  const verificationSteps = [
    {
      title: 'Aadhaar Verification',
      icon: Shield,
      status: data.aadhaar?.verified ? 'completed' : 'pending',
      details: data.aadhaar?.name || 'Not verified'
    },
    {
      title: 'PAN Verification',
      icon: FileText,
      status: data.pan?.verified ? 'completed' : 'pending',
      details: data.pan?.number || 'Not verified'
    },
    {
      title: 'Bank Verification',
      icon: CreditCard,
      status: data.bank?.verified ? 'completed' : 'pending',
      details: data.bank?.accountNumber ? `****${data.bank.accountNumber.slice(-4)}` : 'Not verified'
    },
    {
      title: 'Selfie Verification',
      icon: Camera,
      status: data.selfie?.verified ? 'completed' : 'pending',
      details: data.selfie?.verified ? 'Liveness verified' : 'Not verified'
    },
    {
      title: 'Vehicle Documents',
      icon: Truck,
      status: data.vehicle?.verified ? 'completed' : 'pending',
      details: data.vehicle?.truckNumber || 'Not verified'
    }
  ];

  const allCompleted = verificationSteps.every(step => step.status === 'completed');

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Final Summary & Submission</h2>
          <p className="text-gray-600">You're almost done! Review your details and submit for verification</p>
        </div>

        {/* Verification Summary */}
        <div className="space-y-4 mb-8">
          <h3 className="font-semibold text-gray-900">Verification Summary</h3>
          
          {verificationSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.status === 'completed' ? 'bg-green-100' : 'bg-gray-200'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      step.status === 'completed' ? 'text-green-600' : 'text-gray-500'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.details}</p>
                  </div>
                </div>
                <div>
                  {step.status === 'completed' ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline">Pending</Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Processing Information */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-blue-900">What happens next?</h3>
          </div>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• Our team will review your documents within 48 hours</p>
            <p>• You'll receive SMS & email notifications on status updates</p>
            <p>• You can continue using the platform with limited features</p>
            <p>• Once verified, you'll get access to corporate bidding and premium features</p>
          </div>
        </div>

        {/* Platform Access Note */}
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-yellow-500 mb-8">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> You can continue using the platform with limited features while verification is pending.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!allCompleted}
            className="bg-green-500 hover:bg-green-600 text-white px-8"
          >
            Submit for Verification
          </Button>
        </div>

        {!allCompleted && (
          <p className="text-center text-sm text-red-600 mt-4">
            Please complete all verification steps before submitting
          </p>
        )}
      </div>
    </div>
  );
};

export default FleetReviewStep;
