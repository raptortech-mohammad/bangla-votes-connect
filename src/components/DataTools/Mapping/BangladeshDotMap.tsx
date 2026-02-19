
import React, { useState } from "react";
import bangladeshMapPng from "@/assets/bangladesh-map.png";

export interface DivisionData {
  id: string;
  name: string;
  supporters: number;
  totalVoters: number;
  coordinators: number;
  dotClusters: { cx: number; cy: number; radius: number; density: number }[];
}

// ViewBox: 0 0 500 540  (matches the roughly portrait aspect ratio of the PNG)
// Cluster positions are mapped to match the real geographic locations
// within the PNG silhouette (Bangladesh shape sits roughly x:55–465, y:25–515 in 500x540 space)
export const divisionsData: DivisionData[] = [
  {
    id: "dhaka",
    name: "Dhaka",
    supporters: 3_200_000,
    totalVoters: 8_500_000,
    coordinators: 145,
    dotClusters: [
      { cx: 265, cy: 295, radius: 34, density: 0.82 },
      { cx: 240, cy: 315, radius: 18, density: 0.76 },
    ],
  },
  {
    id: "chittagong",
    name: "Chittagong",
    supporters: 2_100_000,
    totalVoters: 5_800_000,
    coordinators: 98,
    dotClusters: [
      { cx: 355, cy: 360, radius: 28, density: 0.62 },
      { cx: 370, cy: 395, radius: 16, density: 0.55 },
    ],
  },
  {
    id: "rajshahi",
    name: "Rajshahi",
    supporters: 1_900_000,
    totalVoters: 4_200_000,
    coordinators: 67,
    dotClusters: [
      { cx: 155, cy: 225, radius: 30, density: 0.74 },
      { cx: 185, cy: 248, radius: 16, density: 0.66 },
    ],
  },
  {
    id: "khulna",
    name: "Khulna",
    supporters: 980_000,
    totalVoters: 3_100_000,
    coordinators: 54,
    dotClusters: [
      { cx: 170, cy: 380, radius: 26, density: 0.40 },
      { cx: 155, cy: 408, radius: 14, density: 0.33 },
    ],
  },
  {
    id: "sylhet",
    name: "Sylhet",
    supporters: 780_000,
    totalVoters: 2_600_000,
    coordinators: 43,
    dotClusters: [
      { cx: 345, cy: 215, radius: 26, density: 0.38 },
      { cx: 370, cy: 235, radius: 14, density: 0.30 },
    ],
  },
  {
    id: "barisal",
    name: "Barisal",
    supporters: 650_000,
    totalVoters: 2_200_000,
    coordinators: 38,
    dotClusters: [
      { cx: 230, cy: 415, radius: 22, density: 0.35 },
      { cx: 215, cy: 438, radius: 12, density: 0.28 },
    ],
  },
  {
    id: "rangpur",
    name: "Rangpur",
    supporters: 1_840_000,
    totalVoters: 3_800_000,
    coordinators: 49,
    dotClusters: [
      { cx: 175, cy: 125, radius: 30, density: 0.70 },
      { cx: 155, cy: 148, radius: 16, density: 0.62 },
    ],
  },
  {
    id: "mymensingh",
    name: "Mymensingh",
    supporters: 720_000,
    totalVoters: 2_900_000,
    coordinators: 41,
    dotClusters: [
      { cx: 272, cy: 228, radius: 24, density: 0.33 },
      { cx: 295, cy: 248, radius: 13, density: 0.27 },
    ],
  },
];

function getDotColor(density: number, isHovered: boolean): string {
  if (isHovered) return "#ffffff";
  if (density >= 0.75) return "#22c55e";
  if (density >= 0.55) return "#4ade80";
  if (density >= 0.40) return "#86efac";
  if (density >= 0.25) return "#bbf7d0";
  return "#d1fae5";
}

function getGlowColor(density: number): string {
  if (density >= 0.75) return "rgba(34,197,94,0.6)";
  if (density >= 0.55) return "rgba(74,222,128,0.5)";
  if (density >= 0.40) return "rgba(134,239,172,0.4)";
  return "rgba(187,247,208,0.3)";
}

// Deterministic dot grid inside a circle
function generateDots(
  cx: number,
  cy: number,
  radius: number,
  density: number,
  seed: number
): { x: number; y: number; visible: boolean }[] {
  const spacing = 8;
  const dots: { x: number; y: number; visible: boolean }[] = [];
  for (let dx = -radius; dx <= radius; dx += spacing) {
    for (let dy = -radius; dy <= radius; dy += spacing) {
      if (dx * dx + dy * dy <= radius * radius) {
        const hash = Math.abs(Math.sin(seed + dx * 37 + dy * 17));
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
      {/* Grid background */}
      <svg className="absolute inset-0 opacity-10 pointer-events-none" width="100%" height="100%">
        <defs>
          <pattern id="dotgrid" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#22c55e" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotgrid)" />
      </svg>

      {/* Main SVG */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 540"
        preserveAspectRatio="xMidYMid meet"
        className="relative z-10"
      >
        <defs>
          {/* Invert filter: black→white so the black map becomes a white mask area */}
          <filter id="invertMap" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="-1 0 0 0 1
                       0 -1 0 0 1
                       0 0 -1 0 1
                       0 0 0 1 0"
            />
          </filter>

          {/* Mask: uses inverted PNG → white country = show, black outside = hide */}
          <mask id="bangladeshMask" maskUnits="userSpaceOnUse">
            <image
              href={bangladeshMapPng}
              x="22"
              y="20"
              width="456"
              height="500"
              preserveAspectRatio="xMidYMid meet"
              filter="url(#invertMap)"
            />
          </mask>

          {/* Glow filter for hovered cluster */}
          <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial ambient light over Bangladesh */}
          <radialGradient id="ambientGlow" cx="50%" cy="55%" r="45%">
            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Map shape silhouette (very dark green tint) ── */}
        <image
          href={bangladeshMapPng}
          x="22"
          y="20"
          width="456"
          height="500"
          preserveAspectRatio="xMidYMid meet"
          style={{
            filter:
              "invert(1) sepia(1) saturate(0.6) hue-rotate(80deg) brightness(0.25) opacity(0.9)",
          }}
        />

        {/* Ambient glow behind country */}
        <ellipse cx="250" cy="290" rx="180" ry="210" fill="url(#ambientGlow)" />

        {/* ── Dot clusters masked to Bangladesh shape ── */}
        <g mask="url(#bangladeshMask)">
          {divisionsData.map((division, divIndex) =>
            division.dotClusters.map((cluster, clusterIndex) => {
              const clusterKey = `${division.id}-${clusterIndex}`;
              const isHovered =
                hoveredCluster === clusterKey || activeDistrict === division.id;
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
                  <circle cx={cluster.cx} cy={cluster.cy} r={cluster.radius + 8} fill="transparent" />

                  {/* Glow halo */}
                  {isHovered && (
                    <circle
                      cx={cluster.cx}
                      cy={cluster.cy}
                      r={cluster.radius + 12}
                      fill={getGlowColor(cluster.density)}
                      filter="url(#glow)"
                    />
                  )}

                  {/* Dots */}
                  {dots.map((dot, di) =>
                    dot.visible ? (
                      <circle
                        key={di}
                        cx={dot.x}
                        cy={dot.y}
                        r={isHovered ? 2.4 : 1.9}
                        fill={getDotColor(cluster.density, isHovered)}
                        opacity={isHovered ? 1 : 0.88}
                        filter={isHovered ? "url(#softGlow)" : undefined}
                        style={{ transition: "all 0.2s ease" }}
                      />
                    ) : (
                      <circle key={di} cx={dot.x} cy={dot.y} r={0.9} fill="#1a2a1a" opacity={0.5} />
                    )
                  )}
                </g>
              );
            })
          )}
        </g>

        {/* ── Division labels (outside mask so always visible) ── */}
        {divisionsData.map((division) => {
          const c = division.dotClusters[0];
          const isHovered = activeDistrict === division.id;
          // Label offset: push above the cluster
          const labelY = c.cy - c.radius - 10;
          return (
            <g key={`label-${division.id}`} style={{ pointerEvents: "none" }}>
              {/* Label background pill */}
              <rect
                x={c.cx - 28}
                y={labelY - 9}
                width={56}
                height={13}
                rx={6}
                fill={isHovered ? "#14532d" : "#0a1a0a"}
                opacity={isHovered ? 0.95 : 0.7}
              />
              <text
                x={c.cx}
                y={labelY}
                textAnchor="middle"
                fontSize={isHovered ? "9.5" : "8.5"}
                fontWeight={isHovered ? "700" : "500"}
                fill={isHovered ? "#86efac" : "#4ade80"}
                letterSpacing="0.06em"
                style={{ transition: "all 0.2s ease" }}
              >
                {division.name.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* ── In-map density legend ── */}
        <g transform="translate(330, 460)">
          <rect x="-6" y="-8" width="162" height="66" rx="7" fill="#0d1a0d" opacity="0.92" />
          <text x="4" y="6" fontSize="7.5" fill="#4b7c4b" fontWeight="700" letterSpacing="0.1em">
            BNP SUPPORTER DENSITY
          </text>
          {[
            { color: "#22c55e", label: "Strong  >70%" },
            { color: "#4ade80", label: "Moderate  50–70%" },
            { color: "#86efac", label: "Low  30–50%" },
            { color: "#bbf7d0", label: "Very Low  <30%" },
          ].map((item, i) => (
            <g key={i} transform={`translate(4, ${16 + i * 12})`}>
              <circle cx="4" cy="4" r="3.5" fill={item.color} />
              <text x="13" y="8" fontSize="8" fill="#6b9b6b">
                {item.label}
              </text>
            </g>
          ))}
        </g>

        {/* Compass */}
        <g transform="translate(28, 480)">
          <circle cx="12" cy="12" r="13" fill="#0d1a0d" opacity="0.85" />
          <text x="12" y="9" textAnchor="middle" fontSize="7" fill="#22c55e" fontWeight="700">N</text>
          <line x1="12" y1="3" x2="12" y2="9" stroke="#22c55e" strokeWidth="1.5" />
          <text x="12" y="21" textAnchor="middle" fontSize="7" fill="#2d4a2d" fontWeight="600">S</text>
          <line x1="12" y1="15" x2="12" y2="20" stroke="#2d4a2d" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};

export default BangladeshDotMap;
