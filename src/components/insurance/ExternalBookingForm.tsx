
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadIcon, FileTextIcon, Trash2Icon } from './InsuranceIcons';

interface UploadedDocument {
  name: string;
  size: string;
  type: string;
}

interface ExternalBookingFormProps {
  uploadedDocument: UploadedDocument | null;
  enableClaimSupport: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteDocument: () => void;
  onClaimSupportChange: (enabled: boolean) => void;
}

const ExternalBookingForm: React.FC<ExternalBookingFormProps> = ({
  uploadedDocument,
  enableClaimSupport,
  onFileUpload,
  onDeleteDocument,
  onClaimSupportChange
}) => {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border-l-4 border-orange-400">
      <h4 className="font-medium text-gray-900">External Booking Details</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Insurer Name
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select or type insurer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="icici">ICICI Lombard</SelectItem>
              <SelectItem value="hdfc">HDFC ERGO</SelectItem>
              <SelectItem value="bajaj">Bajaj Allianz</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Policy Number (Optional)
          </label>
          <Input placeholder="Enter existing policy number" />
        </div>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload External Booking Document *
        </label>
        {!uploadedDocument ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
            <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">Drag & drop or click to upload</p>
            <input
              type="file"
              onChange={onFileUpload}
              className="hidden"
              id="file-upload"
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <label htmlFor="file-upload">
              <Button variant="outline" size="sm" className="cursor-pointer">
                Choose File
              </Button>
            </label>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileTextIcon className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">{uploadedDocument.name}</p>
                <p className="text-xs text-green-600">{uploadedDocument.size}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDeleteDocument}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2Icon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Claim Support Checkbox */}
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="claim-support"
          checked={enableClaimSupport}
          onChange={(e) => onClaimSupportChange(e.target.checked)}
          className="mt-1"
        />
        <label htmlFor="claim-support" className="text-sm text-gray-700">
          <span className="font-medium">Enable Claim Support via TruckHai</span>
          <p className="text-xs text-gray-500 mt-1">
            We'll help process claims directly with your provider
          </p>
        </label>
      </div>

      {enableClaimSupport && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            ✅ Smart Claim Tracking enabled - We'll monitor and assist with your claims
          </p>
        </div>
      )}
    </div>
  );
};

export default ExternalBookingForm;
