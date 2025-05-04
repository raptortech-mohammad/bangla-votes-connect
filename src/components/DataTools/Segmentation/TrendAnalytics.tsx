
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TrendAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>("6m");
  
  // Mock data for trends
  const supporterGrowthData = [
    { date: 'Nov', total: 12500, newSupporters: 850, lostSupporters: 120 },
    { date: 'Dec', total: 13230, newSupporters: 950, lostSupporters: 220 },
    { date: 'Jan', total: 13960, newSupporters: 980, lostSupporters: 250 },
    { date: 'Feb', total: 14690, newSupporters: 910, lostSupporters: 180 },
    { date: 'Mar', total: 15420, newSupporters: 870, lostSupporters: 140 },
    { date: 'Apr', total: 16150, newSupporters: 920, lostSupporters: 190 },
  ];
  
  const issuesTrendData = [
    { date: 'Nov', economy: 65, healthcare: 45, education: 35, infrastructure: 20 },
    { date: 'Dec', economy: 68, healthcare: 48, education: 38, infrastructure: 25 },
    { date: 'Jan', economy: 72, healthcare: 52, education: 40, infrastructure: 28 },
    { date: 'Feb', economy: 75, healthcare: 58, education: 42, infrastructure: 32 },
    { date: 'Mar', economy: 78, healthcare: 62, education: 45, infrastructure: 38 },
    { date: 'Apr', economy: 85, healthcare: 72, education: 52, infrastructure: 42 },
  ];
  
  const engagementTrendData = [
    { date: 'Nov', email: 3.2, social: 5.8, events: 8.5, volunteer: 12.2 },
    { date: 'Dec', email: 3.5, social: 6.1, events: 9.8, volunteer: 12.8 },
    { date: 'Jan', email: 3.7, social: 6.5, events: 10.2, volunteer: 13.1 },
    { date: 'Feb', email: 3.8, social: 7.2, events: 11.0, volunteer: 13.5 },
    { date: 'Mar', email: 4.0, social: 7.8, events: 11.8, volunteer: 14.2 },
    { date: 'Apr', email: 4.2, social: 8.5, events: 12.8, volunteer: 15.2 },
  ];
  
  // Chart configs
  const supporterChartConfig: ChartConfig = {
    newSupporters: { 
      label: 'New Supporters', 
      theme: { light: '#10B981', dark: '#34D399' } 
    },
    lostSupporters: { 
      label: 'Lost Supporters', 
      theme: { light: '#EF4444', dark: '#F87171' } 
    },
    total: { 
      label: 'Total Supporters', 
      theme: { light: '#8B5CF6', dark: '#A78BFA' } 
    },
  };
  
  const issuesChartConfig: ChartConfig = {
    economy: { 
      label: 'Economy', 
      theme: { light: '#8B5CF6', dark: '#A78BFA' } 
    },
    healthcare: { 
      label: 'Healthcare', 
      theme: { light: '#F59E0B', dark: '#FBBF24' } 
    },
    education: { 
      label: 'Education', 
      theme: { light: '#EC4899', dark: '#F472B6' } 
    },
    infrastructure: { 
      label: 'Infrastructure', 
      theme: { light: '#3B82F6', dark: '#60A5FA' } 
    },
  };
  
  const engagementChartConfig: ChartConfig = {
    email: { 
      label: 'Email', 
      theme: { light: '#8B5CF6', dark: '#A78BFA' } 
    },
    social: { 
      label: 'Social Media', 
      theme: { light: '#F59E0B', dark: '#FBBF24' } 
    },
    events: { 
      label: 'Events', 
      theme: { light: '#EC4899', dark: '#F472B6' } 
    },
    volunteer: { 
      label: 'Volunteer', 
      theme: { light: '#10B981', dark: '#34D399' } 
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Trend Analysis</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="supporters">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="supporters">Supporters Growth</TabsTrigger>
          <TabsTrigger value="issues">Issues Trends</TabsTrigger>
          <TabsTrigger value="engagement">Engagement Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="supporters">
          <Card>
            <CardHeader>
              <CardTitle>Supporter Growth Trends</CardTitle>
              <CardDescription>New vs lost supporters over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={supporterChartConfig}
                  className="aspect-auto h-full"
                >
                  <LineChart
                    data={supporterGrowthData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      yAxisId="left"
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      domain={[0, 'dataMax + 5000']}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value/1000}k`}
                    />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload?.length) {
                          return (
                            <ChartTooltipContent />
                          );
                        }
                        return null;
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="newSupporters" 
                      stroke="var(--color-newSupporters)" 
                      strokeWidth={2}
                      yAxisId="left"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="lostSupporters" 
                      stroke="var(--color-lostSupporters)" 
                      strokeWidth={2}
                      yAxisId="left"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="var(--color-total)" 
                      strokeWidth={2}
                      yAxisId="right"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Legend />
                  </LineChart>
                </ChartContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-green-700 text-sm font-medium">New Supporters</div>
                  <div className="text-xl font-bold mt-1">+920</div>
                  <div className="text-green-600 text-xs mt-1">+5.7% vs last month</div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="text-red-700 text-sm font-medium">Lost Supporters</div>
                  <div className="text-xl font-bold mt-1">190</div>
                  <div className="text-red-600 text-xs mt-1">+35.7% vs last month</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-purple-700 text-sm font-medium">Net Growth</div>
                  <div className="text-xl font-bold mt-1">+730</div>
                  <div className="text-purple-600 text-xs mt-1">+20.3% total growth</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="issues">
          <Card>
            <CardHeader>
              <CardTitle>Issues Priority Trends</CardTitle>
              <CardDescription>How issue priorities have changed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={issuesChartConfig}
                  className="aspect-auto h-full"
                >
                  <LineChart
                    data={issuesTrendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload?.length) {
                          return (
                            <ChartTooltipContent />
                          );
                        }
                        return null;
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="economy" 
                      stroke="var(--color-economy)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="healthcare" 
                      stroke="var(--color-healthcare)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="education" 
                      stroke="var(--color-education)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="infrastructure" 
                      stroke="var(--color-infrastructure)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Legend />
                  </LineChart>
                </ChartContainer>
              </div>
              
              <div className="mt-4">
                <div className="text-sm font-medium">Key Insights:</div>
                <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                  <li>• Economy has consistently been the top concern, with growing importance</li>
                  <li>• Healthcare has seen significant increase in priority over the past 3 months</li>
                  <li>• Education concerns show moderate growth across all demographics</li>
                  <li>• Infrastructure issues are gaining traction but remain lower priority</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Rate Trends</CardTitle>
              <CardDescription>Engagement rates by channel over time (%)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={engagementChartConfig}
                  className="aspect-auto h-full"
                >
                  <LineChart
                    data={engagementTrendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      domain={[0, 'dataMax + 2']}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload?.length) {
                          return (
                            <ChartTooltipContent />
                          );
                        }
                        return null;
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="email" 
                      stroke="var(--color-email)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="social" 
                      stroke="var(--color-social)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="events" 
                      stroke="var(--color-events)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="volunteer" 
                      stroke="var(--color-volunteer)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Legend />
                  </LineChart>
                </ChartContainer>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-purple-700 text-sm font-medium">Email</div>
                  <div className="text-xl font-bold mt-1">4.2%</div>
                  <div className="text-purple-600 text-xs mt-1">+5% vs last month</div>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <div className="text-amber-700 text-sm font-medium">Social Media</div>
                  <div className="text-xl font-bold mt-1">8.5%</div>
                  <div className="text-amber-600 text-xs mt-1">+9% vs last month</div>
                </div>
                <div className="bg-pink-50 p-3 rounded-lg">
                  <div className="text-pink-700 text-sm font-medium">Events</div>
                  <div className="text-xl font-bold mt-1">12.8%</div>
                  <div className="text-pink-600 text-xs mt-1">+8.5% vs last month</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-green-700 text-sm font-medium">Volunteer</div>
                  <div className="text-xl font-bold mt-1">15.2%</div>
                  <div className="text-green-600 text-xs mt-1">+7% vs last month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrendAnalytics;
