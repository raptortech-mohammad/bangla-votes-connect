
import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import MappingDashboard from "@/components/DataTools/Mapping/MappingDashboard";
import { Badge } from "@/components/ui/badge";
import { MoveRight } from "lucide-react";

const MappingPage = () => {
  return (
    <MainLayout title={
      <div className="flex items-center gap-3">
        Geospatial Mapping
        <Badge variant="outline" className="bg-primary/10 text-primary">Phase 3</Badge>
        <span className="text-sm font-normal text-muted-foreground flex items-center gap-1">
          Interactive SVG Map <MoveRight className="h-3 w-3" />
        </span>
      </div>
    }>
      <MappingDashboard />
    </MainLayout>
  );
};

export default MappingPage;
