import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

// Import components
import NotificationPanel from './insurance/NotificationPanel';
import ProfileDropdown from './insurance/ProfileDropdown';
import CoverageSelector from './insurance/CoverageSelector';
import ExternalBookingForm from './insurance/ExternalBookingForm';
import InsuranceHistory from './insurance/InsuranceHistory';
import WhyChoosePanel from './insurance/WhyChoosePanel';

// Import icons
import { 
  ShieldIcon, 
  InfoIcon, 
  CalendarIcon, 
  HelpCircleIcon,
  XIcon,
  FileTextIcon
} from './insurance/InsuranceIcons';

const InsurancePage = () => {
  const { toast } = useToast();
  const location = useLocation();
  
  // Determine user role based on navigation state or URL context
  const getUserRole = () => {
    console.log('Location state:', location.state); // Debug log
    console.log('Current pathname:', location.pathname); // Debug log
    console.log('Document referrer:', document.referrer); // Debug log
    
    // Check if userRole was passed in navigation state
    if (location.state?.userRole === 'fleet') {
      return 'fleet';
    }
    
    // Check if coming from fleet dashboard via referrer
    if (document.referrer.includes('/fleet-dashboard')) {
      return 'fleet';
    }
    
    // Check URL parameters or other context indicators
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('from') === 'fleet') {
      return 'fleet';
    }
    
    return 'broker'; // default to broker for backward compatibility
  };

  const userRole = getUserRole();
  console.log('Determined user role:', userRole); // Debug log
  
  const [activeTab, setActiveTab] = useState('platform');
  const [selectedCoverage, setSelectedCoverage] = useState('');
  const [estimatedPremium, setEstimatedPremium] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPolicyDetails, setShowPolicyDetails] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [unreadCount, setUnreadCount] = useState(3);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [enableClaimSupport, setEnableClaimSupport] = useState(false);

  const coverageOptions = [
    { 
      id: 'basic', 
      title: 'Basic', 
      limit: 'up to ₹5L', 
      premium: '2,500',
      icon: '🛡️',
      features: ['Theft protection', 'Damage coverage', 'Basic support']
    },
    { 
      id: 'standard', 
      title: 'Standard', 
      limit: 'up to ₹25L', 
      premium: '8,500',
      icon: '⚡',
      features: ['All Basic features', 'Transit delays', '24/7 support', 'GPS tracking'],
      recommended: true
    },
    { 
      id: 'premium', 
      title: 'Premium', 
      limit: 'up to ₹1Cr', 
      premium: '25,000',
      icon: '👑',
      features: ['All Standard features', 'Priority claims', 'Dedicated manager', 'Weather coverage']
    }
  ];

  const insuranceHistory = [
    { 
      policyNo: 'INS123456', 
      loadId: 'LD-20240301-001', 
      coverage: '₹25L', 
      premium: '₹8,500', 
      status: 'Active',
      type: 'Platform'
    },
    { 
      policyNo: 'INS123455', 
      loadId: 'LD-20240228-005', 
      coverage: '₹5L', 
      premium: '₹2,500', 
      status: 'Expired',
      type: 'External'
    },
    { 
      policyNo: 'INS123454', 
      loadId: 'LD-20240225-003', 
      coverage: '₹1Cr', 
      premium: '₹25,000', 
      status: 'Claimed',
      type: 'Platform'
    }
  ];

  const notifications = [
    { id: 1, type: 'policy', message: 'Policy #INS123456 activated', time: '2h ago', read: false },
    { id: 2, type: 'payment', message: 'Premium Paid: ₹8,500', time: '1d ago', read: false },
    { id: 3, type: 'warning', message: 'Policy expiring in 2 days', time: '2d ago', read: false, urgent: true }
  ];

  const handleCoverageChange = (coverage) => {
    setSelectedCoverage(coverage);
    const option = coverageOptions.find(opt => opt.id === coverage);
    setEstimatedPremium(option ? option.premium : '');
  };

  const handlePurchasePolicy = () => {
    if (!selectedCoverage) {
      toast({
        title: "Please select coverage",
        description: "Choose a coverage plan to proceed",
        variant: "destructive"
      });
      return;
    }

    if (activeTab === 'external' && !uploadedDocument) {
      toast({
        title: "Document Required",
        description: "Please upload your external booking document",
        variant: "destructive"
      });
      return;
    }

    const action = activeTab === 'platform' ? 'Policy Purchased Successfully!' : 'Submitted for Review';
    const description = activeTab === 'platform' 
      ? `🎉 Your policy has been activated! Coverage: ${selectedCoverage}`
      : 'Our team will verify details within 24h';

    toast({
      title: action,
      description: description,
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedDocument({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        type: file.type
      });
    }
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setSelectedCoverage('');
    setEstimatedPremium('');
    setUploadedDocument(null);
    setEnableClaimSupport(false);
  };

  const handlePolicyDetails = (policy) => {
    setSelectedPolicy(policy);
    setShowPolicyDetails(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500 text-white';
      case 'Expired': return 'bg-gray-500 text-white';
      case 'Claimed': return 'bg-yellow-500 text-black';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <DashboardLayout
      userRole={userRole}
      userName={userRole === 'fleet' ? "Fleet Owner" : "Rajesh Kumar"}
      userId={userRole === 'fleet' ? "FO123456" : "BR123456"}
      isVerified={userRole === 'fleet' ? true : false}
      verificationStatus={userRole === 'fleet' ? "verified" : "not-started"}
    >
      {/* Custom Header with Notifications and Profile */}
      <div className="fixed top-4 right-6 z-50 flex items-center space-x-4">
        <NotificationPanel
          notifications={notifications}
          unreadCount={unreadCount}
          showNotifications={showNotifications}
          onToggle={() => setShowNotifications(!showNotifications)}
        />
        <ProfileDropdown
          showProfile={showProfile}
          onToggle={() => setShowProfile(!showProfile)}
        />
      </div>

      {/* Breadcrumb */}
      <div className="mb-6">
        <p className="text-sm text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Dashboard &gt; Insurance Hub
        </p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
          <ShieldIcon className="w-8 h-8 text-red-500" />
          Insurance Hub
        </h1>
      </div>

      {/* Insurance Overview Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 rounded-xl mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <ShieldIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-1" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
                  Protect your loads with full-stack in-transit and vehicle insurance
                </h3>
                <p className="text-blue-700 text-sm">
                  Get instant quotes and comprehensive coverage for all your cargo shipments
                </p>
              </div>
            </div>
            <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
              <InfoIcon className="w-4 h-4 mr-2" />
              Get Instant Quote
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Platform vs External Toggle */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gray-100 rounded-full p-1 flex">
            <button
              onClick={() => handleTabSwitch('platform')}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === 'platform'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Platform Booking Insurance
            </button>
            <button
              onClick={() => handleTabSwitch('external')}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === 'external'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              External Booking Insurance
            </button>
          </div>
        </div>

        {/* 70-30 Split Layout */}
        <div className="grid lg:grid-cols-10 gap-8">
          {/* Form Section - 70% */}
          <div className="lg:col-span-7">
            <Card className="bg-white rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between" style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}>
                  {activeTab === 'platform' ? 'Platform Booking' : 'External Booking'} Insurance
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <HelpCircleIcon className="w-4 h-4 mr-1" />
                    Need help?
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Smart Recommendation */}
                {activeTab === 'platform' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <InfoIcon className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-blue-800 font-medium">
                        Smart Recommendation: Most users with ₹25L cargo choose Standard
                      </span>
                    </div>
                  </div>
                )}

                {/* Common Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Load *
                    </label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose from your active loads" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LD-20240301-001">LD-20240301-001 (Delhi → Mumbai)</SelectItem>
                        <SelectItem value="LD-20240301-002">LD-20240301-002 (Bangalore → Chennai)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Effective Dates
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <Input type="date" />
                        <CalendarIcon className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                      <div className="relative">
                        <Input type="date" />
                        <CalendarIcon className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* External Booking Specific Fields */}
                {activeTab === 'external' && (
                  <ExternalBookingForm
                    uploadedDocument={uploadedDocument}
                    enableClaimSupport={enableClaimSupport}
                    onFileUpload={handleFileUpload}
                    onDeleteDocument={() => setUploadedDocument(null)}
                    onClaimSupportChange={setEnableClaimSupport}
                  />
                )}

                {/* Coverage Plans */}
                <CoverageSelector
                  coverageOptions={coverageOptions}
                  selectedCoverage={selectedCoverage}
                  onCoverageChange={handleCoverageChange}
                  onShowComparison={() => setShowComparison(true)}
                />

                {/* Coverage Confidence */}
                {selectedCoverage && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <ShieldIcon className="w-5 h-5 text-green-600" />
                        <div>
                          <span className="font-semibold text-green-800">
                            Coverage Confidence: 86%
                          </span>
                          <p className="text-sm text-green-700">
                            Based on your cargo value & route risk
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-800">₹{estimatedPremium}</p>
                        <p className="text-sm text-green-600">Estimated Premium</p>
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 font-semibold shadow-lg"
                  onClick={handlePurchasePolicy}
                >
                  {activeTab === 'platform' ? (
                    <>
                      <ShieldIcon className="w-5 h-5 mr-2" />
                      Purchase Policy
                    </>
                  ) : (
                    <>
                      <FileTextIcon className="w-5 h-5 mr-2" />
                      Submit for Review
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Why Choose Our Insurance - 30% */}
          <div className="lg:col-span-3">
            <WhyChoosePanel />
          </div>
        </div>
      </div>

      {/* Insurance History */}
      <InsuranceHistory
        insuranceHistory={insuranceHistory}
        onPolicyDetails={handlePolicyDetails}
      />

      {/* Comparison Modal */}
      {showComparison && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Insurance Plan Comparison</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowComparison(false)}>
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="font-semibold text-gray-900">Features</div>
                {coverageOptions.map((option) => (
                  <div key={option.id} className="text-center">
                    <div className="text-lg font-semibold">{option.title}</div>
                    <div className="text-sm text-gray-600">{option.limit}</div>
                    <div className="text-lg font-bold text-red-600">₹{option.premium}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Policy Details Slide Panel */}
      {showPolicyDetails && selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-96 bg-white h-full shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Policy Details</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowPolicyDetails(false)}>
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Policy Number</label>
                <p className="text-lg font-semibold">{selectedPolicy.policyNo}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Load ID</label>
                <p>{selectedPolicy.loadId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Coverage Amount</label>
                <p>{selectedPolicy.coverage}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Premium Paid</label>
                <p>{selectedPolicy.premium}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <Badge className={getStatusColor(selectedPolicy.status)}>
                  {selectedPolicy.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(showNotifications || showProfile) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
          }}
        ></div>
      )}
    </DashboardLayout>
  );
};

export default InsurancePage;
