
import React, { useState } from "react";
import { Map, MapPin, Layers, Info, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const MapDisplay: React.FC = () => {
  const [activeDistrict, setActiveDistrict] = useState<string | null>(null);
  
  const handleDistrictHover = (district: string | null) => {
    setActiveDistrict(district);
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
          {/* Interactive Map Placeholder */}
          <svg width="100%" height="100%" viewBox="0 0 800 600" className="absolute inset-0">
            {/* Simplified Bangladesh map outline for placeholder */}
            <path 
              d="M400,100 Q500,150 550,250 Q600,350 550,450 Q500,550 400,550 Q300,550 250,450 Q200,350 250,250 Q300,150 400,100" 
              fill="#e2e8f0" 
              stroke="#94a3b8" 
              strokeWidth="2"
            />
            
            {/* Districts as simplified circles */}
            <circle cx="400" cy="200" r="30" fill={activeDistrict === 'Dhaka' ? '#8b5cf6' : '#ddd6fe'} 
              stroke="#8b5cf6" strokeWidth="2" 
              onMouseEnter={() => handleDistrictHover('Dhaka')} 
              onMouseLeave={() => handleDistrictHover(null)} 
              style={{cursor: 'pointer'}}
            />
            
            <circle cx="500" cy="300" r="25" fill={activeDistrict === 'Chittagong' ? '#ef4444' : '#fecaca'} 
              stroke="#ef4444" strokeWidth="2"
              onMouseEnter={() => handleDistrictHover('Chittagong')} 
              onMouseLeave={() => handleDistrictHover(null)} 
              style={{cursor: 'pointer'}}
            />
            
            <circle cx="300" cy="250" r="28" fill={activeDistrict === 'Rajshahi' ? '#10b981' : '#a7f3d0'} 
              stroke="#10b981" strokeWidth="2"
              onMouseEnter={() => handleDistrictHover('Rajshahi')} 
              onMouseLeave={() => handleDistrictHover(null)} 
              style={{cursor: 'pointer'}}
            />
            
            <circle cx="350" cy="400" r="22" fill={activeDistrict === 'Khulna' ? '#f97316' : '#fed7aa'} 
              stroke="#f97316" strokeWidth="2"
              onMouseEnter={() => handleDistrictHover('Khulna')} 
              onMouseLeave={() => handleDistrictHover(null)} 
              style={{cursor: 'pointer'}}
            />
            
            <circle cx="450" cy="450" r="20" fill={activeDistrict === 'Sylhet' ? '#3b82f6' : '#bfdbfe'} 
              stroke="#3b82f6" strokeWidth="2"
              onMouseEnter={() => handleDistrictHover('Sylhet')} 
              onMouseLeave={() => handleDistrictHover(null)} 
              style={{cursor: 'pointer'}}
            />
          </svg>
          
          {/* Info overlay for active district */}
          {activeDistrict && (
            <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-lg shadow-lg border border-gray-200 max-w-xs">
              <h3 className="font-semibold text-lg">{activeDistrict}</h3>
              {activeDistrict === 'Dhaka' && (
                <div className="text-sm space-y-1 mt-2">
                  <p><span className="font-medium">Supporters:</span> 3.2M (42%)</p>
                  <p><span className="font-medium">Coordinators:</span> 145</p>
                  <p><span className="font-medium">Status:</span> <span className="text-emerald-500 font-medium">Stronghold</span></p>
                </div>
              )}
              {activeDistrict === 'Chittagong' && (
                <div className="text-sm space-y-1 mt-2">
                  <p><span className="font-medium">Supporters:</span> 2.1M (40%)</p>
                  <p><span className="font-medium">Coordinators:</span> 98</p>
                  <p><span className="font-medium">Status:</span> <span className="text-red-500 font-medium">Needs Attention</span></p>
                </div>
              )}
              {activeDistrict === 'Rajshahi' && (
                <div className="text-sm space-y-1 mt-2">
                  <p><span className="font-medium">Supporters:</span> 1.1M (39%)</p>
                  <p><span className="font-medium">Coordinators:</span> 67</p>
                  <p><span className="font-medium">Status:</span> <span className="text-emerald-500 font-medium">Improving</span></p>
                </div>
              )}
              {activeDistrict === 'Khulna' && (
                <div className="text-sm space-y-1 mt-2">
                  <p><span className="font-medium">Supporters:</span> 980K (43%)</p>
                  <p><span className="font-medium">Coordinators:</span> 54</p>
                  <p><span className="font-medium">Status:</span> <span className="text-amber-500 font-medium">Moderate</span></p>
                </div>
              )}
              {activeDistrict === 'Sylhet' && (
                <div className="text-sm space-y-1 mt-2">
                  <p><span className="font-medium">Supporters:</span> 780K (41%)</p>
                  <p><span className="font-medium">Coordinators:</span> 43</p>
                  <p><span className="font-medium">Status:</span> <span className="text-blue-500 font-medium">Growing</span></p>
                </div>
              )}
            </div>
          )}
          
          {/* Map instructions - can be removed or toggled */}
          <div className="absolute bottom-4 left-4 bg-white/80 p-3 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-2">
              <Map className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Hover over districts to see details</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapDisplay;
