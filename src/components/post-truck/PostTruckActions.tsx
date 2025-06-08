
import React from 'react';
import { Button } from "@/components/ui/button";
import { Save, FileText, Eye, Send } from 'lucide-react';

interface PostTruckActionsProps {
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onPreview: () => void;
}

const PostTruckActions = ({ isSubmitting, onSubmit, onPreview }: PostTruckActionsProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
      {/* Secondary Actions */}
      <div className="flex flex-wrap gap-3">
        <Button 
          type="button" 
          variant="outline" 
          className="px-6 h-11 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
        >
          <Save className="w-4 h-4 mr-2" />
          Save as Template
        </Button>
        <Button 
          type="button" 
          variant="outline"
          className="px-6 h-11 border-gray-200 hover:border-yellow-300 hover:bg-yellow-50"
        >
          <FileText className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        <Button 
          type="button" 
          variant="outline"
          onClick={onPreview}
          className="px-6 h-11 border-gray-200 hover:border-purple-300 hover:bg-purple-50"
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
      </div>

      {/* Primary Action */}
      <Button 
        type="submit" 
        disabled={isSubmitting}
        onClick={onSubmit}
        className="px-8 h-12 bg-red-500 hover:bg-red-600 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
      >
        {isSubmitting ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Posting...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Send className="w-5 h-5" />
            <span>Post Truck</span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default PostTruckActions;
