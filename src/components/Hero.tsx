import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Truck, Shield, Building, Briefcase, BarChart3, TrendingUp, TrendingDown, Clock, Users, Target, Activity } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import BrokerLoginModal from './BrokerLoginModal';
import FleetOwnerModal from './FleetOwnerModal';
import CorporateRegistrationModal from './CorporateRegistrationModal';
import ContactModal from './ContactModal';

const Hero = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBrokerOnboardingOpen, setIsBrokerOnboardingOpen] = useState(false);
  const [isFleetOnboardingOpen, setIsFleetOnboardingOpen] = useState(false);
  const [isCorporateOnboardingOpen, setIsCorporateOnboardingOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // Live bidding data simulation
  const [liveBids, setLiveBids] = useState([
    { id: 1, route: 'Mumbai → Delhi', currentBid: 45250, timeLeft: 14400, bidders: 12, trend: 'up', change: 1250 },
    { id: 2, route: 'Bangalore → Chennai', currentBid: 28750, timeLeft: 7200, bidders: 8, trend: 'up', change: 750 },
    { id: 3, route: 'Delhi → Kolkata', currentBid: 52000, timeLeft: 3600, bidders: 15, trend: 'down', change: -500 },
    { id: 4, route: 'Chennai → Hyderabad', currentBid: 18500, timeLeft: 9000, bidders: 6, trend: 'up', change: 300 },
    { id: 5, route: 'Pune → Mumbai', currentBid: 12750, timeLeft: 5400, bidders: 9, trend: 'up', change: 250 }
  ]);

  const [marketStats, setMarketStats] = useState({
    activeLoads: 247,
    totalBids: 1834,
    avgBidValue: 31250,
    topRoute: 'Mumbai → Delhi'
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate live bid updates
    const bidInterval = setInterval(() => {
      setLiveBids(prev => prev.map(bid => ({
        ...bid,
        currentBid: bid.currentBid + (Math.random() > 0.5 ? Math.floor(Math.random() * 500) : -Math.floor(Math.random() * 300)),
        timeLeft: Math.max(0, bid.timeLeft - 1),
        bidders: bid.bidders + (Math.random() > 0.8 ? 1 : 0)
      })));

      setMarketStats(prev => ({
        ...prev,
        totalBids: prev.totalBids + Math.floor(Math.random() * 3)
      }));
    }, 3000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(bidInterval);
    };
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const handleLoginSuccess = (role: 'broker' | 'fleet' | 'corporate') => {
    console.log(`Login successful for ${role}`);
  };

  const handleOnboardingSuccess = () => {
    console.log('Onboarding completed successfully');
    setIsBrokerOnboardingOpen(false);
    setIsFleetOnboardingOpen(false);
    setIsCorporateOnboardingOpen(false);
  };

  const handlePlaceBidClick = () => {
    setIsLoginModalOpen(true);
  };

  // Mini sparkline component for hover effects
  const MiniSparkline = ({ data }: { data: number[] }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    return (
      <div className="flex items-end space-x-0.5 h-6 w-16">
        {data.map((value, index) => {
          const height = ((value - min) / range) * 100;
          return (
            <div
              key={index}
              className="bg-blue-500/60 rounded-sm transition-all duration-200"
              style={{
                width: '2px',
                height: `${Math.max(height, 10)}%`
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      <section id="hero" className="hero relative min-h-screen flex items-center justify-center overflow-hidden pt-8 lg:pt-10">
        {/* More subtle grid background with red gradient */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: `
              linear-gradient(to right, rgba(156, 163, 175, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(156, 163, 175, 0.15) 1px, transparent 1px),
              radial-gradient(circle at 85% 85%, rgba(255, 46, 46, 0.08) 0%, transparent 60%),
              linear-gradient(135deg, 
                #FFFFFF 0%, 
                #FAFAFA 25%, 
                #F8F9FA 50%, 
                #F1F3F4 75%, 
                #E8EAED 100%)
            `,
            backgroundSize: '24px 24px, 24px 24px, 100% 100%, 100% 100%'
          }}
        />

        {/* Additional subtle red overlay for bottom right */}
        <div 
          className="absolute inset-0 z-1 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 85% 85%, rgba(255, 46, 46, 0.12) 0%, transparent 50%)
            `,
          }}
        />

        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Header with better clock placement */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center space-y-3 mb-4">
              {/* Live indicator - moved up */}
              <div className="flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 flex items-center space-x-2 shadow-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-truck-black">LIVE</span>
                  <span className="text-sm text-gray-600 font-mono">{currentTime.toLocaleTimeString()}</span>
                </div>
              </div>
              
              {/* Updated headline with TruckHai theme */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-truck-black">Real-time</span>{' '}
                <span className="text-truck-red">Freight Exchange</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Live bidding. Transparent pricing. Book with confidence.
              </p>
            </div>
          </div>

          {/* Market Summary Cards - 2x2 grid with TruckHai theme and green positives */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-md transition-all hover:border-truck-red group cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Active Loads</p>
                    <p className="text-xl font-bold text-truck-black">{marketStats.activeLoads}</p>
                    <p className="text-xs text-green-600">+12 today</p>
                  </div>
                  <Activity className="w-8 h-8 text-truck-red transition-transform group-hover:scale-110" />
                </div>
                {/* Mini sparkline on hover */}
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <MiniSparkline data={[20, 25, 22, 28, 30, 35, 32, 38]} />
                  <p className="text-xs text-green-500 mt-1">+2.5% over last 24h</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-md transition-all hover:border-truck-red group cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Total Bids</p>
                    <p className="text-xl font-bold text-truck-black">{marketStats.totalBids.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+47 live</p>
                  </div>
                  <Target className="w-8 h-8 text-truck-red transition-transform group-hover:scale-110" />
                </div>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <MiniSparkline data={[15, 18, 22, 25, 23, 28, 30, 35]} />
                  <p className="text-xs text-green-500 mt-1">+4.1% over last 24h</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-md transition-all hover:border-truck-red group cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Avg Bid Value</p>
                    <p className="text-xl font-bold text-truck-black">₹{(marketStats.avgBidValue / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-green-600">+2.5%</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-truck-red transition-transform group-hover:scale-110" />
                </div>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <MiniSparkline data={[25, 23, 27, 30, 28, 32, 35, 31]} />
                  <p className="text-xs text-green-500 mt-1">+2.5% over last 24h</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-md transition-all hover:border-truck-red group cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Hot Route</p>
                    <p className="text-sm font-bold text-truck-black">{marketStats.topRoute}</p>
                    <p className="text-xs text-green-600">15 bids</p>
                  </div>
                  <Truck className="w-8 h-8 text-truck-red transition-transform group-hover:scale-110" />
                </div>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <MiniSparkline data={[18, 22, 20, 25, 28, 26, 30, 33]} />
                  <p className="text-xs text-gray-400 mt-1">Most active route</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Bidding Carousel */}
          <div className="mb-12 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-truck-black">Live Freight Bids</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-truck-red rounded-full animate-pulse"></div>
                <span>Real-time updates</span>
              </div>
            </div>
            
            {/* Carousel Container */}
            <div className="relative">
              <div className="flex animate-marquee space-x-6">
                {/* First set of cards */}
                {liveBids.map((bid) => (
                  <Card 
                    key={`first-${bid.id}`}
                    className="min-w-[320px] flex-shrink-0 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 border-l-truck-red"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-truck-black">{bid.route}</h3>
                          <p className="text-xs text-gray-500">{bid.bidders} bidders</p>
                        </div>
                        <div className={`flex items-center space-x-1 ${bid.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {bid.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span className="text-xs">₹{Math.abs(bid.change)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Current Bid</span>
                          <span className="font-bold text-lg text-truck-black">₹{bid.currentBid.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Time Left</span>
                          <div className="flex items-center space-x-1 text-truck-red">
                            <Clock className="w-3 h-3" />
                            <span className="text-sm font-mono">{formatTime(bid.timeLeft)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full mt-3 bg-truck-red hover:bg-red-600 text-white border-0"
                        onClick={handlePlaceBidClick}
                      >
                        Place Bid →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {liveBids.map((bid) => (
                  <Card 
                    key={`second-${bid.id}`}
                    className="min-w-[320px] flex-shrink-0 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 border-l-truck-red"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-truck-black">{bid.route}</h3>
                          <p className="text-xs text-gray-500">{bid.bidders} bidders</p>
                        </div>
                        <div className={`flex items-center space-x-1 ${bid.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {bid.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span className="text-xs">₹{Math.abs(bid.change)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Current Bid</span>
                          <span className="font-bold text-lg text-truck-black">₹{bid.currentBid.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Time Left</span>
                          <div className="flex items-center space-x-1 text-truck-red">
                            <Clock className="w-3 h-3" />
                            <span className="text-sm font-mono">{formatTime(bid.timeLeft)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full mt-3 bg-truck-red hover:bg-red-600 text-white border-0"
                        onClick={handlePlaceBidClick}
                      >
                        Place Bid →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-truck-black mb-4">
                Join India's Most Transparent Freight Exchange
              </h3>
              <p className="text-gray-600 mb-6">
                Experience real-time bidding, live price discovery, and transparent freight transactions
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/corporate-bidding-exchange')}
                  size="lg"
                  className="bg-truck-red hover:bg-red-600 text-white px-8 py-3 rounded-xl border-0 transition-all hover:scale-105"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Enter Exchange
                </Button>
                
                <Button
                  onClick={() => setIsLoginModalOpen(true)}
                  variant="outline"
                  size="lg"
                  className="border-2 border-truck-red text-truck-red hover:bg-red-50 px-8 py-3 rounded-xl transition-all hover:scale-105"
                >
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <BrokerLoginModal
        isOpen={isBrokerOnboardingOpen}
        onClose={() => setIsBrokerOnboardingOpen(false)}
        onLoginSuccess={handleOnboardingSuccess}
      />

      <FleetOwnerModal
        isOpen={isFleetOnboardingOpen}
        onClose={() => setIsFleetOnboardingOpen(false)}
        onLoginSuccess={handleOnboardingSuccess}
      />

      <CorporateRegistrationModal
        isOpen={isCorporateOnboardingOpen}
        onClose={() => setIsCorporateOnboardingOpen(false)}
        onRegistrationSuccess={handleOnboardingSuccess}
      />
    </>
  );
};

export default Hero;
