
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Truck, Package, Shield, Flame, Users, TrendingUp, TrendingDown } from 'lucide-react';

const RFQMarketDepth = ({ filters, isVerified, onRFQSelect }) => {
  const [rfqs, setRfqs] = useState([
    {
      id: 'RFQ001',
      route: 'DEL→MUM',
      currentBid: 12200,
      bidders: 14,
      timeLeft: 4920, // seconds
      type: 'Premium',
      cargoType: 'Electronics',
      weight: '5T',
      trend: 'up',
      change: 2.1,
      isHot: true
    },
    {
      id: 'RFQ002',
      route: 'BLR→CHN',
      currentBid: 11100,
      bidders: 8,
      timeLeft: 3300,
      type: 'Standard',
      cargoType: 'FMCG',
      weight: '3T',
      trend: 'up',
      change: 1.8,
      isHot: false
    },
    {
      id: 'RFQ003',
      route: 'MUM→PUN',
      currentBid: 10950,
      bidders: 20,
      timeLeft: 7800,
      type: 'Corporate',
      cargoType: 'Pharmaceuticals',
      weight: '2T',
      trend: 'down',
      change: -0.5,
      isHot: true
    }
  ]);

  // Update RFQ data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setRfqs(prev => prev.map(rfq => ({
        ...rfq,
        currentBid: rfq.currentBid + (Math.random() - 0.5) * 200,
        timeLeft: Math.max(0, rfq.timeLeft - 1),
        bidders: rfq.bidders + (Math.random() > 0.8 ? 1 : 0),
        change: rfq.change + (Math.random() - 0.5) * 0.5
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const canBid = (rfq) => {
    if (rfq.type === 'Premium' && !isVerified) return false;
    return rfq.timeLeft > 0;
  };

  return (
    <Card className="bg-white border-gray-200">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-gray-900">RFQ Market Depth</h2>
            <Badge className="bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
              Live
            </Badge>
          </div>
          <div className="text-sm text-gray-500">
            {rfqs.length} Active RFQs
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-8 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wide mb-4 pb-2 border-b">
          <div>RFQ ID</div>
          <div>Route</div>
          <div>Current Bid</div>
          <div>Change</div>
          <div>Bidders</div>
          <div>Time Left</div>
          <div>Type</div>
          <div>Action</div>
        </div>

        {/* RFQ Rows */}
        <div className="space-y-2">
          {rfqs.map((rfq) => (
            <div 
              key={rfq.id} 
              className={`grid grid-cols-8 gap-4 p-3 rounded-lg border transition-all hover:shadow-md ${
                rfq.isHot ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}
            >
              {/* RFQ ID */}
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm font-medium text-blue-600">{rfq.id}</span>
                {rfq.isHot && <Flame className="w-3 h-3 text-red-500" />}
              </div>

              {/* Route */}
              <div className="flex items-center space-x-1">
                <Truck className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-900">{rfq.route}</span>
              </div>

              {/* Current Bid */}
              <div className="font-semibold text-gray-900">
                ₹{rfq.currentBid.toLocaleString()}
              </div>

              {/* Change */}
              <div className={`flex items-center space-x-1 ${
                rfq.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {rfq.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span className="text-sm font-medium">
                  {rfq.change >= 0 ? '+' : ''}{rfq.change.toFixed(1)}%
                </span>
              </div>

              {/* Bidders */}
              <div className="flex items-center space-x-1 text-gray-600">
                <Users className="w-3 h-3" />
                <span className="text-sm">{rfq.bidders}</span>
              </div>

              {/* Time Left */}
              <div className={`flex items-center space-x-1 ${
                rfq.timeLeft < 3600 ? 'text-red-600' : 'text-orange-600'
              }`}>
                <Clock className="w-3 h-3" />
                <span className="text-sm font-medium">{formatTime(rfq.timeLeft)}</span>
              </div>

              {/* Type */}
              <div>
                <Badge 
                  className={`text-xs ${
                    rfq.type === 'Premium' ? 'bg-yellow-100 text-yellow-800' :
                    rfq.type === 'Corporate' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  {rfq.type === 'Premium' && <Shield className="w-3 h-3 mr-1" />}
                  {rfq.type}
                </Badge>
              </div>

              {/* Action */}
              <div>
                <Button
                  size="sm"
                  disabled={!canBid(rfq)}
                  onClick={() => onRFQSelect(rfq)}
                  className={`text-xs ${canBid(rfq) ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}
                >
                  {canBid(rfq) ? 'Bid Now' : 'Locked'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t text-sm text-gray-500">
          <span>Showing {rfqs.length} of {rfqs.length} RFQs</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Real-time updates every 2s</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RFQMarketDepth;
