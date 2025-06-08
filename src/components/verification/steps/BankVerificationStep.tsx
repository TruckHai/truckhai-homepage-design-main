
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, CheckCircle, Clock, Shield, ArrowRight, ArrowLeft, DollarSign } from 'lucide-react';

interface BankVerificationStepProps {
  onNext: () => void;
  onBack: () => void;
}

const BankVerificationStep = ({ onNext, onBack }: BankVerificationStepProps) => {
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    accountType: ''
  });
  const [branchDetails, setBranchDetails] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [pennyDropStatus, setPennyDropStatus] = useState<'idle' | 'processing' | 'sent' | 'verified'>('idle');

  const bankList = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Union Bank of India',
    'Canara Bank'
  ];

  const handleIFSCChange = (value: string) => {
    setBankDetails({...bankDetails, ifscCode: value});
    if (value.length === 11) {
      // Simulate branch fetching
      setTimeout(() => {
        setBranchDetails('MG Road Branch, Pune - 411001');
      }, 500);
    }
  };

  const handlePennyDrop = () => {
    if (bankDetails.accountNumber !== bankDetails.confirmAccountNumber) {
      alert('Account numbers do not match');
      return;
    }

    setIsVerifying(true);
    setPennyDropStatus('processing');

    // Simulate penny drop process
    setTimeout(() => {
      setPennyDropStatus('sent');
      setTimeout(() => {
        setPennyDropStatus('verified');
        setIsVerified(true);
        setIsVerifying(false);
      }, 3000);
    }, 2000);
  };

  const renderPennyDropAnimation = () => {
    return (
      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <div className="relative">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
          {pennyDropStatus === 'processing' && (
            <div className="absolute -top-2 -right-2">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          {pennyDropStatus === 'processing' && (
            <p className="text-sm text-blue-700">⏳ Initiating verification transfer...</p>
          )}
          {pennyDropStatus === 'sent' && (
            <p className="text-sm text-blue-700">💸 ₹1 sent to your bank – verifying...</p>
          )}
          {pennyDropStatus === 'verified' && (
            <div>
              <p className="text-sm text-green-700 font-medium">✅ ₹1 credited – Account Verified!</p>
              <p className="text-xs text-green-600 mt-1">Your account is now verified</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bank Account Verification</h2>
          <p className="text-gray-600">We'll send ₹1 to verify your account (refunded instantly)</p>
        </div>

        {/* Bank Details Form */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="bank">Bank Name</Label>
              <Select onValueChange={(value) => setBankDetails({...bankDetails, bankName: value})}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your bank" />
                </SelectTrigger>
                <SelectContent>
                  {bankList.map((bank) => (
                    <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="account">Account Number</Label>
              <Input
                id="account"
                type="number"
                value={bankDetails.accountNumber}
                onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                className="mt-1"
                placeholder="Enter account number"
              />
            </div>

            <div>
              <Label htmlFor="confirmAccount">Confirm Account Number</Label>
              <Input
                id="confirmAccount"
                type="number"
                value={bankDetails.confirmAccountNumber}
                onChange={(e) => setBankDetails({...bankDetails, confirmAccountNumber: e.target.value})}
                className="mt-1"
                placeholder="Re-enter account number"
              />
            </div>

            <div>
              <Label htmlFor="ifsc">IFSC Code</Label>
              <Input
                id="ifsc"
                value={bankDetails.ifscCode}
                onChange={(e) => handleIFSCChange(e.target.value)}
                className="mt-1"
                placeholder="e.g. SBIN0001234"
                maxLength={11}
              />
              {branchDetails && (
                <p className="text-xs text-green-600 mt-1">✅ {branchDetails}</p>
              )}
            </div>

            <div>
              <Label htmlFor="accountType">Account Type</Label>
              <Select onValueChange={(value) => setBankDetails({...bankDetails, accountType: value})}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="savings">Savings Account</SelectItem>
                  <SelectItem value="current">Current Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Security Badge */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">🔒 SSL Encrypted</p>
                <p className="text-xs text-gray-600">Your banking details are protected with bank-grade security</p>
              </div>
            </div>
          </div>

          {/* Penny Drop Section */}
          {pennyDropStatus !== 'idle' && renderPennyDropAnimation()}

          {/* Verify Button */}
          {pennyDropStatus === 'idle' && (
            <Button
              onClick={handlePennyDrop}
              disabled={!bankDetails.bankName || !bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.accountType}
              className="w-full bg-green-500 hover:bg-green-600 text-white h-12"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Verify with ₹1 Transfer
            </Button>
          )}
        </div>

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

export default BankVerificationStep;
