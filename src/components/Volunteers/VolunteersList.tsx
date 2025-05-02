
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Filter,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dummy data for demonstration
const volunteersData = [
  {
    id: 1,
    name: "Nasir Ahmed",
    email: "nasir@example.com",
    phone: "+880 1700-000011",
    skills: ["Canvassing", "Event Planning"],
    availability: "Evenings, Weekends",
    hoursContributed: 45,
    status: "Active",
  },
  {
    id: 2,
    name: "Fatima Khan",
    email: "fatima@example.com",
    phone: "+880 1700-000012",
    skills: ["Social Media", "Content Writing"],
    availability: "Weekends",
    hoursContributed: 32,
    status: "Active",
  },
  {
    id: 3,
    name: "Kamal Hossain",
    email: "kamal@example.com",
    phone: "+880 1700-000013",
    skills: ["Phone Banking", "Data Entry"],
    availability: "Flexible",
    hoursContributed: 28,
    status: "Active",
  },
  {
    id: 4,
    name: "Ayesha Begum",
    email: "ayesha@example.com",
    phone: "+880 1700-000014",
    skills: ["Event Planning", "Fundraising"],
    availability: "Weekdays",
    hoursContributed: 52,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Zahir Rahman",
    email: "zahir@example.com",
    phone: "+880 1700-000015",
    skills: ["Graphic Design", "Video Editing"],
    availability: "Weekends",
    hoursContributed: 18,
    status: "Active",
  },
];

// Dummy data for upcoming volunteer events
const upcomingEvents = [
  {
    id: 1,
    title: "Door-to-Door Canvassing",
    date: "May 15, 2025",
    time: "9:00 AM - 1:00 PM",
    location: "Mirpur Area, Dhaka",
    volunteers: 12,
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Phone Banking Session",
    date: "May 18, 2025",
    time: "5:00 PM - 8:00 PM",
    location: "Party Headquarters",
    volunteers: 8,
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Community Rally Support",
    date: "May 22, 2025",
    time: "4:00 PM - 7:00 PM",
    location: "Central Square, Dhaka",
    volunteers: 25,
    status: "Upcoming",
  },
];

const VolunteersList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedVolunteers, setDisplayedVolunteers] = useState(volunteersData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setDisplayedVolunteers(volunteersData);
    } else {
      const filtered = volunteersData.filter(
        (volunteer) =>
          volunteer.name.toLowerCase().includes(value.toLowerCase()) ||
          volunteer.email.toLowerCase().includes(value.toLowerCase()) ||
          volunteer.skills.some((skill) =>
            skill.toLowerCase().includes(value.toLowerCase())
          )
      );
      setDisplayedVolunteers(filtered);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Volunteers</h2>
          <p className="text-brand-gray-500">
            Manage your volunteer team and activities
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus size={16} className="mr-2" /> Add Volunteer
        </Button>
      </div>

      <Tabs defaultValue="volunteers">
        <TabsList className="mb-4">
          <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="volunteers" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-500 h-4 w-4" />
                  <Input
                    placeholder="Search volunteers..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <Button variant="outline" className="sm:w-auto w-full">
                  <Filter size={16} className="mr-2" /> Filter
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-brand-gray-200">
                      <th className="text-left py-3 px-4 text-brand-gray-500 font-medium text-sm">
                        Volunteer
                      </th>
                      <th className="text-left py-3 px-4 text-brand-gray-500 font-medium text-sm">
                        Contact Info
                      </th>
                      <th className="text-left py-3 px-4 text-brand-gray-500 font-medium text-sm">
                        Skills
                      </th>
                      <th className="text-left py-3 px-4 text-brand-gray-500 font-medium text-sm">
                        Availability
                      </th>
                      <th className="text-left py-3 px-4 text-brand-gray-500 font-medium text-sm">
                        Hours
                      </th>
                      <th className="text-left py-3 px-4 text-brand-gray-500 font-medium text-sm">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedVolunteers.map((volunteer) => (
                      <tr
                        key={volunteer.id}
                        className="border-b border-brand-gray-200 hover:bg-brand-gray-100 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-brand-gray-200 flex items-center justify-center mr-3">
                              <User
                                size={16}
                                className="text-brand-gray-500"
                              />
                            </div>
                            <span className="font-medium text-brand-gray-800">
                              {volunteer.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col">
                            <div className="flex items-center text-sm text-brand-gray-600 mb-1">
                              <Mail size={14} className="mr-1" />
                              {volunteer.email}
                            </div>
                            <div className="flex items-center text-sm text-brand-gray-600">
                              <Phone size={14} className="mr-1" />
                              {volunteer.phone}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {volunteer.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-brand-gray-200 text-brand-gray-700 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-brand-gray-600">
                            {volunteer.availability}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm font-medium">
                            {volunteer.hoursContributed} hrs
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              volunteer.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {volunteer.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <div
                    className={`text-xs font-medium inline-block px-2 py-1 rounded-full mb-4 ${
                      event.status === "Upcoming"
                        ? "bg-blue-100 text-blue-800"
                        : event.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {event.status}
                  </div>

                  <h3 className="text-lg font-bold mb-3">{event.title}</h3>

                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <Calendar
                        size={16}
                        className="mr-2 text-brand-gray-500 mt-1"
                      />
                      <span className="text-sm">{event.date}</span>
                    </li>
                    <li className="flex items-start">
                      <Clock
                        size={16}
                        className="mr-2 text-brand-gray-500 mt-1"
                      />
                      <span className="text-sm">{event.time}</span>
                    </li>
                    <li className="flex items-start">
                      <MapPin
                        size={16}
                        className="mr-2 text-brand-gray-500 mt-1"
                      />
                      <span className="text-sm">{event.location}</span>
                    </li>
                    <li className="flex items-start">
                      <Users
                        size={16}
                        className="mr-2 text-brand-gray-500 mt-1"
                      />
                      <span className="text-sm">
                        {event.volunteers} volunteers assigned
                      </span>
                    </li>
                  </ul>

                  <div className="flex space-x-2">
                    <Button size="sm">View Details</Button>
                    <Button size="sm" variant="outline">
                      Assign Volunteers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button>
              <Plus size={16} className="mr-2" /> Create Event
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VolunteersList;
