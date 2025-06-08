
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Package, TrendingUp, DollarSign, User } from 'lucide-react';

const BrokerMetrics = () => {
  const brokerMetrics = [
    { label: "Active Loads Posted", value: "15", icon: Package, color: "text-blue-600", subtext: "Currently available for bidding" },
    { label: "Total Bids Received", value: "127", icon: User, color: "text-green-600", subtext: "Total across all active loads" },
    { label: "Avg Commission", value: "₹12,500", icon: DollarSign, color: "text-purple-600", subtext: "Per confirmed booking" },
    { label: "Success Rate", value: "89%", icon: TrendingUp, color: "text-orange-600", subtext: "Awarded to posted loads ratio" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {brokerMetrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                  <p className="text-sm font-medium text-gray-900">{metric.label}</p>
                </div>
                <Icon className={`w-8 h-8 ${metric.color}`} />
              </div>
              <p className="text-xs text-gray-500">{metric.subtext}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default BrokerMetrics;
