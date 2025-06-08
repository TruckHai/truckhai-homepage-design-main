
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { X, MapPin, Package, Clock, Users, Star, FileText, Truck, Shield } from 'lucide-react';

const RFQDetailModal = ({ rfq, isVerified, onClose }) => {
  const { toast } = useToast();
  const [bidAmount, setBidAmount] = useState(rfq.budgetRange.min);
  const [selectedTruck, setSelectedTruck] = useState('');
  const [remarks, setRemarks] = useState('');
  const [pickupDate, setPickupDate] = useState('');

  const trucks = [
    { id: 'TRK001', number: 'GJ-01-AB-1234', capacity: '10T', type: 'Container' },
    { id: 'TRK002', number: 'GJ-01-CD-5678', capacity: '15T', type: 'Open Body' },
    { id: 'TRK003', number: 'MH-12-EF-9012', capacity: '20T', type: 'Covered' }
  ];

  const topBids = [
    { rank: 1, amount: 44000, status: 'Leading' },
    { rank: 2, amount: 43500, status: 'Close' },
    { rank: 3, amount: 43000, status: 'Competitive' },
    { rank: 4, amount: 42500, status: 'Behind' },
    { rank: 5, amount: 42000, status: 'Low' }
  ];

  const handleSubmitBid = () => {
    if (!selectedTruck) {
      toast({
        title: "Error",
        description: "Please select a truck for this bid",
        variant: "destructive"
      });
      return;
    }

    if (!pickupDate) {
      toast({
        title: "Error", 
        description: "Please select pickup date",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: `Bid of ₹${bidAmount.toLocaleString()} submitted successfully`,
    });
    onClose();
  };

  const canBid = rfq.isPremium ? isVerified : true;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <Package className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">RFQ Details - {rfq.id}</h2>
              <p className="text-gray-600">{rfq.corporateClient}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* RFQ Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Route Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">From</span>
                  <span className="font-medium">{rfq.route.from}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">To</span>
                  <span className="font-medium">{rfq.route.to}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Distance</span>
                  <span className="font-medium">~1,400 km</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Est. Transit</span>
                  <span className="font-medium">2-3 days</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Cargo Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium">{rfq.cargoType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-medium">{rfq.weight}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Special Handling</span>
                  <Badge variant="outline">Temperature Controlled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Insurance</span>
                  <Badge className="bg-green-100 text-green-700">Included</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Corporate Client Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Corporate Client Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Company</p>
                  <p className="font-medium">{rfq.corporateClient}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trust Rating</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{rfq.trustRating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Terms</p>
                  <p className="font-medium">Net 30 days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Bidding Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bid Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Live Bids</span>
                  </div>
                  <Badge variant="outline">{rfq.bidsReceived} Total</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topBids.map((bid, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          bid.rank === 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {bid.rank}
                        </div>
                        <span className="font-medium">₹{bid.amount.toLocaleString()}</span>
                      </div>
                      <Badge variant={bid.status === 'Leading' ? 'default' : 'outline'} className="text-xs">
                        {bid.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bid Submission */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5" />
                  <span>Submit Your Bid</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!canBid && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <Shield className="w-4 h-4 inline mr-1" />
                      Verification required to bid on premium RFQs
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Bid Amount (₹)</Label>
                  <div className="space-y-3">
                    <Input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(Number(e.target.value))}
                      min={rfq.budgetRange.min}
                      max={rfq.budgetRange.max}
                      disabled={!canBid}
                    />
                    <Slider
                      value={[bidAmount]}
                      onValueChange={(value) => setBidAmount(value[0])}
                      min={rfq.budgetRange.min}
                      max={rfq.budgetRange.max}
                      step={500}
                      disabled={!canBid}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>₹{rfq.budgetRange.min.toLocaleString()}</span>
                      <span>₹{rfq.budgetRange.max.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Select Truck</Label>
                  <select
                    value={selectedTruck}
                    onChange={(e) => setSelectedTruck(e.target.value)}
                    disabled={!canBid}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Choose truck...</option>
                    {trucks.map((truck) => (
                      <option key={truck.id} value={truck.id}>
                        {truck.number} - {truck.capacity} {truck.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Pickup Date & Time</Label>
                  <Input
                    type="datetime-local"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    disabled={!canBid}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Remarks (Optional)</Label>
                  <Textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Any special notes or terms..."
                    disabled={!canBid}
                    maxLength={250}
                  />
                </div>

                <Separator />

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={onClose} className="flex-1">
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmitBid} 
                    disabled={!canBid}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    Submit Bid - ₹{bidAmount.toLocaleString()}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documents & Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Documents & Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <FileText className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium">RFQ Document</p>
                    <p className="text-sm text-gray-600">PDF • 2.3 MB</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Terms & Conditions</p>
                    <p className="text-sm text-gray-600">PDF • 1.1 MB</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Insurance Policy</p>
                    <p className="text-sm text-gray-600">PDF • 0.8 MB</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RFQDetailModal;
