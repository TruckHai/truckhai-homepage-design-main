
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Settings, RefreshCw, Download, Database, Cloud, Server, Zap, Link } from "lucide-react";
import DashboardLayout from '../DashboardLayout';

const CorporateERPIntegrationPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);

  const syncLogs = [
    { date: "Dec 19, 2024 10:30 AM", type: "SAP", status: "success", details: "15 loads synced" },
    { date: "Dec 19, 2024 9:45 AM", type: "Custom API", status: "success", details: "8 shipments updated" },
    { date: "Dec 18, 2024 6:20 PM", type: "SAP", status: "failure", details: "Connection timeout" },
    { date: "Dec 18, 2024 2:15 PM", type: "Oracle", status: "success", details: "12 loads synced" },
    { date: "Dec 18, 2024 11:00 AM", type: "SAP", status: "success", details: "20 loads synced" }
  ];

  const fieldMappings = [
    { internalField: "Load ID", erpField: "SHIPMENT_NO", dataType: "String", required: true },
    { internalField: "Pickup City", erpField: "SOURCE_LOC", dataType: "String", required: true },
    { internalField: "Delivery City", erpField: "DEST_LOC", dataType: "String", required: true },
    { internalField: "Weight", erpField: "GROSS_WEIGHT", dataType: "Number", required: false },
    { internalField: "Cargo Value", erpField: "INVOICE_VALUE", dataType: "Number", required: false }
  ];

  // ERP Platform configurations with specific icons
  const erpPlatforms = [
    {
      name: 'SAP',
      icon: Database,
      description: 'Connect with SAP ERP systems',
      features: ['Real-time sync', 'Material management', 'Financial integration'],
      color: 'blue',
      status: 'available'
    },
    {
      name: 'Oracle',
      icon: Server,
      description: 'Oracle ERP Cloud integration',
      features: ['Supply chain', 'Procurement', 'Order management'],
      color: 'red',
      status: 'available'
    },
    {
      name: 'Microsoft Dynamics',
      icon: Cloud,
      description: 'Dynamics 365 integration',
      features: ['Business Central', 'Finance & Operations', 'Power Platform'],
      color: 'blue',
      status: 'available'
    },
    {
      name: 'Custom API',
      icon: Zap,
      description: 'Your custom REST/GraphQL API',
      features: ['Flexible endpoints', 'Custom authentication', 'Webhook support'],
      color: 'purple',
      status: 'available'
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
        <p className="text-sm text-gray-600">Dashboard &gt; ERP Integration</p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Link className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
              ERP / API Integration
            </h1>
            <p className="text-gray-600 mt-1">Connect your enterprise systems for seamless data flow</p>
          </div>
        </div>
      </div>

      {/* Integration Status Banner */}
      <Card className={`mb-8 p-6 rounded-xl ${!isConnected ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {!isConnected ? (
              <>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-red-800 font-semibold text-lg">
                    No ERP Connected
                  </p>
                  <p className="text-red-600">
                    Connect with SAP, Oracle, Dynamics, or your custom API to auto-sync loads and streamline operations.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-green-800 font-semibold text-lg">
                    Connected & Syncing
                  </p>
                  <p className="text-green-600">
                    Last sync: Dec 19, 2024 10:30 AM
                  </p>
                </div>
              </>
            )}
          </div>
          <Button 
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3"
            onClick={() => setShowSetupModal(true)}
          >
            {!isConnected ? 'Configure Integration' : 'Manage Connection'}
          </Button>
        </div>
      </Card>

      {/* ERP Platforms Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose Your ERP Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {erpPlatforms.map((platform, index) => {
            const IconComponent = platform.icon;
            return (
              <Card key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-2 border-gray-100 hover:border-red-200 group cursor-pointer">
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    platform.color === 'blue' ? 'bg-blue-50 group-hover:bg-blue-100' :
                    platform.color === 'red' ? 'bg-red-50 group-hover:bg-red-100' :
                    platform.color === 'purple' ? 'bg-purple-50 group-hover:bg-purple-100' :
                    'bg-gray-50 group-hover:bg-gray-100'
                  }`}>
                    <IconComponent className={`w-8 h-8 ${
                      platform.color === 'blue' ? 'text-blue-600' :
                      platform.color === 'red' ? 'text-red-600' :
                      platform.color === 'purple' ? 'text-purple-600' :
                      'text-gray-600'
                    }`} />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{platform.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{platform.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {platform.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-center text-xs text-gray-500">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      platform.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                      platform.color === 'red' ? 'bg-red-500 hover:bg-red-600' :
                      platform.color === 'purple' ? 'bg-purple-500 hover:bg-purple-600' :
                      'bg-gray-500 hover:bg-gray-600'
                    } text-white`}
                    onClick={() => setShowSetupModal(true)}
                  >
                    Connect {platform.name}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Sync Logs & History */}
      <Card className="mb-8 bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Sync Logs</h3>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="text-gray-600">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                View All Logs
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Integration Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {syncLogs.map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{log.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Database className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-900">{log.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {log.status === 'success' ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Success
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Failure
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Field Mapping */}
      <Card className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Field Mapping Configuration</h3>
            </div>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Save Mapping
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Internal Field</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ERP Field</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Data Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {fieldMappings.map((mapping, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{mapping.internalField}</td>
                    <td className="px-6 py-4">
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                        <option value={mapping.erpField}>{mapping.erpField}</option>
                        <option value="">-- Select Field --</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{mapping.dataType}</td>
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox" 
                        checked={mapping.required}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        readOnly
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Setup Modal */}
      {showSetupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 p-6 bg-white rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">ERP Connection Setup</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Host URL *
                </label>
                <input
                  type="text"
                  placeholder="https://your-erp-host.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client ID *
                </label>
                <input
                  type="text"
                  placeholder="Enter Client ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Secret *
                </label>
                <input
                  type="password"
                  placeholder="Enter Client Secret"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowSetupModal(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 text-gray-600"
              >
                Test Connection
              </Button>
              <Button 
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                onClick={() => {
                  setIsConnected(true);
                  setShowSetupModal(false);
                }}
              >
                Save & Connect
              </Button>
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CorporateERPIntegrationPage;
