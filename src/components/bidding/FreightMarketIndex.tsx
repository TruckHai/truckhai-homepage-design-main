
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from 'lucide-react';

const FreightMarketIndex = () => {
  const [indexData, setIndexData] = useState({
    value: 12350.75,
    change: 152.30,
    changePercent: 1.25,
    isPositive: true,
    volume: 1247,
    timestamp: new Date()
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIndexData(prev => {
        const fluctuation = (Math.random() - 0.5) * 50;
        const newValue = prev.value + fluctuation;
        const change = newValue - 12350.75;
        const changePercent = (change / 12350.75) * 100;
        
        return {
          value: newValue,
          change: Math.abs(change),
          changePercent: Math.abs(changePercent),
          isPositive: change >= 0,
          volume: prev.volume + Math.floor(Math.random() * 3),
          timestamp: new Date()
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  return (
    <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div>
              <h1 className="text-sm text-gray-300 mb-1">TruckHai Freight Index</h1>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold">₹{indexData.value.toFixed(2)}</span>
                <div className={`flex items-center space-x-1 ${indexData.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {indexData.isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  <span className="text-lg font-semibold">
                    {indexData.isPositive ? '+' : '-'}₹{indexData.change.toFixed(2)}
                  </span>
                  <span className="text-sm">
                    ({indexData.isPositive ? '+' : '-'}{indexData.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
            
            {/* Mini Sparkline */}
            <div className="hidden md:block">
              <div className="w-32 h-16 bg-gray-700 rounded flex items-end justify-between p-2">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 bg-gradient-to-t ${indexData.isPositive ? 'from-green-600 to-green-400' : 'from-red-600 to-red-400'} rounded-full`}
                    style={{ height: `${20 + Math.random() * 80}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-gray-300 text-sm">Updated: {formatTime(indexData.timestamp)} IST</p>
            <p className="text-gray-400 text-xs">Volume: {indexData.volume.toLocaleString()} bids</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FreightMarketIndex;
