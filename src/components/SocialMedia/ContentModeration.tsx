
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Facebook, Instagram, Twitter, Linkedin, ThumbsUp, MessageSquare, Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  platform: "facebook" | "instagram" | "twitter" | "linkedin";
  author: string;
  content: string;
  date: string;
  status: "pending" | "approved" | "hidden";
}

const ContentModeration: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("comments");
  
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      platform: "facebook",
      author: "Sarah Johnson",
      content: "When is the next rally happening? I'd love to attend!",
      date: "2 hours ago",
      status: "pending"
    },
    {
      id: "2",
      platform: "instagram",
      author: "ahmad_khalid",
      content: "Great initiative, I support this campaign! #Vote2025",
      date: "3 hours ago",
      status: "approved"
    },
    {
      id: "3",
      platform: "twitter",
      author: "@politics_watcher",
      content: "Your policy on education needs more details. Can you elaborate?",
      date: "5 hours ago",
      status: "pending"
    },
    {
      id: "4",
      platform: "facebook",
      author: "Michael Smith",
      content: "This is spam and should be removed! Click here to win prizes!",
      date: "1 day ago",
      status: "pending"
    },
    {
      id: "5",
      platform: "linkedin",
      author: "Priya Sharma",
      content: "I'd be interested in volunteering for your campaign. How can I help?",
      date: "2 days ago",
      status: "approved"
    }
  ]);

  const handleApprove = (id: string) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, status: "approved" } : comment
    ));
    
    toast({
      title: "Comment approved",
      description: "The comment is now visible to the public"
    });
  };

  const handleHide = (id: string) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, status: "hidden" } : comment
    ));
    
    toast({
      title: "Comment hidden",
      description: "The comment has been hidden from public view"
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
      <Card>
        <CardHeader>
          <CardTitle>Content Moderation</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="comments" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" /> 
                Comments 
                <Badge className="ml-2 bg-primary">{comments.filter(c => c.status === "pending").length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="mentions">
                <span className="flex items-center">
                  <Flag className="mr-2 h-4 w-4" /> Mentions
                </span>
              </TabsTrigger>
              <TabsTrigger value="messages">
                <span className="flex items-center">
                  <ThumbsUp className="mr-2 h-4 w-4" /> Engagement
                </span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="comments" className="mt-6">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            {getPlatformIcon(comment.platform)}
                            <span className="ml-2 font-medium">{comment.author}</span>
                            <span className="ml-2 text-xs text-muted-foreground">{comment.date}</span>
                            {comment.status === "approved" && (
                              <Badge variant="outline" className="ml-2 text-green-500 border-green-500">Approved</Badge>
                            )}
                            {comment.status === "hidden" && (
                              <Badge variant="outline" className="ml-2 text-red-500 border-red-500">Hidden</Badge>
                            )}
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                        
                        {comment.status === "pending" && (
                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm" onClick={() => handleApprove(comment.id)}>
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleHide(comment.id)}>
                              Hide
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="mentions" className="mt-6">
              <div className="p-6 text-center border rounded-lg">
                <p className="text-gray-500">No pending mentions to moderate</p>
              </div>
            </TabsContent>
            
            <TabsContent value="messages" className="mt-6">
              <div className="p-6 text-center border rounded-lg">
                <p className="text-gray-500">No pending engagement to review</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentModeration;
