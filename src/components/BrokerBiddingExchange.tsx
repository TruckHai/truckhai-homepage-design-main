import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Package, TrendingUp, Zap, RefreshCw, Clock, DollarSign, User, Eye, Award, Flame } from 'lucide-react';
import FreightMarketIndex from './bidding/FreightMarketIndex';
import RouteMarketTicker from './bidding/RouteMarketTicker';
import RouteBidChart from './bidding/RouteBidChart';
import BrokerHeader from './broker/BrokerHeader';
import BrokerMetrics from './broker/BrokerMetrics';

const BrokerBiddingExchange = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [autoAwardMode, setAutoAwardMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [expandedLoad, setExpandedLoad] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState('DEL→MUM');

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getTimeSinceUpdate = () => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000);
    return `${seconds}s ago`;
  };

  const activeLoads = [
    {
      id: "LD-001",
      route: "Delhi → Mumbai",
      cargo: "Electronics – 5000 kg",
      budget: "₹45,000 – ₹55,000",
      deadline: "6 hrs left",
      bidsReceived: 12,
      lowestBid: "₹48,000",
      status: "hot",
      bidHealth: 85,
      topBidders: [
        { name: "Rajesh Transport", bid: "₹48,000", rating: 4.8, verified: true },
        { name: "Kumar Logistics", bid: "₹49,200", rating: 4.6, verified: true },
        { name: "Singh Freight", bid: "₹50,500", rating: 4.4, verified: false }
      ]
    },
    {
      id: "LD-002", 
      route: "Bangalore → Chennai",
      cargo: "Furniture – 3000 kg",
      budget: "₹30,000 – ₹38,000",
      deadline: "2 days left",
      bidsReceived: 8,
      lowestBid: "₹32,500",
      status: "active",
      bidHealth: 62,
      topBidders: [
        { name: "Chennai Express", bid: "₹32,500", rating: 4.5, verified: true },
        { name: "South Logistics", bid: "₹34,000", rating: 4.3, verified: true },
        { name: "Rapid Transport", bid: "₹35,800", rating: 4.1, verified: false }
      ]
    },
    {
      id: "LD-003",
      route: "Mumbai → Pune",
      cargo: "Textiles – 2000 kg",
      budget: "₹18,000 – ₹25,000",
      deadline: "12 hrs left",
      bidsReceived: 15,
      lowestBid: "₹19,800",
      status: "hot",
      bidHealth: 92,
      topBidders: [
        { name: "Pune Express", bid: "₹19,800", rating: 4.9, verified: true },
        { name: "Western Logistics", bid: "₹20,500", rating: 4.7, verified: true },
        { name: "Fast Track", bid: "₹21,200", rating: 4.5, verified: true }
      ]
    }
  ];

  const getBidHealthColor = (health: number) => {
    if (health >= 80) return "bg-green-500";
    if (health >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getDeadlineColor = (deadline: string) => {
    if (deadline.includes("hrs") && parseInt(deadline) <= 6) return "text-red-600";
    if (deadline.includes("hrs") && parseInt(deadline) <= 24) return "text-orange-600";
    return "text-gray-600";
  };

  return (
    <DashboardLayout 
      userRole="broker" 
      userName="Freight Broker" 
      userId="BR123456" 
      isVerified={isVerified}
    >
      <div className="space-y-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <BrokerHeader 
          autoAwardMode={autoAwardMode}
          setAutoAwardMode={setAutoAwardMode}
          getTimeSinceUpdate={getTimeSinceUpdate}
        />

        <div className="px-6 space-y-6">
          {/* Freight Market Index */}
          <FreightMarketIndex />

          {/* Broker Metrics */}
          <BrokerMetrics />

          {/* Live Route Market */}
          <RouteMarketTicker onRouteSelect={setSelectedRoute} />

          {/* Route Bid Chart */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Live Bid Price Trends</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <RouteBidChart selectedRoute={selectedRoute} />
            </CardContent>
          </Card>

          {/* Verification Banner */}
          {!isVerified && (
            <Card className="border-red-200 bg-gradient-to-r from-red-50 to-red-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-red-100 p-3 rounded-xl">
                      <Package className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-800 text-lg">⚠️ Verification Required</h3>
                      <p className="text-red-700 text-sm">Complete verification to auto-award bids and access premium bidders</p>
                      <div className="mt-2 text-xs text-red-600">
                        <span>• Limit: 3 RFQs/day • Auto-award disabled • No access to high-rated vendors • Basic support only</span>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    Start Verification
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Loads - Bidding Status Table */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 flex items-center">
                <Package className="w-5 h-5 mr-2 text-blue-600" />
                Your Active Loads - Live Bidding Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeLoads.map((load) => (
                  <div key={load.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Main Row */}
                    <div className="bg-white p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="grid grid-cols-8 gap-4 items-center">
                        <div className="flex items-center space-x-2">
                          <div className={`w-1 h-12 rounded ${getBidHealthColor(load.bidHealth)}`}></div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <button className="text-red-600 hover:text-red-800 font-medium">
                                {load.id}
                              </button>
                              {load.status === 'hot' && <Flame className="w-4 h-4 text-orange-500" />}
                            </div>
                          </div>
                        </div>
                        <div className="text-gray-900 font-medium">{load.route}</div>
                        <div className="text-gray-700">{load.cargo}</div>
                        <div className="text-gray-700">{load.budget}</div>
                        <div className={`font-medium ${getDeadlineColor(load.deadline)}`}>
                          <Clock className="w-4 h-4 inline mr-1" />
                          {load.deadline}
                        </div>
                        <div>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {load.bidsReceived} bids
                          </Badge>
                        </div>
                        <div className="text-green-600 font-bold text-lg">{load.lowestBid}</div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => setExpandedLoad(expandedLoad === load.id ? null : load.id)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Bids
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded View */}
                    {expandedLoad === load.id && (
                      <div className="bg-gray-50 border-t border-gray-200 p-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Bid Trend Graph Placeholder */}
                          <div className="bg-white p-4 rounded-lg border">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                              📈 Bid Trend (Last 2 Hours)
                            </h4>
                            <div className="h-32 bg-gradient-to-r from-blue-50 to-green-50 rounded flex items-center justify-center">
                              <span className="text-gray-500">Live bid chart coming soon</span>
                            </div>
                          </div>

                          {/* Top 3 Bidders Leaderboard */}
                          <div className="bg-white p-4 rounded-lg border">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <Award className="w-4 h-4 mr-2 text-yellow-600" />
                              🥇 Top 3 Bidders
                            </h4>
                            <div className="space-y-3">
                              {load.topBidders.map((bidder, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                                    }`}>
                                      {index + 1}
                                    </div>
                                    <div>
                                      <div className="flex items-center space-x-2">
                                        <span className="font-medium">{bidder.name}</span>
                                        {bidder.verified && <Badge variant="outline" className="text-xs">✓ Verified</Badge>}
                                      </div>
                                      <div className="text-sm text-gray-600">⭐ {bidder.rating}</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold text-green-600">{bidder.bid}</div>
                                    <Button size="sm" variant="outline" className="mt-1 text-xs">
                                      Shortlist
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex space-x-3">
                          <Button className="bg-green-600 hover:bg-green-700 text-white">
                            <Award className="w-4 h-4 mr-2" />
                            Award Now
                          </Button>
                          <Button variant="outline">
                            Negotiate
                          </Button>
                          <Button variant="outline">
                            Extend Deadline
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Auto-Award Banner */}
          {autoAwardMode && (
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-800 text-lg">Auto-Award Mode Active</h3>
                      <p className="text-blue-700 text-sm">System will automatically award loads to the best bids based on your criteria</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-600 text-white px-3 py-1">
                    <Clock className="w-4 h-4 mr-2" />
                    Live
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BrokerBiddingExchange;
