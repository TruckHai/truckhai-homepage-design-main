import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Award, Clock, Activity, Zap } from 'lucide-react';

const BiddingPortfolio = ({ isVerified, autoBidMode }) => {
  const [portfolio, setPortfolio] = useState({
    totalBidsPlaced: 24,
    activeBids: 8,
    wonBids: 16,
    winRate: 67,
    totalValue: 285000,
    avgBidValue: 11875,
    bestRoute: 'DEL→MUM',
    streak: 3
  });

  const [activeBids, setActiveBids] = useState([
    { id: 'RFQ001', route: 'DEL→MUM', bidAmount: 12200, position: 2, timeLeft: 3600, status: 'leading' },
    { id: 'RFQ005', route: 'BLR→CHN', bidAmount: 9800, position: 5, timeLeft: 7200, status: 'trailing' },
    { id: 'RFQ012', route: 'MUM→PUN', bidAmount: 8500, position: 1, timeLeft: 1800, status: 'winning' }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { type: 'won', route: 'HYD→VIZ', amount: 15200, time: '2m ago' },
    { type: 'bid', route: 'DEL→MUM', amount: 12200, time: '5m ago' },
    { type: 'lost', route: 'CHN→BLR', amount: 9800, time: '12m ago' }
  ]);

  // Update portfolio data
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBids(prev => prev.map(bid => ({
        ...bid,
        timeLeft: Math.max(0, bid.timeLeft - 1),
        position: bid.position + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0)
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'winning': return 'bg-green-100 text-green-800';
      case 'leading': return 'bg-blue-100 text-blue-800';
      case 'trailing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Portfolio Summary */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-blue-900">Your Portfolio</h2>
            {autoBidMode && (
              <Badge className="bg-blue-600 text-white">
                <Zap className="w-3 h-3 mr-1" />
                Auto
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-900">₹{(portfolio.totalValue / 1000).toFixed(0)}K</p>
              <p className="text-xs text-blue-700">Total Value</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-900">{portfolio.winRate}%</p>
              <p className="text-xs text-blue-700">Win Rate</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-blue-700">Active Bids</span>
              <span className="font-medium text-blue-900">{portfolio.activeBids}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-700">Won Today</span>
              <span className="font-medium text-blue-900">{portfolio.wonBids}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-700">Best Route</span>
              <span className="font-medium text-blue-900">{portfolio.bestRoute}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-blue-700">Win Rate Progress</span>
              <span className="text-blue-900">{portfolio.winRate}%</span>
            </div>
            <Progress value={portfolio.winRate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Active Bids */}
      <Card className="bg-white border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Active Bids</h3>
            <Badge variant="outline">{activeBids.length}</Badge>
          </div>

          <div className="space-y-3">
            {activeBids.map((bid) => (
              <div key={bid.id} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm text-blue-600">{bid.id}</span>
                    <Badge className={getStatusColor(bid.status)}>
                      #{bid.position}
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500">{formatTime(bid.timeLeft)} left</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{bid.route}</p>
                    <p className="text-sm text-gray-600">₹{bid.bidAmount.toLocaleString()}</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    Update
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          </div>

          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'won' ? 'bg-green-500' :
                  activity.type === 'bid' ? 'bg-blue-500' : 'bg-red-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    {activity.type === 'won' ? 'Won' : activity.type === 'bid' ? 'Bid on' : 'Lost'} {activity.route}
                  </p>
                  <p className="text-xs text-gray-500">₹{activity.amount.toLocaleString()} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white border-gray-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Target className="w-4 h-4 mr-2" />
              Place New Bid
            </Button>
            <Button variant="outline" className="w-full">
              <Award className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full">
              <TrendingUp className="w-4 h-4 mr-2" />
              Market Trends
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BiddingPortfolio;
