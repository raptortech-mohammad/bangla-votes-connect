
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dummy data for demonstration
const voterReachData = [
  { name: "Dhaka North", value: 4200 },
  { name: "Dhaka South", value: 3800 },
  { name: "Chittagong", value: 2900 },
  { name: "Rajshahi", value: 2100 },
  { name: "Khulna", value: 1800 },
  { name: "Sylhet", value: 1400 },
];

const supportLevelData = [
  { name: "Strong Support", value: 45 },
  { name: "Leaning Support", value: 25 },
  { name: "Undecided", value: 15 },
  { name: "Leaning Against", value: 10 },
  { name: "Strong Against", value: 5 },
];

const volunteersActivityData = [
  {
    month: "Jan",
    canvassing: 65,
    phoneBank: 45,
    eventSupport: 30,
  },
  {
    month: "Feb",
    canvassing: 80,
    phoneBank: 35,
    eventSupport: 50,
  },
  {
    month: "Mar",
    canvassing: 90,
    phoneBank: 60,
    eventSupport: 45,
  },
  {
    month: "Apr",
    canvassing: 70,
    phoneBank: 75,
    eventSupport: 55,
  },
  {
    month: "May",
    canvassing: 110,
    phoneBank: 80,
    eventSupport: 65,
  },
];

const ageDemographicData = [
  { name: "18-25", value: 22 },
  { name: "26-35", value: 28 },
  { name: "36-45", value: 24 },
  { name: "46-55", value: 16 },
  { name: "56+", value: 10 },
];

// Colors for pie charts
const COLORS = ["#0D8A4F", "#F42A41", "#FFD700", "#4A5568", "#A0AEC0"];

const recentReports = [
  {
    id: 1,
    title: "May 2025 Campaign Progress Report",
    date: "May 1, 2025",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Q1 2025 Voter Engagement Analysis",
    date: "Apr 15, 2025",
    size: "3.8 MB",
  },
  {
    id: 3,
    title: "Volunteer Performance Report",
    date: "Mar 30, 2025",
    size: "1.2 MB",
  },
];

const BasicAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Analytics</h2>
          <p className="text-brand-gray-500">
            Campaign insights and performance metrics
          </p>
        </div>
        <Button>
          <Download size={16} className="mr-2" /> Export Data
        </Button>
      </div>

      <Tabs defaultValue="voter-data">
        <TabsList className="mb-4">
          <TabsTrigger value="voter-data">Voter Data</TabsTrigger>
          <TabsTrigger value="campaign-metrics">Campaign Metrics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="voter-data" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Voter Reach by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={voterReachData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="value"
                        name="Voters Reached"
                        fill="#0D8A4F"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Support Level Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={supportLevelData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({
                          name,
                          percent,
                        }: {
                          name: string;
                          percent: number;
                        }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {supportLevelData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Age Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ageDemographicData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({
                          name,
                          percent,
                        }: {
                          name: string;
                          percent: number;
                        }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {ageDemographicData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Voter Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">
                        Economic Development
                      </span>
                      <span className="text-sm font-medium">82%</span>
                    </div>
                    <div className="h-2 bg-brand-gray-200 rounded-full">
                      <div
                        className="h-2 bg-brand-green rounded-full"
                        style={{ width: "82%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">
                        Education Reform
                      </span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="h-2 bg-brand-gray-200 rounded-full">
                      <div
                        className="h-2 bg-brand-green rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">
                        Healthcare Access
                      </span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <div className="h-2 bg-brand-gray-200 rounded-full">
                      <div
                        className="h-2 bg-brand-green rounded-full"
                        style={{ width: "68%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">
                        Infrastructure Development
                      </span>
                      <span className="text-sm font-medium">62%</span>
                    </div>
                    <div className="h-2 bg-brand-gray-200 rounded-full">
                      <div
                        className="h-2 bg-brand-green rounded-full"
                        style={{ width: "62%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Climate Action</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="h-2 bg-brand-gray-200 rounded-full">
                      <div
                        className="h-2 bg-brand-green rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaign-metrics" className="mt-0">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Volunteer Activities (Hours)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volunteersActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="canvassing"
                      name="Canvassing"
                      fill="#0D8A4F"
                    />
                    <Bar
                      dataKey="phoneBank"
                      name="Phone Banking"
                      fill="#F42A41"
                    />
                    <Bar
                      dataKey="eventSupport"
                      name="Event Support"
                      fill="#FFD700"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Effectiveness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Social Media Campaign</span>
                      <span className="text-sm font-semibold text-brand-green">
                        92%
                      </span>
                    </div>
                    <div className="h-2 bg-brand-gray-200 rounded-full">
                      <div
                        className="h-2 bg-brand-green rounded-full"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-brand-gray-500">
                      <span>40,200 reached</span>
                      <span>5,280 engagements</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Door-to-Door</span>
                      <span className="text-sm font-semibold text-brand-green">
                        78%
                      </span>
                    </div>
                    <div className="h-2 bg-brand-gray-200 rounded-full">
                      <div
                        className="h-2 bg-brand-green rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-brand-gray-500">
                      <span>2,450 households</span>
                      <span>1,890 responses</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Phone Banking</span>
                      <span className="text-sm font-semibold text-brand-green">
                        65%
                      </span>
                    </div>
                    <div className="h-2 bg-brand-gray-200 rounded-full">
                      <div
                        className="h-2 bg-brand-green rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-brand-gray-500">
                      <span>3,780 calls</span>
                      <span>2,450 responses</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Email Campaign</span>
                      <span className="text-sm font-semibold text-brand-green">
                        42%
                      </span>
                    </div>
                    <div className="h-2 bg-brand-gray-200 rounded-full">
                      <div
                        className="h-2 bg-brand-green rounded-full"
                        style={{ width: "42%" }}
                      ></div>
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-brand-gray-500">
                      <span>15,200 sent</span>
                      <span>6,384 opened</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Field Operations", value: 35 },
                          { name: "Media & Advertising", value: 25 },
                          { name: "Events", value: 20 },
                          { name: "Staff", value: 15 },
                          { name: "Miscellaneous", value: 5 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({
                          name,
                          percent,
                        }: {
                          name: string;
                          percent: number;
                        }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {supportLevelData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {recentReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="p-2 bg-brand-gray-100 rounded-md mr-4">
                      <FileText className="h-6 w-6 text-brand-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{report.title}</h3>
                      <div className="flex items-center text-xs text-brand-gray-500">
                        <span>{report.date}</span>
                        <span className="mx-2">•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button size="sm" variant="outline">
                      <Download size={14} className="mr-2" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Generate Custom Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-brand-gray-500 mb-4">
                    Create a custom report by selecting the data points and date
                    range you want to analyze.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Data Points</label>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="voter-data"
                            className="mr-2"
                            defaultChecked
                          />
                          <label
                            htmlFor="voter-data"
                            className="text-sm cursor-pointer"
                          >
                            Voter Data
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="volunteer-performance"
                            className="mr-2"
                            defaultChecked
                          />
                          <label
                            htmlFor="volunteer-performance"
                            className="text-sm cursor-pointer"
                          >
                            Volunteer Performance
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="campaign-metrics"
                            className="mr-2"
                            defaultChecked
                          />
                          <label
                            htmlFor="campaign-metrics"
                            className="text-sm cursor-pointer"
                          >
                            Campaign Metrics
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="resource-allocation"
                            className="mr-2"
                          />
                          <label
                            htmlFor="resource-allocation"
                            className="text-sm cursor-pointer"
                          >
                            Resource Allocation
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date Range</label>
                      <div className="space-y-2">
                        <div>
                          <label className="text-xs text-brand-gray-500 mb-1 block">
                            Start Date
                          </label>
                          <input
                            type="date"
                            className="w-full rounded-md border border-brand-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-brand-gray-500 mb-1 block">
                            End Date
                          </label>
                          <input
                            type="date"
                            className="w-full rounded-md border border-brand-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Format</label>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="pdf-format"
                            name="format"
                            className="mr-2"
                            defaultChecked
                          />
                          <label
                            htmlFor="pdf-format"
                            className="text-sm cursor-pointer"
                          >
                            PDF
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="excel-format"
                            name="format"
                            className="mr-2"
                          />
                          <label
                            htmlFor="excel-format"
                            className="text-sm cursor-pointer"
                          >
                            Excel
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="csv-format"
                            name="format"
                            className="mr-2"
                          />
                          <label
                            htmlFor="csv-format"
                            className="text-sm cursor-pointer"
                          >
                            CSV
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Generate Report</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BasicAnalytics;
