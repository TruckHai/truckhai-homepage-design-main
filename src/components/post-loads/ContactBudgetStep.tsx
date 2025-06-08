
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, DollarSign, Building, Target } from 'lucide-react';

interface ContactBudgetStepProps {
  formData: any;
  errors: Record<string, string>;
  onUpdate: (updates: any) => void;
  onNext: () => void;
}

const ContactBudgetStep = ({ formData, errors, onUpdate, onNext }: ContactBudgetStepProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <User className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900">Contact & Budget</h2>
        <p className="text-gray-600">Provide contact details and budget information</p>
      </div>

      <div className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <Label className="text-gray-900 font-semibold">Contact Person for Coordination *</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Contact Name"
                  value={formData.contactName || ''}
                  onChange={(e) => onUpdate({ contactName: e.target.value })}
                  className="pl-10 h-12"
                />
              </div>
              {errors.contactName && <p className="text-sm text-red-600">{errors.contactName}</p>}
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Phone Number"
                  value={formData.contactPhone || ''}
                  onChange={(e) => onUpdate({ contactPhone: e.target.value })}
                  className="pl-10 h-12"
                />
              </div>
              {errors.contactPhone && <p className="text-sm text-red-600">{errors.contactPhone}</p>}
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Email Address"
                  value={formData.contactEmail || ''}
                  onChange={(e) => onUpdate({ contactEmail: e.target.value })}
                  className="pl-10 h-12"
                />
              </div>
              {errors.contactEmail && <p className="text-sm text-red-600">{errors.contactEmail}</p>}
            </div>
          </div>
        </div>

        {/* Budget Range */}
        <div className="space-y-4">
          <Label className="text-gray-900 font-semibold flex items-center space-x-2">
            <DollarSign className="w-4 h-4" />
            <span>Budget Range *</span>
          </Label>
          <div className="flex items-center space-x-3">
            <Input
              type="number"
              placeholder="Min ₹"
              value={formData.budgetMin || ''}
              onChange={(e) => onUpdate({ budgetMin: e.target.value })}
              className="flex-1 h-12"
            />
            <span className="text-gray-500">—</span>
            <Input
              type="number"
              placeholder="Max ₹"
              value={formData.budgetMax || ''}
              onChange={(e) => onUpdate({ budgetMax: e.target.value })}
              className="flex-1 h-12"
            />
          </div>
          <p className="text-sm text-gray-500">💡 Market Rate Suggestion: ₹15,000 – ₹25,000</p>
          {(errors.budgetMin || errors.budgetMax) && (
            <p className="text-sm text-red-600">{errors.budgetMin || errors.budgetMax}</p>
          )}
        </div>

        {/* Optional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-gray-900 font-semibold flex items-center space-x-2">
              <Building className="w-4 h-4" />
              <span>Department (Optional)</span>
            </Label>
            <Input
              placeholder="e.g., Logistics, Operations"
              value={formData.department || ''}
              onChange={(e) => onUpdate({ department: e.target.value })}
              className="h-12"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-gray-900 font-semibold flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Cost Center (Optional)</span>
            </Label>
            <Select value={formData.costCenter || ''} onValueChange={(value) => onUpdate({ costCenter: value })}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select cost center" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cc001">CC001 - Logistics</SelectItem>
                <SelectItem value="cc002">CC002 - Operations</SelectItem>
                <SelectItem value="cc003">CC003 - Sales</SelectItem>
                <SelectItem value="cc004">CC004 - Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          disabled={!formData.contactName || !formData.contactPhone || !formData.budgetMin || !formData.budgetMax}
          className="bg-red-500 hover:bg-red-600 text-white px-8"
        >
          Continue to Advanced Settings
        </Button>
      </div>
    </div>
  );
};

export default ContactBudgetStep;
