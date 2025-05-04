
import React from 'react';
import { Calendar, FileText, MoreHorizontal, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface FieldSurveyListProps {
  searchTerm: string;
}

// Mock data for field surveys
const mockSurveys = [
  {
    id: '1',
    title: 'Voter Preferences Survey',
    description: 'Survey to collect voter preferences in the upcoming election',
    type: 'Survey',
    status: 'active',
    responses: 1245,
    createdAt: '2025-04-01',
    lastUpdated: '2025-04-25',
  },
  {
    id: '2',
    title: 'Door-to-Door Canvassing Form',
    description: 'Data collection form for door-to-door canvassing operations',
    type: 'Canvassing',
    status: 'active',
    responses: 2837,
    createdAt: '2025-03-15',
    lastUpdated: '2025-04-26',
  },
  {
    id: '3',
    title: 'Community Event Registration',
    description: 'Form for registering attendees at community events',
    type: 'Event',
    status: 'active',
    responses: 589,
    createdAt: '2025-04-10',
    lastUpdated: '2025-04-24',
  },
  {
    id: '4',
    title: 'Volunteer Feedback Form',
    description: 'Collect feedback from volunteers after campaign activities',
    type: 'Survey',
    status: 'draft',
    responses: 0,
    createdAt: '2025-04-20',
    lastUpdated: '2025-04-20',
  },
  {
    id: '5',
    title: 'Issues Priority Questionnaire',
    description: 'Questionnaire on key issues that matter to voters',
    type: 'Survey',
    status: 'active',
    responses: 876,
    createdAt: '2025-03-28',
    lastUpdated: '2025-04-23',
  },
];

const FieldSurveyList: React.FC<FieldSurveyListProps> = ({ searchTerm }) => {
  // Filter surveys based on search term
  const filteredSurveys = mockSurveys.filter(survey => 
    survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    survey.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSurveys.map(survey => (
          <Card key={survey.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <Badge variant={survey.status === 'active' ? 'default' : 'outline'}>
                  {survey.status === 'active' ? 'Active' : 'Draft'}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h3 className="font-medium mt-2">{survey.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{survey.description}</p>
            </div>
            <div className="p-4 bg-slate-50">
              <div className="flex justify-between text-sm">
                <div className="flex items-center">
                  <FileText className="h-3.5 w-3.5 mr-1" />
                  <span className="text-muted-foreground">{survey.type}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  <span className="text-muted-foreground">{survey.responses} responses</span>
                </div>
              </div>
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" /> Last updated: {survey.lastUpdated}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredSurveys.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No surveys found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default FieldSurveyList;
