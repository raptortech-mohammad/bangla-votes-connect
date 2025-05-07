
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Edit, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ScheduledPost {
  id: string;
  content: string;
  image?: string;
  scheduledDate: Date;
  platforms: string[];
  status: "scheduled" | "posted" | "failed";
}

const PostScheduler: React.FC = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("12:00");
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    facebook: true,
    instagram: true,
    twitter: true,
    linkedin: false
  });

  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: "1",
      content: "Join us for our upcoming rally at Central Square! #BanglaVotes #Democracy",
      scheduledDate: new Date(2025, 4, 15, 14, 30),
      platforms: ["facebook", "instagram", "twitter"],
      status: "scheduled"
    },
    {
      id: "2",
      content: "Thank you to all our supporters who attended yesterday's community meeting!",
      image: "rally-image.jpg",
      scheduledDate: new Date(2025, 4, 10, 9, 0),
      platforms: ["facebook", "instagram"],
      status: "posted"
    },
    {
      id: "3",
      content: "Our new policy proposal on education reform is now available. Read more on our website.",
      scheduledDate: new Date(2025, 4, 20, 16, 0),
      platforms: ["twitter", "linkedin"],
      status: "scheduled"
    }
  ]);

  const handleSchedulePost = () => {
    if (!content) {
      toast({
        title: "Error",
        description: "Post content cannot be empty",
        variant: "destructive"
      });
      return;
    }

    if (!date) {
      toast({
        title: "Error",
        description: "Please select a date for your post",
        variant: "destructive"
      });
      return;
    }

    const platforms = Object.entries(selectedPlatforms)
      .filter(([_, selected]) => selected)
      .map(([platform]) => platform);

    if (platforms.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one platform",
        variant: "destructive"
      });
      return;
    }

    // Create the scheduled post
    const [hours, minutes] = time.split(":").map(Number);
    const scheduledDate = new Date(date);
    scheduledDate.setHours(hours, minutes);

    const newPost: ScheduledPost = {
      id: `${Date.now()}`,
      content,
      scheduledDate,
      platforms,
      status: "scheduled",
      ...(mediaUrl ? { image: mediaUrl } : {})
    };

    setScheduledPosts([...scheduledPosts, newPost]);
    
    // Reset form
    setContent("");
    setMediaUrl("");
    
    toast({
      title: "Post scheduled",
      description: `Your post has been scheduled for ${format(scheduledDate, "PPP")} at ${format(scheduledDate, "p")}`
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook className="h-4 w-4 text-[#1877F2]" />;
      case "instagram":
        return <Instagram className="h-4 w-4 text-[#E4405F]" />;
      case "twitter":
        return <Twitter className="h-4 w-4 text-[#1DA1F2]" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4 text-[#0A66C2]" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="relative">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea 
              placeholder="What would you like to share?" 
              className="min-h-[120px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            <Input 
              type="text" 
              placeholder="Add media URL (optional)" 
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
            />
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={selectedPlatforms.facebook} 
                  onCheckedChange={(checked) => setSelectedPlatforms({...selectedPlatforms, facebook: !!checked})}
                  id="facebook"
                />
                <label htmlFor="facebook" className="text-sm font-medium flex items-center gap-1 cursor-pointer">
                  <Facebook className="h-4 w-4 text-[#1877F2]" /> Facebook
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={selectedPlatforms.instagram} 
                  onCheckedChange={(checked) => setSelectedPlatforms({...selectedPlatforms, instagram: !!checked})}
                  id="instagram"
                />
                <label htmlFor="instagram" className="text-sm font-medium flex items-center gap-1 cursor-pointer">
                  <Instagram className="h-4 w-4 text-[#E4405F]" /> Instagram
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={selectedPlatforms.twitter} 
                  onCheckedChange={(checked) => setSelectedPlatforms({...selectedPlatforms, twitter: !!checked})}
                  id="twitter"
                />
                <label htmlFor="twitter" className="text-sm font-medium flex items-center gap-1 cursor-pointer">
                  <Twitter className="h-4 w-4 text-[#1DA1F2]" /> Twitter
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={selectedPlatforms.linkedin} 
                  onCheckedChange={(checked) => setSelectedPlatforms({...selectedPlatforms, linkedin: !!checked})}
                  id="linkedin"
                />
                <label htmlFor="linkedin" className="text-sm font-medium flex items-center gap-1 cursor-pointer">
                  <Linkedin className="h-4 w-4 text-[#0A66C2]" /> LinkedIn
                </label>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-[150px]"
                />
              </div>
              
              <Button className="ml-auto" onClick={handleSchedulePost}>
                Schedule Post
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Upcoming Posts</h3>
        
        <div className="space-y-4">
          {scheduledPosts.map((post) => (
            <Card key={post.id} className={cn(
              "border-l-4",
              post.status === "scheduled" ? "border-l-blue-500" :
              post.status === "posted" ? "border-l-green-500" : "border-l-red-500"
            )}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="mb-2">{post.content}</p>
                    {post.image && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        Media: {post.image}
                      </div>
                    )}
                    <div className="flex items-center gap-1 mt-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {format(post.scheduledDate, "PPP")} at {format(post.scheduledDate, "p")}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex gap-1 mb-2">
                      {post.platforms.map(platform => (
                        <div key={platform} className="tooltip" data-tip={platform}>
                          {getPlatformIcon(platform)}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostScheduler;
