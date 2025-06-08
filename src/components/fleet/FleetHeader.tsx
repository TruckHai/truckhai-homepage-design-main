
import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RefreshCw } from 'lucide-react';

interface FleetHeaderProps {
  autoBidMode: boolean;
  setAutoBidMode: (value: boolean) => void;
  getTimeSinceUpdate: () => string;
}

const FleetHeader = ({ autoBidMode, setAutoBidMode, getTimeSinceUpdate }: FleetHeaderProps) => {
  return (
    <div className="sticky top-0 z-50 bg-gray-900 text-white px-6 py-3 flex items-center justify-between text-sm">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 font-medium">🚛 Fleet Bidding Mode</span>
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
  );
};

export default FleetHeader;
