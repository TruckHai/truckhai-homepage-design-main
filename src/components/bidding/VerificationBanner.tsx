
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, ShieldCheck, ShieldX, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const VerificationBanner = ({ isVerified, onVerificationComplete }) => {
  const [verificationStatus, setVerificationStatus] = useState('not-started'); // not-started, in-progress, completed
  const [completedSteps, setCompletedSteps] = useState(2);
  const totalSteps = 5;

  const verificationSteps = [
    { id: 1, title: 'Basic Information', completed: true, icon: CheckCircle },
    { id: 2, title: 'Document Upload', completed: true, icon: CheckCircle },
    { id: 3, title: 'Vehicle Registration', completed: false, icon: Clock },
    { id: 4, title: 'Insurance Verification', completed: false, icon: Clock },
    { id: 5, title: 'Background Check', completed: false, icon: Clock }
  ];

  if (isVerified) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800">✅ Verified Fleet Owner</h3>
                <p className="text-green-700 text-sm">
                  Access to premium RFQs and corporate contracts unlocked
                </p>
              </div>
            </div>
            <Badge className="bg-green-600 text-white">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (verificationStatus === 'in-progress') {
    return (
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-800">Verification In Progress</h3>
                  <p className="text-yellow-700 text-sm">
                    Complete all steps to unlock premium bidding
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                {completedSteps}/{totalSteps} Steps
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-yellow-700">Progress</span>
                <span className="text-yellow-700">{Math.round((completedSteps / totalSteps) * 100)}%</span>
              </div>
              <Progress value={(completedSteps / totalSteps) * 100} className="h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {verificationSteps.map((step) => (
                <div key={step.id} className="flex items-center space-x-2 text-xs">
                  <step.icon className={`w-4 h-4 ${
                    step.completed ? 'text-green-600' : 'text-gray-400'
                  }`} />
                  <span className={step.completed ? 'text-green-700' : 'text-gray-600'}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                Continue Verification
              </Button>
              <Button size="sm" variant="ghost">
                View Requirements
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-red-50 border-red-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <ShieldX className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-red-800">Verification Required</h3>
              <p className="text-red-700 text-sm">
                Complete verification to bid on premium corporate RFQs
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              size="sm"
              onClick={() => setVerificationStatus('in-progress')}
              className="bg-red-600 hover:bg-red-700"
            >
              <Shield className="w-4 h-4 mr-2" />
              Start Verification
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-red-700">Limited to 3 RFQs/day</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-red-700">No premium RFQ access</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-red-700">Basic support only</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationBanner;
