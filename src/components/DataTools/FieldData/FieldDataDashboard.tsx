
import React, { useState } from "react";
import { 
  FileText, 
  Share2, 
  Users, 
  Map, 
  Filter, 
  Calendar, 
  Database,
  Plus,
  Download,
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FieldSurveyList from "./FieldSurveyList";
import CanvassingMap from "./CanvassingMap";
import FieldDataStats from "./FieldDataStats";
import ResponseAnalytics from "./ResponseAnalytics";

const FieldDataDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("surveys");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-2">Field Data Collection</h2>
        <p className="text-muted-foreground">
          Create and manage surveys, track canvassing operations, and analyze field data collected by your volunteers.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search forms, surveys..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="surveys">Surveys</SelectItem>
              <SelectItem value="canvassing">Canvassing</SelectItem>
              <SelectItem value="events">Event Forms</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="surveys" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="bg-white rounded-lg shadow-sm"
      >
        <TabsList className="grid grid-cols-4 p-0 bg-gray-100/50 rounded-t-lg">
          <TabsTrigger value="surveys" className="py-4 rounded-none rounded-tl-lg data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <FileText className="h-4 w-4 mr-2" />
            Surveys & Forms
          </TabsTrigger>
          <TabsTrigger value="canvassing" className="py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <Users className="h-4 w-4 mr-2" />
            Canvassing
          </TabsTrigger>
          <TabsTrigger value="map" className="py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <Map className="h-4 w-4 mr-2" />
            Map View
          </TabsTrigger>
          <TabsTrigger value="data" className="py-4 rounded-none rounded-tr-lg data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <Database className="h-4 w-4 mr-2" />
            Data & Reports
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="surveys" className="p-6">
          <FieldSurveyList searchTerm={searchTerm} />
        </TabsContent>
        
        <TabsContent value="canvassing" className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Active Canvassing Operations</CardTitle>
                <CardDescription>Current canvassing operations across districts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4">
                      <div>
                        <h3 className="font-medium">Dhaka North Voter Survey</h3>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> 
                          Started: May 1, 2025
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">4,532 responses</div>
                        <div className="text-sm text-muted-foreground">Target: 10,000</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Volunteers Active</CardTitle>
                <CardDescription>Currently collecting data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">132</span>
                    <span className="text-green-600 text-sm">↑ 12% vs last week</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div>89 Canvassing</div>
                    <div>23 Events</div>
                    <div>20 Phone banking</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="map" className="p-6">
          <CanvassingMap />
        </TabsContent>
        
        <TabsContent value="data" className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FieldDataStats />
            <ResponseAnalytics />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FieldDataDashboard;
