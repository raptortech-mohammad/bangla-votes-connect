
import React, { useState } from "react";
import { Map, MapPin, Layers, Info, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Define Bangladesh districts with support data
const districtData = [
  { id: "dhaka", name: "Dhaka", path: "M320,280 L335,265 L350,275 L365,265 L380,280 L365,295 L350,305 L330,300 L320,280", supporters: 3200000, coordinators: 145, popularity: "high", baseColor: "#f59e0b" },
  { id: "chittagong", name: "Chittagong", path: "M470,330 L500,280 L520,290 L525,320 L510,350 L490,370 L475,350 L470,330", supporters: 2100000, coordinators: 98, popularity: "medium", baseColor: "#10b981" },
  { id: "rajshahi", name: "Rajshahi", path: "M150,200 L200,180 L230,200 L220,230 L190,240 L160,230 L150,200", supporters: 1100000, coordinators: 67, popularity: "medium", baseColor: "#f97316" },
  { id: "khulna", name: "Khulna", path: "M200,320 L230,300 L250,315 L260,340 L240,360 L210,350 L200,320", supporters: 980000, coordinators: 54, popularity: "medium", baseColor: "#8b5cf6" },
  { id: "sylhet", name: "Sylhet", path: "M430,180 L460,170 L480,190 L475,220 L450,230 L430,210 L430,180", supporters: 780000, coordinators: 43, popularity: "low", baseColor: "#ec4899" },
  { id: "barisal", name: "Barisal", path: "M280,370 L310,350 L330,370 L320,400 L290,410 L270,390 L280,370", supporters: 650000, coordinators: 38, popularity: "low", baseColor: "#3b82f6" },
  { id: "rangpur", name: "Rangpur", path: "M180,120 L220,100 L250,120 L240,150 L210,160 L180,150 L180,120", supporters: 840000, coordinators: 49, popularity: "medium", baseColor: "#84cc16" },
  { id: "mymensingh", name: "Mymensingh", path: "M300,200 L340,180 L360,200 L350,230 L320,240 L290,230 L300,200", supporters: 720000, coordinators: 41, popularity: "low", baseColor: "#06b6d4" }
];

const MapDisplay: React.FC = () => {
  const [activeDistrict, setActiveDistrict] = useState<string | null>(null);
  const [mapImage, setMapImage] = useState<string>("public/lovable-uploads/f7cb777d-968e-4dc0-98ad-8016a3898153.png");
  
  const handleDistrictHover = (districtId: string | null) => {
    setActiveDistrict(districtId);
  };

  // Helper function to get color shade based on popularity
  const getDistrictColor = (district: typeof districtData[0]) => {
    if (district.id === activeDistrict) {
      // Highlight color on hover
      return district.baseColor;
    }
    
    // Default colors based on popularity
    switch (district.popularity) {
      case "high":
        return `${district.baseColor}40`; // 25% opacity
      case "medium":
        return `${district.baseColor}30`; // 19% opacity
      case "low":
        return `${district.baseColor}20`; // 12% opacity
      default:
        return "#e5e7eb";
    }
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
            <Tabs defaultValue="standard" className="w-[360px]">
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
          {/* Interactive SVG Map */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 650 500" className="absolute inset-0">
              {/* Background Map Image - Transparent */}
              <image
                href={mapImage}
                x="0"
                y="0"
                width="650"
                height="500"
                style={{ opacity: 0.2 }}
              />
              
              {/* Interactive Districts */}
              <g>
                {districtData.map((district) => (
                  <path
                    key={district.id}
                    d={district.path}
                    fill={getDistrictColor(district)}
                    stroke="#475569"
                    strokeWidth="1.5"
                    onMouseEnter={() => handleDistrictHover(district.id)}
                    onMouseLeave={() => handleDistrictHover(null)}
                    style={{ 
                      cursor: 'pointer', 
                      transition: 'fill 0.3s ease',
                      filter: district.id === activeDistrict ? 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))' : 'none' 
                    }}
                  />
                ))}
              </g>
              
              {/* District Labels */}
              <g>
                {districtData.map((district) => {
                  // Calculate center point of path for label placement
                  const pathPoints = district.path.split(" ")
                    .filter(p => p.match(/^\d+,\d+$/))
                    .map(p => {
                      const [x, y] = p.split(",").map(Number);
                      return { x, y };
                    });
                  
                  const centerX = pathPoints.reduce((sum, p) => sum + p.x, 0) / pathPoints.length;
                  const centerY = pathPoints.reduce((sum, p) => sum + p.y, 0) / pathPoints.length;
                  
                  return (
                    <text
                      key={`label-${district.id}`}
                      x={centerX}
                      y={centerY}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight={district.id === activeDistrict ? "bold" : "normal"}
                      fill={district.id === activeDistrict ? "#1e293b" : "#64748b"}
                    >
                      {district.name}
                    </text>
                  );
                })}
              </g>
            </svg>
          </div>
          
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
