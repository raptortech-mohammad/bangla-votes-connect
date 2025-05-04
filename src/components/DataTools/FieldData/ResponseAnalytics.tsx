
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart as ReChartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ResponseAnalytics: React.FC = () => {
  // Mock data for pie charts
  const issuesPriorityData = [
    { name: 'Economy', value: 38, color: '#8B5CF6' },
    { name: 'Healthcare', value: 25, color: '#F59E0B' },
    { name: 'Education', value: 18, color: '#EC4899' },
    { name: 'Infrastructure', value: 12, color: '#3B82F6' },
    { name: 'Environment', value: 7, color: '#10B981' },
  ];
  
  // Chart configuration
  const chartConfig: ChartConfig = {
    economy: {
      label: 'Economy',
      theme: {
        light: '#8B5CF6',
        dark: '#A78BFA',
      },
    },
    healthcare: {
      label: 'Healthcare',
      theme: {
        light: '#F59E0B',
        dark: '#FBBF24',
      },
    },
    education: {
      label: 'Education',
      theme: {
        light: '#EC4899',
        dark: '#F472B6',
      },
    },
    infrastructure: {
      label: 'Infrastructure',
      theme: {
        light: '#3B82F6',
        dark: '#60A5FA',
      },
    },
    environment: {
      label: 'Environment',
      theme: {
        light: '#10B981',
        dark: '#34D399',
      },
    },
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Issues Priority</CardTitle>
            <CardDescription>Most important issues according to survey responses</CardDescription>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="dhaka">Dhaka</SelectItem>
              <SelectItem value="chittagong">Chittagong</SelectItem>
              <SelectItem value="rajshahi">Rajshahi</SelectItem>
              <SelectItem value="khulna">Khulna</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-full"
          >
            <ReChartsPieChart>
              <Pie
                data={issuesPriorityData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={true}
              >
                {issuesPriorityData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke={entry.color} 
                  />
                ))}
              </Pie>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <ChartTooltipContent nameKey="name" />
                    );
                  }
                  return null;
                }}
              />
            </ReChartsPieChart>
          </ChartContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mt-4">
          {issuesPriorityData.map((item) => (
            <div key={item.name} className="flex flex-col items-center text-center">
              <div 
                className="w-3 h-3 rounded-full mb-1"
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="text-xs font-medium">{item.name}</div>
              <div className="text-xs text-muted-foreground">{item.value}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseAnalytics;
