
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldIcon, CheckCircleIcon, PhoneIcon, InfoIcon } from './InsuranceIcons';

const WhyChoosePanel: React.FC = () => {
  return (
    <div className="sticky top-24">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900">Why Choose Our Insurance?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-start space-x-3 animate-fade-in">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Comprehensive Coverage</h4>
                <p className="text-sm text-blue-700">Protection against theft, damage, and delays</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircleIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Quick Claims</h4>
                <p className="text-sm text-blue-700">Average claim settlement in 24-48 hours</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <PhoneIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900">24/7 Support</h4>
                <p className="text-sm text-blue-700">Round-the-clock assistance when you need it</p>
              </div>
            </div>

            <div className="p-3 bg-white/50 rounded-lg border border-blue-200 mt-6">
              <div className="flex items-center space-x-2 mb-2">
                <InfoIcon className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Quick Stats</span>
              </div>
              <div className="space-y-1 text-xs text-blue-700">
                <p>• 98% claim approval rate</p>
                <p>• ₹500Cr+ claims processed</p>
                <p>• 50,000+ satisfied customers</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhyChoosePanel;
