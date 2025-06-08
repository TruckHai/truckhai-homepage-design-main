
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Package, Info } from 'lucide-react';

interface LoadDetailsStepProps {
  formData: any;
  errors: Record<string, string>;
  onUpdate: (updates: any) => void;
  onNext: () => void;
}

const LoadDetailsStep = ({ formData, errors, onUpdate, onNext }: LoadDetailsStepProps) => {
  const generateNewLoadId = () => {
    const newId = `LD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    onUpdate({ loadId: newId });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <Package className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900">Load Details</h2>
        <p className="text-gray-600">Set up your load reference and type</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Load Reference ID */}
        <div className="space-y-3">
          <Label htmlFor="loadId" className="text-gray-900 font-semibold flex items-center space-x-2">
            <span>Load Reference ID</span>
            <Info className="w-4 h-4 text-gray-400" />
          </Label>
          <div className="flex items-center space-x-3">
            <Input
              id="loadId"
              value={formData.loadId || ''}
              disabled
              className="flex-1 bg-gray-50 font-mono text-sm"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={generateNewLoadId}
              className="p-2 border-gray-300 hover:border-red-400"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500">This ID will be used to track your load throughout the process</p>
          {errors.loadId && <p className="text-sm text-red-600">{errors.loadId}</p>}
        </div>

        {/* Load Type */}
        <div className="space-y-3">
          <Label className="text-gray-900 font-semibold">Load Type</Label>
          <Select value={formData.loadType || ''} onValueChange={(value) => onUpdate({ loadType: value })}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select load type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-load">
                <div className="space-y-1">
                  <div className="font-medium">Full Load (FTL)</div>
                  <div className="text-xs text-gray-500">Complete truck booking</div>
                </div>
              </SelectItem>
              <SelectItem value="ltl">
                <div className="space-y-1">
                  <div className="font-medium">Less Than Truckload (LTL)</div>
                  <div className="text-xs text-gray-500">Shared cargo space</div>
                </div>
              </SelectItem>
              <SelectItem value="express">
                <div className="space-y-1">
                  <div className="font-medium">Express Delivery</div>
                  <div className="text-xs text-gray-500">Priority shipping</div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.loadType && <p className="text-sm text-red-600">{errors.loadType}</p>}
        </div>
      </div>

      {/* Route Type Badge */}
      <div className="flex items-center justify-center space-x-4">
        <Badge variant="outline" className="px-4 py-2">
          <Package className="w-4 h-4 mr-2" />
          One-time Load
        </Badge>
        <span className="text-gray-400">or</span>
        <Badge variant="outline" className="px-4 py-2 border-blue-300 text-blue-600">
          Regular Route
        </Badge>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          disabled={!formData.loadId || !formData.loadType}
          className="bg-red-500 hover:bg-red-600 text-white px-8"
        >
          Continue to Locations
        </Button>
      </div>
    </div>
  );
};

export default LoadDetailsStep;
