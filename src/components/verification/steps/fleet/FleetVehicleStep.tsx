import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Truck, Upload, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Calendar, Shield, FileText } from 'lucide-react';

interface FleetVehicleStepProps {
  data: {
    truckNumber: string;
    rcImage: File | null;
    insuranceImage: File | null;
    fitnessImage: File | null;
    pucImage: File | null;
    verified: boolean;
  };
  onNext: (data: any) => void;
  onBack: () => void;
}

const FleetVehicleStep = ({ data, onNext, onBack }: FleetVehicleStepProps) => {
  const [formData, setFormData] = useState(data);
  const [validationStatus, setValidationStatus] = useState({
    rc: false,
    insurance: false,
    fitness: false,
    puc: false
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
      
      // Simulate document validation
      setTimeout(() => {
        const fieldName = field.replace('Image', '') as keyof typeof validationStatus;
        setValidationStatus(prev => ({ ...prev, [fieldName]: true }));
        
        // Check if all documents are validated
        const allValid = Object.values({ ...validationStatus, [fieldName]: true }).every(Boolean);
        if (allValid) {
          setFormData(prev => ({ ...prev, verified: true }));
        }
      }, 1000);
    }
  };

  const handleNext = () => {
    onNext(formData);
  };

  const documents = [
    {
      key: 'rc',
      title: 'Registration Certificate (RC)',
      icon: FileText,
      required: true,
      field: 'rcImage',
      status: validationStatus.rc,
      description: 'Upload clear photo of vehicle RC'
    },
    {
      key: 'insurance',
      title: 'Vehicle Insurance Policy',
      icon: Shield,
      required: true,
      field: 'insuranceImage',
      status: validationStatus.insurance,
      description: 'Current insurance policy document'
    },
    {
      key: 'fitness',
      title: 'Fitness Certificate',
      icon: CheckCircle,
      required: true,
      field: 'fitnessImage',
      status: validationStatus.fitness,
      description: 'Valid fitness certificate'
    },
    {
      key: 'puc',
      title: 'PUC Certificate',
      icon: Shield,
      required: true,
      field: 'pucImage',
      status: validationStatus.puc,
      description: 'Pollution Under Control certificate'
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sample Vehicle Verification</h2>
          <p className="text-gray-600">Upload RC & insurance for 1 truck – we'll use this as fleet benchmark</p>
        </div>

        <div className="space-y-6">
          {/* Truck Number */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Vehicle Details</h3>
            <div>
              <Label htmlFor="truckNumber">Truck Number</Label>
              <Input
                id="truckNumber"
                value={formData.truckNumber}
                onChange={(e) => handleInputChange('truckNumber', e.target.value)}
                placeholder="e.g., MH12AB1234"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Auto-detected location: Maharashtra</p>
            </div>
          </div>

          {/* Document Uploads */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Upload Vehicle Documents</h3>
            
            {documents.map((doc) => {
              const Icon = doc.icon;
              const file = formData[doc.field as keyof typeof formData] as File | null;
              
              return (
                <div key={doc.key} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-indigo-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.title}</h4>
                        <p className="text-sm text-gray-600">{doc.description}</p>
                      </div>
                    </div>
                    {doc.status && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    {file ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-8 h-8 text-green-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">Uploaded successfully</p>
                          </div>
                        </div>
                        {doc.status && (
                          <div className="text-right">
                            <p className="text-sm font-medium text-green-800">Document Valid</p>
                            <p className="text-xs text-green-600">Expiry: Valid till 2025</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload(doc.field, e)}
                            className="hidden"
                          />
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload {doc.title}
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Validation Summary */}
          {formData.verified && (
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-green-900">All Documents Validated</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>✅ Owner name matches with PAN</div>
                <div>✅ All documents within validity</div>
                <div>✅ Vehicle class: Commercial</div>
                <div>✅ Permits: All State</div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={!formData.verified}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Submit & Review
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FleetVehicleStep;
