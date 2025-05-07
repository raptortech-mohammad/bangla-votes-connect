
import React, { useState } from "react";
import { 
  Smartphone, 
  Download, 
  QrCode, 
  Users, 
  Share2, 
  Check, 
  AlertCircle,
  ArrowRight,
  Settings,
  Plus,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const MobileIntegrationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showQRDialog, setShowQRDialog] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleGenerateQR = () => {
    setShowQRDialog(true);
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://bangla-votes-connect.org/mobile-app/download");
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this link with your team members",
    });
  };
  
  const handleDemoRequest = () => {
    toast({
      title: "Demo request submitted",
      description: "Our team will contact you shortly to schedule a demonstration",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold mb-2">Mobile Integration</h2>
            <p className="text-muted-foreground">
              Connect your campaign with mobile apps for field data collection and canvassing operations.
            </p>
          </div>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 w-fit">
            Coming Soon - Phase 4
          </Badge>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search mobile apps..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button onClick={handleDemoRequest} variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Request Demo
          </Button>
          <Button className="flex items-center gap-2" onClick={handleGenerateQR}>
            <QrCode className="h-4 w-4" />
            Get Mobile App
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="overview" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="bg-white rounded-lg shadow-sm"
      >
        <TabsList className="grid grid-cols-4 p-0 bg-gray-100/50 rounded-t-lg">
          <TabsTrigger value="overview" className="py-4 rounded-none rounded-tl-lg data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <Smartphone className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="canvassing" className="py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <Users className="h-4 w-4 mr-2" />
            Canvassing App
          </TabsTrigger>
          <TabsTrigger value="field" className="py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <Share2 className="h-4 w-4 mr-2" />
            Field Operations
          </TabsTrigger>
          <TabsTrigger value="settings" className="py-4 rounded-none rounded-tr-lg data-[state=active]:border-b-2 data-[state=active]:border-primary">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <div className="w-40 h-40 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Smartphone className="w-20 h-20 text-brand-red" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">BanglaVotes Mobile Suite</h3>
                  <p className="text-muted-foreground mt-2">
                    Our comprehensive mobile solution for political campaigns enables your team to collect data, 
                    manage canvassing operations, and stay connected while in the field.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary">Data Collection</Badge>
                    <Badge variant="secondary">Volunteer Management</Badge>
                    <Badge variant="secondary">Canvassing</Badge>
                    <Badge variant="secondary">Real-time Sync</Badge>
                    <Badge variant="secondary">Offline Support</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Canvassing App</CardTitle>
                    <CardDescription>Door-to-door campaigning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>Turn-by-turn navigation</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>Voter information at your fingertips</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>Offline data collection</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline" disabled>Coming Soon</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Field Operations</CardTitle>
                    <CardDescription>Event and volunteer management</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>Real-time volunteer coordination</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>Event check-ins and management</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>Task assignments and tracking</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline" disabled>Coming Soon</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mobile Integration Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                        <span>Development Status</span>
                      </div>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">In Progress</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                        <span>App Availability</span>
                      </div>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Coming Soon</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                        <span>Integration API</span>
                      </div>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">In Development</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Early Access Program</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Sign up to be among the first to try our mobile integration tools when they become available.
                  </p>
                  <Button className="w-full">Join Waiting List</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="canvassing" className="p-6">
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Canvassing Mobile App</h3>
            <p className="text-muted-foreground">
              Our mobile canvassing app helps your team efficiently collect data door-to-door, 
              with powerful features designed specifically for political campaigns.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Route Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Intelligent routing algorithms create the most efficient walking or driving paths for your canvassers.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Offline Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Continue canvassing even without internet connection. Data syncs automatically when back online.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Real-time Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Field data instantly syncs to your campaign database when connected, allowing for real-time analysis.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-10 p-6 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-4">Coming in Phase 4 Release</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-brand-red/10 p-1 rounded mr-3 mt-0.5">
                    <ArrowRight className="h-4 w-4 text-brand-red" />
                  </div>
                  <div>
                    <h5 className="font-medium">Initial Beta Release</h5>
                    <p className="text-sm text-muted-foreground">July 2025</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-brand-red/10 p-1 rounded mr-3 mt-0.5">
                    <ArrowRight className="h-4 w-4 text-brand-red" />
                  </div>
                  <div>
                    <h5 className="font-medium">Full Release with All Features</h5>
                    <p className="text-sm text-muted-foreground">September 2025</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-brand-red/10 p-1 rounded mr-3 mt-0.5">
                    <ArrowRight className="h-4 w-4 text-brand-red" />
                  </div>
                  <div>
                    <h5 className="font-medium">Advanced Analytics Integration</h5>
                    <p className="text-sm text-muted-foreground">November 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="field" className="p-6">
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Field Operations Mobile App</h3>
            <p className="text-muted-foreground">
              Manage your field operations, coordinate volunteers, and track event attendance with our dedicated mobile application.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Volunteer Management</CardTitle>
                  <CardDescription>Coordinate your volunteer team efficiently</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Real-time volunteer location tracking</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Task assignment and completion tracking</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Volunteer performance metrics</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>In-app communication and messaging</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Event Management</CardTitle>
                  <CardDescription>Streamline your campaign events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>QR code check-in for event attendees</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Real-time attendance tracking</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Post-event feedback collection</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Event schedule management</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-white p-6 border rounded-lg mt-6">
              <h4 className="font-bold mb-4">Technical Requirements</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-2">Android</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Android 8.0 (Oreo) or later</li>
                    <li>• 2GB RAM minimum</li>
                    <li>• 50MB free storage</li>
                    <li>• GPS capability</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">iOS</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• iOS 13 or later</li>
                    <li>• iPhone 6s or newer</li>
                    <li>• 50MB free storage</li>
                    <li>• Location services</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="p-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Mobile App Settings</CardTitle>
                <CardDescription>Configure how the mobile app integrates with your campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Data Synchronization</h4>
                  <p className="text-sm text-muted-foreground">
                    These settings will be available once the mobile app is released.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">User Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Control who has access to mobile applications and what permissions they have.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Notification Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Configure push notifications and alerts for mobile app users.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled>Settings Unavailable Until Release</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Integration API</CardTitle>
                <CardDescription>Access the API documentation and keys</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6">
                  <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                  <h4 className="text-lg font-medium mb-2">API Coming Soon</h4>
                  <p className="text-muted-foreground">
                    Our API documentation and integration capabilities will be available with the Phase 4 release.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline" disabled>View API Documentation</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get the Mobile App</DialogTitle>
            <DialogDescription>
              Scan this QR code or use the download link to install the mobile app when it becomes available.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6">
            <div className="bg-gray-100 w-48 h-48 rounded-lg flex items-center justify-center mb-4">
              <QrCode className="w-24 h-24 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-2">App is currently in development</p>
            <p className="text-sm font-medium">Coming in Phase 4 - Q3 2025</p>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={handleCopyLink} className="mt-3 sm:mt-0">
              Copy Download Link
            </Button>
            <Button onClick={() => setShowQRDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileIntegrationDashboard;
