
import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import FieldDataDashboard from "@/components/DataTools/FieldData/FieldDataDashboard";
import { Badge } from "@/components/ui/badge";
import { MoveRight } from "lucide-react";

const FieldDataPage = () => {
  return (
    <MainLayout title={
      <div className="flex items-center gap-3">
        Field Data Collection
        <Badge variant="outline" className="bg-primary/10 text-primary">Phase 3</Badge>
        <span className="text-sm font-normal text-muted-foreground flex items-center gap-1">
          Canvassing Data Management <MoveRight className="h-3 w-3" />
        </span>
      </div>
    }>
      <FieldDataDashboard />
    </MainLayout>
  );
};

export default FieldDataPage;
