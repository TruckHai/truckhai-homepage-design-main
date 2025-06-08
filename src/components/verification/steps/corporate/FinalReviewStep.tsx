
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Edit, Building2, FileText, Phone, CreditCard, ArrowLeft, Sparkles, Calendar } from 'lucide-react';

interface FinalReviewStepProps {
  data: any;
  onComplete: () => void;
  onBack: () => void;
}

const FinalReviewStep = ({ data, onComplete, onBack }: FinalReviewStepProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const verificationSections = [
    {
      id: 'basic',
      title: 'Company Details',
      icon: Building2,
      status: 'verified',
      data: {
        company: data.basicDetails.companyName,
        gstin: data.basicDetails.gstin,
        contact: data.basicDetails.primaryContact,
        location: data.basicDetails.branchLocation
      }
    },
    {
      id: 'documents',
      title: 'Document Verification',
      icon: FileText,
      status: 'verified',
      data: {
        gst: 'Certificate Verified',
        pan: 'Card Verified',
        bank: 'Details Uploaded'
      }
    },
    {
      id: 'call',
      title: 'Verification Call',
      icon: Phone,
      status: 'scheduled',
      data: {
        date: data.callDetails.scheduledDate?.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        }),
        time: data.callDetails.scheduledTime,
        contact: data.callDetails.contactPerson
      }
    },
    {
      id: 'bank',
      title: 'Bank Verification',
      icon: CreditCard,
      status: 'verified',
      data: {
        method: data.bankVerification.verificationMethod === 'penny-drop' ? 'Penny Drop' : 'Bank Statement',
        bank: data.bankVerification.bankName || 'HDFC Bank',
        account: `****${data.bankVerification.accountNumber?.slice(-4)}`
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Final Review & Submit</h2>
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
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      section.status === 'verified' ? 'bg-green-100' : section.status === 'scheduled' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        section.status === 'verified' ? 'text-green-600' : section.status === 'scheduled' ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={
                      section.status === 'verified' 
                        ? "bg-green-100 text-green-800" 
                        : section.status === 'scheduled'
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }>
                      {section.status === 'verified' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {section.status === 'scheduled' && <Calendar className="w-3 h-3 mr-1" />}
                      {section.status === 'verified' ? 'Verified' : section.status === 'scheduled' ? 'Scheduled' : 'Pending'}
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
            <h3 className="font-semibold text-green-800">Ready for Submission!</h3>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {verificationSections.map((section) => (
              <div key={section.id} className="text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                  section.status === 'verified' ? 'bg-green-500' : section.status === 'scheduled' ? 'bg-blue-500' : 'bg-gray-400'
                }`}>
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
              <span>Corporate verification typically takes 3–5 business days</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Verification call as scheduled</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>You'll be notified via SMS & email at each step</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Dashboard will update with live tracking</span>
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
              Submit for Review
            </Button>
          </div>
        )}

        {/* Submitting State */}
        {isSubmitting && (
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Submitting your verification for review...</p>
          </div>
        )}

        {/* Success State */}
        {showConfetti && (
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-green-600 mb-2">Corporate Verification Submitted!</h3>
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

export default FinalReviewStep;
