import React from 'react';
import { Button } from "@/components/ui/button";
import { Save, File, Send, ChevronLeft, ChevronRight } from 'lucide-react';

interface FormActionsProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onNext: () => void;
  onPrev: () => void;
  onSaveAsDraft: () => void;
  onSaveAsTemplate: () => void;
  onSubmit: () => void;
}

const FormActions = ({
  currentStep,
  totalSteps,
  isSubmitting,
  onNext,
  onPrev,
  onSaveAsDraft,
  onSaveAsTemplate,
  onSubmit
}: FormActionsProps) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 -mx-8">
      <div className="flex items-center justify-between">
        {/* Left Actions */}
        <div className="flex items-center space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onSaveAsTemplate}
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            <File className="w-4 h-4 mr-2" />
            Save as Template
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={onSaveAsDraft}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-3">
          {!isFirstStep && (
            <Button
              type="button"
              variant="outline"
              onClick={onPrev}
              className="border-gray-300"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
          )}

          {!isLastStep ? (
            <Button
              onClick={onNext}
              className="bg-red-500 hover:bg-red-600 text-white px-6"
            >
              Next Step
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Post for Bidding
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormActions;
