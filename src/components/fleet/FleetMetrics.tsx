
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Truck, TrendingUp, DollarSign, Package } from 'lucide-react';

const FleetMetrics = () => {
  const fleetMetrics = [
    { label: "Available Trucks", value: "18", icon: Truck, color: "text-blue-600" },
    { label: "Active Bids", value: "8", icon: Package, color: "text-green-600" },
    { label: "Potential Earnings", value: "₹2,45,000", icon: DollarSign, color: "text-purple-600" },
    { label: "Bid Success Rate", value: "76%", icon: TrendingUp, color: "text-orange-600" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {fleetMetrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                </div>
                <Icon className={`w-8 h-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default FleetMetrics;
