
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Campaigns from "./pages/Campaigns";
import Volunteers from "./pages/Volunteers";
import DataTools from "./pages/DataTools";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import ContactDetail from "./pages/ContactDetail";
import SocialMedia from "./pages/SocialMedia";

// Data Tools sub-pages
import ProfilesPage from "./pages/DataTools/ProfilesPage";
import CustomFieldsPage from "./pages/DataTools/CustomFieldsPage";
import TimelinePage from "./pages/DataTools/TimelinePage";
import MappingPage from "./pages/DataTools/MappingPage";
import FieldDataPage from "./pages/DataTools/FieldDataPage";
import SegmentationPage from "./pages/DataTools/SegmentationPage";
import MobileIntegrationPage from "./pages/DataTools/MobileIntegrationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/:contactId" element={<ContactDetail />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/volunteers" element={<Volunteers />} />
        <Route path="/data-tools" element={<DataTools />} />
        <Route path="/data-tools/profiles" element={<ProfilesPage />} />
        <Route path="/data-tools/custom-fields" element={<CustomFieldsPage />} />
        <Route path="/data-tools/timeline" element={<TimelinePage />} />
        <Route path="/data-tools/mapping" element={<MappingPage />} />
        <Route path="/data-tools/field-data" element={<FieldDataPage />} />
        <Route path="/data-tools/segmentation" element={<SegmentationPage />} />
        <Route path="/data-tools/mobile" element={<MobileIntegrationPage />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/social-media" element={<SocialMedia />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
