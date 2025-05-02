
import React from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Tag, 
  Calendar, 
  Edit, 
  Trash,
  MessageSquare,
  Clock, 
  ChevronRight 
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface ProfileViewProps {
  profile: {
    id: string;
    name: string;
    type: string;
    email: string;
    phone: string;
    district: string;
    constituency: string;
    tags: string[];
    lastContact: string;
    engagementScore: number;
  };
  onClose: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ profile, onClose }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onClose}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-bold">Profile Details</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" className="flex items-center gap-2">
            <Trash className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl bg-primary/20 text-primary">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{profile.name}</h3>
              <Badge className="mt-2">{profile.type}</Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{profile.district}, {profile.constituency}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Last Contact: {profile.lastContact}</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Tag className="h-4 w-4" /> Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium">Engagement Score</h4>
                <span className="text-sm font-medium">{profile.engagementScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${profile.engagementScore}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="calls">Calls</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="pt-4">
                  <div className="space-y-4">
                    {/* Sample timeline items */}
                    {[1, 2, 3].map((index) => (
                      <div key={index} className="flex gap-4 pb-4 border-b">
                        <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{index === 1 ? "Phone Call" : index === 2 ? "Event Attendance" : "Added Note"}</span>
                            <span className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm mt-1">
                            {index === 1 
                              ? "Discussed campaign priorities and asked for feedback on local issues." 
                              : index === 2 
                                ? "Attended the community town hall meeting and asked questions about infrastructure." 
                                : "Contact expressed interest in volunteering for the upcoming rally."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="calls">
                  <p className="py-4 text-muted-foreground">Call history will appear here.</p>
                </TabsContent>
                <TabsContent value="events">
                  <p className="py-4 text-muted-foreground">Event attendance history will appear here.</p>
                </TabsContent>
                <TabsContent value="notes">
                  <p className="py-4 text-muted-foreground">Notes will appear here.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  Log Phone Call
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Add Note
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Fields</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Voter ID</div>
                    <div>BDV12345678</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Preferred Language</div>
                    <div>Bengali</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Political Leaning</div>
                    <div>Moderate</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Key Issues</div>
                    <div>Education, Healthcare</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
