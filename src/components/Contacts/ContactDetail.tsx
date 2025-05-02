
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, MapPin, Edit, MessageSquare, Plus } from "lucide-react";
import { useParams } from "react-router-dom";

// Dummy data for demonstration
const contactDetails = {
  id: 1,
  name: "Rahima Begum",
  email: "rahima@example.com",
  phone: "+880 1700-000001",
  address: "123 Main Street, Dhaka, Bangladesh",
  supportLevel: "High",
  tags: ["Volunteer", "Donor", "Activist"],
  notes: [
    {
      id: 1,
      date: "2025-04-15",
      content: "Met during the community rally. Very supportive of our policies.",
    },
    {
      id: 2,
      date: "2025-03-22",
      content: "Donated 5000 BDT to the campaign fund.",
    },
  ],
  activities: [
    {
      id: 1,
      type: "Call",
      date: "2025-04-20",
      details: "Discussed the upcoming rally and confirmed attendance.",
    },
    {
      id: 2,
      type: "Email",
      date: "2025-04-10",
      details: "Sent monthly newsletter.",
    },
    {
      id: 3,
      type: "Meeting",
      date: "2025-03-25",
      details: "Met at campaign headquarters to discuss volunteer opportunities.",
    },
  ],
};

const ContactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you would fetch the contact data based on the ID
  // For this demo, we're using the dummy data

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-brand-gray-200 flex items-center justify-center mr-4">
                <User size={32} className="text-brand-gray-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-brand-gray-800">
                  {contactDetails.name}
                </h2>
                <div className="flex flex-wrap gap-2 mt-1">
                  {contactDetails.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-full bg-brand-gray-200 text-xs font-medium text-brand-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex mt-4 md:mt-0 space-x-2">
              <Button variant="outline" size="sm">
                <Phone size={16} className="mr-2" /> Call
              </Button>
              <Button variant="outline" size="sm">
                <Mail size={16} className="mr-2" /> Email
              </Button>
              <Button variant="default" size="sm">
                <Edit size={16} className="mr-2" /> Edit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-brand-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-brand-gray-500">Email</p>
                  <p className="text-brand-gray-800">{contactDetails.email}</p>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-brand-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-brand-gray-500">Phone</p>
                  <p className="text-brand-gray-800">{contactDetails.phone}</p>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-brand-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-brand-gray-500">Address</p>
                  <p className="text-brand-gray-800">{contactDetails.address}</p>
                </div>
              </li>
              <li className="pt-2 border-t border-brand-gray-200">
                <p className="text-sm font-medium text-brand-gray-500">Support Level</p>
                <div className="mt-1">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      contactDetails.supportLevel === "High"
                        ? "bg-green-100 text-green-800"
                        : contactDetails.supportLevel === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {contactDetails.supportLevel}
                  </span>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <Tabs defaultValue="activities">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle>History</CardTitle>
                <TabsList>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="activities" className="mt-0">
                <ul className="space-y-4">
                  {contactDetails.activities.map((activity) => (
                    <li
                      key={activity.id}
                      className="border-l-2 pl-4 pb-4 border-brand-green relative before:absolute before:w-3 before:h-3 before:bg-brand-green before:rounded-full before:-left-[6.5px]"
                    >
                      <p className="font-medium">{activity.type}</p>
                      <p className="text-sm text-brand-gray-600 mt-1">
                        {activity.details}
                      </p>
                      <p className="text-xs text-brand-gray-500 mt-1">
                        {new Date(activity.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="mt-4 w-full">
                  <Plus size={16} className="mr-2" /> Add Activity
                </Button>
              </TabsContent>
              <TabsContent value="notes" className="mt-0">
                <ul className="space-y-4">
                  {contactDetails.notes.map((note) => (
                    <li
                      key={note.id}
                      className="border p-4 rounded-md bg-brand-gray-50"
                    >
                      <div className="flex items-start">
                        <MessageSquare className="w-5 h-5 text-brand-gray-500 mr-3" />
                        <div className="flex-1">
                          <p className="text-sm text-brand-gray-800">
                            {note.content}
                          </p>
                          <p className="text-xs text-brand-gray-500 mt-2">
                            {new Date(note.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="mt-4 w-full">
                  <Plus size={16} className="mr-2" /> Add Note
                </Button>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ContactDetail;
