
import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import MainLayout from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, CalendarDays, MessageSquare, Phone, Calendar as CalendarIcon2, Filter, Plus, ChevronDown, Search, X, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the event types and their properties
type EventType = "call" | "message" | "meeting" | "event";

interface TimelineEvent {
  id: string;
  title: string;
  type: EventType;
  date: Date;
  description: string;
  addedBy: string;
  contactName?: string;
  contactId?: string;
  tags?: string[];
}

// Define mock data for timeline events
const mockEvents: TimelineEvent[] = [
  {
    id: "1",
    title: "Phone Call with Abdul Karim",
    type: "call",
    date: new Date(2023, 3, 15),
    description: "Discussed upcoming campaign rally and confirmed attendance.",
    addedBy: "Samira Ahmed",
    contactName: "Abdul Karim",
    contactId: "2",
    tags: ["Follow-up", "Campaign"]
  },
  {
    id: "2",
    title: "Campaign Volunteer Event",
    type: "event",
    date: new Date(2023, 3, 12),
    description: "Attended the community outreach program and volunteered to help with registration.",
    addedBy: "Rashid Khan",
    tags: ["Volunteer", "Outreach"]
  },
  {
    id: "3",
    title: "Text Message to Fatima Khatun",
    type: "message",
    date: new Date(2023, 3, 10),
    description: "Sent information about the upcoming voter registration drive.",
    addedBy: "Samira Ahmed",
    contactName: "Fatima Khatun",
    contactId: "3",
    tags: ["Voter Registration"]
  },
  {
    id: "4",
    title: "Strategy Meeting",
    type: "meeting",
    date: new Date(2023, 3, 8),
    description: "Met with campaign team to discuss upcoming events and messaging strategy.",
    addedBy: "Mohammad Ali",
    tags: ["Strategy", "Planning"]
  },
  {
    id: "5",
    title: "Door-to-door Canvassing Event",
    type: "event",
    date: new Date(2023, 3, 5),
    description: "Conducted door-to-door canvassing in Dhaka-7 constituency, reached approximately 120 households.",
    addedBy: "Nusrat Jahan",
    tags: ["Canvassing", "Outreach"]
  },
  {
    id: "6",
    title: "Phone Bank Session",
    type: "call",
    date: new Date(2023, 3, 3),
    description: "Called 45 supporters to remind them about the upcoming rally.",
    addedBy: "Abdul Karim",
    tags: ["Phone Bank", "Rally"]
  },
  {
    id: "7",
    title: "Meeting with Community Leaders",
    type: "meeting",
    date: new Date(2023, 3, 1),
    description: "Met with local community leaders to discuss neighborhood concerns and campaign platform.",
    addedBy: "Samira Ahmed",
    tags: ["Community Engagement", "Platform"]
  }
];

const TimelinePage = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [showLogDialog, setShowLogDialog] = useState(false);

  // Filter events based on active tab, search term, and date filter
  const filteredEvents = useMemo(() => {
    return mockEvents
      .filter(event => {
        // Filter by type
        if (activeTab !== "all" && event.type !== activeTab) {
          return false;
        }
        
        // Filter by search term
        if (
          searchTerm &&
          !event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !event.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !(event.contactName && event.contactName.toLowerCase().includes(searchTerm.toLowerCase()))
        ) {
          return false;
        }
        
        // Filter by date
        if (dateFilter) {
          const eventDate = new Date(event.date);
          const filterDate = new Date(dateFilter);
          
          if (
            eventDate.getDate() !== filterDate.getDate() ||
            eventDate.getMonth() !== filterDate.getMonth() ||
            eventDate.getFullYear() !== filterDate.getFullYear()
          ) {
            return false;
          }
        }
        
        return true;
      })
      // Sort by date, most recent first
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [activeTab, searchTerm, dateFilter]);

  // Get icon based on event type
  const getEventIcon = (type: EventType) => {
    switch (type) {
      case "call":
        return <Phone className="h-4 w-4" />;
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "meeting":
        return <CalendarDays className="h-4 w-4" />;
      case "event":
        return <CalendarIcon2 className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Get color based on event type
  const getEventColor = (type: EventType) => {
    switch (type) {
      case "call":
        return "bg-blue-100 text-blue-800";
      case "message":
        return "bg-green-100 text-green-800";
      case "meeting":
        return "bg-purple-100 text-purple-800";
      case "event":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleLogNewEvent = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would save the new event to the database
    setShowLogDialog(false);
  };

  const clearDateFilter = () => {
    setDateFilter(undefined);
  };

  return (
    <MainLayout title="Engagement Timeline">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Engagement History</h2>
            <p className="text-muted-foreground">View and analyze historical engagement data in chronological order</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search events..."
                className="pl-10 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {dateFilter ? "Date: " + format(dateFilter, "PP") : "Filter by Date"}
                  {dateFilter && (
                    <X
                      className="h-3 w-3 ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearDateFilter();
                      }}
                    />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={dateFilter}
                  onSelect={setDateFilter}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            <Dialog open={showLogDialog} onOpenChange={setShowLogDialog}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Log New Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Log a New Event</DialogTitle>
                  <DialogDescription>
                    Create a new entry in the engagement timeline. Add all relevant details about the interaction.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleLogNewEvent}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        placeholder="Event title"
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <Select defaultValue="event">
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="call">Call</SelectItem>
                          <SelectItem value="message">Message</SelectItem>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Date
                      </Label>
                      <div className="col-span-3">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {format(new Date(), "PPP")}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact" className="text-right">
                        Contact
                      </Label>
                      <div className="col-span-3 flex gap-2">
                        <Select>
                          <SelectTrigger className="flex-grow">
                            <SelectValue placeholder="Select a contact" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Rahima Begum</SelectItem>
                            <SelectItem value="2">Abdul Karim</SelectItem>
                            <SelectItem value="3">Fatima Khatun</SelectItem>
                            <SelectItem value="4">Mohammad Ali</SelectItem>
                            <SelectItem value="5">Nusrat Jahan</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <textarea
                        id="description"
                        className="col-span-3 flex h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Describe the event details..."
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save Event</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList>
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  All Events
                </TabsTrigger>
                <TabsTrigger value="call" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Calls
                </TabsTrigger>
                <TabsTrigger value="message" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Messages
                </TabsTrigger>
                <TabsTrigger value="event" className="flex items-center gap-2">
                  <CalendarIcon2 className="h-4 w-4" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="meeting" className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Meetings
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="space-y-8 py-4">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No events found matching your filters.</p>
                  <Button variant="link" onClick={() => {
                    setActiveTab("all");
                    setSearchTerm("");
                    setDateFilter(undefined);
                  }}>Clear all filters</Button>
                </div>
              ) : (
                filteredEvents.map((event) => (
                  <div key={event.id} className="relative pl-8 pb-8 border-l border-gray-200">
                    <div className={`absolute -left-2 mt-1.5 h-4 w-4 rounded-full bg-primary`}></div>
                    <div className="bg-card border rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-lg">{event.title}</h3>
                          <p className="text-muted-foreground text-sm">
                            {format(event.date, "PPP")} • {format(event.date, "p")}
                          </p>
                        </div>
                        <Badge className={`${getEventColor(event.type)}`}>
                          <div className="flex items-center gap-1">
                            {getEventIcon(event.type)}
                            <span className="capitalize">{event.type}</span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm">{event.description}</p>
                      {event.tags && event.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {event.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-4">
                        <div className="text-xs text-muted-foreground">
                          Added by: {event.addedBy}
                        </div>
                        <div className="flex gap-2">
                          {event.contactName && (
                            <Button variant="ghost" size="sm" className="text-xs">
                              View Contact
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="text-xs">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TimelinePage;
