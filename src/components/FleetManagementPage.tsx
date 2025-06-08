import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { FileArchive, Upload, Pencil, Satellite, Medal, Route, TrendingUp, TrendingDown, MapPin } from 'lucide-react';

const FleetManagementPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTrucks, setSelectedTrucks] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [isGpsSetupOpen, setIsGpsSetupOpen] = useState(false);

  const fleetData = [
    {
      truckNo: 'GJ-01-AB-1234',
      location: 'Mumbai',
      status: 'Active',
      statusColor: 'bg-green-500',
      driver: 'Rajesh Kumar',
      driverPhone: '+91-98765-XXXXX',
      lastUpdated: '2 min ago',
      avatar: 'RK'
    },
    {
      truckNo: 'GJ-01-CD-5678',
      location: 'Delhi',
      status: 'Available',
      statusColor: 'bg-orange-500',
      driver: 'Suresh Patel',
      driverPhone: '+91-98123-XXXXX',
      lastUpdated: '5 min ago',
      avatar: 'SP'
    },
    {
      truckNo: 'GJ-01-EF-9012',
      location: 'Pune',
      status: 'Maintenance',
      statusColor: 'bg-red-500',
      driver: 'Amit Singh',
      driverPhone: '+91-97456-XXXXX',
      lastUpdated: '1 hr ago',
      avatar: 'AS'
    }
  ];

  const bulkOperationSteps = [
    {
      step: 1,
      title: 'Download Template',
      description: 'Pre-fill your fleet data using a structured CSV',
      icon: FileArchive,
      action: () => toast({ title: "Template Downloaded", description: "Fleet data template downloaded successfully" })
    },
    {
      step: 2,
      title: 'Upload Fleet Data',
      description: 'Upload your entire fleet with real-time validation',
      icon: Upload,
      action: () => toast({ title: "Upload Started", description: "Fleet data upload in progress" })
    },
    {
      step: 3,
      title: 'Bulk Edit Selected',
      description: 'Modify details for selected vehicles quickly',
      icon: Pencil,
      action: () => toast({ title: "Bulk Edit", description: `Editing ${selectedTrucks.length} selected trucks` })
    },
    {
      step: 4,
      title: 'Sync GPS Data',
      description: 'Pull GPS updates across all listed trucks',
      icon: Satellite,
      action: () => toast({ title: "GPS Sync Complete", description: "All GPS data synchronized" })
    }
  ];

  const performanceMetrics = [
    {
      title: 'Top Performer',
      details: 'GJ-01-AB-1234 – 98% On-Time',
      icon: Medal,
      action: 'View Report',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Best Route',
      details: 'Ahmedabad → Mumbai – 85% Util.',
      icon: Route,
      action: 'Route Analysis',
      gradient: 'from-blue-400 to-purple-500'
    },
    {
      title: 'Top Earner',
      details: 'GJ-01-CD-5678 – ₹1,85,000/month',
      icon: TrendingUp,
      action: 'Breakdown',
      gradient: 'from-green-400 to-emerald-500'
    }
  ];

  const handleTruckSelection = (truckNo: string) => {
    setSelectedTrucks(prev => 
      prev.includes(truckNo) 
        ? prev.filter(t => t !== truckNo)
        : [...prev, truckNo]
    );
  };

  return (
    <DashboardLayout 
      userRole="fleet" 
      userName="Fleet Owner" 
      userId="FO123456" 
      isVerified={true}
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-sm text-gray-600 mb-4">
            Dashboard &gt; Fleet Management
          </nav>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📊 Comprehensive Fleet Dashboard</h1>
          <p className="text-lg text-gray-600">Manage your entire fleet with advanced operations and real-time insights</p>
        </div>

        {/* Split Layout: Operations (Left) + Live Metrics (Right) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Section: Bulk Operations */}
          <div className="xl:col-span-2">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                <CardTitle className="text-2xl font-bold flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Satellite className="w-5 h-5" />
                  </div>
                  <span>Bulk Operations</span>
                </CardTitle>
                <p className="text-red-100">Streamlined fleet management workflow</p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bulkOperationSteps.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={step.step}
                        className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-200 cursor-pointer transform hover:-translate-y-2"
                        onClick={step.action}
                      >
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-8 h-8 text-red-500" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-center space-x-2">
                              <span className="w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
                                {step.step}
                              </span>
                              <h3 className="font-bold text-gray-900 text-sm">{step.title}</h3>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section: Fleet Overview */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardTitle className="text-xl font-bold">📊 Fleet Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">35</div>
                  <div className="text-sm text-gray-600">Total Trucks</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-lg font-bold text-green-600">28</span>
                    </div>
                    <div className="text-xs text-gray-600">Active</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span className="text-lg font-bold text-gray-600">7</span>
                    </div>
                    <div className="text-xs text-gray-600">Idle</div>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-lg font-bold text-blue-600">14</span>
                    </div>
                    <div className="text-xs text-gray-600">In Transit</div>
                  </div>
                  
                  <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-lg font-bold text-orange-600">18</span>
                    </div>
                    <div className="text-xs text-gray-600">Available</div>
                  </div>
                </div>

                <div className="text-center p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-red-500" />
                    <span className="text-2xl font-bold text-red-600">₹45,000</span>
                  </div>
                  <div className="text-sm text-gray-600">Revenue Today</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Live Location API Setup */}
        <Collapsible open={isGpsSetupOpen} onOpenChange={setIsGpsSetupOpen}>
          <Card className="shadow-xl border-0 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl overflow-hidden">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <CardTitle className="text-2xl font-bold">📍 Live Location API Setup</CardTitle>
                      <p className="text-sm opacity-80">GPS tracking and fleet monitoring</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Connected</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Select defaultValue="jiomotive">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="GPS Provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jiomotive">JioMotive</SelectItem>
                          <SelectItem value="mapmyindia">MapMyIndia</SelectItem>
                          <SelectItem value="custom">Custom API</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">GPS Enabled:</span> 32/35 trucks
                      </p>
                      <Button variant="link" className="h-auto p-0 text-red-600 mt-2">
                        Enable remaining trucks →
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-4">
                    <Button variant="outline" className="w-full">
                      🔁 Test Connection
                    </Button>
                    <Button variant="outline" className="w-full">
                      📊 View Benefits
                    </Button>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Fleet Listing */}
        <Card className="shadow-xl border-0 bg-white rounded-3xl overflow-hidden">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <CardTitle className="text-2xl font-bold">🗂️ Fleet Listing</CardTitle>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                  >
                    Table
                  </Button>
                  <Button
                    variant={viewMode === 'cards' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('cards')}
                  >
                    Cards
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <Input
                placeholder="Search truck number or driver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="lg:w-64"
              />
              <div className="flex space-x-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                {selectedTrucks.length > 0 && (
                  <Button variant="default" size="sm">
                    Bulk Edit ({selectedTrucks.length})
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input 
                      type="checkbox" 
                      className="rounded"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTrucks(fleetData.map(truck => truck.truckNo));
                        } else {
                          setSelectedTrucks([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Truck Details</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fleetData.map((truck) => (
                  <TableRow key={truck.truckNo} className="hover:bg-gray-50">
                    <TableCell>
                      <input 
                        type="checkbox"
                        className="rounded"
                        checked={selectedTrucks.includes(truck.truckNo)}
                        onChange={() => handleTruckSelection(truck.truckNo)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 ${truck.statusColor} rounded-full`}></div>
                        <div>
                          <Button variant="link" className="h-auto p-0 font-medium text-red-600">
                            {truck.truckNo}
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{truck.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${truck.statusColor} text-white border-0`}>
                        {truck.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
                          {truck.avatar}
                        </div>
                        <div>
                          <div className="font-medium">{truck.driver}</div>
                          <div className="text-sm text-gray-500">{truck.driverPhone}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                        <span className="text-sm text-gray-500">{truck.lastUpdated}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="GPS Trace">
                          <MapPin className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="More options">
                          ⋯
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Performance Tiles */}
        <Card className="shadow-xl border-0 bg-white rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">🏆 Performance Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {performanceMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={index}
                    className={`relative bg-gradient-to-br ${metric.gradient} p-6 rounded-2xl text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold">{metric.title}</h3>
                    </div>
                    <p className="text-sm mb-4 text-white/90">{metric.details}</p>
                    <Button variant="secondary" size="sm" className="w-full bg-white/20 hover:bg-white/30 text-white border-0">
                      {metric.action}
                    </Button>
                    <div className="absolute top-3 right-3 w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FleetManagementPage;
