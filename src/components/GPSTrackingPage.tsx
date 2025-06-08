
import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Truck, Phone, FileText, Share2, AlertTriangle, Download, Filter, Bell, Clock, Shield, User, Navigation, TrendingUp, Settings } from 'lucide-react';

const GPSTrackingPage = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState('list'); // 'map' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const trackingData = [
    {
      truckNo: 'GJ-01-AB-1234',
      currentLocation: 'Mumbai, Maharashtra',
      lastUpdated: '2 min ago',
      route: 'Delhi → Mumbai',
      progress: 65,
      eta: 'Tomorrow 2:30 PM',
      status: 'On-time',
      statusColor: 'bg-green-500',
      speed: '65 km/h',
      driver: 'Rajesh Kumar',
      driverPhone: '+91-98765-XXXXX',
      broker: 'ABC Logistics',
      brokerRating: 4.8,
      loadDescription: 'Electronics',
      loadValue: '₹5,00,000',
      insured: true,
      gpsSignal: 'strong'
    },
    {
      truckNo: 'GJ-01-CD-5678',
      currentLocation: 'Pune, Maharashtra',
      lastUpdated: '5 min ago',
      route: 'Bangalore → Delhi',
      progress: 45,
      eta: 'Day After Tomorrow 6:00 PM',
      status: 'Delayed',
      statusColor: 'bg-yellow-500',
      speed: '55 km/h',
      driver: 'Suresh Patel',
      driverPhone: '+91-98123-XXXXX',
      broker: 'XYZ Transport',
      brokerRating: 4.6,
      loadDescription: 'Textiles',
      loadValue: '₹3,50,000',
      insured: true,
      gpsSignal: 'weak'
    }
  ];

  const globalStats = {
    onTime: 3,
    delayed: 1,
    critical: 0
  };

  const handleCallDriver = (phone: string) => {
    toast({ title: "Calling Driver", description: `Initiating call to ${phone}` });
  };

  const handleShareLocation = (truckNo: string) => {
    toast({ title: "Location Shared", description: `Live location for ${truckNo} has been shared` });
  };

  const handleReportIssue = (truckNo: string) => {
    toast({ title: "Issue Reported", description: `Issue reported for truck ${truckNo}`, variant: "destructive" });
  };

  return (
    <DashboardLayout 
      userRole="fleet" 
      userName="Fleet Owner" 
      userId="FO123456" 
      isVerified={true}
    >
      <div className="space-y-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600">
          Dashboard &gt; Live Tracking
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            Live Truck Tracking Dashboard
          </h1>
          <p className="text-lg text-gray-600">Real-time visibility into your active trucks, powered by verified GPS integrations</p>
        </div>

        {/* Global Overview Top Bar */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-gray-50 to-white rounded-3xl">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Status Overview */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-green-600">On-Time: {globalStats.onTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-yellow-600">Delayed: {globalStats.delayed}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="font-semibold text-red-600">Critical: {globalStats.critical}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                {/* View Toggle */}
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'map' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('map')}
                    className={viewMode === 'map' ? 'bg-red-500 hover:bg-red-600 text-white' : ''}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Map View
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-red-500 hover:bg-red-600 text-white' : ''}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    List View
                  </Button>
                </div>

                {/* Search */}
                <Input
                  placeholder="Search truck number, driver..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />

                {/* Filter */}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>

                {/* Alerts */}
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Alerts
                </Button>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="on-time">On-Time</SelectItem>
                      <SelectItem value="delayed">Delayed</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Route" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Routes</SelectItem>
                      <SelectItem value="delhi-mumbai">Delhi → Mumbai</SelectItem>
                      <SelectItem value="bangalore-delhi">Bangalore → Delhi</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Broker" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Brokers</SelectItem>
                      <SelectItem value="abc-logistics">ABC Logistics</SelectItem>
                      <SelectItem value="xyz-transport">XYZ Transport</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Speed Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Speeds</SelectItem>
                      <SelectItem value="0-40">0-40 km/h</SelectItem>
                      <SelectItem value="40-80">40-80 km/h</SelectItem>
                      <SelectItem value="80+">80+ km/h</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Map View */}
        {viewMode === 'map' && (
          <Card className="shadow-xl border-0 rounded-3xl">
            <CardContent className="p-0">
              <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg mb-2">Interactive Live Tracking Map</p>
                  <p className="text-sm text-gray-500">Real-time truck positions with route overlays</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* List View - Live Summary Cards */}
        {viewMode === 'list' && (
          <div className="space-y-6">
            {trackingData.map((truck) => (
              <Card key={truck.truckNo} className="shadow-xl border-0 bg-white rounded-3xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 ${truck.statusColor} rounded-full ${truck.gpsSignal === 'strong' ? 'animate-pulse' : ''}`}></div>
                      <div>
                        <CardTitle className="text-xl flex items-center gap-3">
                          <Truck className="w-6 h-6 text-red-500" />
                          Truck: {truck.truckNo}
                          <span className="text-base font-normal text-gray-500">|</span>
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <span className="text-base font-normal">{truck.route}</span>
                        </CardTitle>
                        
                        {/* Progress Bar */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Progress</span>
                            <span className="text-sm font-semibold text-red-600">{truck.progress}% complete</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500" 
                              style={{ width: `${truck.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* GPS Ping Status */}
                        <div className="flex items-center space-x-2 mt-2">
                          <div className={`w-2 h-2 rounded-full ${truck.gpsSignal === 'strong' ? 'bg-green-400 animate-ping' : 'bg-yellow-400'}`}></div>
                          <span className="text-sm text-gray-500">GPS: Last updated {truck.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCallDriver(truck.driverPhone)}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Driver
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Trip Timeline
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-600">ETA</p>
                          <p className="font-semibold">{truck.eta}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="text-sm text-gray-600">Speed</p>
                          <p className="font-semibold">{truck.speed}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-purple-500" />
                        <div>
                          <p className="text-sm text-gray-600">Load</p>
                          <p className="font-semibold">{truck.loadDescription} – {truck.loadValue}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-600">Insurance</p>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {truck.insured ? 'Active ✅' : 'Inactive ❌'}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Navigation className="w-5 h-5 text-red-500" />
                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <Badge 
                            variant="outline" 
                            className={`${truck.statusColor} text-white border-0 ${truck.status === 'On-time' ? 'animate-pulse' : ''}`}
                          >
                            {truck.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Driver</p>
                          <p className="font-semibold">{truck.driver} ({truck.driverPhone})</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="text-sm text-gray-600">Broker</p>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">{truck.broker}</span>
                            <Badge variant="outline">⭐ {truck.brokerRating}/5</Badge>
                            <Badge variant="outline" className="text-green-600 border-green-600">✅ Verified</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-4">
                        <p className="text-sm text-gray-600 mb-3">Actions</p>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleShareLocation(truck.truckNo)}
                            className="w-full"
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share Location
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <MapPin className="w-4 h-4 mr-2" />
                            View Route
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => handleReportIssue(truck.truckNo)}
                          >
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Report Issue
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <Settings className="w-4 h-4 mr-2" />
                            Full Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Bulk Tracking Controls */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-gray-50 to-white rounded-3xl">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <Button className="bg-red-500 hover:bg-red-600">
                  <Download className="w-4 h-4 mr-2" />
                  Export Tracking Report
                </Button>
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Download All Trip Logs
                </Button>
              </div>
              
              <div className="flex items-center space-x-4">
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="most-delayed">Most Delayed</SelectItem>
                    <SelectItem value="highest-load">Highest Load</SelectItem>
                    <SelectItem value="top-speed">Top Speed</SelectItem>
                    <SelectItem value="nearest-eta">Nearest ETA</SelectItem>
                  </SelectContent>
                </Select>
                
                <span className="text-sm text-gray-600">
                  Showing {trackingData.length} active trucks
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GPSTrackingPage;
