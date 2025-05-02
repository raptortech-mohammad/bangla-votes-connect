
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contacts from "./pages/Contacts";
import ContactDetail from "./pages/ContactDetail";
import Campaigns from "./pages/Campaigns";
import Volunteers from "./pages/Volunteers";
import Analytics from "./pages/Analytics";
import DataTools from "./pages/DataTools";
import ProfilesPage from "./pages/DataTools/ProfilesPage";
import CustomFieldsPage from "./pages/DataTools/CustomFieldsPage";
import TimelinePage from "./pages/DataTools/TimelinePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/:id" element={<ContactDetail />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/data-tools" element={<DataTools />} />
          <Route path="/data-tools/profiles" element={<ProfilesPage />} />
          <Route path="/data-tools/custom-fields" element={<CustomFieldsPage />} />
          <Route path="/data-tools/timeline" element={<TimelinePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
