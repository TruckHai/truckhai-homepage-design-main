
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from '../DashboardLayout';
import { MapPin, List, Settings, RefreshCw, Phone, FileText, Share2, AlertTriangle, BarChart3, Target, Download } from 'lucide-react';

const CorporateLiveTrackingPage = () => {
  const [viewMode, setViewMode] = useState('list'); // 'map' or 'list'

  const trackingData = [
    {
      truckNo: 'GJ-01-AB-1234',
      currentLocation: 'Mumbai, Maharashtra',
      lastUpdated: '2 min ago',
      route: 'Delhi → Mumbai',
      progress: 65,
      eta: 'Tomorrow 2:30 PM',
      status: 'On-time',
      speed: '65 km/h',
      driver: 'Rajesh Kumar',
      driverPhone: '+91-XXXXX-XXXXX',
      broker: 'ABC Logistics',
      brokerRating: 4.8,
      loadDescription: 'Electronics',
      loadValue: '₹5,00,000',
      insured: true
    },
    {
      truckNo: 'GJ-01-CD-5678',
      currentLocation: 'Pune, Maharashtra',
      lastUpdated: '5 min ago',
      route: 'Bangalore → Delhi',
      progress: 45,
      eta: 'Day After Tomorrow 6:00 PM',
      status: 'Delayed',
      speed: '55 km/h',
      driver: 'Suresh Patel',
      driverPhone: '+91-XXXXX-XXXXX',
      broker: 'XYZ Transport',
      brokerRating: 4.6,
      loadDescription: 'Textiles',
      loadValue: '₹3,50,000',
      insured: true
    }
  ];

  return (
    <DashboardLayout
      userRole="corporate"
      userName="Priya Sharma"
      userId="CC12345678"
      isVerified={false}
      verificationStatus="pending"
    >
      <div className="space-y-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600">
          Dashboard &gt; Live Tracking
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
            <MapPin className="w-8 h-8 text-red-500" />
            Live Truck Tracking Dashboard
          </h1>
          <div className="flex items-center space-x-4 text-sm">
            <span>Total Active Trucks: <span className="font-semibold">2</span></span>
            <Badge variant="outline" className="text-green-600 border-green-600">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              On-time: 1
            </Badge>
            <Badge variant="outline" className="text-yellow-600 border-yellow-600">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
              Delayed: 1
            </Badge>
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              onClick={() => setViewMode('map')}
              className={viewMode === 'map' ? 'bg-red-500 hover:bg-red-600' : ''}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Map View
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-red-500 hover:bg-red-600' : ''}
            >
              <List className="w-4 h-4 mr-2" />
              List View
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              Set Alerts
            </Button>
          </div>
        </div>

        {/* Map View */}
        {viewMode === 'map' && (
          <Card>
            <CardContent className="p-0">
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg mb-2">Interactive map with truck locations</p>
                  <p className="text-sm text-gray-500">Click on truck pins to view details</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {trackingData.map((truck) => (
              <Card key={truck.truckNo} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="w-5 h-5 text-red-500" />
                      Truck: {truck.truckNo}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Driver
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Full Report
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Current Location
                        </p>
                        <p className="font-medium">{truck.currentLocation} (last updated {truck.lastUpdated})</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Route Progress
                        </p>
                        <p className="font-medium">{truck.route}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{ width: `${truck.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Progress: {truck.progress}%</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">ETA</p>
                          <p className="font-medium">{truck.eta}</p>
                          <Badge variant={truck.status === 'On-time' ? 'default' : 'destructive'} className="mt-1">
                            {truck.status}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Speed</p>
                          <p className="font-medium">{truck.speed}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Driver
                        </p>
                        <p className="font-medium">{truck.driver} ({truck.driverPhone})</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Broker</p>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{truck.broker}</span>
                          <Badge variant="outline">⭐ {truck.brokerRating}/5</Badge>
                          <Badge variant="outline" className="text-green-600 border-green-600">✅ Verified</Badge>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600">Load</p>
                        <div className="flex items-center space-x-2 flex-wrap">
                          <span className="font-medium">{truck.loadDescription} – {truck.loadValue}</span>
                          {truck.insured && (
                            <Badge variant="outline" className="text-blue-600 border-blue-600">
                              <Target className="w-3 h-3 mr-1" />
                              Insured ✅
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Location
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Report Issue
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Trip Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Export & Actions */}
        <div className="flex justify-between items-center pt-6">
          <Button className="bg-red-500 hover:bg-red-600">
            View All 2 Trucks
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Tracking Report
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CorporateLiveTrackingPage;
