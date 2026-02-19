
import React, { useState } from "react";
import { Map, Download, Maximize2, BarChart2, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import BangladeshDotMap, { divisionsData } from "./BangladeshDotMap";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const MapDisplay: React.FC = () => {
  const [activeDistrict, setActiveDistrict] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [exportDialogOpen, setExportDialogOpen] = useState<boolean>(false);

  const handleDistrictClick = (districtId: string | null) => {
    if (!districtId) return;
    if (compareMode) {
      if (selectedDistricts.includes(districtId)) {
        setSelectedDistricts(selectedDistricts.filter((id) => id !== districtId));
      } else if (selectedDistricts.length < 3) {
        setSelectedDistricts([...selectedDistricts, districtId]);
      } else {
        toast("Maximum 3 divisions can be compared", { duration: 2000 });
      }
    } else {
      toast(`Viewing ${divisionsData.find((d) => d.id === districtId)?.name} division details`, {
        duration: 2000,
      });
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    toast(`${!isFullscreen ? "Entered" : "Exited"} fullscreen mode`, { duration: 2000 });
  };

  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    if (!compareMode) {
      toast("Select up to 3 divisions to compare", { duration: 3000 });
    } else {
      setSelectedDistricts([]);
    }
  };

  const handleExport = (format: string) => {
    toast(`Exporting map data as ${format}...`, { duration: 2000 });
    setTimeout(() => {
      toast.success(`Map data exported as ${format}`, { duration: 2000 });
      setExportDialogOpen(false);
    }, 1500);
  };

  const getSupporterPct = (division: typeof divisionsData[0]) =>
    Math.round((division.supporters / division.totalVoters) * 100);

  const activeDivision = divisionsData.find((d) => d.id === activeDistrict);

  return (
    <Card
      className={`${
        isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen" : "h-full"
      } border-[#1f2937] bg-[#09090b]`}
    >
      <CardHeader className="pb-3 border-b border-[#1f2937]">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <CardTitle className="text-white">BNP Supporters Heatmap</CardTitle>
            <Badge
              variant="outline"
              className="border-green-700 text-green-400 bg-green-950/50 text-[10px] font-semibold tracking-wide"
            >
              DOT MATRIX
            </Badge>
          </div>
          <TooltipProvider>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setExportDialogOpen(true)}
                  className="text-gray-400 hover:text-white hover:bg-[#1f2937]"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export Map</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleCompareMode}
                  className={`text-gray-400 hover:text-white hover:bg-[#1f2937] ${
                    compareMode ? "bg-green-900/40 text-green-400" : ""
                  }`}
                >
                  <BarChart2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Compare Divisions</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-[#1f2937]"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Map Legend</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="text-gray-400 hover:text-white hover:bg-[#1f2937]"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</TooltipContent>
            </Tooltip>
          </div>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div
          className={`relative overflow-hidden ${
            isFullscreen ? "h-[calc(100vh-80px)]" : "h-[540px]"
          } bg-[#09090b]`}
        >
          <BangladeshDotMap
            activeDistrict={activeDistrict}
            setActiveDistrict={setActiveDistrict}
            onDistrictClick={handleDistrictClick}
          />

          {/* Hover info panel */}
          {activeDivision && !compareMode && (
            <div className="absolute top-4 right-4 bg-[#111827]/95 border border-green-900/60 p-4 rounded-xl shadow-xl max-w-[230px] animate-fade-in backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-white text-base">{activeDivision.name}</h3>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    getSupporterPct(activeDivision) >= 60
                      ? "bg-green-900/80 text-green-300"
                      : getSupporterPct(activeDivision) >= 40
                      ? "bg-yellow-900/80 text-yellow-300"
                      : "bg-red-900/80 text-red-300"
                  }`}
                >
                  {getSupporterPct(activeDivision) >= 60
                    ? "STRONG"
                    : getSupporterPct(activeDivision) >= 40
                    ? "MODERATE"
                    : "LOW"}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Supporters</span>
                  <span className="text-white font-medium">
                    {(activeDivision.supporters / 1_000_000).toFixed(2)}M
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Total Voters</span>
                  <span className="text-white font-medium">
                    {(activeDivision.totalVoters / 1_000_000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Coordinators</span>
                  <span className="text-white font-medium">{activeDivision.coordinators}</span>
                </div>
                {/* Progress bar */}
                <div className="pt-1">
                  <div className="flex justify-between text-gray-500 mb-1">
                    <span>Support Rate</span>
                    <span className="text-green-400 font-semibold">
                      {getSupporterPct(activeDivision)}%
                    </span>
                  </div>
                  <div className="w-full bg-[#1f2937] rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${getSupporterPct(activeDivision)}%`,
                        background:
                          getSupporterPct(activeDivision) >= 60
                            ? "linear-gradient(90deg,#16a34a,#4ade80)"
                            : getSupporterPct(activeDivision) >= 40
                            ? "linear-gradient(90deg,#b45309,#fbbf24)"
                            : "linear-gradient(90deg,#b91c1c,#f87171)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Compare panel */}
          {compareMode && selectedDistricts.length > 0 && (
            <div className="absolute top-4 right-4 bg-[#111827]/95 border border-green-900/60 p-4 rounded-xl shadow-xl max-w-sm animate-fade-in backdrop-blur-sm">
              <h3 className="font-bold text-white text-sm mb-3">Division Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-500 border-b border-[#1f2937]">
                      <th className="text-left pb-2 pr-2">Metric</th>
                      {selectedDistricts.map((id) => (
                        <th key={id} className="text-center pb-2 px-1 text-green-400">
                          {divisionsData.find((d) => d.id === id)?.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-gray-300 divide-y divide-[#1f2937]">
                    {[
                      {
                        label: "Support %",
                        fn: (id: string) => {
                          const d = divisionsData.find((x) => x.id === id);
                          return d ? `${getSupporterPct(d)}%` : "-";
                        },
                      },
                      {
                        label: "Supporters",
                        fn: (id: string) => {
                          const d = divisionsData.find((x) => x.id === id);
                          return d ? `${(d.supporters / 1_000_000).toFixed(1)}M` : "-";
                        },
                      },
                      {
                        label: "Coordinators",
                        fn: (id: string) => {
                          const d = divisionsData.find((x) => x.id === id);
                          return d ? String(d.coordinators) : "-";
                        },
                      },
                    ].map((row) => (
                      <tr key={row.label}>
                        <td className="py-1.5 pr-2 text-gray-500 font-medium">{row.label}</td>
                        {selectedDistricts.map((id) => (
                          <td key={id} className="text-center py-1.5 px-1">
                            {row.fn(id)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bottom hint bar */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[#111827]/80 border border-[#1f2937] px-3 py-2 rounded-lg backdrop-blur-sm">
            <Map className="h-3.5 w-3.5 text-green-500" />
            <span className="text-[11px] text-gray-400">
              {compareMode
                ? "Click divisions to compare (max 3)"
                : "Hover over dot clusters to see details"}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-[400px] bg-[#111827] border-[#1f2937] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Export Map Data</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <p className="text-sm text-gray-400">Choose export format:</p>
            <div className="grid grid-cols-2 gap-2">
              {["PNG", "PDF", "CSV", "Excel"].map((fmt) => (
                <Button
                  key={fmt}
                  onClick={() => handleExport(fmt)}
                  variant="outline"
                  className="border-[#374151] bg-[#1f2937] text-gray-300 hover:bg-[#374151] hover:text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {fmt}
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default MapDisplay;
