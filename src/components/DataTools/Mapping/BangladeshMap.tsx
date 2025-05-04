
import React from "react";

interface BangladeshMapProps {
  activeDistrict: string | null;
  setActiveDistrict: (id: string | null) => void;
  mapMode: string;
}

// Define district data for the map
const districtsMap = [
  { 
    id: "dhaka", 
    name: "Dhaka", 
    path: "M230.5,211.8 L242.3,205.2 L248.9,211.8 L260.7,208.5 L266.1,217.2 L257.4,224.9 L242.3,231.5 L234.9,228.2 L230.5,211.8", 
    popularity: "high", 
    baseColor: "#f59e0b" 
  },
  { 
    id: "chittagong", 
    name: "Chittagong", 
    path: "M282.2,255 L299.8,235.9 L307.4,252.8 L303,272.9 L289,278.5 L278.4,267.3 L282.2,255", 
    popularity: "medium", 
    baseColor: "#10b981" 
  },
  { 
    id: "rajshahi", 
    name: "Rajshahi", 
    path: "M135.6,166.9 L157.9,154.1 L173,165.8 L169.7,186.9 L151.7,193.5 L138.9,181.3 L135.6,166.9", 
    popularity: "medium", 
    baseColor: "#f97316" 
  },
  { 
    id: "khulna", 
    name: "Khulna", 
    path: "M168.6,245.4 L187.6,235.9 L198.3,246.5 L195.5,263.4 L180.5,269 L167.6,259.5 L168.6,245.4", 
    popularity: "medium", 
    baseColor: "#8b5cf6" 
  },
  { 
    id: "sylhet", 
    name: "Sylhet", 
    path: "M284.9,150.8 L299.8,144.1 L312.6,158.5 L306,177.5 L290.9,181.8 L281.1,169 L284.9,150.8", 
    popularity: "low", 
    baseColor: "#ec4899" 
  },
  { 
    id: "barisal", 
    name: "Barisal", 
    path: "M204.8,272.9 L221,263.4 L232.8,272.9 L226.2,290.3 L210,296.8 L200.3,284 L204.8,272.9", 
    popularity: "low", 
    baseColor: "#3b82f6" 
  },
  { 
    id: "rangpur", 
    name: "Rangpur", 
    path: "M153.8,101.8 L173,90.7 L191,101.8 L186.5,119.2 L169.7,126.9 L152.7,117.4 L153.8,101.8", 
    popularity: "medium", 
    baseColor: "#84cc16" 
  },
  { 
    id: "mymensingh", 
    name: "Mymensingh", 
    path: "M210,158.5 L230.5,148 L246.7,158.5 L242.3,175.4 L225.2,183.1 L210,172 L210,158.5", 
    popularity: "low", 
    baseColor: "#06b6d4" 
  },
  { 
    id: "comilla", 
    name: "Comilla", 
    path: "M260.7,231.5 L275.7,224.9 L285.9,235.9 L279.4,252.8 L266.1,255 L257.4,246.5 L260.7,231.5", 
    popularity: "medium", 
    baseColor: "#d946ef" 
  },
  { 
    id: "bogra", 
    name: "Bogra", 
    path: "M180.5,140.3 L195.5,129.7 L211.1,140.3 L206.6,156.3 L189.8,163.5 L177,154.1 L180.5,140.3", 
    popularity: "medium", 
    baseColor: "#f43f5e" 
  }
];

const BangladeshMap: React.FC<BangladeshMapProps> = ({ activeDistrict, setActiveDistrict, mapMode }) => {
  
  // Helper function to get color based on popularity and map mode
  const getDistrictColor = (district: typeof districtsMap[0]) => {
    if (district.id === activeDistrict) {
      // Highlight color on hover
      return district.baseColor;
    }
    
    // Colors based on map mode
    if (mapMode === "heatmap") {
      // Heatmap mode - more vibrant colors based on popularity
      switch (district.popularity) {
        case "high":
          return `${district.baseColor}`;
        case "medium":
          return `${district.baseColor}99`; // 60% opacity
        case "low":
          return `${district.baseColor}66`; // 40% opacity
        default:
          return "#e5e7eb";
      }
    } else if (mapMode === "satellite") {
      // Satellite mode - darker background with glowing colors
      return district.id === activeDistrict 
        ? `${district.baseColor}` 
        : `${district.baseColor}33`; // 20% opacity
    } else {
      // Standard mode
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
    }
  };
  
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 450 400" 
        className={`${mapMode === "satellite" ? "bg-slate-800" : "bg-slate-100"}`}
      >
        {/* Background image based on mapMode */}
        {mapMode === "satellite" && (
          <rect x="0" y="0" width="100%" height="100%" fill="#1e293b" opacity="0.7" />
        )}
        
        {/* Bangladesh outline */}
        <path 
          d="M150,100 C130,140 120,190 130,230 C140,270 160,310 200,340 C240,370 280,360 310,330 C340,300 350,260 320,220 C310,200 320,170 310,150 C290,120 260,150 240,120 C220,90 180,70 150,100 Z" 
          fill="none" 
          stroke={mapMode === "satellite" ? "#cbd5e1" : "#475569"} 
          strokeWidth="1.5" 
          strokeDasharray={mapMode === "satellite" ? "5,3" : "none"}
          opacity={mapMode === "satellite" ? "0.6" : "0.3"}
        />
        
        {/* Bangladesh rivers */}
        <path 
          d="M190,100 C210,150 200,200 220,250 C240,300 250,320 230,340"
          fill="none"
          stroke={mapMode === "satellite" ? "#0ea5e9" : "#60a5fa"}
          strokeWidth="2"
          opacity={mapMode === "satellite" ? "0.8" : "0.4"}
        />
        <path 
          d="M260,150 C240,190 245,220 270,250 C295,280 290,300 270,320"
          fill="none"
          stroke={mapMode === "satellite" ? "#0ea5e9" : "#60a5fa"}
          strokeWidth="2"
          opacity={mapMode === "satellite" ? "0.8" : "0.4"}
        />
        
        {/* Interactive Districts */}
        <g className={mapMode === "satellite" ? "filter drop-shadow(0 0 2px rgba(255,255,255,0.3))" : ""}>
          {districtsMap.map((district) => (
            <path
              key={district.id}
              d={district.path}
              fill={getDistrictColor(district)}
              stroke={mapMode === "satellite" ? "#fff" : "#475569"}
              strokeWidth={district.id === activeDistrict ? "1.8" : "1"}
              onMouseEnter={() => setActiveDistrict(district.id)}
              onMouseLeave={() => setActiveDistrict(null)}
              style={{ 
                cursor: 'pointer', 
                transition: 'fill 0.3s ease, stroke-width 0.3s ease',
                filter: district.id === activeDistrict && mapMode === "satellite" 
                  ? 'drop-shadow(0 0 5px rgba(255,255,255,0.7))' 
                  : 'none' 
              }}
            />
          ))}
        </g>
        
        {/* District Labels - only show in standard or heatmap mode */}
        {(mapMode === "standard" || mapMode === "heatmap") && (
          <g>
            {districtsMap.map((district) => {
              // Calculate center point of path for label placement
              const pathPoints = district.path.split(" ")
                .filter(p => p.match(/^\d+(\.\d+)?,\d+(\.\d+)?$/))
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
                  fontSize="10"
                  fontWeight={district.id === activeDistrict ? "bold" : "normal"}
                  fill={district.id === activeDistrict ? "#1e293b" : "#64748b"}
                  style={{
                    textShadow: '0px 1px 2px rgba(255,255,255,0.5)',
                    pointerEvents: 'none'
                  }}
                >
                  {district.name}
                </text>
              );
            })}
          </g>
        )}
        
        {/* Satellite Mode Elements */}
        {mapMode === "satellite" && (
          <>
            {/* Capital city marker */}
            <circle cx="230.5" cy="211.8" r="4" fill="#fcd34d" stroke="#fff" strokeWidth="1" />
            <text x="230.5" y="200" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Dhaka</text>
            
            {/* District markers */}
            {districtsMap.map((district) => {
              if (district.id !== "dhaka") {
                // Calculate center point for marker
                const pathPoints = district.path.split(" ")
                  .filter(p => p.match(/^\d+(\.\d+)?,\d+(\.\d+)?$/))
                  .map(p => {
                    const [x, y] = p.split(",").map(Number);
                    return { x, y };
                  });
                
                const centerX = pathPoints.reduce((sum, p) => sum + p.x, 0) / pathPoints.length;
                const centerY = pathPoints.reduce((sum, p) => sum + p.y, 0) / pathPoints.length;
                
                return (
                  <circle 
                    key={`marker-${district.id}`}
                    cx={centerX}
                    cy={centerY}
                    r="2"
                    fill={district.id === activeDistrict ? district.baseColor : "#fff"}
                    opacity={district.id === activeDistrict ? "1" : "0.6"}
                  />
                );
              }
              return null;
            })}
          </>
        )}
      </svg>
    </div>
  );
};

export default BangladeshMap;
