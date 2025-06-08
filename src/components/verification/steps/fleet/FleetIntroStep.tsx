
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Star, TrendingUp, BarChart3, MapPin, CheckCircle } from 'lucide-react';

interface FleetIntroStepProps {
  data: {
    acknowledged: boolean;
  };
  onNext: (data: any) => void;
}

const FleetIntroStep = ({ data, onNext }: FleetIntroStepProps) => {
  const handleNext = () => {
    onNext({ acknowledged: true });
  };

  const benefits = [
    {
      icon: Building2,
      title: 'Corporate Bidding Access',
      description: '₹10+ lakh/month opportunities',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Star,
      title: 'Verified Badge',
      description: 'Stand out in truck listings',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: TrendingUp,
      title: 'Priority Load Allocation',
      description: 'Get loads before others',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track performance & earnings',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: MapPin,
      title: 'GPS-Based Matching',
      description: 'Real-time load suggestions',
      color: 'bg-red-100 text-red-600'
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Your Fleet Verified</h2>
          <p className="text-xl text-gray-600 mb-2">Unlock corporate bidding, get premium loads, and boost your earnings</p>
          <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium">
            Verification takes 48 hours
          </Badge>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-xl ${benefit.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Process Overview */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Verification Process (6 Steps)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">1</div>
              <span className="text-gray-700">Aadhaar Verification</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">2</div>
              <span className="text-gray-700">PAN Verification</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">3</div>
              <span className="text-gray-700">Bank Account</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">4</div>
              <span className="text-gray-700">Live Selfie</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">5</div>
              <span className="text-gray-700">Vehicle Documents</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">6</div>
              <span className="text-gray-700">Final Review</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button onClick={handleNext} className="bg-red-500 hover:bg-red-600 text-white px-12 py-4 text-lg font-medium">
            Begin Verification
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            You can continue using the platform with limited features while verification is pending
          </p>
        </div>
      </div>
    </div>
  );
};

export default FleetIntroStep;
