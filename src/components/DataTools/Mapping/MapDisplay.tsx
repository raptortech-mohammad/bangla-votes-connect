
import React from "react";
import { Map, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MapDisplay: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Bangladesh Electoral Map</CardTitle>
          <Tabs defaultValue="standard" className="w-[400px]">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="standard">Standard</TabsTrigger>
              <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
              <TabsTrigger value="satellite">Satellite</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-[500px] bg-muted/30 rounded-md border border-dashed relative">
          {/* Placeholder for actual map implementation */}
          <div className="text-center text-muted-foreground">
            <Map className="h-16 w-16 mx-auto mb-4 text-primary/50" />
            <p className="font-medium">Interactive map will be displayed here</p>
            <p className="text-sm mt-1">Coming soon in the next update</p>
          </div>

          {/* Sample map markers */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary">
            <MapPin className="h-8 w-8" />
            <span className="text-xs bg-white p-1 rounded absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
              Dhaka - 3.2M supporters
            </span>
          </div>

          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 text-emerald-500">
            <MapPin className="h-6 w-6" />
            <span className="text-xs bg-white p-1 rounded absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
              Rajshahi - 1.1M supporters
            </span>
          </div>

          <div className="absolute top-2/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2 text-amber-500">
            <MapPin className="h-7 w-7" />
            <span className="text-xs bg-white p-1 rounded absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
              Khulna - 980K supporters
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapDisplay;
