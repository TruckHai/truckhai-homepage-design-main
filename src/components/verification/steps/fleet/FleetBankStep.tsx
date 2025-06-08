
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, CheckCircle, Clock, Shield, ArrowLeft, ArrowRight } from 'lucide-react';

interface FleetBankStepProps {
  data: {
    accountNumber: string;
    ifsc: string;
    accountType: string;
    accountHolderName: string;
    verified: boolean;
  };
  onNext: (data: any) => void;
  onBack: () => void;
}

const FleetBankStep = ({ data, onNext, onBack }: FleetBankStepProps) => {
  const [formData, setFormData] = useState(data);
  const [confirmAccount, setConfirmAccount] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [pennyDropStatus, setPennyDropStatus] = useState<'idle' | 'sending' | 'success' | 'failed'>('idle');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePennyDrop = () => {
    if (formData.accountNumber !== confirmAccount) {
      alert('Account numbers do not match');
      return;
    }

    setPennyDropStatus('sending');
    setIsVerifying(true);

    // Simulate penny drop process
    setTimeout(() => {
      setPennyDropStatus('success');
      setFormData(prev => ({ ...prev, verified: true }));
      setIsVerifying(false);
    }, 3000);
  };

  const handleNext = () => {
    onNext(formData);
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bank Verification</h2>
          <p className="text-gray-600">Add bank account for payouts and verification</p>
        </div>

        <div className="space-y-6">
          {/* Bank Details Form */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Bank Account Details</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  placeholder="Enter account number"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="confirmAccount">Confirm Account Number</Label>
                <Input
                  id="confirmAccount"
                  value={confirmAccount}
                  onChange={(e) => setConfirmAccount(e.target.value)}
                  placeholder="Re-enter account number"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="ifsc">IFSC Code</Label>
                <Input
                  id="ifsc"
                  value={formData.ifsc}
                  onChange={(e) => handleInputChange('ifsc', e.target.value)}
                  placeholder="e.g., HDFC0001234"
                  className="mt-1"
                />
                {formData.ifsc && formData.ifsc.length >= 11 && (
                  <p className="text-sm text-green-600 mt-1">✅ HDFC Bank, Mumbai Branch</p>
                )}
              </div>

              <div>
                <Label htmlFor="accountType">Account Type</Label>
                <Select value={formData.accountType} onValueChange={(value) => handleInputChange('accountType', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="accountHolderName">Account Holder Name</Label>
                <Input
                  id="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                  placeholder="Name as per bank records"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Must match with PAN name</p>
              </div>
            </div>
          </div>

          {/* Penny Drop Section */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-blue-600" />
              Penny Drop Verification
            </h3>
            
            {pennyDropStatus === 'idle' && (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  We'll send ₹1 to your account to verify it's active and belongs to you. 
                  This amount will be credited instantly.
                </p>
                <Button
                  onClick={handlePennyDrop}
                  disabled={!formData.accountNumber || !confirmAccount || !formData.ifsc || !formData.accountHolderName}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Verify Account with ₹1
                </Button>
              </div>
            )}

            {pennyDropStatus === 'sending' && (
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-500 animate-spin" />
                <div>
                  <p className="font-medium text-gray-900">Sending ₹1 to your account...</p>
                  <p className="text-sm text-gray-600">This usually takes a few seconds</p>
                </div>
              </div>
            )}

            {pennyDropStatus === 'success' && (
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-green-800">₹1 credited – Account Verified ✅</p>
                  <p className="text-sm text-green-600">Your bank account is now verified</p>
                </div>
              </div>
            )}

            {pennyDropStatus === 'failed' && (
              <div className="text-red-600">
                <p className="font-medium">Verification failed</p>
                <p className="text-sm">Please check your account details and try again</p>
                <Button 
                  variant="outline" 
                  onClick={() => setPennyDropStatus('idle')}
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>

          {/* Security Note */}
          <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-green-500 mr-2" />
              <p className="text-sm text-gray-700">
                <strong>SSL Encrypted:</strong> Your bank details are secured with bank-grade encryption
              </p>
            </div>
          </div>
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

export default FleetBankStep;
