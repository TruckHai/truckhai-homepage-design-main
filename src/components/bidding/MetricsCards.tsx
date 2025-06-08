
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, Target, Clock, Award } from 'lucide-react';

const MetricsCards = () => {
  const [metrics, setMetrics] = useState([
    {
      id: 'activeRFQs',
      icon: Activity,
      label: 'Active RFQs',
      value: '142',
      change: '+12',
      isPositive: true,
      sparklineData: Array.from({ length: 10 }, () => Math.random() * 40 + 10)
    },
    {
      id: 'liveBids',
      icon: Target,
      label: 'Live Bids',
      value: '1247',
      change: '+47',
      isPositive: true,
      sparklineData: Array.from({ length: 10 }, () => Math.random() * 60 + 20)
    },
    {
      id: 'avgResponse',
      icon: Clock,
      label: 'Avg Response Time',
      value: '4.2m',
      change: '-1.2m',
      isPositive: true,
      sparklineData: Array.from({ length: 10 }, () => Math.random() * 30 + 15)
    },
    {
      id: 'winRate',
      icon: Award,
      label: 'Win Rate',
      value: '23%',
      change: '+3%',
      isPositive: true,
      sparklineData: Array.from({ length: 10 }, () => Math.random() * 25 + 20)
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.id === 'liveBids' 
          ? String(parseInt(metric.value) + Math.floor(Math.random() * 3))
          : metric.value,
        sparklineData: [
          ...metric.sparklineData.slice(1),
          Math.random() * (metric.id === 'liveBids' ? 60 : 40) + 10
        ]
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderSparkline = (data) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    return (
      <div className="flex items-end space-x-0.5 h-8">
        {data.map((value, index) => {
          const height = ((value - min) / range) * 100;
          return (
            <div
              key={index}
              className="bg-blue-200 rounded-sm transition-all duration-300"
              style={{
                width: '3px',
                height: `${Math.max(height, 10)}%`
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.id} className="hover:shadow-lg transition-all duration-200 bg-white border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                <div className="flex items-end space-x-2">
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className={`flex items-center text-xs ${
                    metric.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.isPositive ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    <span>{metric.change}</span>
                  </div>
                </div>
              </div>
              <metric.icon className="w-8 h-8 text-blue-600" />
            </div>
            
            {/* Mini Sparkline Chart */}
            <div className="mt-3">
              {renderSparkline(metric.sparklineData)}
            </div>
            
            <p className="text-xs text-gray-500 mt-2">vs Last 1hr</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards;
