
import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import SegmentationDashboard from "@/components/DataTools/Segmentation/SegmentationDashboard";
import { Badge } from "@/components/ui/badge";
import { MoveRight } from "lucide-react";

const SegmentationPage = () => {
  return (
    <MainLayout title={
      <div className="flex items-center gap-3">
        Segmentation & Analytics
        <Badge variant="outline" className="bg-primary/10 text-primary">Phase 3</Badge>
        <span className="text-sm font-normal text-muted-foreground flex items-center gap-1">
          Advanced Data Segmentation <MoveRight className="h-3 w-3" />
        </span>
      </div>
    }>
      <SegmentationDashboard />
    </MainLayout>
  );
};

export default SegmentationPage;
