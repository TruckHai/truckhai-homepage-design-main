
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from '../DashboardLayout';
import { Shield, Truck, Package, History, AlertTriangle, Download, FileText, Phone } from 'lucide-react';

const CorporateInsuranceHubPage = () => {
  const { toast } = useToast();
  const [vehicleQuote, setVehicleQuote] = useState<string>('');
  const [cargoQuote, setCargoQuote] = useState<string>('');

  const handleGetQuote = (type: 'vehicle' | 'cargo') => {
    const quote = type === 'vehicle' ? '₹ 12,500' : '₹ 8,750';
    if (type === 'vehicle') {
      setVehicleQuote(quote);
    } else {
      setCargoQuote(quote);
    }
    toast({
      title: "Quote Generated",
      description: `Estimated Premium: ${quote}`,
    });
  };

  const handlePurchasePolicy = (type: 'vehicle' | 'cargo') => {
    const policyNo = `INS${Math.random().toString().substring(2, 8)}`;
    toast({
      title: "Policy Purchased",
      description: `✅ Policy purchased—Policy No: ${policyNo}`,
    });
  };

  const policies = [
    {
      policyNo: 'INS123456',
      type: 'Vehicle',
      asset: 'GJ-01-AB-1234',
      coverage: '₹25,00,000',
      premium: '₹12,500',
      status: 'Active'
    },
    {
      policyNo: 'INS789012',
      type: 'Cargo',
      asset: 'LD-TS-2024-001',
      coverage: '₹5,00,000',
      premium: '₹8,750',
      status: 'Active'
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
      {/* Breadcrumb */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">Dashboard &gt; Insurance Hub</p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
          <Shield className="w-8 h-8 text-red-500" />
          Insurance Hub
        </h1>
      </div>

      {/* Verification Banner */}
      <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-red-700">
              Complete your business verification to enjoy in-transit insurance savings.
            </span>
          </div>
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            Complete Verification
          </Button>
        </div>
      </div>

      {/* Insurance Tabs */}
      <Tabs defaultValue="vehicle" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vehicle" className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Vehicle Insurance
          </TabsTrigger>
          <TabsTrigger value="cargo" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Load (Cargo) Insurance
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            History & Claims
          </TabsTrigger>
        </TabsList>

        {/* Vehicle Insurance Tab */}
        <TabsContent value="vehicle">
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-red-500" />
                Vehicle Insurance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Select Vehicle</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a vehicle to insure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="truck1">GJ-01-AB-1234 (Large Truck)</SelectItem>
                        <SelectItem value="truck2">GJ-01-CD-5678 (Medium Truck)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Coverage Options</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="vehicleCoverage" value="basic" className="text-red-500" />
                        <span>Basic (₹5 L)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="vehicleCoverage" value="standard" defaultChecked className="text-red-500" />
                        <span>Standard (₹25 L)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="vehicleCoverage" value="premium" className="text-red-500" />
                        <span>Premium (₹1 Cr)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Effective Period</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="date" />
                      <Input type="date" />
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Coverage Includes:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Accident coverage</li>
                      <li>• Third-party liability</li>
                      <li>• Theft protection</li>
                      <li>• Natural calamities</li>
                    </ul>
                  </div>
                </div>
              </div>

              {vehicleQuote && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-lg font-semibold text-green-800">
                    Estimated Premium: {vehicleQuote}
                  </p>
                </div>
              )}

              <div className="flex space-x-4">
                <Button 
                  onClick={() => handleGetQuote('vehicle')}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Get Quote
                </Button>
                {vehicleQuote && (
                  <Button 
                    onClick={() => handlePurchasePolicy('vehicle')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Purchase Policy
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cargo Insurance Tab */}
        <TabsContent value="cargo">
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-red-500" />
                Load (Cargo) Insurance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Select Load</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a load to insure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="load1">LD-TS-2024-001 (Electronics)</SelectItem>
                        <SelectItem value="load2">LD-TS-2024-002 (Textiles)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Coverage Level</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="cargoCoverage" value="basic" className="text-red-500" />
                        <span>Basic (Up to ₹1 L)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="cargoCoverage" value="standard" defaultChecked className="text-red-500" />
                        <span>Standard (Up to ₹10 L)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="cargoCoverage" value="premium" className="text-red-500" />
                        <span>Premium (Up to ₹50 L)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Cargo Value (₹)</label>
                    <Input 
                      type="number" 
                      placeholder="50,00,000"
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value) {
                          const instantQuote = `₹ ${Math.floor(value * 0.001).toLocaleString()}`;
                          // Show instant quote in real-time
                        }
                      }}
                    />
                    <p className="text-xs text-gray-500">Real-time quote calculation</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Coverage Includes:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Transit damage</li>
                      <li>• Theft protection</li>
                      <li>• Fire coverage</li>
                      <li>• Weather damage</li>
                    </ul>
                  </div>
                </div>
              </div>

              {cargoQuote && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-lg font-semibold text-green-800">
                    Estimated Premium: {cargoQuote}
                  </p>
                </div>
              )}

              <div className="flex space-x-4">
                <Button 
                  onClick={() => handleGetQuote('cargo')}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Get Quote
                </Button>
                {cargoQuote && (
                  <Button 
                    onClick={() => handlePurchasePolicy('cargo')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Purchase Policy
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History & Claims Tab */}
        <TabsContent value="history">
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-red-500" />
                Insurance History & Claims
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Policy No.</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Insured Asset</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Coverage Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Premium Paid</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {policies.map((policy, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-blue-600">{policy.policyNo}</td>
                        <td className="px-6 py-4">{policy.type}</td>
                        <td className="px-6 py-4">{policy.asset}</td>
                        <td className="px-6 py-4">{policy.coverage}</td>
                        <td className="px-6 py-4">{policy.premium}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {policy.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <FileText className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                              <Download className="w-4 h-4 mr-1" />
                              Certificate
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default CorporateInsuranceHubPage;
