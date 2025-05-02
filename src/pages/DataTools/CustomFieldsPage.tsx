
import React, { useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Tag, ListFilter, Database, Search, CheckCircle2, CircleSlash, Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock data for tags
const mockTags = [
  { id: "1", name: "Volunteer", category: "Involvement", count: 128, color: "bg-green-100 text-green-800" },
  { id: "2", name: "Donor", category: "Financial", count: 86, color: "bg-blue-100 text-blue-800" },
  { id: "3", name: "Event Attendee", category: "Involvement", count: 215, color: "bg-purple-100 text-purple-800" },
  { id: "4", name: "Social Media Advocate", category: "Digital", count: 54, color: "bg-orange-100 text-orange-800" },
  { id: "5", name: "Phone Bank", category: "Outreach", count: 47, color: "bg-red-100 text-red-800" },
  { id: "6", name: "First-time Voter", category: "Electoral", count: 132, color: "bg-cyan-100 text-cyan-800" }
];

// Mock data for custom fields
const mockFields = [
  { id: "1", name: "Voter ID", type: "Text", required: true, usage: 315 },
  { id: "2", name: "Preferred Language", type: "Select", required: false, usage: 289 },
  { id: "3", name: "Political Leaning", type: "Select", required: false, usage: 203 },
  { id: "4", name: "Key Issues", type: "Multi-select", required: false, usage: 178 },
  { id: "5", name: "Additional Notes", type: "Long Text", required: false, usage: 142 }
];

// Mock data for categories
const mockCategories = [
  { id: "1", name: "Involvement", count: 2 },
  { id: "2", name: "Financial", count: 1 },
  { id: "3", name: "Digital", count: 1 },
  { id: "4", name: "Outreach", count: 1 },
  { id: "5", name: "Electoral", count: 1 }
];

const CustomFieldsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState("all");
  const [fieldFilter, setFieldFilter] = useState("all");

  // Filter tags based on search and category
  const filteredTags = mockTags.filter(tag => {
    const matchesSearch = tag.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = tagFilter === "all" || tag.category === tagFilter;
    return matchesSearch && matchesCategory;
  });

  // Filter fields based on search and type
  const filteredFields = mockFields.filter(field => {
    const matchesSearch = field.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = fieldFilter === "all" || field.type === fieldFilter;
    return matchesSearch && matchesType;
  });

  return (
    <MainLayout title="Custom Tags & Fields">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Custom Data Fields</h2>
            <p className="text-muted-foreground">Customize your data structure with custom fields and tags</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Field
          </Button>
        </div>

        <Tabs defaultValue="fields" className="w-full">
          <TabsList>
            <TabsTrigger value="fields" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Custom Fields
            </TabsTrigger>
            <TabsTrigger value="tags" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <ListFilter className="h-4 w-4" />
              Categories
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="fields" className="mt-4 space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search fields..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={fieldFilter} onValueChange={setFieldFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Text">Text</SelectItem>
                  <SelectItem value="Long Text">Long Text</SelectItem>
                  <SelectItem value="Select">Select</SelectItem>
                  <SelectItem value="Multi-select">Multi-select</SelectItem>
                  <SelectItem value="Date">Date</SelectItem>
                  <SelectItem value="Number">Number</SelectItem>
                </SelectContent>
              </Select>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Field
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-3 text-left font-medium text-gray-500">Field Name</th>
                      <th className="px-6 py-3 text-left font-medium text-gray-500">Type</th>
                      <th className="px-6 py-3 text-left font-medium text-gray-500">Required</th>
                      <th className="px-6 py-3 text-left font-medium text-gray-500">Usage</th>
                      <th className="px-6 py-3 text-center font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFields.map((field) => (
                      <tr key={field.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{field.name}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline">{field.type}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          {field.required ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle2 className="h-4 w-4 mr-1" /> Yes
                            </div>
                          ) : (
                            <div className="flex items-center text-gray-400">
                              <CircleSlash className="h-4 w-4 mr-1" /> No
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">{field.usage} profiles</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tags" className="mt-4 space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search tags..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={tagFilter} onValueChange={setTagFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {mockCategories.map(category => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Tag
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTags.map((tag) => (
                <Card key={tag.id}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Badge className={`${tag.color}`}>{tag.name}</Badge>
                      <span className="text-sm text-muted-foreground">{tag.count} profiles</span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Categories</CardTitle>
                  <Button size="sm" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Category
                  </Button>
                </div>
                <CardDescription>Organize your tags into categories for better management</CardDescription>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-3 text-left font-medium text-gray-500">Category Name</th>
                      <th className="px-6 py-3 text-left font-medium text-gray-500">Tags</th>
                      <th className="px-6 py-3 text-center font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockCategories.map((category) => (
                      <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{category.name}</td>
                        <td className="px-6 py-4">{category.count} tags</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CustomFieldsPage;
