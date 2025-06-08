
import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const CorporateBiddingPage = () => {
  const { toast } = useToast();
  const [selectedRFQ, setSelectedRFQ] = useState(null);

  const activeRFQs = [
    {
      id: 'RFQ001',
      route: 'Delhi → Mumbai',
      cargoType: 'Electronics',
      weight: '5000 kg',
      budgetRange: '₹45,000 – ₹55,000',
      deadline: '6 hrs left',
      bidsReceived: 12
    },
    {
      id: 'RFQ002',
      route: 'Bangalore → Chennai',
      cargoType: 'Textiles',
      weight: '3000 kg',
      budgetRange: '₹25,000 – ₹35,000',
      deadline: '2 days left',
      bidsReceived: 8
    }
  ];

  const myBids = [
    {
      rfqId: 'RFQ001',
      myBid: '₹48,000',
      truckNo: 'GJ-01-AB-1234',
      status: 'Pending',
      statusColor: 'bg-yellow-500'
    },
    {
      rfqId: 'RFQ002',
      myBid: '₹28,000',
      truckNo: 'GJ-01-CD-5678',
      status: 'Won',
      statusColor: 'bg-green-500'
    }
  ];

  const handleSubmitBid = () => {
    toast({
      title: "Success",
      description: "✅ Bid submitted successfully",
    });
    setSelectedRFQ(null);
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
          Dashboard &gt; Corporate Bidding
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🏢 Corporate Bidding Dashboard</h1>
        </div>

        {/* Verification Banner */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-800">✅ Verified – You can bid on enterprise loads</h3>
                <p className="text-green-700 text-sm mt-1">Access to high-value corporate contracts available.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active RFQs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active RFQs</CardTitle>
              <div className="flex space-x-2">
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Route" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Routes</SelectItem>
                    <SelectItem value="north">North India</SelectItem>
                    <SelectItem value="south">South India</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>RFQ/Load ID</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Cargo & Weight</TableHead>
                  <TableHead>Budget Range</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Bids</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeRFQs.map((rfq) => (
                  <TableRow key={rfq.id}>
                    <TableCell>
                      <Button 
                        variant="link" 
                        className="h-auto p-0 font-medium text-red-600"
                        onClick={() => setSelectedRFQ(rfq)}
                      >
                        {rfq.id}
                      </Button>
                    </TableCell>
                    <TableCell>{rfq.route}</TableCell>
                    <TableCell>{rfq.cargoType} – {rfq.weight}</TableCell>
                    <TableCell>{rfq.budgetRange}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-red-600">
                        {rfq.deadline}
                      </Badge>
                    </TableCell>
                    <TableCell>{rfq.bidsReceived}</TableCell>
                    <TableCell>
                      <Button 
                        size="sm"
                        onClick={() => setSelectedRFQ(rfq)}
                      >
                        View Bids
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Your Bids History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Past Bids</CardTitle>
              <Button variant="outline">Download Report</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>RFQ ID</TableHead>
                  <TableHead>Your Bid</TableHead>
                  <TableHead>Proposed Truck No.</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myBids.map((bid) => (
                  <TableRow key={bid.rfqId}>
                    <TableCell className="font-medium">{bid.rfqId}</TableCell>
                    <TableCell>{bid.myBid}</TableCell>
                    <TableCell>{bid.truckNo}</TableCell>
                    <TableCell>
                      <Badge className={`${bid.statusColor} text-white`}>
                        {bid.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View RFQ</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* RFQ Detail Modal */}
        {selectedRFQ && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>RFQ Details - {selectedRFQ.id}</CardTitle>
                  <Button variant="ghost" onClick={() => setSelectedRFQ(null)}>×</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* RFQ Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">Route</Label>
                    <p className="font-medium">{selectedRFQ.route}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Cargo Type</Label>
                    <p className="font-medium">{selectedRFQ.cargoType}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Weight</Label>
                    <p className="font-medium">{selectedRFQ.weight}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Budget Range</Label>
                    <p className="font-medium">{selectedRFQ.budgetRange}</p>
                  </div>
                </div>

                {/* Bid Form */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Submit Your Bid</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="proposedRate">Proposed Rate (₹)</Label>
                      <Input id="proposedRate" placeholder="45000" />
                    </div>
                    <div>
                      <Label htmlFor="pickupDate">Estimated Pickup Date & Time</Label>
                      <Input id="pickupDate" type="datetime-local" />
                    </div>
                    <div>
                      <Label htmlFor="vehicleAvailability">Estimated Vehicle Availability</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select truck" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GJ-01-AB-1234">GJ-01-AB-1234</SelectItem>
                          <SelectItem value="GJ-01-CD-5678">GJ-01-CD-5678</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="remarks">Remarks (Optional)</Label>
                      <Textarea id="remarks" placeholder="Any special notes..." maxLength={250} />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <Button variant="outline" onClick={() => setSelectedRFQ(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitBid}>
                    Submit Bid
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CorporateBiddingPage;
