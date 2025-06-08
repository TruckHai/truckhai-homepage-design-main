import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, FileText, Users, Clock, Shield } from 'lucide-react';

interface AdvancedSettingsStepProps {
  formData: any;
  errors: Record<string, string>;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const AdvancedSettingsStep = ({ formData, errors, onUpdate, onNext }: AdvancedSettingsStepProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <Settings className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900">Advanced Settings</h2>
        <p className="text-gray-600">Optional settings for enhanced load management</p>
      </div>

      <div className="space-y-6">
        {/* Special Instructions */}
        <div className="space-y-3">
          <Label className="text-gray-900 font-semibold flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Special Instructions</span>
          </Label>
          <Textarea
            placeholder="Any special handling instructions, loading/unloading requirements, or notes for the carrier..."
            value={formData.specialInstructions || ''}
            onChange={(e) => onUpdate({ specialInstructions: e.target.value })}
            className="h-24 resize-none"
          />
        </div>

        {/* Preferred Carriers */}
        <div className="space-y-3">
          <Label className="text-gray-900 font-semibold flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Preferred Carriers</span>
          </Label>
          <Select value={formData.preferredCarriers || ''} onValueChange={(value) => onUpdate({ preferredCarriers: value })}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select preferred carriers (if any)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">No preference - All verified carriers</SelectItem>
              <SelectItem value="premium">Premium carriers only</SelectItem>
              <SelectItem value="trusted">My trusted carriers</SelectItem>
              <SelectItem value="specific">Specific carrier list</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bid Settings */}
        <div className="space-y-4">
          <Label className="text-gray-900 font-semibold flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Bidding Preferences</span>
          </Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label className="text-sm text-gray-600">Bid Closing Time</Label>
              <Select value={formData.bidClosingTime || ''} onValueChange={(value) => onUpdate({ bidClosingTime: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Auto (24 hours)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6h">6 hours</SelectItem>
                  <SelectItem value="12h">12 hours</SelectItem>
                  <SelectItem value="24h">24 hours</SelectItem>
                  <SelectItem value="48h">48 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-sm text-gray-600">Minimum Bids Required</Label>
              <Select value={formData.minBids || ''} onValueChange={(value) => onUpdate({ minBids: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="3 bids minimum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 bid minimum</SelectItem>
                  <SelectItem value="3">3 bids minimum</SelectItem>
                  <SelectItem value="5">5 bids minimum</SelectItem>
                  <SelectItem value="10">10 bids minimum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-4">
          <Label className="text-gray-900 font-semibold flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Additional Options</span>
          </Label>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Checkbox 
                id="autoInsurance"
                checked={formData.autoInsurance || false}
                onCheckedChange={(checked) => onUpdate({ autoInsurance: checked })}
              />
              <Label htmlFor="autoInsurance" className="text-sm cursor-pointer flex-1">
                Auto-purchase transit insurance for this load
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Checkbox 
                id="priorityListing"
                checked={formData.priorityListing || false}
                onCheckedChange={(checked) => onUpdate({ priorityListing: checked })}
              />
              <Label htmlFor="priorityListing" className="text-sm cursor-pointer flex-1">
                Make this a priority listing (+₹50 fee)
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Checkbox 
                id="trackingRequired"
                checked={formData.trackingRequired || false}
                onCheckedChange={(checked) => onUpdate({ trackingRequired: checked })}
              />
              <Label htmlFor="trackingRequired" className="text-sm cursor-pointer flex-1">
                Require real-time GPS tracking
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* Finish Button */}
      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          className="bg-red-500 hover:bg-red-600 text-white px-8"
        >
          Review & Complete
        </Button>
      </div>
    </div>
  );
};

export default AdvancedSettingsStep;
