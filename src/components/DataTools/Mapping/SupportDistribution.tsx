
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SupportDistribution: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Support Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded">
          {/* Placeholder for pie chart */}
          <div className="text-center text-muted-foreground">
            <p className="text-sm">Distribution chart will appear here</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              Strong Support
            </span>
            <span className="font-medium">42%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-amber-400 rounded-full"></span>
              Moderate Support
            </span>
            <span className="font-medium">28%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-400 rounded-full"></span>
              Low Support
            </span>
            <span className="font-medium">30%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportDistribution;
