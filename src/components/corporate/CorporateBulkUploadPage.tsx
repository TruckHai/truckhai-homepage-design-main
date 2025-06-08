
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from '../DashboardLayout';
import { BarChart3, Building, FileText, Download, Upload, Eye, Send } from 'lucide-react';

const CorporateBulkUploadPage = () => {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [validationResults, setValidationResults] = useState<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate validation
      setTimeout(() => {
        setValidationResults({
          totalRecords: 45,
          validRecords: 42,
          errorRecords: 3
        });
      }, 1000);
    }
  };

  const handleDownloadTemplate = (templateType: string) => {
    toast({
      title: "Template Downloaded",
      description: `${templateType} template downloaded successfully`,
    });
  };

  const handleProcessLoads = () => {
    toast({
      title: "Processing Complete",
      description: "✅ 42 loads posted for bidding.",
    });
  };

  return (
    <DashboardLayout
      userRole="corporate"
      userName="Priya Sharma"
      userId="CC12345678"
      isVerified={false}
      verificationStatus="pending"
    >
      {/* Breadcrumb */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">Dashboard &gt; Bulk Upload</p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
          <BarChart3 className="w-8 h-8 text-red-500" />
          Bulk Load Upload Center
        </h1>
      </div>

      {/* Step 1: Download Template */}
      <Card className="mb-8 bg-white rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-500" />
            Choose your upload template:
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-gray-200 hover:border-red-300 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Standard Template</h3>
                <p className="text-sm text-gray-600 mb-4">Basic load requirements.</p>
                <Button 
                  onClick={() => handleDownloadTemplate('Standard')}
                  className="w-full bg-red-500 hover:bg-red-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CSV
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-red-300 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <Building className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Enterprise Template</h3>
                <p className="text-sm text-gray-600 mb-4">Advanced fields with approvals & cost centers.</p>
                <Button 
                  onClick={() => handleDownloadTemplate('Enterprise')}
                  className="w-full bg-red-500 hover:bg-red-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CSV
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-red-300 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Custom Template</h3>
                <p className="text-sm text-gray-600 mb-4">Add custom fields as needed.</p>
                <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
                  Configure
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Template fields:</strong> Load_ID, Pickup_Location, Delivery_Location, Cargo_Description, 
              Weight, Dimensions, Cargo_Value, Insurance_Required, Contact_Person, Department, Cost_Center.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Upload Your File */}
      <Card className="mb-8 bg-white rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-red-500" />
            Upload Your File
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-red-300 transition-colors">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600 mb-2">Drag & drop your CSV/XLSX file here</p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button variant="outline" className="mb-4">
                Browse Files
              </Button>
              <input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500">
              Supported formats: .csv, .xlsx | Max size: 10MB | Max 1000 records
            </p>
          </div>

          {uploadedFile && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">
                File uploaded: {uploadedFile.name}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 3: Validation Results */}
      {validationResults && (
        <Card className="mb-8 bg-white rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-red-500" />
              Validation Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <FileText className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">File</p>
                <p className="font-semibold">monthly_shipments_dec2024.csv</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Total Records</p>
                <p className="text-xl font-bold text-blue-600">{validationResults.totalRecords}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Valid</p>
                <p className="text-xl font-bold text-green-600">{validationResults.validRecords}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg text-center">
                <FileText className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Errors</p>
                <p className="text-xl font-bold text-red-600">{validationResults.errorRecords}</p>
              </div>
            </div>

            {validationResults.errorRecords > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Error Details:</h4>
                <div className="bg-red-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-3 gap-4 font-medium text-red-800 border-b pb-2">
                      <span>Row #</span>
                      <span>Field</span>
                      <span>Error Message</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-red-600">
                      <span>15</span>
                      <span>Pickup_Location</span>
                      <span>Invalid format</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-red-600">
                      <span>23</span>
                      <span>Cargo_Value</span>
                      <span>Missing value</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-red-600">
                      <span>31</span>
                      <span>Delivery_Date</span>
                      <span>Invalid date format</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                <Download className="w-4 h-4 mr-2" />
                Download Error Report
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Fix & Re-upload
              </Button>
              <Button 
                onClick={handleProcessLoads}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Process Valid
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Review & Submit */}
      {validationResults && (
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-red-500" />
              Review & Submit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Ready for Processing</p>
                <p className="text-xl font-bold text-green-600">{validationResults.validRecords} loads</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Estimated Total Value</p>
                <p className="text-xl font-bold text-blue-600">₹28,50,000</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Insurance Required</p>
                <p className="text-xl font-bold text-purple-600">38 loads</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">Pickup Dates</p>
                <p className="text-sm font-bold text-orange-600">Dec 20 – Dec 30 2024</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">Processing Options:</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="radio" name="processing" value="immediate" defaultChecked className="text-red-500" />
                  <span>Post all loads immediately for bidding</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" name="processing" value="scheduled" className="text-red-500" />
                  <span>Schedule posting:</span>
                  <input type="datetime-local" className="ml-2 border border-gray-300 rounded px-2 py-1 text-sm" />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" name="processing" value="draft" className="text-red-500" />
                  <span>Save as draft for review</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                <Eye className="w-4 h-4 mr-2" />
                Preview Loads
              </Button>
              <Button variant="secondary">
                Save Draft
              </Button>
              <Button 
                onClick={handleProcessLoads}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Post All for Bidding
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default CorporateBulkUploadPage;
