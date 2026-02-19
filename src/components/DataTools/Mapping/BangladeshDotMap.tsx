
import React, { useState } from "react";

export interface DivisionData {
  id: string;
  name: string;
  supporters: number;
  totalVoters: number;
  coordinators: number;
  // dot grid coverage in the SVG: array of [cx, cy] pairs for each dot cluster
  dotClusters: { cx: number; cy: number; radius: number; density: number }[];
}

// Bangladesh divisions with realistic BNP supporter data
// Support levels: >60% strong, 40-60% moderate, 20-40% low, <20% very low
export const divisionsData: DivisionData[] = [
  {
    id: "dhaka",
    name: "Dhaka",
    supporters: 3_200_000,
    totalVoters: 8_500_000,
    coordinators: 145,
    dotClusters: [
      { cx: 230, cy: 200, radius: 30, density: 0.82 },
      { cx: 215, cy: 220, radius: 18, density: 0.75 },
      { cx: 248, cy: 215, radius: 16, density: 0.70 },
    ],
  },
  {
    id: "chittagong",
    name: "Chittagong",
    supporters: 2_100_000,
    totalVoters: 5_800_000,
    coordinators: 98,
    dotClusters: [
      { cx: 300, cy: 258, radius: 28, density: 0.62 },
      { cx: 285, cy: 275, radius: 18, density: 0.55 },
      { cx: 310, cy: 240, radius: 14, density: 0.50 },
    ],
  },
  {
    id: "rajshahi",
    name: "Rajshahi",
    supporters: 1_900_000,
    totalVoters: 4_200_000,
    coordinators: 67,
    dotClusters: [
      { cx: 152, cy: 172, radius: 26, density: 0.72 },
      { cx: 140, cy: 188, radius: 15, density: 0.65 },
    ],
  },
  {
    id: "khulna",
    name: "Khulna",
    supporters: 980_000,
    totalVoters: 3_100_000,
    coordinators: 54,
    dotClusters: [
      { cx: 182, cy: 260, radius: 22, density: 0.42 },
      { cx: 170, cy: 278, radius: 14, density: 0.35 },
    ],
  },
  {
    id: "sylhet",
    name: "Sylhet",
    supporters: 780_000,
    totalVoters: 2_600_000,
    coordinators: 43,
    dotClusters: [
      { cx: 298, cy: 158, radius: 22, density: 0.38 },
      { cx: 313, cy: 168, radius: 13, density: 0.30 },
    ],
  },
  {
    id: "barisal",
    name: "Barisal",
    supporters: 650_000,
    totalVoters: 2_200_000,
    coordinators: 38,
    dotClusters: [
      { cx: 218, cy: 285, radius: 20, density: 0.35 },
      { cx: 205, cy: 298, radius: 12, density: 0.28 },
    ],
  },
  {
    id: "rangpur",
    name: "Rangpur",
    supporters: 1_840_000,
    totalVoters: 3_800_000,
    coordinators: 49,
    dotClusters: [
      { cx: 172, cy: 108, radius: 25, density: 0.68 },
      { cx: 158, cy: 122, radius: 15, density: 0.60 },
    ],
  },
  {
    id: "mymensingh",
    name: "Mymensingh",
    supporters: 720_000,
    totalVoters: 2_900_000,
    coordinators: 41,
    dotClusters: [
      { cx: 228, cy: 162, radius: 22, density: 0.33 },
      { cx: 242, cy: 175, radius: 13, density: 0.28 },
    ],
  },
];

// Colour stops for dot colour based on density (BNP green theme)
function getDotColor(density: number, isHovered: boolean): string {
  if (isHovered) return "#ffffff";
  if (density >= 0.75) return "#22c55e"; // strong – bright green
  if (density >= 0.55) return "#4ade80"; // moderate-high – medium green
  if (density >= 0.40) return "#86efac"; // moderate – light green
  if (density >= 0.25) return "#bbf7d0"; // low-moderate – pale green
  return "#d1fae5";                       // very low – very pale
}

// Glow colour for hovered cluster
function getGlowColor(density: number): string {
  if (density >= 0.75) return "rgba(34,197,94,0.55)";
  if (density >= 0.55) return "rgba(74,222,128,0.45)";
  if (density >= 0.40) return "rgba(134,239,172,0.35)";
  return "rgba(187,247,208,0.25)";
}

// Generate a deterministic grid of dots inside a circle
function generateDots(
  cx: number,
  cy: number,
  radius: number,
  density: number,
  seed: number
): { x: number; y: number; visible: boolean }[] {
  const spacing = 7;
  const dots: { x: number; y: number; visible: boolean }[] = [];
  for (let dx = -radius; dx <= radius; dx += spacing) {
    for (let dy = -radius; dy <= radius; dy += spacing) {
      if (dx * dx + dy * dy <= radius * radius) {
        // pseudo-random visibility based on density
        const hash = Math.abs(Math.sin(seed + dx * 37 + dy * 17)) ;
        dots.push({ x: cx + dx, y: cy + dy, visible: hash < density });
      }
    }
  }
  return dots;
}

interface BangladeshDotMapProps {
  activeDistrict: string | null;
  setActiveDistrict: (id: string | null) => void;
  onDistrictClick?: (id: string | null) => void;
}

const BangladeshDotMap: React.FC<BangladeshDotMapProps> = ({
  activeDistrict,
  setActiveDistrict,
  onDistrictClick,
}) => {
  const [hoveredCluster, setHoveredCluster] = useState<string | null>(null);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#09090b] rounded-lg overflow-hidden">
      {/* Subtle grid lines for depth */}
      <svg
        className="absolute inset-0 opacity-10 pointer-events-none"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#22c55e" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Main map SVG */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 450 400"
        className="relative z-10"
      >
        <defs>
          {/* Glow filter for highlighted clusters */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Subtle ambient glow */}
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient glow behind Bangladesh */}
        <ellipse cx="225" cy="210" rx="130" ry="140" fill="url(#ambientGlow)" />

        {/* Bangladesh country outline */}
        <path
          d="M148,98 C128,138 118,188 128,228 C138,268 158,308 198,338 C238,368 278,358 308,328 C338,298 348,258 318,218 C308,198 318,168 308,148 C288,118 258,148 238,118 C218,88 178,68 148,98 Z"
          fill="none"
          stroke="#22c55e"
          strokeWidth="1.2"
          strokeDasharray="6,4"
          opacity="0.45"
        />

        {/* River paths */}
        <path
          d="M188,98 C208,148 198,198 218,248 C238,298 248,318 228,338"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="1.5"
          opacity="0.35"
        />
        <path
          d="M258,148 C238,188 243,218 268,248 C293,278 288,298 268,318"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="1.5"
          opacity="0.35"
        />
        <path
          d="M195,235 C210,250 225,260 215,280 C205,300 215,315 225,325"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="1"
          opacity="0.25"
        />

        {/* Render each division's dot clusters */}
        {divisionsData.map((division, divIndex) =>
          division.dotClusters.map((cluster, clusterIndex) => {
            const clusterKey = `${division.id}-${clusterIndex}`;
            const isHovered = hoveredCluster === clusterKey || activeDistrict === division.id;
            const dots = generateDots(
              cluster.cx,
              cluster.cy,
              cluster.radius,
              cluster.density,
              divIndex * 100 + clusterIndex * 31
            );

            return (
              <g
                key={clusterKey}
                onMouseEnter={() => {
                  setHoveredCluster(clusterKey);
                  setActiveDistrict(division.id);
                }}
                onMouseLeave={() => {
                  setHoveredCluster(null);
                  setActiveDistrict(null);
                }}
                onClick={() => onDistrictClick?.(division.id)}
                style={{ cursor: "pointer" }}
              >
                {/* Invisible hit area */}
                <circle
                  cx={cluster.cx}
                  cy={cluster.cy}
                  r={cluster.radius + 6}
                  fill="transparent"
                />

                {/* Glow halo when hovered */}
                {isHovered && (
                  <circle
                    cx={cluster.cx}
                    cy={cluster.cy}
                    r={cluster.radius + 10}
                    fill={getGlowColor(cluster.density)}
                    filter="url(#glow)"
                  />
                )}

                {/* Dot matrix */}
                {dots.map((dot, di) =>
                  dot.visible ? (
                    <circle
                      key={di}
                      cx={dot.x}
                      cy={dot.y}
                      r={isHovered ? 2.2 : 1.8}
                      fill={getDotColor(cluster.density, isHovered)}
                      opacity={isHovered ? 1 : 0.85}
                      filter={isHovered ? "url(#softGlow)" : undefined}
                      style={{ transition: "all 0.25s ease" }}
                    />
                  ) : (
                    // Dim dot placeholder
                    <circle
                      key={di}
                      cx={dot.x}
                      cy={dot.y}
                      r={1}
                      fill="#1f2937"
                      opacity={0.6}
                    />
                  )
                )}
              </g>
            );
          })
        )}

        {/* Division labels */}
        {divisionsData.map((division) => {
          const primaryCluster = division.dotClusters[0];
          const isHovered = activeDistrict === division.id;
          return (
            <g key={`label-${division.id}`} style={{ pointerEvents: "none" }}>
              <text
                x={primaryCluster.cx}
                y={primaryCluster.cy - primaryCluster.radius - 8}
                textAnchor="middle"
                fontSize={isHovered ? "11" : "9.5"}
                fontWeight={isHovered ? "700" : "500"}
                fill={isHovered ? "#ffffff" : "#a3e635"}
                style={{ transition: "all 0.2s ease", letterSpacing: "0.05em" }}
              >
                {division.name.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Density legend (bottom-right) */}
        <g transform="translate(310, 335)">
          <rect x="-8" y="-10" width="132" height="60" rx="6" fill="#111827" opacity="0.9" />
          <text x="4" y="4" fontSize="8" fill="#6b7280" fontWeight="600" letterSpacing="0.08em">
            BNP SUPPORTER DENSITY
          </text>
          {[
            { color: "#22c55e", label: "Strong (>70%)" },
            { color: "#4ade80", label: "Moderate (50–70%)" },
            { color: "#86efac", label: "Low (30–50%)" },
            { color: "#bbf7d0", label: "Very Low (<30%)" },
          ].map((item, i) => (
            <g key={i} transform={`translate(4, ${16 + i * 11})`}>
              <circle cx="4" cy="4" r="3.5" fill={item.color} />
              <text x="12" y="8" fontSize="7.5" fill="#9ca3af">
                {item.label}
              </text>
            </g>
          ))}
        </g>

        {/* Compass / branding mark */}
        <g transform="translate(20, 345)">
          <circle cx="12" cy="12" r="12" fill="#111827" opacity="0.8" />
          <text x="12" y="10" textAnchor="middle" fontSize="7" fill="#6b7280" fontWeight="600">N</text>
          <line x1="12" y1="4" x2="12" y2="10" stroke="#22c55e" strokeWidth="1.5" />
          <text x="12" y="20" textAnchor="middle" fontSize="7" fill="#4b5563" fontWeight="600">S</text>
          <line x1="12" y1="14" x2="12" y2="19" stroke="#4b5563" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};

export default BangladeshDotMap;
