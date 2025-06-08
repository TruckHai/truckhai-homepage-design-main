
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, Target, Award, DollarSign, Clock, CheckCircle, XCircle, Trophy, Zap } from 'lucide-react';

const BiddingDashboard = ({ isVerified }) => {
  const [selectedTab, setSelectedTab] = useState('live');

  // Mock data
  const liveBytes = [
    {
      rfqId: 'RFQ001',
      route: 'DEL→MUM',
      myBid: 44500,
      currentRank: 2,
      totalBids: 12,
      timeLeft: '2h 15m',
      status: 'competitive',
      isWinning: false
    },
    {
      rfqId: 'RFQ003',
      route: 'MUM→PUN',
      myBid: 18000,
      currentRank: 1,
      totalBids: 8,
      timeLeft: '5h 30m',
      status: 'winning',
      isWinning: true
    }
  ];

  const bidHistory = [
    {
      rfqId: 'RFQ002',
      route: 'BLR→CHN',
      bidAmount: 28000,
      finalPrice: 27500,
      status: 'won',
      profit: 8500,
      date: '2024-01-05'
    },
    {
      rfqId: 'RFQ004',
      route: 'HYD→VIZ',
      bidAmount: 35000,
      finalPrice: 33000,
      status: 'lost',
      profit: 0,
      date: '2024-01-03'
    }
  ];

  const stats = {
    totalBids: 47,
    winRate: 32,
    totalEarnings: 145000,
    avgProfit: 12.5
  };

  const achievements = [
    { icon: Trophy, title: 'First Win', description: 'Won your first RFQ', earned: true },
    { icon: Zap, title: 'Speed Bidder', description: '5 bids in 24 hours', earned: true },
    { icon: Target, title: 'Sharp Shooter', description: '10 successful bids', earned: false },
    { icon: Award, title: 'Top Performer', description: 'Top 10% win rate', earned: false }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'winning': return 'bg-green-100 text-green-700';
      case 'competitive': return 'bg-yellow-100 text-yellow-700';
      case 'won': return 'bg-green-100 text-green-700';
      case 'lost': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Bids</p>
                <p className="text-2xl font-bold">{stats.totalBids}</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Win Rate</p>
                <p className="text-2xl font-bold">{stats.winRate}%</p>
              </div>
              <Award className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold">₹{(stats.totalEarnings / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Profit</p>
                <p className="text-2xl font-bold">{stats.avgProfit}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="live">Live Bids</TabsTrigger>
          <TabsTrigger value="history">Bid History</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Active Bids</span>
                <Badge variant="outline">{liveBytes.length} Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {liveBytes.length === 0 ? (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900">No Active Bids</h3>
                  <p className="text-gray-600">Start bidding on RFQs to track them here</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>RFQ ID</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>My Bid</TableHead>
                      <TableHead>Rank</TableHead>
                      <TableHead>Time Left</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {liveBytes.map((bid) => (
                      <TableRow key={bid.rfqId}>
                        <TableCell className="font-medium">{bid.rfqId}</TableCell>
                        <TableCell>{bid.route}</TableCell>
                        <TableCell>₹{bid.myBid.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <span className={`font-medium ${bid.isWinning ? 'text-green-600' : 'text-gray-600'}`}>
                              #{bid.currentRank}
                            </span>
                            <span className="text-gray-500">/{bid.totalBids}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-orange-500" />
                            <span className="text-sm">{bid.timeLeft}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(bid.status)}>
                            {bid.status === 'winning' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {bid.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Revise Bid
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bid History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RFQ ID</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>My Bid</TableHead>
                    <TableHead>Final Price</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bidHistory.map((bid) => (
                    <TableRow key={bid.rfqId}>
                      <TableCell className="font-medium">{bid.rfqId}</TableCell>
                      <TableCell>{bid.route}</TableCell>
                      <TableCell>₹{bid.bidAmount.toLocaleString()}</TableCell>
                      <TableCell>₹{bid.finalPrice.toLocaleString()}</TableCell>
                      <TableCell>
                        {bid.profit > 0 ? (
                          <span className="text-green-600">+₹{bid.profit.toLocaleString()}</span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(bid.status)}>
                          {bid.status === 'won' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {bid.status === 'lost' && <XCircle className="w-3 h-3 mr-1" />}
                          {bid.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{bid.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className={`border-2 ${achievement.earned ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                      <achievement.icon className={`w-6 h-6 ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${achievement.earned ? 'text-yellow-800' : 'text-gray-700'}`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${achievement.earned ? 'text-yellow-700' : 'text-gray-600'}`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <Badge className="bg-yellow-500 text-white ml-auto">
                        Earned!
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BiddingDashboard;
