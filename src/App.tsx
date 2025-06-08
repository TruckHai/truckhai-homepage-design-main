
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BrokerDashboard from "./components/BrokerDashboard";
import FleetDashboard from "./components/FleetDashboard";
import CorporateDashboard from "./components/CorporateDashboard";
import PostLoadsPage from "./components/PostLoadsPage";
import HireTrucksPage from "./components/HireTrucksPage";
import PostTruckPage from "./components/PostTruckPage";
import InsurancePage from "./components/InsurancePage";
import UnifiedInsuranceHub from "./components/UnifiedInsuranceHub";
import BrokerInsurancePage from "./components/BrokerInsurancePage";
import FleetInsurancePage from "./components/FleetInsurancePage";
import FleetManagementPage from "./components/FleetManagementPage";
import GPSTrackingPage from "./components/GPSTrackingPage";
import FleetSupportPage from "./components/FleetSupportPage";
import ReportsAnalyticsPage from "./components/ReportsAnalyticsPage";
import SettingsPage from "./components/SettingsPage";
import CommissionTrackingPage from "./components/CommissionTrackingPage";
import CorporateBiddingExchange from "./components/CorporateBiddingExchange";
import CorporateBiddingPage from "./components/CorporateBiddingPage";
import BrokerBiddingExchange from "./components/BrokerBiddingExchange";
import FleetBiddingExchange from "./components/FleetBiddingExchange";
import FleetSettingsPage from "./components/FleetSettingsPage";
import CorporatePostLoadPage from "./components/corporate/CorporatePostLoadPage";
import CorporateBulkUploadPage from "./components/corporate/CorporateBulkUploadPage";
import CorporateERPIntegrationPage from "./components/corporate/CorporateERPIntegrationPage";
import CorporateLiveTrackingPage from "./components/corporate/CorporateLiveTrackingPage";
import CorporateInsuranceHubPage from "./components/corporate/CorporateInsuranceHubPage";
import CorporateBiddingDashboardPage from "./components/corporate/CorporateBiddingDashboardPage";
import CorporateAnalyticsPage from "./components/corporate/CorporateAnalyticsPage";
import CorporateSettingsPage from "./components/corporate/CorporateSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/broker-dashboard" element={<BrokerDashboard />} />
          <Route path="/fleet-dashboard" element={<FleetDashboard />} />
          <Route path="/corporate-dashboard" element={<CorporateDashboard />} />
          <Route path="/post-loads" element={<PostLoadsPage />} />
          <Route path="/hire-trucks" element={<HireTrucksPage />} />
          <Route path="/post-truck" element={<PostTruckPage />} />
          <Route path="/insurance" element={<UnifiedInsuranceHub />} />
          <Route path="/insurance-legacy" element={<InsurancePage />} />
          <Route path="/broker-insurance" element={<BrokerInsurancePage />} />
          <Route path="/fleet-insurance" element={<FleetInsurancePage />} />
          <Route path="/corporate-insurance" element={<CorporateInsuranceHubPage />} />
          <Route path="/fleet-management" element={<FleetManagementPage />} />
          <Route path="/gps-tracking" element={<GPSTrackingPage />} />
          <Route path="/fleet-support" element={<FleetSupportPage />} />
          <Route path="/reports-analytics" element={<ReportsAnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/fleet-settings" element={<FleetSettingsPage />} />
          <Route path="/commission-tracking" element={<CommissionTrackingPage />} />
          <Route path="/corporate-bidding-exchange" element={<CorporateBiddingExchange />} />
          <Route path="/broker-bidding-exchange" element={<BrokerBiddingExchange />} />
          <Route path="/fleet-bidding-exchange" element={<FleetBiddingExchange />} />
          <Route path="/corporate-bidding" element={<CorporateBiddingPage />} />
          <Route path="/corporate/post-load" element={<CorporatePostLoadPage />} />
          <Route path="/corporate/bulk-upload" element={<CorporateBulkUploadPage />} />
          <Route path="/corporate/erp-integration" element={<CorporateERPIntegrationPage />} />
          <Route path="/corporate/live-tracking" element={<CorporateLiveTrackingPage />} />
          <Route path="/corporate/insurance-hub" element={<CorporateInsuranceHubPage />} />
          <Route path="/corporate/bidding-dashboard" element={<CorporateBiddingDashboardPage />} />
          <Route path="/corporate/analytics" element={<CorporateAnalyticsPage />} />
          <Route path="/corporate/settings" element={<CorporateSettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
