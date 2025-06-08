
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock } from 'lucide-react';

interface AutoBidBannerProps {
  autoBidMode: boolean;
}

const AutoBidBanner = ({ autoBidMode }: AutoBidBannerProps) => {
  if (!autoBidMode) return null;

  return (
    <Card className="border-green-200 bg-gradient-to-r from-green-50 to-green-100 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800 text-lg">Auto-Bid Mode Active</h3>
              <p className="text-green-700 text-sm">System placing competitive bids on suitable loads automatically</p>
            </div>
          </div>
          <Badge className="bg-green-600 text-white px-3 py-1">
            <Clock className="w-4 h-4 mr-2" />
            Live
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoBidBanner;
