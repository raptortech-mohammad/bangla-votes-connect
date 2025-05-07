
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCheck, TrendingUp, Users, MessageCircle } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const engagementData = [
  { name: 'May 1', facebook: 120, instagram: 80, twitter: 40, linkedin: 20 },
  { name: 'May 2', facebook: 132, instagram: 90, twitter: 30, linkedin: 22 },
  { name: 'May 3', facebook: 100, instagram: 110, twitter: 50, linkedin: 25 },
  { name: 'May 4', facebook: 140, instagram: 95, twitter: 43, linkedin: 30 },
  { name: 'May 5', facebook: 135, instagram: 85, twitter: 52, linkedin: 28 },
  { name: 'May 6', facebook: 150, instagram: 120, twitter: 60, linkedin: 32 },
  { name: 'May 7', facebook: 180, instagram: 135, twitter: 70, linkedin: 40 }
];

const followerGrowthData = [
  { name: 'Jan', facebook: 10500, instagram: 7800, twitter: 5200, linkedin: 3000 },
  { name: 'Feb', facebook: 10800, instagram: 8000, twitter: 5300, linkedin: 3050 },
  { name: 'Mar', facebook: 11200, instagram: 8100, twitter: 5350, linkedin: 3100 },
  { name: 'Apr', facebook: 11800, instagram: 8200, twitter: 5400, linkedin: 3150 },
  { name: 'May', facebook: 12500, instagram: 8200, twitter: 5600, linkedin: 3200 }
];

const postPerformanceData = [
  { name: 'Post 1', engagement: 352, reach: 5200, shares: 42 },
  { name: 'Post 2', engagement: 278, reach: 4100, shares: 31 },
  { name: 'Post 3', engagement: 590, reach: 8300, shares: 87 },
  { name: 'Post 4', engagement: 413, reach: 6200, shares: 52 },
  { name: 'Post 5', engagement: 325, reach: 4800, shares: 38 }
];

// Enhanced platform colors
const PLATFORM_COLORS = {
  facebook: "#4267B2",
  instagram: "#E1306C",
  twitter: "#1DA1F2", 
  linkedin: "#0077B5"
};

const METRIC_COLORS = {
  engagement: "#8B5CF6",
  reach: "#10B981",
  shares: "#F59E0B"
};

const SocialMediaAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="pb-2">
            <CardDescription>Total Followers</CardDescription>
            <CardTitle className="text-2xl">29,500</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="text-blue-600 h-4 w-4 mr-2" />
              <span className="text-xs text-green-600">+5.2% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-pink-50 to-pink-100">
          <CardHeader className="pb-2">
            <CardDescription>Engagement Rate</CardDescription>
            <CardTitle className="text-2xl">3.8%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MessageCircle className="text-pink-600 h-4 w-4 mr-2" />
              <span className="text-xs text-green-600">+0.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="pb-2">
            <CardDescription>Conversion Rate</CardDescription>
            <CardTitle className="text-2xl">2.1%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserCheck className="text-purple-600 h-4 w-4 mr-2" />
              <span className="text-xs text-green-600">+0.3% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100">
          <CardHeader className="pb-2">
            <CardDescription>Total Impressions</CardDescription>
            <CardTitle className="text-2xl">152K</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="text-emerald-600 h-4 w-4 mr-2" />
              <span className="text-xs text-green-600">+12% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="engagement">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="growth">Follower Growth</TabsTrigger>
          <TabsTrigger value="posts">Post Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="engagement" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Engagement</CardTitle>
              <CardDescription>Engagement metrics across platforms over the past week</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="facebook" stroke={PLATFORM_COLORS.facebook} strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="instagram" stroke={PLATFORM_COLORS.instagram} strokeWidth={2} />
                  <Line type="monotone" dataKey="twitter" stroke={PLATFORM_COLORS.twitter} strokeWidth={2} />
                  <Line type="monotone" dataKey="linkedin" stroke={PLATFORM_COLORS.linkedin} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="growth" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Follower Growth</CardTitle>
              <CardDescription>Follower count across platforms in 2025</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={followerGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="facebook" 
                    stroke={PLATFORM_COLORS.facebook} 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    dot={{ strokeWidth: 2 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="instagram" 
                    stroke={PLATFORM_COLORS.instagram}
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="twitter" 
                    stroke={PLATFORM_COLORS.twitter} 
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="linkedin" 
                    stroke={PLATFORM_COLORS.linkedin} 
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="posts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
              <CardDescription>Metrics for your most engaging content</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={postPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="engagement" fill={METRIC_COLORS.engagement} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="shares" fill={METRIC_COLORS.shares} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialMediaAnalytics;
