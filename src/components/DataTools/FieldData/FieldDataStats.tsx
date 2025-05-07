
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const FieldDataStats: React.FC = () => {
  // Mock data for charts
  const weeklyData = [
    { date: 'Apr 22', surveys: 245, canvassing: 420, events: 80 },
    { date: 'Apr 23', surveys: 285, canvassing: 390, events: 95 },
    { date: 'Apr 24', surveys: 265, canvassing: 450, events: 85 },
    { date: 'Apr 25', surveys: 320, canvassing: 480, events: 120 },
    { date: 'Apr 26', surveys: 340, canvassing: 520, events: 150 },
    { date: 'Apr 27', surveys: 280, canvassing: 490, events: 110 },
    { date: 'Apr 28', surveys: 310, canvassing: 540, events: 130 },
  ];
  
  const monthlyData = [
    { date: 'Jan', surveys: 1200, canvassing: 2100, events: 450 },
    { date: 'Feb', surveys: 1400, canvassing: 2300, events: 520 },
    { date: 'Mar', surveys: 1600, canvassing: 2800, events: 580 },
    { date: 'Apr', surveys: 2045, canvassing: 3290, events: 770 },
  ];

  // Chart configuration with enhanced colors
  const chartConfig: ChartConfig = {
    surveys: {
      label: 'Surveys',
      theme: {
        light: '#8B5CF6',
        dark: '#A78BFA',
      },
    },
    canvassing: {
      label: 'Canvassing',
      theme: {
        light: '#F59E0B',
        dark: '#FBBF24',
      },
    },
    events: {
      label: 'Events',
      theme: {
        light: '#EC4899',
        dark: '#F472B6',
      },
    },
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Response Collection Trends</CardTitle>
        <CardDescription>Data collection activity over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="weekly" className="pt-4">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-72"
            >
              <AreaChart
                data={weeklyData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  stroke="#888888"
                  fontSize={12}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  stroke="#888888"
                  fontSize={12}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload?.length) {
                      return (
                        <ChartTooltipContent
                          label={label}
                        />
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="surveys"
                  stackId="1"
                  stroke="var(--color-surveys)"
                  fill="var(--color-surveys)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="canvassing"
                  stackId="1"
                  stroke="var(--color-canvassing)"
                  fill="var(--color-canvassing)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="events"
                  stackId="1"
                  stroke="var(--color-events)"
                  fill="var(--color-events)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <ChartLegend
                  content={<ChartLegendContent />}
                />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
          
          <TabsContent value="monthly" className="pt-4">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-72"
            >
              <BarChart
                data={monthlyData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  stroke="#888888"
                  fontSize={12}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  stroke="#888888"
                  fontSize={12}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload?.length) {
                      return (
                        <ChartTooltipContent
                          label={label}
                        />
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="surveys"
                  stackId="a"
                  fill="var(--color-surveys)"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                <Bar
                  dataKey="canvassing"
                  stackId="a"
                  fill="var(--color-canvassing)"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                <Bar
                  dataKey="events"
                  stackId="a"
                  fill="var(--color-events)"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                <ChartLegend
                  content={<ChartLegendContent />}
                />
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FieldDataStats;
