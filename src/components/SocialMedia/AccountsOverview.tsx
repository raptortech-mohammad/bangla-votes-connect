
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialAccount {
  id: string;
  platform: "facebook" | "instagram" | "twitter" | "linkedin";
  name: string;
  handle: string;
  followers: number;
  connected: boolean;
  lastPost?: string;
}

const AccountsOverview: React.FC = () => {
  const { toast } = useToast();
  
  const accounts: SocialAccount[] = [
    {
      id: "1",
      platform: "facebook",
      name: "BanglaVotes Official",
      handle: "banglavotes",
      followers: 12500,
      connected: true,
      lastPost: "2 hours ago"
    },
    {
      id: "2",
      platform: "instagram",
      name: "BanglaVotes",
      handle: "banglavotes",
      followers: 8200,
      connected: true,
      lastPost: "1 day ago"
    },
    {
      id: "3",
      platform: "twitter",
      name: "BanglaVotes",
      handle: "@banglavotes",
      followers: 5600,
      connected: false
    },
    {
      id: "4",
      platform: "linkedin",
      name: "BanglaVotes Political CRM",
      handle: "banglavotes-crm",
      followers: 3200,
      connected: true,
      lastPost: "3 days ago"
    }
  ];

  const handleConnect = (id: string) => {
    toast({
      title: "Connection initiated",
      description: "Please complete authentication in the popup window",
    });
  };

  const handleDisconnect = (id: string) => {
    toast({
      title: "Account disconnected",
      description: "Social media account has been disconnected"
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook className="h-5 w-5 text-[#1877F2]" />;
      case "instagram":
        return <Instagram className="h-5 w-5 text-[#E4405F]" />;
      case "twitter":
        return <Twitter className="h-5 w-5 text-[#1DA1F2]" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5 text-[#0A66C2]" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Connected Accounts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {accounts.map((account) => (
          <Card key={account.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getPlatformIcon(account.platform)}
                  <CardTitle>{account.platform.charAt(0).toUpperCase() + account.platform.slice(1)}</CardTitle>
                </div>
                <div className={`w-2 h-2 rounded-full ${account.connected ? 'bg-green-500' : 'bg-gray-300'}`} />
              </div>
              <CardDescription>{account.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Handle:</span>
                  <span className="text-sm font-medium">{account.handle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Followers:</span>
                  <span className="text-sm font-medium">{account.followers.toLocaleString()}</span>
                </div>
                {account.lastPost && (
                  <div className="flex justify-between">
                    <span className="text-sm">Last post:</span>
                    <span className="text-sm font-medium">{account.lastPost}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              {account.connected ? (
                <Button 
                  onClick={() => handleDisconnect(account.id)} 
                  variant="outline"
                  className="w-full"
                >
                  Disconnect
                </Button>
              ) : (
                <Button 
                  onClick={() => handleConnect(account.id)} 
                  className="w-full"
                >
                  Connect Account
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AccountsOverview;
