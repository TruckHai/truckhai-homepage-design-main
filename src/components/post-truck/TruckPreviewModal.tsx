
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TruckFormData } from '@/types/truck';
import { X, Truck, MapPin, Phone, Fuel, Shield, Star } from 'lucide-react';

interface TruckPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: TruckFormData;
}

const TruckPreviewModal = ({ isOpen, onClose, formData }: TruckPreviewModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">Truck Preview</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold">{formData.truckNumber || 'TRUCK-NUMBER'}</h3>
                <p className="text-red-100 mt-1">{formData.truckType || 'Truck Type'}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <div className="bg-white/20 rounded-lg px-3 py-1">
                <span className="text-sm font-medium">{formData.loadCapacity || '0'} tons</span>
              </div>
              <div className="bg-white/20 rounded-lg px-3 py-1">
                <span className="text-sm font-medium">{formData.availabilityStatus?.replace('-', ' ') || 'Not specified'}</span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Details */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 text-lg">Basic Details</h4>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Current Location</p>
                    <p className="font-medium">{formData.currentLocation || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Model & Year</p>
                    <p className="font-medium">
                      {formData.truckModel || 'Not specified'} 
                      {formData.truckYear && ` (${formData.truckYear})`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Fuel className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Fuel Type</p>
                    <p className="font-medium">{formData.fuelType || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operational Details */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 text-lg">Operational Details</h4>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Driver Contact</p>
                    <p className="font-medium">{formData.driverPhone || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xl">₹</span>
                  <div>
                    <p className="text-sm text-gray-500">Expected Advance</p>
                    <p className="font-medium">
                      {formData.expectedAdvance ? `₹${formData.expectedAdvance}` : 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">GPS Tracking</p>
                    <p className="font-medium">{formData.gpsTracker ? 'Available' : 'Not available'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Route Preferences */}
          {formData.routePreferences && formData.routePreferences.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 text-lg">Route Preferences</h4>
              <div className="flex flex-wrap gap-2">
                {formData.routePreferences.map((route, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium"
                  >
                    {route}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Special Features */}
          {formData.specialFeatures && formData.specialFeatures.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 text-lg">Special Features</h4>
              <div className="grid grid-cols-2 gap-2">
                {formData.specialFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg"
                  >
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Edit Details
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Confirm & Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TruckPreviewModal;
