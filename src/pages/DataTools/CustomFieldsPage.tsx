
import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Tag, ListFilter, Database } from "lucide-react";

const CustomFieldsPage = () => {
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
          <TabsContent value="fields" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Custom Fields</CardTitle>
                <CardDescription>Define custom fields to capture specific information about contacts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Placeholder for custom fields implementation */}
                <div className="bg-muted p-10 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Coming soon in a future update</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tags" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tag Management</CardTitle>
                <CardDescription>Create and manage tags to label and categorize your contacts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Placeholder for tags implementation */}
                <div className="bg-muted p-10 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Coming soon in a future update</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="categories" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Organize your tags into categories for better management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Placeholder for categories implementation */}
                <div className="bg-muted p-10 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Coming soon in a future update</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CustomFieldsPage;
