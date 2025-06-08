
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Truck, Package, MapPin, Flame, Shield, Users } from 'lucide-react';

const LiveRFQFeed = ({ filters, isVerified, onRFQSelect }) => {
  const [rfqs, setRfqs] = useState([
    {
      id: 'RFQ001',
      route: { from: 'Delhi', to: 'Mumbai', code: 'DEL→MUM' },
      cargoType: 'Electronics',
      weight: '5000 kg',
      budgetRange: { min: 42000, max: 47000 },
      deadline: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours
      bidsReceived: 12,
      isHighDemand: true,
      isPremium: true,
      corporateClient: 'Tech Corp Ltd.',
      trustRating: 4.8
    },
    {
      id: 'RFQ002',
      route: { from: 'Bangalore', to: 'Chennai', code: 'BLR→CHN' },
      cargoType: 'FMCG',
      weight: '3000 kg',
      budgetRange: { min: 25000, max: 30000 },
      deadline: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours
      bidsReceived: 8,
      isHighDemand: false,
      isPremium: false,
      corporateClient: 'Retail Solutions',
      trustRating: 4.5
    },
    {
      id: 'RFQ003',
      route: { from: 'Mumbai', to: 'Pune', code: 'MUM→PUN' },
      cargoType: 'Pharmaceuticals',
      weight: '2000 kg',
      budgetRange: { min: 15000, max: 20000 },
      deadline: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
      bidsReceived: 15,
      isHighDemand: true,
      isPremium: true,
      corporateClient: 'Pharma Global',
      trustRating: 4.9
    }
  ]);

  const [timeRemaining, setTimeRemaining] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeRemaining = {};
      rfqs.forEach(rfq => {
        const now = new Date();
        const deadlineTime = new Date(rfq.deadline).getTime();
        const nowTime = now.getTime();
        const diff = deadlineTime - nowTime;
        
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          newTimeRemaining[rfq.id] = `${hours}h ${minutes}m`;
        } else {
          newTimeRemaining[rfq.id] = 'Expired';
        }
      });
      setTimeRemaining(newTimeRemaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [rfqs]);

  const formatBudgetRange = (range) => {
    return `₹${(range.min / 1000).toFixed(0)}K - ₹${(range.max / 1000).toFixed(0)}K`;
  };

  const canBid = (rfq) => {
    if (rfq.isPremium && !isVerified) return false;
    return timeRemaining[rfq.id] !== 'Expired';
  };

  return (
    <div className="space-y-4">
      {/* Live Feed Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h2 className="text-lg font-semibold">Live RFQ Feed</h2>
          <Badge variant="outline" className="text-xs">
            {rfqs.length} Active
          </Badge>
        </div>
        <Button variant="outline" size="sm">
          <Clock className="w-4 h-4 mr-2" />
          Auto-refresh: ON
        </Button>
      </div>

      {/* RFQ Cards */}
      <div className="grid gap-4">
        {rfqs.map((rfq) => (
          <Card 
            key={rfq.id} 
            className={`hover:shadow-lg transition-all duration-200 border-l-4 ${
              rfq.isHighDemand ? 'border-l-red-500' : 'border-l-blue-500'
            } ${!canBid(rfq) ? 'opacity-60' : ''}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Truck className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm font-medium text-blue-600">
                        {rfq.id}
                      </span>
                      {rfq.isPremium && (
                        <Badge className="bg-gold text-black text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                      {rfq.isHighDemand && (
                        <Badge className="bg-red-100 text-red-700 text-xs">
                          <Flame className="w-3 h-3 mr-1" />
                          High Demand
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{rfq.corporateClient}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    timeRemaining[rfq.id] === 'Expired' ? 'text-red-600' : 'text-orange-600'
                  }`}>
                    <Clock className="w-4 h-4 inline mr-1" />
                    {timeRemaining[rfq.id]}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    <Users className="w-3 h-3 inline mr-1" />
                    {rfq.bidsReceived} bids
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{rfq.route.code}</p>
                    <p className="text-xs text-gray-600">{rfq.route.from} → {rfq.route.to}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{rfq.cargoType}</p>
                    <p className="text-xs text-gray-600">{rfq.weight}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 text-gray-500">₹</div>
                  <div>
                    <p className="text-sm font-medium">{formatBudgetRange(rfq.budgetRange)}</p>
                    <p className="text-xs text-gray-600">Budget Range</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">★ {rfq.trustRating}</p>
                    <p className="text-xs text-gray-600">Trust Rating</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {!canBid(rfq) && rfq.isPremium && !isVerified && (
                    <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                      Verification Required
                    </Badge>
                  )}
                  {timeRemaining[rfq.id] === 'Expired' && (
                    <Badge variant="outline" className="text-red-600 border-red-300">
                      Bidding Closed
                    </Badge>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRFQSelect(rfq)}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    disabled={!canBid(rfq)}
                    onClick={() => onRFQSelect(rfq)}
                    className={canBid(rfq) ? 'bg-red-600 hover:bg-red-700' : ''}
                  >
                    {canBid(rfq) ? 'Place Bid' : 'Cannot Bid'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center py-4">
        <Button variant="outline">
          Load More RFQs
        </Button>
      </div>
    </div>
  );
};

export default LiveRFQFeed;
