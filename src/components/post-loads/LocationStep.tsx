
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Calendar, Clock, Navigation, Map } from 'lucide-react';

interface LocationStepProps {
  formData: any;
  errors: Record<string, string>;
  onUpdate: (updates: any) => void;
  onNext: () => void;
}

const LocationStep = ({ formData, errors, onUpdate, onNext }: LocationStepProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <MapPin className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900">Pickup & Delivery</h2>
        <p className="text-gray-600">Set your pickup and delivery locations with dates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pickup Location */}
        <div className="space-y-4">
          <Label className="text-gray-900 font-semibold">Pickup Location *</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Enter pickup location"
              value={formData.pickupLocation || ''}
              onChange={(e) => onUpdate({ pickupLocation: e.target.value })}
              className="pl-10 h-12"
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Navigation className="w-3 h-3 mr-1" />
              Current Location
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Map className="w-3 h-3 mr-1" />
              Map View
            </Button>
          </div>
          {errors.pickupLocation && <p className="text-sm text-red-600">{errors.pickupLocation}</p>}
        </div>

        {/* Delivery Location */}
        <div className="space-y-4">
          <Label className="text-gray-900 font-semibold">Delivery Location *</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Enter delivery location"
              value={formData.deliveryLocation || ''}
              onChange={(e) => onUpdate({ deliveryLocation: e.target.value })}
              className="pl-10 h-12"
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Navigation className="w-3 h-3 mr-1" />
              Current Location
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Map className="w-3 h-3 mr-1" />
              Map View
            </Button>
          </div>
          {errors.deliveryLocation && <p className="text-sm text-red-600">{errors.deliveryLocation}</p>}
        </div>
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label className="text-gray-900 font-semibold">Pickup Date & Time *</Label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                type="date"
                value={formData.pickupDate || ''}
                onChange={(e) => onUpdate({ pickupDate: e.target.value })}
                className="pl-10 h-12"
              />
            </div>
            <div className="relative flex-1">
              <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                type="time"
                value={formData.pickupTime || ''}
                onChange={(e) => onUpdate({ pickupTime: e.target.value })}
                className="pl-10 h-12"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="pickup-flexible" />
            <Label htmlFor="pickup-flexible" className="text-sm text-gray-600">Flexible timing</Label>
          </div>
          {errors.pickupDate && <p className="text-sm text-red-600">{errors.pickupDate}</p>}
        </div>

        <div className="space-y-4">
          <Label className="text-gray-900 font-semibold">Delivery Date & Time *</Label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                type="date"
                value={formData.deliveryDate || ''}
                onChange={(e) => onUpdate({ deliveryDate: e.target.value })}
                className="pl-10 h-12"
              />
            </div>
            <div className="relative flex-1">
              <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                type="time"
                value={formData.deliveryTime || ''}
                onChange={(e) => onUpdate({ deliveryTime: e.target.value })}
                className="pl-10 h-12"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="delivery-flexible" />
            <Label htmlFor="delivery-flexible" className="text-sm text-gray-600">Flexible timing</Label>
          </div>
          {errors.deliveryDate && <p className="text-sm text-red-600">{errors.deliveryDate}</p>}
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          disabled={!formData.pickupLocation || !formData.deliveryLocation || !formData.pickupDate || !formData.deliveryDate}
          className="bg-red-500 hover:bg-red-600 text-white px-8"
        >
          Continue to Cargo Info
        </Button>
      </div>
    </div>
  );
};

export default LocationStep;
