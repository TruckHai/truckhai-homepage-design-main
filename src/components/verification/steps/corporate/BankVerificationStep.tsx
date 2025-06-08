
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Upload, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, Building } from 'lucide-react';

interface BankVerificationStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

const BankVerificationStep = ({ data, onNext, onBack }: BankVerificationStepProps) => {
  const [verificationMethod, setVerificationMethod] = useState(data.verificationMethod || 'penny-drop');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: data.accountNumber || '',
    confirmAccountNumber: '',
    ifsc: data.ifsc || '',
    accountHolderName: data.accountHolderName || '',
    bankName: ''
  });
  const [pennyDropStatus, setPennyDropStatus] = useState('idle');
  const [uploadedStatement, setUploadedStatement] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setBankDetails(prev => ({ ...prev, [field]: value }));
    
    // Auto-fetch bank name from IFSC
    if (field === 'ifsc' && value.length === 11) {
      setTimeout(() => {
        setBankDetails(prev => ({ ...prev, bankName: 'HDFC Bank - Bandra West' }));
      }, 500);
    }
  };

  const handlePennyDrop = () => {
    if (bankDetails.accountNumber && bankDetails.ifsc && bankDetails.accountHolderName) {
      setPennyDropStatus('processing');
      
      setTimeout(() => {
        setPennyDropStatus('success');
      }, 3000);
    }
  };

  const handleFileUpload = () => {
    setUploadedStatement(true);
  };

  const handleNext = () => {
    onNext({
      verificationMethod,
      ...bankDetails,
      pennyDropStatus,
      uploadedStatement
    });
  };

  const canProceed = verificationMethod === 'penny-drop' 
    ? pennyDropStatus === 'success' 
    : uploadedStatement;

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bank Verification</h2>
          <p className="text-gray-600">Verify your business bank account for secure transactions</p>
        </div>

        {/* Verification Methods */}
        <Tabs value={verificationMethod} onValueChange={setVerificationMethod} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="penny-drop">Instant Verification</TabsTrigger>
            <TabsTrigger value="statement">Bank Statement</TabsTrigger>
          </TabsList>

          {/* Penny Drop */}
          <TabsContent value="penny-drop" className="space-y-6 mt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <h3 className="font-medium text-blue-900 mb-2">How it works</h3>
              <p className="text-sm text-blue-800">We'll send ₹1 to your account and verify it instantly. The amount will be refunded immediately.</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={bankDetails.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  placeholder="Enter account number"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="confirmAccountNumber">Confirm Account Number</Label>
                <Input
                  id="confirmAccountNumber"
                  value={bankDetails.confirmAccountNumber}
                  onChange={(e) => handleInputChange('confirmAccountNumber', e.target.value)}
                  placeholder="Re-enter account number"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="ifsc">IFSC Code</Label>
                <Input
                  id="ifsc"
                  value={bankDetails.ifsc}
                  onChange={(e) => handleInputChange('ifsc', e.target.value.toUpperCase())}
                  placeholder="e.g., HDFC0001234"
                  className="mt-1"
                />
                {bankDetails.bankName && (
                  <div className="flex items-center mt-2">
                    <Building className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-green-600">{bankDetails.bankName}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="accountHolderName">Account Holder Name</Label>
                <Input
                  id="accountHolderName"
                  value={bankDetails.accountHolderName}
                  onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                  placeholder="As per bank records"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Penny Drop Button */}
            {pennyDropStatus === 'idle' && (
              <Button
                onClick={handlePennyDrop}
                disabled={!bankDetails.accountNumber || !bankDetails.ifsc || !bankDetails.accountHolderName || bankDetails.accountNumber !== bankDetails.confirmAccountNumber}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Verify Account (₹1 Test Transaction)
              </Button>
            )}

            {/* Penny Drop Status */}
            {pennyDropStatus === 'processing' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-yellow-800 font-medium">Processing ₹1 test transaction...</p>
                <p className="text-sm text-yellow-600 mt-1">This usually takes 5-10 seconds</p>
              </div>
            )}

            {pennyDropStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <p className="text-green-800 font-medium">₹1 credited – Account Verified ✅</p>
                <p className="text-sm text-green-600 mt-1">Your bank account has been successfully verified</p>
              </div>
            )}
          </TabsContent>

          {/* Bank Statement Upload */}
          <TabsContent value="statement" className="space-y-6 mt-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Manual Verification</h3>
              <p className="text-sm text-gray-600">Upload your bank statement for manual verification. This process may take 24-48 hours.</p>
            </div>

            {!uploadedStatement ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Upload Bank Statement</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Upload last 3 months bank statement (PDF format, max 10MB)
                </p>
                <Button onClick={handleFileUpload} variant="outline">
                  Choose File
                </Button>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <p className="text-green-800 font-medium">Bank Statement Uploaded ✅</p>
                <p className="text-sm text-green-600 mt-1">Your statement will be verified within 24-48 hours</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Security Note */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-gray-900">Bank-grade Security</span>
          </div>
          <p className="text-xs text-gray-600">Your banking information is encrypted with 256-bit SSL and never stored on our servers.</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Proceed to Final Review
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BankVerificationStep;
