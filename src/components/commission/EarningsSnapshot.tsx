
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// SVG Icons
const DollarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface EarningsSnapshotProps {
  totalEarned: number;
  pendingAmount: number;
  monthlyChange: number;
}

const EarningsSnapshot = ({ totalEarned, pendingAmount, monthlyChange }: EarningsSnapshotProps) => {
  const [displayTotal, setDisplayTotal] = useState(0);
  const [displayPending, setDisplayPending] = useState(0);

  // Animated counter effect
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const totalIncrement = totalEarned / steps;
    const pendingIncrement = pendingAmount / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setDisplayTotal(Math.min(totalIncrement * currentStep, totalEarned));
      setDisplayPending(Math.min(pendingIncrement * currentStep, pendingAmount));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [totalEarned, pendingAmount]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Total Commission Earned */}
      <Card className="bg-gradient-to-br from-white to-red-50 border-0 shadow-lg rounded-2xl overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center opacity-20">
            <DollarIcon />
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <p className="text-sm font-medium text-gray-600">Total Commission Earned</p>
                <Button variant="ghost" size="sm" className="p-1 h-auto hover:bg-red-100">
                  <RefreshIcon />
                </Button>
              </div>
              
              <p className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                ₹{Math.round(displayTotal).toLocaleString()}
              </p>
              
              <div className="flex items-center space-x-2">
                <div className={`flex items-center space-x-1 ${monthlyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {monthlyChange >= 0 ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  )}
                  <span className="text-sm font-semibold">{Math.abs(monthlyChange)}%</span>
                </div>
                <p className="text-sm text-gray-500">vs last month</p>
              </div>
            </div>
            
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <DollarIcon />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Payments */}
      <Card className="bg-gradient-to-br from-white to-orange-50 border-0 shadow-lg rounded-2xl overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center opacity-20">
            <ClockIcon />
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <div className="group relative">
                  <svg className="w-4 h-4 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    Disbursed every 2 working days
                  </div>
                </div>
              </div>
              
              <p className="text-3xl font-bold text-orange-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                ₹{Math.round(displayPending).toLocaleString()}
              </p>
              
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  Awaiting Disbursement
                </span>
              </div>
            </div>
            
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <ClockIcon />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsSnapshot;
