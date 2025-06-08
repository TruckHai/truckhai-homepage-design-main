
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, Clock } from 'lucide-react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const RouteBidChart = ({ selectedRoute }) => {
  const [timeRange, setTimeRange] = useState('1D');
  const [chartData, setChartData] = useState([]);
  const [routeStats, setRouteStats] = useState({
    openingBid: 12200,
    highestBid: 13100,
    lowestBid: 11800,
    currentBid: 12650,
    bidVolume: 47,
    change: 450,
    changePercent: 3.7
  });

  // Generate sample chart data
  useEffect(() => {
    const generateData = () => {
      const hours = timeRange === '1D' ? 24 : timeRange === '1W' ? 168 : 720;
      const interval = timeRange === '1D' ? 1 : timeRange === '1W' ? 4 : 24;
      
      const data = [];
      let basePrice = 12000;
      
      for (let i = 0; i < hours; i += interval) {
        const fluctuation = (Math.random() - 0.5) * 800;
        basePrice += fluctuation * 0.1;
        basePrice = Math.max(10000, Math.min(15000, basePrice)); // Keep within reasonable bounds
        
        const time = new Date();
        time.setHours(time.getHours() - (hours - i));
        
        data.push({
          time: timeRange === '1D' 
            ? time.getHours().toString().padStart(2, '0') + ':00'
            : time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          price: Math.round(basePrice),
          volume: Math.floor(Math.random() * 20) + 5,
          high: Math.round(basePrice + Math.random() * 300),
          low: Math.round(basePrice - Math.random() * 300)
        });
      }
      
      return data;
    };

    setChartData(generateData());
  }, [timeRange, selectedRoute]);

  // Update current stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setRouteStats(prev => ({
        ...prev,
        currentBid: Math.max(10000, Math.min(15000, prev.currentBid + (Math.random() - 0.5) * 100)),
        bidVolume: prev.bidVolume + Math.floor(Math.random() * 3),
        change: prev.change + (Math.random() - 0.5) * 50
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const chartConfig = {
    price: {
      label: "Bid Price",
      color: "hsl(217, 91%, 60%)",
    },
  };

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{`Time: ${label}`}</p>
          <p className="text-sm text-blue-600">{`Price: ₹${payload[0].value?.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-semibold text-gray-900">{selectedRoute}</h3>
          <Badge className="bg-green-100 text-green-800 px-3 py-1">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Live
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          {['1D', '1W', '1M'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="text-xs px-3 py-1"
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Route Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Current Bid</p>
          <p className="text-lg font-bold text-gray-900">₹{Math.round(routeStats.currentBid).toLocaleString()}</p>
          <div className={`flex items-center justify-center text-xs mt-1 ${
            routeStats.change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {routeStats.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            <span>{routeStats.change >= 0 ? '+' : ''}₹{Math.abs(Math.round(routeStats.change))}</span>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Opening</p>
          <p className="text-sm font-semibold text-gray-700">₹{routeStats.openingBid.toLocaleString()}</p>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">High</p>
          <p className="text-sm font-semibold text-green-600">₹{routeStats.highestBid.toLocaleString()}</p>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Low</p>
          <p className="text-sm font-semibold text-red-600">₹{routeStats.lowestBid.toLocaleString()}</p>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Volume</p>
          <p className="text-sm font-semibold text-blue-600">{Math.round(routeStats.bidVolume)} bids</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              domain={['dataMin - 200', 'dataMax + 200']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`}
            />
            <ChartTooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorPrice)"
            />
            <ReferenceLine 
              y={Math.round(routeStats.currentBid)} 
              stroke="#ef4444" 
              strokeDasharray="3 3"
              label={{ value: "Current", position: "insideTopRight" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-4">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center space-x-1">
          <BarChart3 className="w-3 h-3" />
          <span>Real-time bid tracking</span>
        </div>
      </div>
    </div>
  );
};

export default RouteBidChart;
