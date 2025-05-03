
import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import MappingDashboard from "@/components/DataTools/Mapping/MappingDashboard";
import { Badge } from "@/components/ui/badge";

const MappingPage = () => {
  return (
    <MainLayout title={
      <div className="flex items-center gap-3">
        Geospatial Mapping
        <Badge variant="outline" className="bg-primary/10 text-primary">Phase 3</Badge>
      </div>
    }>
      <MappingDashboard />
    </MainLayout>
  );
};

export default MappingPage;
