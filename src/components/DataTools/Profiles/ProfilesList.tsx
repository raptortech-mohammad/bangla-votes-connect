
import React from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal, User, Star } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Profile {
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
}

interface ProfilesListProps {
  profiles: Profile[];
  searchTerm: string;
}

const ProfilesList: React.FC<ProfilesListProps> = ({ profiles, searchTerm }) => {
  // Filter profiles based on search term
  const filteredProfiles = profiles.filter(profile => 
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.phone.includes(searchTerm) ||
    profile.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.constituency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Function to get engagement color based on score
  const getEngagementColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <>
      {filteredProfiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <User className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No profiles found</h3>
          <p className="text-muted-foreground text-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>District & Constituency</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead>Engagement</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProfiles.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {profile.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link to={`/data-tools/profiles/${profile.id}`} className="font-medium hover:underline">
                        {profile.name}
                      </Link>
                      <div className="text-xs text-muted-foreground">
                        {profile.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={profile.type === "Member" ? "default" : "outline"}>
                    {profile.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {profile.district}
                    <div className="text-xs text-muted-foreground">
                      {profile.constituency}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {profile.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {profile.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{profile.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{formatDate(profile.lastContact)}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-16 rounded-full bg-gray-200`}>
                      <div 
                        className={`h-2 rounded-full ${getEngagementColor(profile.engagementScore)}`}
                        style={{ width: `${profile.engagementScore}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{profile.engagementScore}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Log Interaction</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete Profile</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default ProfilesList;
