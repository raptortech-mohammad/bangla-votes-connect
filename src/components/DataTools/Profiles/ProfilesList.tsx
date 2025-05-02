
import React from "react";
import { 
  Badge, 
  CheckCircle2, 
  CircleAlert, 
  CircleDashed, 
  User 
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge as UIBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProfilesListProps {
  profiles: Array<{
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
  }>;
  searchTerm: string;
  onProfileClick: (profileId: string) => void;
}

const ProfilesList: React.FC<ProfilesListProps> = ({ 
  profiles, 
  searchTerm,
  onProfileClick 
}) => {
  // Filter profiles based on search term
  const filteredProfiles = searchTerm 
    ? profiles.filter(
        (profile) => 
          profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.constituency.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : profiles;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getEngagementIcon = (score: number) => {
    if (score >= 70) return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    if (score >= 40) return <CircleDashed className="h-4 w-4 text-amber-500" />;
    return <CircleAlert className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left font-medium text-gray-500">Name</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Contact Info</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Location</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Tags</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Last Contact</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Engagement</th>
            <th className="px-4 py-3 text-center font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProfiles.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                No profiles found matching your search.
              </td>
            </tr>
          ) : (
            filteredProfiles.map((profile) => (
              <tr 
                key={profile.id} 
                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                onClick={() => onProfileClick(profile.id)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getInitials(profile.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{profile.name}</div>
                      <div className="text-xs text-muted-foreground">{profile.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-xs text-muted-foreground">{profile.email}</div>
                  <div>{profile.phone}</div>
                </td>
                <td className="px-4 py-3">
                  <div>{profile.district}</div>
                  <div className="text-xs text-muted-foreground">{profile.constituency}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {profile.tags.slice(0, 2).map((tag) => (
                      <UIBadge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </UIBadge>
                    ))}
                    {profile.tags.length > 2 && (
                      <UIBadge variant="outline" className="text-xs">
                        +{profile.tags.length - 2}
                      </UIBadge>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>{profile.lastContact}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {getEngagementIcon(profile.engagementScore)}
                    <span>{profile.engagementScore}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onProfileClick(profile.id);
                      }}
                    >
                      <User className="h-4 w-4" />
                      <span className="sr-only">View Profile</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {filteredProfiles.length > 0 && (
        <div className="px-4 py-3 text-sm text-muted-foreground">
          Showing {filteredProfiles.length} of {profiles.length} profiles
        </div>
      )}
    </div>
  );
};

export default ProfilesList;
