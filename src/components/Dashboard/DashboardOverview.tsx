
import React from "react";
import { Users, Calendar, UserCheck, Mail } from "lucide-react";
import StatCard from "../common/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      title: "New volunteer registration",
      type: "volunteer",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Campaign meeting scheduled",
      type: "campaign",
      time: "5 hours ago",
    },
    {
      id: 3,
      title: "25 new voter contacts added",
      type: "contact",
      time: "Yesterday",
    },
    {
      id: 4,
      title: "Email campaign sent to 1,230 supporters",
      type: "communication",
      time: "2 days ago",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="flex items-center border-b border-brand-gray-200 pb-3 last:border-0 last:pb-0"
            >
              <div
                className={`w-2 h-2 rounded-full mr-3 ${
                  activity.type === "volunteer"
                    ? "bg-brand-green"
                    : activity.type === "campaign"
                    ? "bg-brand-gold"
                    : activity.type === "contact"
                    ? "bg-brand-red"
                    : "bg-brand-gray-500"
                }`}
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <span className="text-xs text-brand-gray-500">
                  {activity.time}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: "Rally at Central Square",
      date: "May 10, 2025",
      location: "Dhaka Central",
    },
    {
      id: 2,
      title: "Community Meeting",
      date: "May 15, 2025",
      location: "Chittagong Hall",
    },
    {
      id: 3,
      title: "Volunteer Training",
      date: "May 20, 2025",
      location: "Party Headquarters",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event.id}
              className="border-l-2 border-brand-green pl-3 py-1"
            >
              <p className="font-medium">{event.title}</p>
              <div className="text-xs text-brand-gray-500 mt-1">
                <span>{event.date}</span>
                <span className="mx-2">•</span>
                <span>{event.location}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const CampaignProgress = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Voter Outreach</span>
              <span className="text-sm text-brand-gray-500">65%</span>
            </div>
            <div className="w-full bg-brand-gray-200 rounded-full h-2">
              <div
                className="bg-brand-green h-2 rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Donations Target</span>
              <span className="text-sm text-brand-gray-500">42%</span>
            </div>
            <div className="w-full bg-brand-gray-200 rounded-full h-2">
              <div
                className="bg-brand-gold h-2 rounded-full"
                style={{ width: "42%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Volunteer Recruitment</span>
              <span className="text-sm text-brand-gray-500">78%</span>
            </div>
            <div className="w-full bg-brand-gray-200 rounded-full h-2">
              <div
                className="bg-brand-red h-2 rounded-full"
                style={{ width: "78%" }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Contacts"
          value="12,546"
          trend={8.4}
          icon={<Users size={24} />}
        />
        <StatCard
          title="Active Campaigns"
          value="4"
          trend={0}
          icon={<Calendar size={24} />}
        />
        <StatCard
          title="Total Volunteers"
          value="237"
          trend={12.6}
          icon={<UserCheck size={24} />}
        />
        <StatCard
          title="Messages Sent"
          value="8,942"
          trend={-2.3}
          icon={<Mail size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CampaignProgress />
        </div>
        <div>
          <UpcomingEvents />
        </div>
      </div>

      <div>
        <RecentActivities />
      </div>
    </div>
  );
};

export default DashboardOverview;
