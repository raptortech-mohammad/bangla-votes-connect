
import React, { useState } from "react";
import { 
  Users, 
  Filter, 
  PieChart, 
  Search, 
  Save, 
  Plus,
  UserPlus,
  Download,
  ChartBar,
  ChartLine,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import SegmentBuilder from "./SegmentBuilder";
import SegmentsList from "./SegmentsList";
import AudienceInsights from "./AudienceInsights";
import TrendAnalytics from "./TrendAnalytics";

const SegmentationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("segments");
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-2">Segmentation & Analytics</h2>
        <p className="text-muted-foreground">
          Create custom segments, run advanced analytics, and derive actionable insights from your supporter data.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search segments..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Segment
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Segment
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="segments" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="bg-white rounded-lg shadow-sm"
      >
        <TabsList className="grid grid-cols-4 p-0 bg-gray-100/50 rounded-t-lg">
          <TabsTrigger value="segments" className="py-4 rounded-none rounded-tl-lg data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <Users className="h-4 w-4 mr-2" />
            Segments
          </TabsTrigger>
          <TabsTrigger value="builder" className="py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <UserPlus className="h-4 w-4 mr-2" />
            Segment Builder
          </TabsTrigger>
          <TabsTrigger value="insights" className="py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <PieChart className="h-4 w-4 mr-2" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="trends" className="py-4 rounded-none rounded-tr-lg data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <ChartLine className="h-4 w-4 mr-2" />
            Trends
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="segments" className="p-6">
          <SegmentsList searchTerm={searchTerm} />
        </TabsContent>
        
        <TabsContent value="builder" className="p-6">
          <SegmentBuilder />
        </TabsContent>
        
        <TabsContent value="insights" className="p-6">
          <AudienceInsights />
        </TabsContent>
        
        <TabsContent value="trends" className="p-6">
          <TrendAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SegmentationDashboard;
