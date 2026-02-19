

import React, { useState } from "react";
import RegionsList from "./RegionsList";
import MapDisplay from "./MapDisplay";
import SupportDistribution from "./SupportDistribution";
import CoordinatorCoverage from "./CoordinatorCoverage";
import FocusAreas from "./FocusAreas";
import { mockDistricts } from "./mockData";

const MappingDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className="space-y-6">
      <div className="bg-[#09090b] border border-[#1f2937] p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-xl font-bold text-white">BNP Supporters Geospatial Map</h2>
          <span className="text-[10px] font-semibold tracking-widest text-green-400 border border-green-800 bg-green-950/50 px-2 py-0.5 rounded-full">
            DOT MATRIX · LIVE
          </span>
        </div>
        <p className="text-gray-400 text-sm">
          Visualise BNP supporter density across Bangladesh's divisions using a dot-matrix heatmap.
          Brighter and denser clusters indicate stronger supporter presence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
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
