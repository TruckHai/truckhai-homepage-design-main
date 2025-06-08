
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { TrendingUp, TrendingDown, Flame, Clock, Users, ChevronLeft, ChevronRight, GripVertical } from 'lucide-react';

const RouteMarketTicker = ({ onRouteSelect }) => {
  const [routes, setRoutes] = useState([
    { id: 1, code: 'DEL→MUM', price: 12300, change: 5.2, timeLeft: 3600, bidders: 14, isHot: true },
    { id: 2, code: 'HYD→VIZ', price: 9750, change: -2.3, timeLeft: 7200, bidders: 8, isHot: false },
    { id: 3, code: 'PUN→CHN', price: 13100, change: 7.1, timeLeft: 1500, bidders: 21, isHot: true },
    { id: 4, code: 'BLR→CHN', price: 11850, change: 3.4, timeLeft: 5400, bidders: 12, isHot: false },
    { id: 5, code: 'MUM→PUN', price: 8900, change: -1.8, timeLeft: 4800, bidders: 9, isHot: false },
    { id: 6, code: 'KOL→DEL', price: 15200, change: 4.7, timeLeft: 2700, bidders: 18, isHot: true },
    { id: 7, code: 'CHN→BLR', price: 10500, change: 2.1, timeLeft: 3900, bidders: 15, isHot: false },
    { id: 8, code: 'AMD→MUM', price: 7800, change: -0.9, timeLeft: 6600, bidders: 7, isHot: false }
  ]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // Update route data every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoutes(prev => prev.map(route => ({
        ...route,
        price: route.price + (Math.random() - 0.5) * 200,
        change: route.change + (Math.random() - 0.5) * 2,
        timeLeft: Math.max(0, route.timeLeft - 1),
        bidders: route.bidders + (Math.random() > 0.8 ? 1 : 0)
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedItem === null || draggedItem === dropIndex) {
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    const newRoutes = [...routes];
    const draggedRoute = newRoutes[draggedItem];
    
    // Remove the dragged item
    newRoutes.splice(draggedItem, 1);
    
    // Insert at new position
    newRoutes.splice(dropIndex, 0, draggedRoute);
    
    setRoutes(newRoutes);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <div className="bg-black text-white rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-green-400">LIVE ROUTE MARKET</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">Real-time</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-400">
          <span className="text-xs">Drag cards to reorder</span>
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Carousel Content */}
      <div className="p-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {routes.map((route, index) => (
              <CarouselItem 
                key={`${route.id}-${index}`} 
                className="pl-4 basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
              >
                <Card 
                  className={`bg-gray-900 border-gray-700 hover:bg-gray-800 transition-all duration-300 cursor-move h-full transform hover:scale-105 hover:border-green-500 ${
                    dragOverIndex === index ? 'border-blue-400 bg-gray-800' : ''
                  } ${
                    draggedItem === index ? 'opacity-50' : ''
                  }`}
                  onClick={() => onRouteSelect(route.code)}
                >
                  <CardContent className="p-4 h-full flex flex-col justify-between">
                    {/* Drag Handle */}
                    <div className="flex items-center justify-between mb-2">
                      <GripVertical className="w-4 h-4 text-gray-500 cursor-move" />
                      <div className="text-xs text-gray-500">#{index + 1}</div>
                    </div>

                    {/* Route Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-lg font-bold text-white">{route.code}</span>
                        {route.isHot && (
                          <Badge className="bg-red-600 text-white text-xs px-2 py-1">
                            <Flame className="w-3 h-3 mr-1" />
                            HOT
                          </Badge>
                        )}
                      </div>
                      
                      <div className={`flex items-center space-x-1 ${
                        route.change >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {route.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span className="text-sm font-medium">
                          {route.change >= 0 ? '+' : ''}{route.change.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Current Bid</span>
                        <span className="text-xl font-bold text-white">₹{route.price.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between items-center text-sm mb-3">
                      <div className="flex items-center space-x-1 text-orange-400">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(route.timeLeft)} left</span>
                      </div>
                      <div className="flex items-center space-x-1 text-blue-400">
                        <Users className="w-3 h-3" />
                        <span>{route.bidders} bidders</span>
                      </div>
                    </div>

                    {/* Price Movement Indicator */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-3 rounded-full ${
                              Math.random() > 0.5 ? 'bg-green-400' : 'bg-red-400'
                            }`}
                            style={{ opacity: 0.3 + Math.random() * 0.7 }}
                          />
                        ))}
                      </div>
                      <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                        Live
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Arrows */}
          <CarouselPrevious className="hidden md:flex -left-12 bg-gray-800 border-gray-600 text-white hover:bg-gray-700" />
          <CarouselNext className="hidden md:flex -right-12 bg-gray-800 border-gray-600 text-white hover:bg-gray-700" />
        </Carousel>
      </div>

      {/* Footer Stats */}
      <div className="px-6 py-3 bg-gray-900 border-t border-gray-800">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <span>📊 {routes.length} Active Routes</span>
            <span>🔥 {routes.filter(r => r.isHot).length} Hot Markets</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Market Open</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteMarketTicker;
