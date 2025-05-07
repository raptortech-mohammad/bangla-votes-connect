
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostScheduler from "./PostScheduler";
import ContentModeration from "./ContentModeration";
import ContentTemplates from "./ContentTemplates";
import Analytics from "./Analytics";
import AccountsOverview from "./AccountsOverview";

const SocialMediaDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-2">Social Media Control Center</h2>
        <p className="text-muted-foreground">
          Manage all your social media campaigns and content across Facebook, Instagram, Twitter, and LinkedIn.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full sm:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="scheduler">Post Scheduler</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <AccountsOverview />
        </TabsContent>
        
        <TabsContent value="scheduler" className="mt-6">
          <PostScheduler />
        </TabsContent>
        
        <TabsContent value="moderation" className="mt-6">
          <ContentModeration />
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <ContentTemplates />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <Analytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialMediaDashboard;
