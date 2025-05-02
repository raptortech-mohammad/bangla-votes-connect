
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Users, ChartBar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

// Dummy data for demonstration
const campaignData = [
  {
    id: 1,
    name: "Dhaka North Election Campaign",
    startDate: "2025-06-01",
    endDate: "2025-07-15",
    status: "Active",
    progress: 68,
    volunteers: 45,
    contacts: 1250,
    tasks: 24,
    completedTasks: 18,
  },
  {
    id: 2,
    name: "Youth Voter Registration Drive",
    startDate: "2025-05-15",
    endDate: "2025-06-30",
    status: "Active",
    progress: 42,
    volunteers: 32,
    contacts: 870,
    tasks: 18,
    completedTasks: 10,
  },
  {
    id: 3,
    name: "Community Outreach Program",
    startDate: "2025-04-01",
    endDate: "2025-05-30",
    status: "Active",
    progress: 85,
    volunteers: 28,
    contacts: 950,
    tasks: 30,
    completedTasks: 26,
  },
  {
    id: 4,
    name: "Rural Development Initiative",
    startDate: "2025-08-01",
    endDate: "2025-10-15",
    status: "Planned",
    progress: 0,
    volunteers: 0,
    contacts: 0,
    tasks: 15,
    completedTasks: 0,
  },
];

const CampaignCard: React.FC<{
  campaign: typeof campaignData[0];
}> = ({ campaign }) => {
  const formattedStartDate = new Date(campaign.startDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const formattedEndDate = new Date(campaign.endDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <Card>
      <CardContent className="p-6">
        <div
          className={`text-xs font-medium inline-block px-2 py-1 rounded-full mb-4 ${
            campaign.status === "Active"
              ? "bg-green-100 text-green-800"
              : campaign.status === "Completed"
              ? "bg-blue-100 text-blue-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {campaign.status}
        </div>

        <h3 className="text-lg font-bold mb-2">{campaign.name}</h3>

        <div className="flex items-center text-sm text-brand-gray-500 mb-4">
          <Calendar size={16} className="mr-2" />
          {formattedStartDate} - {formattedEndDate}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Progress</span>
            <span>{campaign.progress}%</span>
          </div>
          <Progress value={campaign.progress} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-lg font-semibold text-brand-green">
              {campaign.volunteers}
            </div>
            <div className="text-xs text-brand-gray-500">Volunteers</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-brand-red">
              {campaign.contacts}
            </div>
            <div className="text-xs text-brand-gray-500">Contacts</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-brand-gold">
              {campaign.completedTasks}/{campaign.tasks}
            </div>
            <div className="text-xs text-brand-gray-500">Tasks</div>
          </div>
        </div>

        <Link
          to={`/campaigns/${campaign.id}`}
          className="inline-flex items-center text-sm font-medium text-brand-green hover:text-brand-green/80 transition-colors"
        >
          View Details <ArrowRight size={16} className="ml-2" />
        </Link>
      </CardContent>
    </Card>
  );
};

const CampaignsList: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Campaigns</h2>
          <p className="text-brand-gray-500">
            Manage your election campaigns and outreach initiatives
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus size={16} className="mr-2" /> Create Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaignData.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default CampaignsList;
