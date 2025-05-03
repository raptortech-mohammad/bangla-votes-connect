
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CoordinatorCoverage: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Coordinator Coverage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded">
          {/* Placeholder for map coverage */}
          <div className="text-center text-muted-foreground">
            <p className="text-sm">Coverage map will appear here</p>
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>Total Field Coordinators</span>
            <span className="font-medium">535</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Areas Covered</span>
            <span className="font-medium">78%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Uncovered Areas</span>
            <span className="font-medium text-amber-600">37</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoordinatorCoverage;
