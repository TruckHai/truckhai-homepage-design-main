
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { TruckFormData, specialFeatures } from '@/types/truck';
import { Phone, Shield, Plus, X, MapPin, Fuel } from 'lucide-react';

interface OperationalDetailsSectionProps {
  formData: TruckFormData;
  onUpdate: (updates: Partial<TruckFormData>) => void;
}

const OperationalDetailsSection = ({ formData, onUpdate }: OperationalDetailsSectionProps) => {
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [customRoute, setCustomRoute] = useState('');
  const [routes, setRoutes] = useState<string[]>([]);

  const suggestedRoutes = [
    'Mumbai → Delhi',
    'Ahmedabad → Bangalore',
    'Chennai → Kolkata',
    'Delhi → Mumbai',
    'Pune → Hyderabad'
  ];

  const handleVerifyPhone = () => {
    // Simulate phone verification
    setTimeout(() => {
      setIsPhoneVerified(true);
    }, 1000);
  };

  const addCustomRoute = () => {
    if (customRoute.trim() && !routes.includes(customRoute)) {
      setRoutes([...routes, customRoute]);
      onUpdate({ routePreferences: [...routes, customRoute] });
      setCustomRoute('');
    }
  };

  const removeRoute = (route: string) => {
    const updatedRoutes = routes.filter(r => r !== route);
    setRoutes(updatedRoutes);
    onUpdate({ routePreferences: updatedRoutes });
  };

  const addSuggestedRoute = (route: string) => {
    if (!routes.includes(route)) {
      const updatedRoutes = [...routes, route];
      setRoutes(updatedRoutes);
      onUpdate({ routePreferences: updatedRoutes });
    }
  };

  const toggleSpecialFeature = (feature: string) => {
    const currentFeatures = formData.specialFeatures || [];
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    onUpdate({ specialFeatures: updatedFeatures });
  };

  return (
    <div className="space-y-8">
      {/* Driver & Contact Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Driver Phone */}
        <div className="space-y-2">
          <Label htmlFor="driverPhone" className="text-sm font-semibold text-gray-700">
            Driver Phone Number
          </Label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="driverPhone"
                placeholder="+91 XXXXX XXXXX"
                value={formData.driverPhone}
                onChange={(e) => onUpdate({ driverPhone: e.target.value })}
                className="h-11 pl-10 border-gray-200"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleVerifyPhone}
              disabled={!formData.driverPhone || isPhoneVerified}
              className={`px-6 h-11 ${isPhoneVerified ? 'border-green-500 bg-green-50 text-green-600' : 'border-gray-200'}`}
            >
              {isPhoneVerified ? 'Verified' : 'Verify'}
            </Button>
          </div>
          {isPhoneVerified && (
            <p className="text-xs text-green-600 flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>Phone number verified successfully</span>
            </p>
          )}
        </div>

        {/* Expected Advance */}
        <div className="space-y-2">
          <Label htmlFor="expectedAdvance" className="text-sm font-semibold text-gray-700">
            Expected Advance Amount
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-500">
              ₹
            </span>
            <Input
              id="expectedAdvance"
              type="number"
              placeholder="10,000"
              value={formData.expectedAdvance}
              onChange={(e) => onUpdate({ expectedAdvance: e.target.value })}
              className="h-11 pl-8 border-gray-200"
            />
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700 font-medium">💡 Market Suggestion</p>
            <p className="text-xs text-blue-600 mt-1">₹8,000 - ₹12,000 based on current market rates for your truck type</p>
          </div>
        </div>

        {/* Fuel Type */}
        <div className="space-y-2">
          <Label htmlFor="fuelType" className="text-sm font-semibold text-gray-700">
            Fuel Type
          </Label>
          <Select value={formData.fuelType} onValueChange={(value) => onUpdate({ fuelType: value })}>
            <SelectTrigger className="h-11 border-gray-200">
              <div className="flex items-center space-x-2">
                <Fuel className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder="Select fuel type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="diesel">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Diesel</span>
                </div>
              </SelectItem>
              <SelectItem value="cng">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>CNG</span>
                </div>
              </SelectItem>
              <SelectItem value="electric">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Electric</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* GPS Tracker */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">GPS & Tracking</Label>
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl">
            <Checkbox
              id="gpsTracker"
              checked={formData.gpsTracker}
              onCheckedChange={(checked) => onUpdate({ gpsTracker: Boolean(checked) })}
              className="border-gray-300"
            />
            <div className="flex-1">
              <Label htmlFor="gpsTracker" className="font-medium text-gray-900 cursor-pointer">
                GPS Tracker Available
              </Label>
              <p className="text-xs text-gray-500">Enable real-time tracking for this truck</p>
            </div>
            <MapPin className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Route Preferences */}
      <div className="space-y-4">
        <Label className="text-sm font-semibold text-gray-700">Route Preferences</Label>
        
        {/* Suggested Routes */}
        <div className="space-y-3">
          <p className="text-sm text-gray-600">Popular Routes:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedRoutes.map((route) => (
              <Button
                key={route}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addSuggestedRoute(route)}
                disabled={routes.includes(route)}
                className={`text-xs ${routes.includes(route) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50 hover:border-blue-300'}`}
              >
                <Plus className="w-3 h-3 mr-1" />
                {route}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Route Input */}
        <div className="flex space-x-2">
          <Input
            placeholder="Add custom route (e.g., Mumbai → Pune)"
            value={customRoute}
            onChange={(e) => setCustomRoute(e.target.value)}
            className="flex-1 h-10 border-gray-200"
          />
          <Button
            type="button"
            onClick={addCustomRoute}
            disabled={!customRoute.trim()}
            className="px-4 h-10 bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Selected Routes */}
        {routes.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Selected Routes:</p>
            <div className="flex flex-wrap gap-2">
              {routes.map((route, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                >
                  <span className="text-sm font-medium text-red-700">{route}</span>
                  <button
                    type="button"
                    onClick={() => removeRoute(route)}
                    className="w-4 h-4 text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Special Features */}
      <div className="space-y-4">
        <Label className="text-sm font-semibold text-gray-700">Special Features</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specialFeatures.map((feature) => {
            const isSelected = (formData.specialFeatures || []).includes(feature);
            return (
              <div
                key={feature}
                className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => toggleSpecialFeature(feature)}
              >
                <Checkbox
                  checked={isSelected}
                  onChange={() => {}}
                  className="border-gray-300"
                />
                <div className="flex-1">
                  <Label className="font-medium text-gray-900 cursor-pointer">
                    {feature}
                  </Label>
                </div>
                {feature === 'Air Suspension' && <span className="text-lg">🚚</span>}
                {feature === 'Refrigerated' && <span className="text-lg">❄️</span>}
                {feature === 'CCTV Installed' && <span className="text-lg">📹</span>}
                {feature === 'Extra Security' && <span className="text-lg">🔒</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OperationalDetailsSection;
