
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, Shield, CreditCard } from 'lucide-react';

interface DocumentUploadStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

const DocumentUploadStep = ({ data, onNext, onBack }: DocumentUploadStepProps) => {
  const [uploadedDocs, setUploadedDocs] = useState({
    gstCertificate: false,
    panCard: false,
    cin: false,
    bankDetails: false,
    creditScore: false
  });

  const [verificationStatus, setVerificationStatus] = useState({
    gstCertificate: 'pending',
    panCard: 'pending',
    cin: 'pending',
    bankDetails: 'pending',
    creditScore: 'pending'
  });

  const documents = [
    {
      key: 'gstCertificate',
      title: 'GST Certificate',
      description: 'Upload your GST registration certificate',
      icon: Shield,
      required: true
    },
    {
      key: 'panCard',
      title: 'PAN Card',
      description: 'Company PAN card for verification',
      icon: CreditCard,
      required: true
    },
    {
      key: 'cin',
      title: 'CIN (Optional)',
      description: 'Corporate Identification Number for Pvt Ltd companies',
      icon: FileText,
      required: false
    },
    {
      key: 'bankDetails',
      title: 'Bank Account Details',
      description: 'Bank statement or cancelled cheque',
      icon: FileText,
      required: true
    },
    {
      key: 'creditScore',
      title: 'Credit Score (Optional)',
      description: 'Upload credit score report for faster approval',
      icon: FileText,
      required: false
    }
  ];

  const handleFileUpload = (docKey: string) => {
    // Simulate file upload and verification
    setUploadedDocs(prev => ({ ...prev, [docKey]: true }));
    setVerificationStatus(prev => ({ ...prev, [docKey]: 'verifying' }));
    
    setTimeout(() => {
      setVerificationStatus(prev => ({ ...prev, [docKey]: 'verified' }));
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        );
      case 'verifying':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            ⏳ Verifying...
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return null;
    }
  };

  const requiredDocsUploaded = documents
    .filter(doc => doc.required)
    .every(doc => uploadedDocs[doc.key as keyof typeof uploadedDocs]);

  const handleNext = () => {
    onNext({ documents: uploadedDocs, verificationStatus });
  };

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Verification Documents</h2>
          <p className="text-gray-600">Upload clear images or PDFs of your business documents</p>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {documents.map((doc) => {
            const Icon = doc.icon;
            const isUploaded = uploadedDocs[doc.key as keyof typeof uploadedDocs];
            const status = verificationStatus[doc.key as keyof typeof verificationStatus];
            
            return (
              <div key={doc.key} className="border rounded-xl p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                      {!doc.required && <span className="text-xs text-gray-500">Optional</span>}
                    </div>
                  </div>
                  {getStatusBadge(status)}
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
                
                {!isUploaded ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleFileUpload(doc.key)}
                    >
                      Upload Document
                    </Button>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-green-700 font-medium">Document Uploaded</p>
                    <Button size="sm" variant="ghost" className="mt-2">
                      Replace
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">Upload Progress</h3>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-blue-800">
              Required: {documents.filter(d => d.required && uploadedDocs[d.key as keyof typeof uploadedDocs]).length}/{documents.filter(d => d.required).length}
            </div>
            <div className="text-sm text-blue-800">
              Optional: {documents.filter(d => !d.required && uploadedDocs[d.key as keyof typeof uploadedDocs]).length}/{documents.filter(d => !d.required).length}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!requiredDocsUploaded}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Continue to Verification Call
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadStep;
