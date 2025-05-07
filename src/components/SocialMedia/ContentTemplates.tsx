
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Linkedin, Twitter, ClipboardList, FileType } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface ContentTemplate {
  id: string;
  name: string;
  content: string;
  platforms: string[];
  category: string;
}

const ContentTemplates: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("templates");
  
  const [templates, setTemplates] = useState<ContentTemplate[]>([
    {
      id: "1",
      name: "Campaign Announcement",
      content: "We're excited to announce our new campaign focusing on [ISSUE]. Join us in creating a better future for all! #BanglaVotes #Campaign",
      platforms: ["facebook", "twitter", "instagram", "linkedin"],
      category: "announcements"
    },
    {
      id: "2",
      name: "Event Invitation",
      content: "Join us on [DATE] at [LOCATION] for our upcoming [EVENT TYPE]. We'll be discussing [TOPIC] and would love to have you there! #BanglaVotes",
      platforms: ["facebook", "instagram"],
      category: "events"
    },
    {
      id: "3",
      name: "Policy Update",
      content: "Our stance on [POLICY AREA]: We believe in [POSITION]. Here's how we plan to implement these ideas when elected. Read more at our website. #BanglaVotes #Policy",
      platforms: ["twitter", "linkedin"],
      category: "policy"
    }
  ]);
  
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    content: "",
    platforms: {
      facebook: true,
      instagram: true,
      twitter: true, 
      linkedin: true
    },
    category: "general"
  });

  const handleSaveTemplate = () => {
    if (!newTemplate.name || !newTemplate.content) {
      toast({
        title: "Error",
        description: "Template name and content are required",
        variant: "destructive"
      });
      return;
    }

    const platforms = Object.entries(newTemplate.platforms)
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

    const template: ContentTemplate = {
      id: `${Date.now()}`,
      name: newTemplate.name,
      content: newTemplate.content,
      platforms,
      category: newTemplate.category
    };

    setTemplates([...templates, template]);
    
    // Reset form
    setNewTemplate({
      name: "",
      content: "",
      platforms: {
        facebook: true,
        instagram: true,
        twitter: true, 
        linkedin: true
      },
      category: "general"
    });
    
    toast({
      title: "Template saved",
      description: "Your content template has been saved successfully"
    });
  };

  const handleUseTemplate = (template: ContentTemplate) => {
    // Copy to clipboard
    navigator.clipboard.writeText(template.content);
    
    toast({
      title: "Template copied",
      description: "Content template has been copied to clipboard"
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
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="templates">
            <ClipboardList className="mr-2 h-4 w-4" /> Your Templates
          </TabsTrigger>
          <TabsTrigger value="create">
            <FileType className="mr-2 h-4 w-4" /> Create Template
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>Category: {template.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm border p-3 rounded-md bg-gray-50">{template.content}</p>
                  <div className="flex mt-4">
                    {template.platforms.map(platform => (
                      <div key={platform} className="mr-2">
                        {getPlatformIcon(platform)}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleUseTemplate(template)}>
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="create" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Template</CardTitle>
              <CardDescription>Design a reusable template for your social media posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="template-name" className="block text-sm font-medium mb-1">Template Name</label>
                  <Input
                    id="template-name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                    placeholder="E.g., Event Announcement"
                  />
                </div>
                
                <div>
                  <label htmlFor="template-content" className="block text-sm font-medium mb-1">Content Template</label>
                  <Textarea
                    id="template-content"
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                    placeholder="Type your template content here. Use [PLACEHOLDERS] for variable content."
                    className="min-h-[120px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use placeholders like [DATE], [LOCATION], etc. for content that will change each time.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Platforms</label>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant={newTemplate.platforms.facebook ? "default" : "outline"}
                      className="flex items-center"
                      onClick={() => setNewTemplate({
                        ...newTemplate, 
                        platforms: {
                          ...newTemplate.platforms, 
                          facebook: !newTemplate.platforms.facebook
                        }
                      })}
                    >
                      <Facebook className="h-4 w-4 mr-2" /> Facebook
                    </Button>
                    
                    <Button
                      variant={newTemplate.platforms.instagram ? "default" : "outline"}
                      className="flex items-center"
                      onClick={() => setNewTemplate({
                        ...newTemplate, 
                        platforms: {
                          ...newTemplate.platforms, 
                          instagram: !newTemplate.platforms.instagram
                        }
                      })}
                    >
                      <Instagram className="h-4 w-4 mr-2" /> Instagram
                    </Button>
                    
                    <Button
                      variant={newTemplate.platforms.twitter ? "default" : "outline"}
                      className="flex items-center"
                      onClick={() => setNewTemplate({
                        ...newTemplate, 
                        platforms: {
                          ...newTemplate.platforms, 
                          twitter: !newTemplate.platforms.twitter
                        }
                      })}
                    >
                      <Twitter className="h-4 w-4 mr-2" /> Twitter
                    </Button>
                    
                    <Button
                      variant={newTemplate.platforms.linkedin ? "default" : "outline"}
                      className="flex items-center"
                      onClick={() => setNewTemplate({
                        ...newTemplate, 
                        platforms: {
                          ...newTemplate.platforms, 
                          linkedin: !newTemplate.platforms.linkedin
                        }
                      })}
                    >
                      <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="template-category" className="block text-sm font-medium mb-1">Category</label>
                  <select
                    id="template-category"
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="general">General</option>
                    <option value="announcements">Announcements</option>
                    <option value="events">Events</option>
                    <option value="policy">Policy</option>
                    <option value="outreach">Voter Outreach</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSaveTemplate}>
                Save Template
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentTemplates;
