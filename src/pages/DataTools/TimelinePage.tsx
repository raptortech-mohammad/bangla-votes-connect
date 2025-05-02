import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Clock, CalendarDays, MessageSquare, Phone, Calendar, Filter } from "lucide-react";

const TimelinePage = () => {
  return (
    <MainLayout title="Engagement Timeline">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Engagement History</h2>
            <p className="text-muted-foreground">View and analyze historical engagement data in chronological order</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter Events
            </Button>
            <Button className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Log New Event
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  All Events
                </TabsTrigger>
                <TabsTrigger value="calls" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Calls
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Messages
                </TabsTrigger>
                <TabsTrigger value="events" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="meetings" className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Meetings
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            {/* Placeholder for timeline implementation */}
            <div className="space-y-8 py-4">
              {/* Sample Timeline Events */}
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="relative pl-8 pb-8 border-l border-gray-200">
                  <div className="absolute -left-2 mt-1.5 h-4 w-4 rounded-full bg-primary"></div>
                  <div className="bg-card border rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-lg">
                          {index % 2 === 0 ? "Phone Call with Abdul Karim" : "Campaign Event Attendance"}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {index % 2 === 0 ? "Phone" : "Event"} • {new Date().toLocaleDateString()}
                        </p>
                      </div>
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                        {index % 2 === 0 ? "Call" : "Event"}
                      </div>
                    </div>
                    <p className="text-sm">
                      {index % 2 === 0
                        ? "Discussed upcoming campaign rally and confirmed attendance."
                        : "Attended the community outreach program and volunteered to help with registration."}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-xs text-muted-foreground">
                        Added by: Samira Ahmed
                      </div>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TimelinePage;
