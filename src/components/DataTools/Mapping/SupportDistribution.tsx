
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { supportDistributionData } from "./mockData";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3 } from "lucide-react";

const SupportDistribution: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handlePieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const handlePieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">Support Distribution</CardTitle>
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
            <BarChart3 className="h-3 w-3" />
            Analytics
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={supportDistributionData}
                cx="50%"
                cy="50%"
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                onMouseEnter={handlePieEnter}
                onMouseLeave={handlePieLeave}
                animationDuration={300}
              >
                {supportDistributionData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.7}
                    strokeWidth={activeIndex === index ? 2 : 1}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, ""]}
                contentStyle={{ 
                  borderRadius: "8px", 
                  padding: "8px 12px", 
                  fontSize: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {supportDistributionData.map((item, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center text-sm transition-all duration-200 hover:bg-gray-50 p-1 rounded cursor-pointer"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <span className="flex items-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></span>
                {item.name}
              </span>
              <span className="font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportDistribution;
