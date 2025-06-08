
import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import TruckDetailsSection from './TruckDetailsSection';
import OperationalDetailsSection from './OperationalDetailsSection';
import PostTruckActions from './PostTruckActions';
import TruckPreviewModal from './TruckPreviewModal';
import { usePostTruckForm } from '@/hooks/usePostTruckForm';
import { ChevronDown, ChevronUp, Truck, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const PostTruckPage = () => {
  const { formData, errors, isSubmitting, handleSubmit, updateFormData } = usePostTruckForm();
  const [showPreview, setShowPreview] = useState(false);
  const [truckDetailsOpen, setTruckDetailsOpen] = useState(true);
  const [operationalDetailsOpen, setOperationalDetailsOpen] = useState(true);

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <DashboardLayout 
      userRole="fleet" 
      userName="Fleet Owner" 
      userId="FO123456" 
      isVerified={true}
    >
      <div className="max-w-5xl mx-auto space-y-8 p-6">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
              <Truck className="w-6 h-6 text-red-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Post Your Truck</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            List your truck for immediate bookings and connect with verified load providers across India
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Truck Details Section */}
          <Collapsible open={truckDetailsOpen} onOpenChange={setTruckDetailsOpen}>
            <Card className="overflow-hidden shadow-lg border-0 bg-white rounded-2xl">
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-gray-50/50 transition-colors duration-200 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                        <Truck className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <CardTitle className="text-xl font-bold text-gray-900">Truck Details</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">Basic information about your truck</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      {truckDetailsOpen ? (
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <TruckDetailsSection 
                    formData={formData}
                    errors={errors}
                    onUpdate={updateFormData}
                  />
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Operational Details Section */}
          <Collapsible open={operationalDetailsOpen} onOpenChange={setOperationalDetailsOpen}>
            <Card className="overflow-hidden shadow-lg border-0 bg-white rounded-2xl">
              <CollapsibleTrigger className="w-full">
                <CardHeader className="hover:bg-gray-50/50 transition-colors duration-200 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                        <Settings className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-left">
                        <CardTitle className="text-xl font-bold text-gray-900">Operational Details</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">Driver info, routes, and special features</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      {operationalDetailsOpen ? (
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <OperationalDetailsSection 
                    formData={formData}
                    onUpdate={updateFormData}
                  />
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Action Buttons */}
          <Card className="shadow-lg border-0 bg-white rounded-2xl sticky bottom-6 z-10">
            <CardContent className="p-6">
              <PostTruckActions 
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                onPreview={handlePreview}
              />
            </CardContent>
          </Card>
        </form>

        {/* Preview Modal */}
        <TruckPreviewModal 
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          formData={formData}
        />
      </div>
    </DashboardLayout>
  );
};

export default PostTruckPage;
