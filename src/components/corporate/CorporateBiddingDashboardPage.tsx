
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Eye, Award, Clock, TrendingUp } from "lucide-react";
import DashboardLayout from '../DashboardLayout';

const CorporateBiddingDashboardPage = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  // Mock data for active RFQs
  const activeRFQs = [
    {
      id: "DEL-MUM-001",
      route: "Delhi → Mumbai",
      cargo: "Electronics – 5000 kg",
      budget: "₹45,000 – ₹55,000",
      deadline: "6 hrs left",
      bidsReceived: 12,
      status: "open"
    },
    {
      id: "BLR-CHN-002", 
      route: "Bangalore → Chennai",
      cargo: "Furniture – 3000 kg",
      budget: "₹30,000 – ₹38,000",
      deadline: "2 days left",
      bidsReceived: 8,
      status: "open"
    }
  ];

  const bidHistory = [
    {
      rfqId: "DEL-BLR-003",
      yourBid: "₹52,000",
      truckNo: "GJ-01-AB-1234",
      status: "won",
      statusText: "Won"
    },
    {
      rfqId: "MUM-PUN-004",
      yourBid: "₹35,000", 
      truckNo: "MH-02-CD-5678",
      status: "pending",
      statusText: "Pending"
    },
    {
      rfqId: "CHN-HYD-005",
      yourBid: "₹48,000",
      truckNo: "TN-03-EF-9012",
      status: "lost",
      statusText: "Lost"
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
        <p className="text-sm text-gray-600">Dashboard &gt; Corporate Bidding</p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
          🎯 Corporate Bidding Dashboard
        </h1>
      </div>

      {/* Verification Banner */}
      <Card className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-800 font-medium">
              ⚠️ Not Verified – Unlock Corporate Contracts
            </p>
            <p className="text-red-600 text-sm">
              Complete verification to bid on high-value enterprise loads.
            </p>
          </div>
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            Complete Verification
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        <Button
          variant={activeTab === 'active' ? 'default' : 'outline'}
          onClick={() => setActiveTab('active')}
          className={activeTab === 'active' ? 'bg-red-500 hover:bg-red-600' : ''}
        >
          Active RFQs
        </Button>
        <Button
          variant={activeTab === 'history' ? 'default' : 'outline'}
          onClick={() => setActiveTab('history')}
          className={activeTab === 'history' ? 'bg-red-500 hover:bg-red-600' : ''}
        >
          Your Bids History
        </Button>
      </div>

      {activeTab === 'active' ? (
        // Active RFQs Tab
        <div>
          {/* Filters */}
          <Card className="mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search RFQs..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>All Routes</option>
                <option>Delhi → Mumbai</option>
                <option>Mumbai → Bangalore</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>All Cargo Types</option>
                <option>Electronics</option>
                <option>Furniture</option>
              </select>
              <Button variant="outline" className="text-gray-600">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </Card>

          {/* Active RFQs Table */}
          <Card className="rounded-xl shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">RFQ/Load ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Route</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cargo Type & Weight</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Budget Range</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Deadline</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Bids Received</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {activeRFQs.map((rfq) => (
                    <tr key={rfq.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <button className="text-red-600 hover:text-red-800 font-medium">
                          {rfq.id}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-gray-900">{rfq.route}</td>
                      <td className="px-6 py-4 text-gray-900">{rfq.cargo}</td>
                      <td className="px-6 py-4 text-gray-900">{rfq.budget}</td>
                      <td className="px-6 py-4">
                        <span className="text-orange-600 font-medium">{rfq.deadline}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary">{rfq.bidsReceived}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                          <Eye className="w-4 h-4 mr-1" />
                          View Bids
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : (
        // Your Bids History Tab
        <div>
          <Card className="rounded-xl shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Past Bids</h3>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                  Download Report
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">RFQ ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Your Bid (₹)</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Proposed Truck No.</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">View RFQ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bidHistory.map((bid, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <button className="text-red-600 hover:text-red-800 font-medium">
                            {bid.rfqId}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-gray-900 font-medium">{bid.yourBid}</td>
                        <td className="px-6 py-4 text-gray-900">{bid.truckNo}</td>
                        <td className="px-6 py-4">
                          {bid.status === 'won' && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <Award className="w-3 h-3 mr-1" />
                              Won
                            </Badge>
                          )}
                          {bid.status === 'pending' && (
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                          {bid.status === 'lost' && (
                            <Badge variant="secondary">
                              ❌ Lost
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                            View RFQ
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CorporateBiddingDashboardPage;
