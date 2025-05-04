
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AudienceInsights: React.FC = () => {
  // Mock data
  const ageData = [
    { name: '18-24', value: 18, color: '#8B5CF6' },
    { name: '25-34', value: 32, color: '#F59E0B' },
    { name: '35-44', value: 24, color: '#EC4899' },
    { name: '45-54', value: 15, color: '#3B82F6' },
    { name: '55+', value: 11, color: '#10B981' },
  ];
  
  const genderData = [
    { name: 'Male', value: 53, color: '#8B5CF6' },
    { name: 'Female', value: 46, color: '#F59E0B' },
    { name: 'Other', value: 1, color: '#EC4899' },
  ];
  
  const engagementData = [
    { name: 'Social Media', followers: 12500, engagement: 8.5, color: '#8B5CF6' },
    { name: 'Email', followers: 28400, engagement: 4.2, color: '#F59E0B' },
    { name: 'Events', followers: 7800, engagement: 12.8, color: '#EC4899' },
    { name: 'Phone Banking', followers: 15600, engagement: 3.7, color: '#3B82F6' },
    { name: 'Door-to-Door', followers: 9300, engagement: 15.2, color: '#10B981' },
  ];
  
  const issueData = [
    { name: 'Economy', score: 85, color: '#8B5CF6' },
    { name: 'Healthcare', score: 72, color: '#F59E0B' },
    { name: 'Education', score: 68, color: '#EC4899' },
    { name: 'Infrastructure', score: 58, color: '#3B82F6' },
    { name: 'Environment', score: 45, color: '#10B981' },
    { name: 'Security', score: 62, color: '#06B6D4' },
  ];
  
  // Chart configuration
  const demographicChartConfig: ChartConfig = {
    '18-24': { label: '18-24', theme: { light: '#8B5CF6', dark: '#A78BFA' } },
    '25-34': { label: '25-34', theme: { light: '#F59E0B', dark: '#FBBF24' } },
    '35-44': { label: '35-44', theme: { light: '#EC4899', dark: '#F472B6' } },
    '45-54': { label: '45-54', theme: { light: '#3B82F6', dark: '#60A5FA' } },
    '55+': { label: '55+', theme: { light: '#10B981', dark: '#34D399' } },
    'Male': { label: 'Male', theme: { light: '#8B5CF6', dark: '#A78BFA' } },
    'Female': { label: 'Female', theme: { light: '#F59E0B', dark: '#FBBF24' } },
    'Other': { label: 'Other', theme: { light: '#EC4899', dark: '#F472B6' } },
  };
  
  const engagementChartConfig: ChartConfig = {
    engagement: { label: 'Engagement %', theme: { light: '#8B5CF6', dark: '#A78BFA' } },
  };
  
  const issueChartConfig: ChartConfig = {
    score: { label: 'Importance Score', theme: { light: '#8B5CF6', dark: '#A78BFA' } },
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Demographics Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Demographics</CardTitle>
                <CardDescription>Age and gender distribution</CardDescription>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Segments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Segments</SelectItem>
                  <SelectItem value="youth">Youth Segment</SelectItem>
                  <SelectItem value="urban">Urban Voters</SelectItem>
                  <SelectItem value="rural">Rural Voters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="age">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="age">Age Groups</TabsTrigger>
                <TabsTrigger value="gender">Gender</TabsTrigger>
              </TabsList>
              
              <TabsContent value="age" className="pt-4">
                <div className="h-60">
                  <ChartContainer
                    config={demographicChartConfig}
                    className="aspect-auto h-full"
                  >
                    <PieChart>
                      <Pie
                        data={ageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={true}
                      >
                        {ageData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
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
                    </PieChart>
                  </ChartContainer>
                </div>
                
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {ageData.map((item) => (
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
              </TabsContent>
              
              <TabsContent value="gender" className="pt-4">
                <div className="h-60">
                  <ChartContainer
                    config={demographicChartConfig}
                    className="aspect-auto h-full"
                  >
                    <PieChart>
                      <Pie
                        data={genderData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={true}
                      >
                        {genderData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
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
                    </PieChart>
                  </ChartContainer>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {genderData.map((item) => (
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
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Engagement Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Engagement By Channel</CardTitle>
                <CardDescription>Engagement rates across channels</CardDescription>
              </div>
              <Select defaultValue="last30">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Last 30 Days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7">Last 7 Days</SelectItem>
                  <SelectItem value="last30">Last 30 Days</SelectItem>
                  <SelectItem value="last90">Last 90 Days</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer
                config={engagementChartConfig}
                className="aspect-auto h-full"
              >
                <BarChart
                  data={engagementData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" domain={[0, 'dataMax + 2']} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    width={80}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload?.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Channel
                                </span>
                                <span className="font-bold text-sm">
                                  {data.name}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Engagement
                                </span>
                                <span className="font-bold text-sm">
                                  {data.engagement}%
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Followers
                                </span>
                                <span className="font-bold text-sm">
                                  {data.followers.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="engagement" 
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Issues Priority */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Issue Priorities</CardTitle>
                <CardDescription>Importance score by issue (0-100)</CardDescription>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Segments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Segments</SelectItem>
                  <SelectItem value="urban">Urban</SelectItem>
                  <SelectItem value="rural">Rural</SelectItem>
                  <SelectItem value="youth">Youth</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer
                config={issueChartConfig}
                className="aspect-auto h-full"
              >
                <BarChart
                  data={issueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    axisLine={false}
                    tickLine={false}
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
                  <Bar 
                    dataKey="score" 
                    radius={[4, 4, 0, 0]}
                    barSize={30}
                  >
                    {issueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AudienceInsights;
