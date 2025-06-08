
import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import LoadFormStepper from './LoadFormStepper';
import LoadDetailsStep from './LoadDetailsStep';
import LocationStep from './LocationStep';
import CargoInfoStep from './CargoInfoStep';
import VehicleRequirementsStep from './VehicleRequirementsStep';
import ContactBudgetStep from './ContactBudgetStep';
import AdvancedSettingsStep from './AdvancedSettingsStep';
import FormActions from './FormActions';
import { usePostLoadForm } from '../../hooks/usePostLoadForm';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Clock, CheckCircle } from "lucide-react";

const PostLoadsPage = () => {
  const { formData, errors, isSubmitting, currentStep, setCurrentStep, handleSubmit, updateFormData, saveAsDraft, saveAsTemplate } = usePostLoadForm();
  
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
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 font-medium">
          <span className="cursor-pointer hover:text-red-500 transition-colors">Dashboard</span>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <span className="text-gray-900">Post New Load</span>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
                📦 Post a New Load
              </h1>
              <p className="text-gray-600">Create a new load posting to receive competitive bids from verified transporters</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Auto-saved 30s ago</span>
              </Badge>
              {formData.loadId && (
                <Badge className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  ID: {formData.loadId}
                </Badge>
              )}
            </div>
          </div>

          {/* Progress Stepper */}
          <LoadFormStepper 
            steps={steps}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            errors={errors}
          />
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
        </Card>

        {/* Action Buttons */}
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

        {/* Expected Timeline */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 rounded-xl">
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Expected Timeline</h3>
                <p className="text-blue-700 text-sm">You'll start receiving competitive bids within ~12 minutes of posting</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PostLoadsPage;
