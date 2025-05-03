
import React, { useState } from "react";
import MapControls from "./MapControls";
import RegionsList from "./RegionsList";
import MapDisplay from "./MapDisplay";
import SupportDistribution from "./SupportDistribution";
import CoordinatorCoverage from "./CoordinatorCoverage";
import FocusAreas from "./FocusAreas";
import { mockDistricts } from "./mockData";

const MappingDashboard: React.FC = () => {
  const [selectedMap, setSelectedMap] = useState<string>("country");
  const [searchTerm, setSearchTerm] = useState<string>("");

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
          <MapControls 
            selectedMap={selectedMap}
            setSelectedMap={setSelectedMap}
          />
          
          <RegionsList 
            districts={mockDistricts}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        <div className="lg:col-span-3">
          <MapDisplay />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SupportDistribution />
        <CoordinatorCoverage />
        <FocusAreas />
      </div>
    </div>
  );
};

export default MappingDashboard;
