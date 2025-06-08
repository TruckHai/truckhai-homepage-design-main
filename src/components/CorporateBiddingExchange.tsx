
import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import FreightMarketIndex from './bidding/FreightMarketIndex';
import RouteMarketTicker from './bidding/RouteMarketTicker';
import RouteBidChart from './bidding/RouteBidChart';
import RFQMarketDepth from './bidding/RFQMarketDepth';
import MetricsCards from './bidding/MetricsCards';
import VerificationBanner from './bidding/VerificationBanner';
import AdvancedFilters from './bidding/AdvancedFilters';
import BiddingPortfolio from './bidding/BiddingPortfolio';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Activity, TrendingUp, Zap, RefreshCw } from 'lucide-react';

const CorporateBiddingExchange = () => {
  const [selectedRFQ, setSelectedRFQ] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [filters, setFilters] = useState({
    route: '',
    cargoType: '',
    budgetRange: [0, 100000],
    deadline: '',
    corporateOnly: false
  });
  const [autoBidMode, setAutoBidMode] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState('DEL→MUM');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Update last refresh time every few seconds
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

  return (
    <DashboardLayout 
      userRole="corporate" 
      userName="Corporate User" 
      userId="CU123456" 
      isVerified={isVerified}
    >
      <div className="space-y-6 bg-gray-50 min-h-screen">
        {/* Sticky Refresh Banner */}
        <div className="sticky top-0 z-50 bg-gray-900 text-white px-6 py-3 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">🟢 Real-Time Mode</span>
            </div>
            <span className="text-gray-300">Last Synced: {getTimeSinceUpdate()}</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <Label htmlFor="auto-mode" className="text-sm">Auto-Bid</Label>
              <Switch
                id="auto-mode"
                checked={autoBidMode}
                onCheckedChange={setAutoBidMode}
              />
            </div>
            <Button size="sm" variant="outline" className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Freight Market Index Header */}
        <div className="px-6">
          <FreightMarketIndex />
        </div>

        {/* Route Market Ticker */}
        <div className="px-6">
          <RouteMarketTicker onRouteSelect={setSelectedRoute} />
        </div>

        {/* Main 3-Column Grid Layout */}
        <div className="px-6 grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* Center Column - Main Content */}
          <div className="xl:col-span-8 space-y-6">
            
            {/* Route Bid Chart Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>📈 Live Bid Price Trend (Last 24 hrs)</span>
                </h2>
                <p className="text-sm text-gray-600 mt-1">Real-time bidding activity for {selectedRoute}</p>
              </div>
              <div className="p-0">
                <RouteBidChart selectedRoute={selectedRoute} />
              </div>
            </div>
            
            {/* Metrics Cards Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <span>Market Metrics</span>
                </h3>
                <p className="text-sm text-gray-600 mt-1">Key performance indicators</p>
              </div>
              <MetricsCards />
            </div>
            
            {/* Verification Banner */}
            <VerificationBanner isVerified={isVerified} onVerificationComplete={() => setIsVerified(true)} />
            
            {/* Advanced Filters */}
            <AdvancedFilters filters={filters} onFiltersChange={setFilters} />
            
            {/* RFQ Market Depth Table */}
            <RFQMarketDepth 
              filters={filters}
              isVerified={isVerified}
              onRFQSelect={setSelectedRFQ}
            />
          </div>

          {/* Right Column - Portfolio & Stats */}
          <div className="xl:col-span-4">
            <div className="sticky top-32">
              <BiddingPortfolio isVerified={isVerified} autoBidMode={autoBidMode} />
            </div>
          </div>
        </div>

        {/* Auto-Bid Status Banner */}
        {autoBidMode && (
          <div className="px-6">
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-800 text-lg">Auto-Bid Mode Active</h3>
                      <p className="text-blue-700 text-sm">System monitoring RFQs and placing bids within your limits</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-600 text-white px-3 py-1">
                    <Activity className="w-4 h-4 mr-2" />
                    Live
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CorporateBiddingExchange;
