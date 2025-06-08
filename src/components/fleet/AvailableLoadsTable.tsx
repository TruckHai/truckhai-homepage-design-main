
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Eye, MapPin } from 'lucide-react';

const AvailableLoadsTable = () => {
  const availableLoads = [
    {
      id: "LD-001",
      route: "Delhi → Mumbai",
      cargo: "Electronics – 5000 kg",
      budget: "₹45,000 – ₹55,000",
      deadline: "6 hrs left",
      distance: "1,400 km",
      truckType: "Full Truck Load",
      status: "open"
    },
    {
      id: "LD-002", 
      route: "Bangalore → Chennai",
      cargo: "Furniture – 3000 kg",
      budget: "₹30,000 – ₹38,000",
      deadline: "2 days left",
      distance: "350 km",
      truckType: "Part Load",
      status: "open"
    }
  ];

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900 flex items-center">
          <Package className="w-5 h-5 mr-2 text-blue-600" />
          Available Loads for Bidding
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Load ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Route</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cargo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Budget Range</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Distance</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Truck Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Deadline</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {availableLoads.map((load) => (
                <tr key={load.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <button className="text-red-600 hover:text-red-800 font-medium">
                      {load.id}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-gray-900 flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                    {load.route}
                  </td>
                  <td className="px-6 py-4 text-gray-900">{load.cargo}</td>
                  <td className="px-6 py-4 text-gray-900">{load.budget}</td>
                  <td className="px-6 py-4 text-gray-900">{load.distance}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">{load.truckType}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-orange-600 font-medium">{load.deadline}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white mr-2">
                      Place Bid
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                      <Eye className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailableLoadsTable;
