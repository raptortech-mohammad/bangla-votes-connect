
import React, { useState } from "react";
import { Map, MapPin, Layers, Info, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import BangladeshMap from "./BangladeshMap";

// Define Bangladesh districts with support data
const districtData = [
  { id: "dhaka", name: "Dhaka", supporters: 3200000, coordinators: 145, popularity: "high", baseColor: "#f59e0b" },
  { id: "chittagong", name: "Chittagong", supporters: 2100000, coordinators: 98, popularity: "medium", baseColor: "#10b981" },
  { id: "rajshahi", name: "Rajshahi", supporters: 1100000, coordinators: 67, popularity: "medium", baseColor: "#f97316" },
  { id: "khulna", name: "Khulna", supporters: 980000, coordinators: 54, popularity: "medium", baseColor: "#8b5cf6" },
  { id: "sylhet", name: "Sylhet", supporters: 780000, coordinators: 43, popularity: "low", baseColor: "#ec4899" },
  { id: "barisal", name: "Barisal", supporters: 650000, coordinators: 38, popularity: "low", baseColor: "#3b82f6" },
  { id: "rangpur", name: "Rangpur", supporters: 840000, coordinators: 49, popularity: "medium", baseColor: "#84cc16" },
  { id: "mymensingh", name: "Mymensingh", supporters: 720000, coordinators: 41, popularity: "low", baseColor: "#06b6d4" }
];

const MapDisplay: React.FC = () => {
  const [activeDistrict, setActiveDistrict] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("standard");
  
  const handleDistrictHover = (districtId: string | null) => {
    setActiveDistrict(districtId);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast(`Switched to ${value} view`, {
      duration: 2000,
    });
  };

  // Get supporter percentage
  const getSupporterPercentage = (supporters: number) => {
    // Assuming average district population of 5 million
    const avgPopulation = 5000000;
    return Math.round((supporters / avgPopulation) * 100);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Bangladesh Electoral Map</CardTitle>
          <div className="flex items-center gap-2">
            <Tabs 
              defaultValue="standard" 
              className="w-[360px]"
              value={activeTab}
              onValueChange={handleTabChange}
            >
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
                <TabsTrigger value="satellite">Satellite</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export Map</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Layers className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Layers</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Map Legend</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-[500px] bg-slate-100 rounded-md border relative overflow-hidden">
          {/* Real Bangladesh Map */}
          <BangladeshMap 
            activeDistrict={activeDistrict}
            setActiveDistrict={handleDistrictHover}
            mapMode={activeTab}
          />
          
          {/* Info overlay for active district */}
          {activeDistrict && (
            <div className="absolute top-4 right-4 bg-white/95 p-4 rounded-lg shadow-lg border border-gray-200 max-w-xs animate-fade-in">
              {districtData.filter(d => d.id === activeDistrict).map(district => (
                <div key={district.id}>
                  <h3 className="font-semibold text-lg text-gray-900">{district.name}</h3>
                  <div className="text-sm space-y-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Support Level:</span>
                      <span 
                        className={`font-medium px-2 py-0.5 rounded-full text-xs ${
                          district.popularity === "high" ? "bg-green-100 text-green-800" : 
                          district.popularity === "medium" ? "bg-amber-100 text-amber-800" : 
                          "bg-red-100 text-red-800"
                        }`}
                      >
                        {district.popularity === "high" ? "Strong" : 
                         district.popularity === "medium" ? "Moderate" : "Needs Attention"}
                      </span>
                    </div>
                    <p><span className="font-medium">Supporters:</span> {(district.supporters / 1000000).toFixed(1)}M ({getSupporterPercentage(district.supporters)}%)</p>
                    <p><span className="font-medium">Coordinators:</span> {district.coordinators}</p>
                    <div className="mt-3 pt-2 border-t border-gray-200">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Support Level</span>
                        <span>{getSupporterPercentage(district.supporters)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="h-1.5 rounded-full" 
                          style={{
                            width: `${getSupporterPercentage(district.supporters)}%`,
                            backgroundColor: district.baseColor
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white/80 p-3 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Map className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Hover over districts to see details</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                <span className="text-xs">Strong</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#f97316]"></div>
                <span className="text-xs">Moderate</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                <span className="text-xs">Low</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapDisplay;
