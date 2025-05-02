
import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, Phone, Mail, Users, MessageSquare, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock timeline data
const timelineEvents = [
  {
    id: "1",
    date: "2023-04-15T14:30:00",
    type: "meeting",
    description: "District committee meeting in Dhaka-7",
    contacts: ["Rahima Begum", "Abdul Karim"],
    notes: "Discussed campaign strategy for upcoming local elections",
    tags: ["Meeting", "Committee", "Strategy"]
  },
  {
    id: "2",
    date: "2023-04-12T10:15:00",
    type: "phoneCall",
    description: "Phone bank campaign for Rajshahi-1",
    contacts: ["Mohammad Ali"],
    notes: "Contacted 45 potential voters, 28 positive responses",
    tags: ["Phone Bank", "Voter Contact", "Rajshahi"]
  },
  {
    id: "3",
    date: "2023-04-10T16:00:00",
    type: "email",
    description: "Monthly newsletter sent to all members",
    contacts: ["All Members"],
    notes: "Included updates on policy positions and upcoming events",
    tags: ["Email", "Newsletter", "Mass Communication"]
  },
  {
    id: "4",
    date: "2023-04-05T09:00:00",
    type: "event",
    description: "Community cleanup in Khulna-4",
    contacts: ["Nusrat Jahan", "Multiple Volunteers"],
    notes: "20 volunteers participated, good media coverage",
    tags: ["Event", "Community Service", "Media"]
  },
  {
    id: "5",
    date: "2023-04-01T11:30:00",
    type: "message",
    description: "SMS campaign about voter registration",
    contacts: ["First-time Voters"],
    notes: "Sent to 500 contacts, 150 clicked the registration link",
    tags: ["SMS", "Voter Registration", "Youth Outreach"]
  }
];

const TimelinePage = () => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "meeting": return <Users className="h-5 w-5 text-blue-500" />;
      case "phoneCall": return <Phone className="h-5 w-5 text-green-500" />;
      case "email": return <Mail className="h-5 w-5 text-purple-500" />;
      case "event": return <Calendar className="h-5 w-5 text-orange-500" />;
      case "message": return <MessageSquare className="h-5 w-5 text-teal-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <MainLayout title="Engagement Timeline">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:max-w-md">
            <Input placeholder="Search timeline events..." />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All event types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All event types</SelectItem>
                <SelectItem value="meeting">Meetings</SelectItem>
                <SelectItem value="phoneCall">Phone Calls</SelectItem>
                <SelectItem value="email">Emails</SelectItem>
                <SelectItem value="event">Events</SelectItem>
                <SelectItem value="message">Messages</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button>Add Event</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Timeline</CardTitle>
            <CardDescription>
              History of all interactions, communications, and activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-0">
              {/* Timeline line */}
              <div className="absolute left-8 top-4 bottom-4 w-px bg-border" />

              {timelineEvents.map((event) => (
                <div key={event.id} className="relative flex gap-4 pb-8">
                  {/* Timeline icon */}
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-background border border-border">
                    {getEventIcon(event.type)}
                  </div>

                  {/* Event content */}
                  <div className="flex-grow pt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="font-medium">{event.description}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {formatDate(event.date)}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-muted-foreground my-2">{event.notes}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {event.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="text-xs text-muted-foreground mt-2">
                      Contacts: {event.contacts.join(", ")}
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
