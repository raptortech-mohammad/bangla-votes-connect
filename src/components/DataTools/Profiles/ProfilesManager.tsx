
import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  UserPlus, 
  Download, 
  Upload,
  SlidersHorizontal 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfilesList from "./ProfilesList";
import ProfileFilters from "./ProfileFilters";
import ProfileView from "./ProfileView";

// Mock data for profiles
const mockProfiles = [
  {
    id: "1",
    name: "Rahima Begum",
    type: "Supporter",
    email: "rahima.begum@example.com",
    phone: "+880 1712 345678",
    district: "Dhaka",
    constituency: "Dhaka-7",
    tags: ["Volunteer", "Donor", "Event Attendee"],
    lastContact: "2023-04-15",
    engagementScore: 87
  },
  {
    id: "2",
    name: "Abdul Karim",
    type: "Member",
    email: "abdul.karim@example.com",
    phone: "+880 1823 456789",
    district: "Chittagong",
    constituency: "Chittagong-3",
    tags: ["Committee Member", "Regular Donor"],
    lastContact: "2023-04-10",
    engagementScore: 92
  },
  {
    id: "3",
    name: "Fatima Khatun",
    type: "Citizen",
    email: "fatima.k@example.com",
    phone: "+880 1912 345678",
    district: "Sylhet",
    constituency: "Sylhet-2",
    tags: ["First-time Voter", "Event Attendee"],
    lastContact: "2023-03-28",
    engagementScore: 45
  },
  {
    id: "4",
    name: "Mohammad Ali",
    type: "Volunteer",
    email: "mohammad.ali@example.com",
    phone: "+880 1612 345678",
    district: "Rajshahi",
    constituency: "Rajshahi-1",
    tags: ["Canvasser", "Phone Bank"],
    lastContact: "2023-04-12",
    engagementScore: 78
  },
  {
    id: "5",
    name: "Nusrat Jahan",
    type: "Member",
    email: "nusrat.j@example.com",
    phone: "+880 1512 345678",
    district: "Khulna",
    constituency: "Khulna-4",
    tags: ["Youth Wing", "Social Media Advocate"],
    lastContact: "2023-04-08",
    engagementScore: 81
  }
];

const ProfilesManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProfile, setSelectedProfile] = useState<typeof mockProfiles[0] | null>(null);

  const handleProfileClick = (profileId: string) => {
    const profile = mockProfiles.find(p => p.id === profileId);
    if (profile) {
      setSelectedProfile(profile);
    }
  };

  const handleCloseProfile = () => {
    setSelectedProfile(null);
  };

  // If a profile is selected, show the profile view
  if (selectedProfile) {
    return <ProfileView profile={selectedProfile} onClose={handleCloseProfile} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search profiles..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Columns
          </Button>
          <Button size="sm" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add New
          </Button>
        </div>
      </div>

      {showFilters && (
        <Card className="p-4">
          <ProfileFilters />
        </Card>
      )}

      <div className="bg-white rounded-lg shadow-sm">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center px-4 pt-4">
            <TabsList>
              <TabsTrigger value="all">All Profiles</TabsTrigger>
              <TabsTrigger value="supporters">Supporters</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
              <TabsTrigger value="citizens">Citizens</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Import
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <ProfilesList 
              profiles={mockProfiles} 
              searchTerm={searchTerm} 
              onProfileClick={handleProfileClick}
            />
          </TabsContent>
          <TabsContent value="supporters">
            <ProfilesList 
              profiles={mockProfiles.filter(p => p.type === "Supporter")} 
              searchTerm={searchTerm} 
              onProfileClick={handleProfileClick}
            />
          </TabsContent>
          <TabsContent value="members">
            <ProfilesList 
              profiles={mockProfiles.filter(p => p.type === "Member")} 
              searchTerm={searchTerm} 
              onProfileClick={handleProfileClick}
            />
          </TabsContent>
          <TabsContent value="volunteers">
            <ProfilesList 
              profiles={mockProfiles.filter(p => p.type === "Volunteer")} 
              searchTerm={searchTerm} 
              onProfileClick={handleProfileClick}
            />
          </TabsContent>
          <TabsContent value="citizens">
            <ProfilesList 
              profiles={mockProfiles.filter(p => p.type === "Citizen")} 
              searchTerm={searchTerm} 
              onProfileClick={handleProfileClick}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilesManager;
