
import React, { useState } from "react";
import { 
  Map, 
  Layers, 
  Filter, 
  Download, 
  Upload,
  MapPin,
  Users,
  Home
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Mock districts for Bangladesh
const mockDistricts = [
  { id: "1", name: "Dhaka", voterCount: 7500000, supporters: 3200000, coordinators: 145 },
  { id: "2", name: "Chittagong", voterCount: 5200000, supporters: 2100000, coordinators: 98 },
  { id: "3", name: "Rajshahi", voterCount: 2800000, supporters: 1100000, coordinators: 67 },
  { id: "4", name: "Khulna", voterCount: 2300000, supporters: 980000, coordinators: 54 },
  { id: "5", name: "Sylhet", voterCount: 1900000, supporters: 780000, coordinators: 43 },
  { id: "6", name: "Barisal", voterCount: 1600000, supporters: 650000, coordinators: 38 },
  { id: "7", name: "Rangpur", voterCount: 2100000, supporters: 840000, coordinators: 49 },
  { id: "8", name: "Mymensingh", voterCount: 1800000, supporters: 720000, coordinators: 41 }
];

const MappingDashboard: React.FC = () => {
  const [selectedMap, setSelectedMap] = useState<string>("country");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter districts based on search term
  const filteredDistricts = searchTerm 
    ? mockDistricts.filter(district => 
        district.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : mockDistricts;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-2">Geospatial Mapping</h2>
        <p className="text-muted-foreground">
          Visualize your supporter data across geographic regions. 
          Identify strongholds and areas that need more attention.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Map Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Map Type</label>
                <Select value={selectedMap} onValueChange={setSelectedMap}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select map type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="country">Country Overview</SelectItem>
                    <SelectItem value="districts">Districts</SelectItem>
                    <SelectItem value="constituencies">Constituencies</SelectItem>
                    <SelectItem value="wards">Wards</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Display Data</label>
                <Select defaultValue="supporters">
                  <SelectTrigger>
                    <SelectValue placeholder="Select data type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supporters">Supporter Count</SelectItem>
                    <SelectItem value="voters">Total Voters</SelectItem>
                    <SelectItem value="engagement">Engagement Score</SelectItem>
                    <SelectItem value="coordinators">Field Coordinators</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Toggle Layers
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter Options
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Map Data
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Input 
                  placeholder="Search regions..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              
              <div className="max-h-64 overflow-y-auto border rounded-md divide-y">
                {filteredDistricts.map(district => (
                  <div key={district.id} className="p-3 hover:bg-muted cursor-pointer">
                    <div className="font-medium">{district.name}</div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                      <span>{district.supporters.toLocaleString()} supporters</span>
                      <span>{Math.round((district.supporters / district.voterCount) * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
};

export default MappingDashboard;
