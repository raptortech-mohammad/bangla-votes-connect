
import React from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  Tags, 
  Clock, 
  MapPin, 
  FileText, 
  PieChart, 
  Smartphone, 
  Link as LinkIcon,
  Search 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DataToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  status: "available" | "coming-soon";
  phase: number;
}

const DataToolCard: React.FC<DataToolCardProps> = ({ 
  title, 
  description, 
  icon, 
  to, 
  status,
  phase
}) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-md">
              {icon}
            </div>
            <CardTitle>{title}</CardTitle>
          </div>
          <div className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full">
            Phase {phase}
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Additional content can be added here */}
      </CardContent>
      <CardFooter>
        {status === "available" ? (
          <Button asChild className="w-full">
            <Link to={to}>Access Tool</Link>
          </Button>
        ) : (
          <Button variant="outline" disabled className="w-full">
            Coming Soon
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const DataToolsIndex = () => {
  const dataTools = [
    {
      title: "Citizen & Supporter Profiles",
      description: "Manage detailed profiles with comprehensive history and preferences tracking.",
      icon: <Users className="h-5 w-5 text-primary" />,
      to: "/data-tools/profiles",
      status: "available" as const,
      phase: 1
    },
    {
      title: "Custom Tags & Fields",
      description: "Create and manage custom fields and tags for advanced data organization.",
      icon: <Tags className="h-5 w-5 text-primary" />,
      to: "/data-tools/custom-fields",
      status: "available" as const,
      phase: 1
    },
    {
      title: "Engagement Timeline",
      description: "View and analyze historical engagement data in chronological order.",
      icon: <Clock className="h-5 w-5 text-primary" />,
      to: "/data-tools/timeline",
      status: "available" as const,
      phase: 1
    },
    {
      title: "Geospatial Mapping",
      description: "Visualize supporter data on maps with district and constituency boundaries.",
      icon: <MapPin className="h-5 w-5 text-primary" />,
      to: "/data-tools/mapping",
      status: "available" as const,
      phase: 3
    },
    {
      title: "Field Data Collection",
      description: "Collect and analyze data from canvassing and field operations.",
      icon: <FileText className="h-5 w-5 text-primary" />,
      to: "/data-tools/field-data",
      status: "available" as const,
      phase: 3
    },
    {
      title: "Segmentation & Analytics",
      description: "Create custom segments and generate insights from your data.",
      icon: <PieChart className="h-5 w-5 text-primary" />,
      to: "/data-tools/segmentation",
      status: "available" as const,
      phase: 3
    },
    {
      title: "Mobile Integration",
      description: "Connect with mobile apps for field data collection and canvassing.",
      icon: <Smartphone className="h-5 w-5 text-primary" />,
      to: "/data-tools/mobile",
      status: "coming-soon" as const,
      phase: 4
    },
    {
      title: "Third-Party Integrations",
      description: "Connect with external services for enhanced functionality.",
      icon: <LinkIcon className="h-5 w-5 text-primary" />,
      to: "/data-tools/integrations",
      status: "coming-soon" as const,
      phase: 4
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-2">Data-Driven Tools</h2>
        <p className="text-muted-foreground">
          Powerful tools for analyzing and utilizing your campaign data effectively. 
          These features are being rolled out in phases, with Phase 1 tools available now.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataTools.map((tool) => (
          <DataToolCard
            key={tool.title}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            to={tool.to}
            status={tool.status}
            phase={tool.phase}
          />
        ))}
      </div>
    </div>
  );
};

export default DataToolsIndex;
