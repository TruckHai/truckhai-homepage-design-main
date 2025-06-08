
import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import LoadFormStepper from './post-loads/LoadFormStepper';
import LoadDetailsStep from './post-loads/LoadDetailsStep';
import LocationStep from './post-loads/LocationStep';
import CargoInfoStep from './post-loads/CargoInfoStep';
import VehicleRequirementsStep from './post-loads/VehicleRequirementsStep';
import ContactBudgetStep from './post-loads/ContactBudgetStep';
import AdvancedSettingsStep from './post-loads/AdvancedSettingsStep';
import FormActions from './post-loads/FormActions';
import { usePostLoadForm } from '../hooks/usePostLoadForm';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Clock, CheckCircle, Package } from "lucide-react";

const PostLoadsPage = () => {
  const { 
    formData, 
    errors, 
    isSubmitting, 
    currentStep, 
    setCurrentStep, 
    handleSubmit, 
    updateFormData, 
    saveAsDraft, 
    saveAsTemplate 
  } = usePostLoadForm();
  
  const steps = [
    { id: 1, title: 'Load Details', component: LoadDetailsStep },
    { id: 2, title: 'Pickup & Delivery', component: LocationStep },
    { id: 3, title: 'Cargo Info', component: CargoInfoStep },
    { id: 4, title: 'Vehicle Requirements', component: VehicleRequirementsStep },
    { id: 5, title: 'Contact & Budget', component: ContactBudgetStep },
    { id: 6, title: 'Advanced', component: AdvancedSettingsStep, optional: true }
  ];

  const CurrentStepComponent = steps.find(step => step.id === currentStep)?.component;

  return (
    <DashboardLayout
      userRole="broker"
      userName="Rajesh Kumar"
      userId="BR123456"
      isVerified={false}
      verificationStatus="not-started"
    >
      <div className="space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 font-medium">
          <span className="cursor-pointer hover:text-red-500 transition-colors">Dashboard</span>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <span className="text-gray-900">Post New Load</span>
        </div>

        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-red-500" />
                </div>
                Post a New Load
              </h1>
              <p className="text-gray-600 text-lg">Create a new load posting to receive competitive bids from verified transporters</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="flex items-center space-x-2 px-3 py-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="text-sm">Auto-saved 30s ago</span>
              </Badge>
              {formData.loadId && (
                <Badge className="bg-green-50 text-green-700 border-green-200 px-3 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  ID: {formData.loadId}
                </Badge>
              )}
            </div>
          </div>

          {/* Progress Stepper */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <LoadFormStepper 
              steps={steps}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
              errors={errors}
            />
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="bg-white border-0 shadow-lg rounded-2xl overflow-hidden">
          <div className="p-8">
            {CurrentStepComponent && (
              <CurrentStepComponent
                formData={formData}
                errors={errors}
                onUpdate={updateFormData}
                onNext={() => setCurrentStep(Math.min(currentStep + 1, steps.length))}
                onPrev={() => setCurrentStep(Math.max(currentStep - 1, 1))}
              />
            )}
          </div>

          {/* Form Actions */}
          <FormActions
            currentStep={currentStep}
            totalSteps={steps.length}
            isSubmitting={isSubmitting}
            onNext={() => setCurrentStep(Math.min(currentStep + 1, steps.length))}
            onPrev={() => setCurrentStep(Math.max(currentStep - 1, 1))}
            onSaveAsDraft={saveAsDraft}
            onSaveAsTemplate={saveAsTemplate}
            onSubmit={handleSubmit}
          />
        </Card>

        {/* Bottom Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expected Timeline */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 rounded-xl">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 text-lg">Expected Timeline</h3>
                  <p className="text-blue-700">You'll start receiving competitive bids within ~12 minutes of posting</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Support Card */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 rounded-xl">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-green-900 text-lg">Quality Assurance</h3>
                  <p className="text-green-700">All transporters are verified and GPS-tracked for your peace of mind</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PostLoadsPage;
