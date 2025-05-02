
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

const ProfileFilters = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filter Profiles</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Reset
          </Button>
          <Button size="sm">
            Apply Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Type Filter */}
        <div className="space-y-2">
          <Label htmlFor="type">Profile Type</Label>
          <Select>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="supporter">Supporter</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="volunteer">Volunteer</SelectItem>
              <SelectItem value="citizen">Citizen</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* District Filter */}
        <div className="space-y-2">
          <Label htmlFor="district">District</Label>
          <Select>
            <SelectTrigger id="district">
              <SelectValue placeholder="Select district" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              <SelectItem value="dhaka">Dhaka</SelectItem>
              <SelectItem value="chittagong">Chittagong</SelectItem>
              <SelectItem value="khulna">Khulna</SelectItem>
              <SelectItem value="rajshahi">Rajshahi</SelectItem>
              <SelectItem value="sylhet">Sylhet</SelectItem>
              <SelectItem value="barisal">Barisal</SelectItem>
              <SelectItem value="rangpur">Rangpur</SelectItem>
              <SelectItem value="mymensingh">Mymensingh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range Filter */}
        <div className="space-y-2">
          <Label htmlFor="lastContact">Last Contact</Label>
          <Select>
            <SelectTrigger id="lastContact">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anytime">Anytime</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last3months">Last 3 Months</SelectItem>
              <SelectItem value="last6months">Last 6 Months</SelectItem>
              <SelectItem value="lastyear">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="advanced-filters">
          <AccordionTrigger>Advanced Filters</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Tags Filter */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 border rounded-md p-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Volunteer
                    <X className="h-3 w-3 cursor-pointer" />
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Donor
                    <X className="h-3 w-3 cursor-pointer" />
                  </Badge>
                  <Input 
                    placeholder="Add tag..." 
                    className="border-none h-7 min-w-[100px] flex-grow bg-transparent" 
                  />
                </div>
              </div>
              
              {/* Engagement Score Filter */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Engagement Score</Label>
                  <span className="text-xs text-muted-foreground">40-100</span>
                </div>
                <Slider 
                  defaultValue={[40, 100]} 
                  max={100} 
                  min={0} 
                  step={1}
                />
              </div>

              {/* Custom Fields (placeholder) */}
              <div className="space-y-2">
                <Label htmlFor="constituency">Constituency</Label>
                <Input id="constituency" placeholder="Enter constituency" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Any role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Role</SelectItem>
                    <SelectItem value="canvasser">Canvasser</SelectItem>
                    <SelectItem value="phonebanker">Phone Bank</SelectItem>
                    <SelectItem value="eventorganizer">Event Organizer</SelectItem>
                    <SelectItem value="officeholder">Office Holder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex items-center flex-wrap gap-2 pt-2">
        <p className="text-sm text-muted-foreground mr-2">Active Filters:</p>
        <Badge variant="secondary" className="flex items-center gap-1">
          Type: Member
          <X className="h-3 w-3 cursor-pointer" />
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          District: Dhaka
          <X className="h-3 w-3 cursor-pointer" />
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          Tag: Volunteer
          <X className="h-3 w-3 cursor-pointer" />
        </Badge>
      </div>
    </div>
  );
};

export default ProfileFilters;
