
import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import MappingDashboard from "@/components/DataTools/Mapping/MappingDashboard";

const MappingPage = () => {
  return (
    <MainLayout title="Geospatial Mapping">
      <MappingDashboard />
    </MainLayout>
  );
};

export default MappingPage;
