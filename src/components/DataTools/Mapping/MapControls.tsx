
import React from "react";
import { Layers, Filter, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface MapControlsProps {
  selectedMap: string;
  setSelectedMap: (value: string) => void;
}

const MapControls: React.FC<MapControlsProps> = ({ selectedMap, setSelectedMap }) => {
  return (
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
  );
};

export default MapControls;
