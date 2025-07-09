import "./global.css";
import "./i18n";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BrowseAgents from "./pages/BrowseAgents";
import AgentDashboard from "./pages/AgentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BrowsePackages from "./pages/BrowsePackages";
import PackageDetail from "./pages/PackageDetail";
import CreatePackage from "./pages/CreatePackage";
import ManagePackages from "./pages/ManagePackages";
import AdminPackages from "./pages/AdminPackages";
import AgentSignIn from "./pages/AgentSignIn";
import JoinAsAgent from "./pages/JoinAsAgent";
import AdminSignIn from "./pages/AdminSignIn";
import Destinations from "./pages/Destinations";
import HowItWorks from "./pages/HowItWorks";
import AgentProfile from "./pages/AgentProfile";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import AdminUsers from "./pages/AdminUsers";
import AdminSubscriptions from "./pages/AdminSubscriptions";
import AdminModeration from "./pages/AdminModeration";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminSettings from "./pages/AdminSettings";
import AdminNotifications from "./pages/AdminNotifications";
import AdminAuditLogs from "./pages/AdminAuditLogs";
import AgentCreateItinerary from "./pages/AgentCreateItinerary";
import AgentMessageCustomers from "./pages/AgentMessageCustomers";
import AgentAnalytics from "./pages/AgentAnalytics";
import AgentPublicProfile from "./pages/AgentPublicProfile";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import Blog from "./pages/Blog";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Gdpr from "./pages/Gdpr";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Safety from "./pages/Safety";
import Trust from "./pages/Trust";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/browse-agents" element={<BrowseAgents />} />
          <Route path="/agent/:id" element={<AgentProfile />} />
          <Route path="/agents/:id" element={<AgentPublicProfile />} />
          <Route path="/packages" element={<BrowsePackages />} />
          <Route path="/package/:id" element={<PackageDetail />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/agent/sign-in" element={<AgentSignIn />} />
          <Route path="/join-as-agent" element={<JoinAsAgent />} />
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
          <Route path="/agent/packages" element={<ManagePackages />} />
          <Route path="/agent/create-package" element={<CreatePackage />} />
          <Route path="/agent/itineraries/create" element={<AgentCreateItinerary />} />
          <Route path="/agent/customers/message" element={<AgentMessageCustomers />} />
          <Route path="/agent/analytics" element={<AgentAnalytics />} />
          <Route path="/agent/profile" element={<AgentProfile />} />
          <Route path="/agent/profile/public" element={<AgentPublicProfile />} />
          <Route path="/admin/sign-in" element={<AdminSignIn />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/packages" element={<AdminPackages />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
          <Route path="/admin/moderation" element={<AdminModeration />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/audit-logs" element={<AdminAuditLogs />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/press" element={<Press />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/gdpr" element={<Gdpr />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/trust" element={<Trust />} />
          <Route path="/pricing" element={<Pricing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
