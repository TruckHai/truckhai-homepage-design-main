
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Truck, Thermometer, Shield, MapPin, Users } from 'lucide-react';

interface VehicleRequirementsStepProps {
  formData: any;
  errors: Record<string, string>;
  onUpdate: (updates: any) => void;
  onNext: () => void;
}

const VehicleRequirementsStep = ({ formData, errors, onUpdate, onNext }: VehicleRequirementsStepProps) => {
  const specialRequirements = [
    { id: 'gps', label: 'GPS tracking mandatory', icon: MapPin },
    { id: 'verified', label: 'Verified driver only', icon: Shield },
    { id: 'refrigerated', label: 'Refrigerated truck', icon: Thermometer },
    { id: 'covered', label: 'Covered truck', icon: Shield },
    { id: 'assistance', label: 'Loading assistance', icon: Users }
  ];

  const handleSpecialRequirement = (reqId: string, checked: boolean) => {
    const current = formData.specialRequirements || [];
    if (checked) {
      onUpdate({ specialRequirements: [...current, reqId] });
    } else {
      onUpdate({ specialRequirements: current.filter((id: string) => id !== reqId) });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <Truck className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900">Vehicle Requirements</h2>
        <p className="text-gray-600">Specify the type of vehicle and special requirements</p>
      </div>

      <div className="space-y-6">
        {/* Truck Type */}
        <div className="space-y-3">
          <Label className="text-gray-900 font-semibold">Truck Type Required *</Label>
          <Select value={formData.truckType || ''} onValueChange={(value) => onUpdate({ truckType: value })}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select truck type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mini">
                <div className="space-y-1">
                  <div className="font-medium">Mini Truck</div>
                  <div className="text-xs text-gray-500">Up to 1 ton</div>
                </div>
              </SelectItem>
              <SelectItem value="small">
                <div className="space-y-1">
                  <div className="font-medium">Small Truck</div>
                  <div className="text-xs text-gray-500">1-3 tons</div>
                </div>
              </SelectItem>
              <SelectItem value="medium">
                <div className="space-y-1">
                  <div className="font-medium">Medium Truck</div>
                  <div className="text-xs text-gray-500">3-9 tons</div>
                </div>
              </SelectItem>
              <SelectItem value="large">
                <div className="space-y-1">
                  <div className="font-medium">Large Truck</div>
                  <div className="text-xs text-gray-500">9+ tons</div>
                </div>
              </SelectItem>
              <SelectItem value="container">
                <div className="space-y-1">
                  <div className="font-medium">Container Truck</div>
                  <div className="text-xs text-gray-500">20ft/40ft containers</div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.truckType && <p className="text-sm text-red-600">{errors.truckType}</p>}
        </div>

        {/* Special Requirements */}
        <div className="space-y-4">
          <Label className="text-gray-900 font-semibold">Special Requirements</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialRequirements.map((requirement) => {
              const IconComponent = requirement.icon;
              return (
                <div key={requirement.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox 
                    id={requirement.id}
                    checked={(formData.specialRequirements || []).includes(requirement.id)}
                    onCheckedChange={(checked) => handleSpecialRequirement(requirement.id, checked as boolean)}
                  />
                  <IconComponent className="w-4 h-4 text-gray-600" />
                  <Label htmlFor={requirement.id} className="text-sm cursor-pointer flex-1">
                    {requirement.label}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          disabled={!formData.truckType}
          className="bg-red-500 hover:bg-red-600 text-white px-8"
        >
          Continue to Contact & Budget
        </Button>
      </div>
    </div>
  );
};

export default VehicleRequirementsStep;
