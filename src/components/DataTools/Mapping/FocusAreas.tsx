
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Home } from "lucide-react";

const FocusAreas: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Top Focus Areas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium">Chittagong South</div>
              <div className="text-xs text-muted-foreground">28% support - needs attention</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium">Sylhet Central</div>
              <div className="text-xs text-muted-foreground">35% support - improving</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center">
              <Home className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium">Dhaka North</div>
              <div className="text-xs text-muted-foreground">52% support - stronghold</div>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-2 text-sm h-8">View All Areas</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FocusAreas;
