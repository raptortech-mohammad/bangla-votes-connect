
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  Filter,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

// Dummy data for demonstration
const dummyContacts = [
  {
    id: 1,
    name: "Rahima Begum",
    email: "rahima@example.com",
    phone: "+880 1700-000001",
    address: "Dhaka, Bangladesh",
    supportLevel: "High",
  },
  {
    id: 2,
    name: "Abdul Karim",
    email: "abdul@example.com",
    phone: "+880 1700-000002",
    address: "Chittagong, Bangladesh",
    supportLevel: "Medium",
  },
  {
    id: 3,
    name: "Fatima Ahmed",
    email: "fatima@example.com",
    phone: "+880 1700-000003",
    address: "Sylhet, Bangladesh",
    supportLevel: "High",
  },
  {
    id: 4,
    name: "Mohammad Ali",
    email: "mohammad@example.com",
    phone: "+880 1700-000004",
    address: "Rajshahi, Bangladesh",
    supportLevel: "Low",
  },
  {
    id: 5,
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    phone: "+880 1700-000005",
    address: "Khulna, Bangladesh",
    supportLevel: "Medium",
  },
];

const ContactsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedContacts, setDisplayedContacts] = useState(dummyContacts);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setDisplayedContacts(dummyContacts);
    } else {
      const filtered = dummyContacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(value.toLowerCase()) ||
          contact.email.toLowerCase().includes(value.toLowerCase())
      );
      setDisplayedContacts(filtered);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2">
        <CardTitle>Contacts</CardTitle>
        <Button className="mt-2 sm:mt-0">
          <Plus size={16} className="mr-1" /> Add Contact
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-500 h-4 w-4" />
            <Input
              placeholder="Search contacts..."
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
                  Name
                </th>
                <th className="text-left py-3 px-4 text-brand-gray-500 font-medium text-sm">
                  Contact Info
                </th>
                <th className="text-left py-3 px-4 text-brand-gray-500 font-medium text-sm">
                  Address
                </th>
                <th className="text-left py-3 px-4 text-brand-gray-500 font-medium text-sm">
                  Support Level
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedContacts.length > 0 ? (
                displayedContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="border-b border-brand-gray-200 hover:bg-brand-gray-100 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <Link
                        to={`/contacts/${contact.id}`}
                        className="flex items-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-brand-gray-200 flex items-center justify-center mr-3">
                          <User size={16} className="text-brand-gray-500" />
                        </div>
                        <span className="font-medium text-brand-gray-800">
                          {contact.name}
                        </span>
                      </Link>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm text-brand-gray-600 mb-1">
                          <Mail size={14} className="mr-1" />
                          {contact.email}
                        </div>
                        <div className="flex items-center text-sm text-brand-gray-600">
                          <Phone size={14} className="mr-1" />
                          {contact.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-sm text-brand-gray-600">
                        <MapPin size={14} className="mr-1" />
                        {contact.address}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          contact.supportLevel === "High"
                            ? "bg-green-100 text-green-800"
                            : contact.supportLevel === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {contact.supportLevel}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 px-4 text-center">
                    <p className="text-brand-gray-500">No contacts found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactsList;
