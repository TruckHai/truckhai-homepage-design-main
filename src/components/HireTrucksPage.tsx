
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ChevronRight, 
  Search, 
  MapPin, 
  Phone, 
  Truck, 
  Star, 
  Shield, 
  Navigation, 
  Calendar,
  Clock,
  Weight,
  Snowflake,
  TrendingUp,
  Filter,
  Map
} from "lucide-react";
import DashboardLayout from './DashboardLayout';

const HireTrucksPage = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filters, setFilters] = useState({
    truckType: '',
    availability: '',
    location: '',
    capacity: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [showHireModal, setShowHireModal] = useState(false);

  const trucks = [
    {
      id: 1,
      number: 'HR-55-AB-1234',
      owner: 'Rajesh Transport',
      verified: true,
      location: 'Delhi, DL',
      availableFrom: '2024-01-15 10:00',
      capacity: '10 tons',
      features: ['gps', 'refrigerated'],
      rate: '₹25/km',
      marketAverage: '₹27/km',
      trend: 'down',
      rating: 4.8,
      onTimePercentage: 95,
      totalTrips: 234,
      photo: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400',
      isTopRated: true,
      isCheapest: false
    },
    {
      id: 2,
      number: 'MH-12-CD-5678',
      owner: 'Mumbai Logistics',
      verified: true,
      location: 'Mumbai, MH',
      availableFrom: '2024-01-15 14:30',
      capacity: '15 tons',
      features: ['gps'],
      rate: '₹30/km',
      marketAverage: '₹32/km',
      trend: 'up',
      rating: 4.6,
      onTimePercentage: 88,
      totalTrips: 156,
      photo: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400',
      isTopRated: false,
      isCheapest: true
    }
  ];

  const filteredTrucks = trucks.filter(truck => 
    truck.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    truck.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleHire = (truck: any) => {
    setSelectedTruck(truck);
    setShowHireModal(true);
  };

  const confirmHire = () => {
    console.log('Hiring truck:', selectedTruck);
    setShowHireModal(false);
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? '↗️' : '↘️';
  };

  return (
    <DashboardLayout
      userRole="broker"
      userName="Rajesh Kumar"
      userId="BR123456"
      isVerified={false}
      verificationStatus="not-started"
    >
      <div className="space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 font-medium">
          <span className="cursor-pointer hover:text-red-500 transition-colors">Dashboard</span>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <span className="text-gray-900">Hire Verified Trucks</span>
        </div>

        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-red-500" />
                </div>
                Hire Verified Trucks
              </h1>
              <p className="text-gray-600 text-lg">Premium logistics marketplace • Real-time availability • Verified drivers</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="flex items-center space-x-2 px-3 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">{filteredTrucks.length} trucks available</span>
              </Badge>
            </div>
          </div>

          {/* Enhanced Filter Panel */}
          <Card className="bg-white border-0 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              {/* Primary Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search by truck number, owner name, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-lg bg-gray-50 border-gray-200 focus:border-red-500 rounded-xl"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 rounded-lg"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Smart Filters */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
                <div className="flex flex-wrap gap-4 flex-1">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-gray-500" />
                    <Select value={filters.truckType} onValueChange={(value) => setFilters(prev => ({ ...prev, truckType: value }))}>
                      <SelectTrigger className="w-40 rounded-lg border-gray-300">
                        <SelectValue placeholder="Truck Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mini">Mini (up to 2T)</SelectItem>
                        <SelectItem value="small">Small (2-5T)</SelectItem>
                        <SelectItem value="medium">Medium (5-10T)</SelectItem>
                        <SelectItem value="large">Large (10T+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <Select value={filters.availability} onValueChange={(value) => setFilters(prev => ({ ...prev, availability: value }))}>
                      <SelectTrigger className="w-40 rounded-lg border-gray-300">
                        <SelectValue placeholder="Availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">Available Now</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
                      <SelectTrigger className="w-40 rounded-lg border-gray-300">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhi">Delhi NCR</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Weight className="w-4 h-4 text-gray-500" />
                    <Select value={filters.capacity} onValueChange={(value) => setFilters(prev => ({ ...prev, capacity: value }))}>
                      <SelectTrigger className="w-40 rounded-lg border-gray-300">
                        <SelectValue placeholder="Capacity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Up to 5 tons</SelectItem>
                        <SelectItem value="10">Up to 10 tons</SelectItem>
                        <SelectItem value="15">Up to 15 tons</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* View Toggle */}
                <div className="flex items-center space-x-3">
                  <div className="flex bg-gray-100 rounded-xl p-1">
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={`rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      List View
                    </Button>
                    <Button
                      variant={viewMode === 'map' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('map')}
                      className={`rounded-lg ${viewMode === 'map' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                    >
                      <Map className="w-4 h-4 mr-2" />
                      Map View
                    </Button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {Object.values(filters).some(v => v) && (
                <div className="flex items-center space-x-2 mt-4">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {Object.entries(filters).map(([key, value]) => 
                    value && (
                      <Badge key={key} variant="outline" className="rounded-full">
                        {value}
                        <button className="ml-1 text-gray-400 hover:text-gray-600">×</button>
                      </Badge>
                    )
                  )}
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                    Clear all
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Premium Truck Cards */}
        {viewMode === 'list' ? (
          <div className="space-y-6">
            {filteredTrucks.map((truck) => (
              <Card key={truck.id} className="bg-white border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
                    {/* Main Truck Info */}
                    <div className="flex items-start space-x-6 flex-1">
                      <div className="relative">
                        <img
                          src={truck.photo}
                          alt={`Truck ${truck.number}`}
                          className="w-24 h-24 rounded-xl object-cover shadow-md"
                        />
                        {truck.verified && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Shield className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        {/* Truck Header */}
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{truck.number}</h3>
                          {truck.verified && (
                            <Badge className="bg-green-100 text-green-800 border-green-200 rounded-full">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {truck.isTopRated && (
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 rounded-full">
                              ⭐ Top Rated
                            </Badge>
                          )}
                          {truck.isCheapest && (
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200 rounded-full">
                              💰 Best Rate
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-3 font-medium">Owner: {truck.owner}</p>
                        
                        {/* Truck Details Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">Current: <strong>{truck.location}</strong></span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">Available: <strong>{truck.availableFrom}</strong></span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Weight className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">Capacity: <strong>{truck.capacity}</strong></span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-gray-700"><strong>{truck.rating}</strong> ({truck.totalTrips} trips)</span>
                          </div>
                        </div>

                        {/* Features & Badges */}
                        <div className="flex items-center space-x-2 mt-3">
                          {truck.features.includes('gps') && (
                            <Badge variant="outline" className="rounded-full border-blue-200 text-blue-700 bg-blue-50">
                              <Navigation className="w-3 h-3 mr-1" />
                              GPS Tracking
                            </Badge>
                          )}
                          {truck.features.includes('refrigerated') && (
                            <Badge variant="outline" className="rounded-full border-cyan-200 text-cyan-700 bg-cyan-50">
                              <Snowflake className="w-3 h-3 mr-1" />
                              Refrigerated
                            </Badge>
                          )}
                          <Badge variant="outline" className="rounded-full border-green-200 text-green-700 bg-green-50">
                            {truck.onTimePercentage}% On-Time
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Actions */}
                    <div className="flex flex-col lg:items-end space-y-4 lg:min-w-[200px]">
                      {/* Premium Pricing Display */}
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="text-3xl font-bold text-red-500">{truck.rate}</div>
                          <span className="text-sm">{getTrendIcon(truck.trend)}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Market avg: <span className="line-through">{truck.marketAverage}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{truck.rating}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600">{truck.onTimePercentage}% On-Time</span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-col space-y-2 w-full lg:w-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Contact Driver
                        </Button>
                        <Button
                          onClick={() => handleHire(truck)}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          Hire Now →
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-white border-0 shadow-lg rounded-2xl">
            <CardContent className="p-0">
              <div className="h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Map className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map View</h3>
                  <p className="text-gray-500 mb-1">Real-time truck locations and availability</p>
                  <p className="text-sm text-gray-400">Showing {filteredTrucks.length} verified trucks in selected area</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Pagination */}
        <div className="flex items-center justify-between pt-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select>
              <SelectTrigger className="w-48 rounded-lg">
                <SelectValue placeholder="Rate (Low → High)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rate-low">💰 Rate (Low → High)</SelectItem>
                <SelectItem value="rate-high">💰 Rate (High → Low)</SelectItem>
                <SelectItem value="rating">⭐ Rating (High → Low)</SelectItem>
                <SelectItem value="ontime">⏰ On-Time % (High → Low)</SelectItem>
                <SelectItem value="availability">🕒 Earliest Available</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="rounded-lg">Previous</Button>
            <span className="text-sm text-gray-600 px-3">Page 1 of 5</span>
            <Button variant="outline" size="sm" className="rounded-lg">Next</Button>
          </div>
        </div>

        {/* Bottom Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expected Timeline */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 rounded-xl">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 text-lg">Quick Response</h3>
                  <p className="text-blue-700">Get confirmed bookings within ~5 minutes of inquiry</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quality Assurance */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 rounded-xl">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-green-900 text-lg">Quality Assurance</h3>
                  <p className="text-green-700">All trucks are verified and GPS-tracked for your peace of mind</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Enhanced Hire Modal */}
      <Dialog open={showHireModal} onOpenChange={setShowHireModal}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-red-500" />
              <span>Hire Truck: {selectedTruck?.number}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Owner: {selectedTruck?.owner}</span>
                <Badge className="bg-green-100 text-green-800">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center space-x-2 mb-1">
                  <MapPin className="w-3 h-3" />
                  <span>Current: {selectedTruck?.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span>{selectedTruck?.rating} rating • {selectedTruck?.onTimePercentage}% on-time</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Pickup Date & Time</span>
                </label>
                <Input type="datetime-local" className="rounded-lg" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Rate Confirmation</label>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-500">{selectedTruck?.rate}</span>
                    <Badge className="bg-green-100 text-green-800">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Below Market
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Market average: {selectedTruck?.marketAverage}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Terms</label>
                <Select>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="advance">95% Advance / 5% On Delivery</SelectItem>
                    <SelectItem value="cod">Cash on Delivery</SelectItem>
                    <SelectItem value="credit">30-day Credit Terms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button variant="outline" onClick={() => setShowHireModal(false)} className="flex-1 rounded-lg">
                Cancel
              </Button>
              <Button onClick={confirmHire} className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg">
                Confirm Hire
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default HireTrucksPage;
