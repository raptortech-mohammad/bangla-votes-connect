
import React, { useState } from "react";
import { Map, MapPin, Layers, Info, Download, Maximize2, BarChart2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import BangladeshMap from "./BangladeshMap";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [exportDialogOpen, setExportDialogOpen] = useState<boolean>(false);
  
  const navigate = useNavigate();
  
  const handleDistrictHover = (districtId: string | null) => {
    setActiveDistrict(districtId);
  };

  const handleDistrictClick = (districtId: string | null) => {
    if (!districtId) return;
    
    if (compareMode) {
      // In compare mode, toggle selection
      if (selectedDistricts.includes(districtId)) {
        setSelectedDistricts(selectedDistricts.filter(id => id !== districtId));
      } else if (selectedDistricts.length < 3) {
        // Limit to 3 districts for comparison
        setSelectedDistricts([...selectedDistricts, districtId]);
      } else {
        toast(`Maximum 3 districts can be compared`, {
          duration: 2000,
        });
      }
    } else {
      // In normal mode, show district detail
      toast(`Viewing ${districtData.find(d => d.id === districtId)?.name} district details`, {
        duration: 2000,
      });
      // This could navigate to a district detail page in the future
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast(`Switched to ${value} view`, {
      duration: 2000,
    });
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    toast(`${!isFullscreen ? "Entered" : "Exited"} fullscreen mode`, {
      duration: 2000,
    });
  };
  
  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    if (!compareMode) {
      toast("Select up to 3 districts to compare", {
        duration: 3000,
      });
    } else {
      setSelectedDistricts([]);
    }
  };
  
  const handleExport = (format: string) => {
    toast(`Exporting map data as ${format}...`, {
      duration: 2000,
    });
    
    // Simulate export delay
    setTimeout(() => {
      toast.success(`Map data exported successfully as ${format}`, {
        duration: 2000,
      });
      setExportDialogOpen(false);
    }, 1500);
  };

  // Get supporter percentage
  const getSupporterPercentage = (supporters: number) => {
    // Assuming average district population of 5 million
    const avgPopulation = 5000000;
    return Math.round((supporters / avgPopulation) * 100);
  };

  return (
    <Card className={`${isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-full'}`}>
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
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setExportDialogOpen(true)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export Map</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleCompareMode}
                  className={compareMode ? "bg-primary/20" : ""}
                >
                  <BarChart2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Compare Districts</p>
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
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleFullscreen}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`flex items-center justify-center ${isFullscreen ? 'h-[calc(100vh-120px)]' : 'h-[500px]'} bg-slate-100 rounded-md border relative overflow-hidden`}>
          {/* Real Bangladesh Map */}
          <BangladeshMap 
            activeDistrict={activeDistrict}
            setActiveDistrict={handleDistrictHover}
            onDistrictClick={handleDistrictClick}
            mapMode={activeTab}
            compareMode={compareMode}
            selectedDistricts={selectedDistricts}
          />
          
          {/* Info overlay for active district */}
          {activeDistrict && !compareMode && (
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
          
          {/* Compare overlay */}
          {compareMode && selectedDistricts.length > 0 && (
            <div className="absolute top-4 right-4 bg-white/95 p-4 rounded-lg shadow-lg border border-gray-200 max-w-md animate-fade-in">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">District Comparison</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2 text-xs font-medium">
                  <div className="col-span-1"></div>
                  {selectedDistricts.map(id => (
                    <div key={id} className="text-center">
                      {districtData.find(d => d.id === id)?.name}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="col-span-1 font-medium">Support %</div>
                  {selectedDistricts.map(id => {
                    const district = districtData.find(d => d.id === id);
                    return (
                      <div key={`${id}-support`} className="text-center">
                        {district ? getSupporterPercentage(district.supporters) : 0}%
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="col-span-1 font-medium">Supporters</div>
                  {selectedDistricts.map(id => {
                    const district = districtData.find(d => d.id === id);
                    return (
                      <div key={`${id}-supporters`} className="text-center">
                        {district ? (district.supporters / 1000000).toFixed(1) : 0}M
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="col-span-1 font-medium">Coordinators</div>
                  {selectedDistricts.map(id => {
                    const district = districtData.find(d => d.id === id);
                    return (
                      <div key={`${id}-coordinators`} className="text-center">
                        {district?.coordinators || 0}
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="col-span-1 font-medium">Status</div>
                  {selectedDistricts.map(id => {
                    const district = districtData.find(d => d.id === id);
                    return (
                      <div key={`${id}-status`} className="text-center">
                        <span 
                          className={`font-medium px-2 py-0.5 rounded-full text-xs inline-block ${
                            district?.popularity === "high" ? "bg-green-100 text-green-800" : 
                            district?.popularity === "medium" ? "bg-amber-100 text-amber-800" : 
                            "bg-red-100 text-red-800"
                          }`}
                        >
                          {district?.popularity === "high" ? "Strong" : 
                           district?.popularity === "medium" ? "Moderate" : "Weak"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white/80 p-3 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Map className="h-4 w-4 text-muted-foreground" />
              {compareMode ? (
                <p className="text-sm text-muted-foreground">Click on districts to compare (max 3)</p>
              ) : (
                <p className="text-sm text-muted-foreground">Hover over districts to see details</p>
              )}
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
      
      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Export Map Data</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Choose export format:</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => handleExport("PNG")} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  PNG Image
                </Button>
                <Button onClick={() => handleExport("PDF")} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  PDF Document
                </Button>
                <Button onClick={() => handleExport("CSV")} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  CSV Data
                </Button>
                <Button onClick={() => handleExport("Excel")} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Excel Data
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default MapDisplay;
