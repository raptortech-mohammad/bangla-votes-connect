
import React from 'react';
import { Calendar, FileText, MoreHorizontal, Users, Edit, Copy, Share2, Trash, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface FieldSurveyListProps {
  searchTerm: string;
}

// Enhanced mock data for field surveys with more detailed information
const mockSurveys = [
  {
    id: '1',
    title: 'Voter Preferences Survey',
    description: 'Comprehensive survey to collect voter preferences on key policy issues, candidate awareness, and voting intentions for the upcoming election',
    type: 'Survey',
    status: 'active',
    responses: 1245,
    targetResponses: 3000,
    completionRate: 41.5,
    createdAt: '2025-04-01',
    lastUpdated: '2025-04-25',
    questions: 12,
    avgCompletionTime: '4:30',
    creator: 'Campaign Manager',
    tags: ['voters', 'preferences', 'election']
  },
  {
    id: '2',
    title: 'Door-to-Door Canvassing Form',
    description: 'Structured data collection form for door-to-door canvassing operations, including voter contact status, issue priorities, and follow-up preferences',
    type: 'Canvassing',
    status: 'active',
    responses: 2837,
    targetResponses: 5000,
    completionRate: 56.7,
    createdAt: '2025-03-15',
    lastUpdated: '2025-04-26',
    questions: 8,
    avgCompletionTime: '3:15',
    creator: 'Field Director',
    tags: ['canvassing', 'door-to-door', 'field']
  },
  {
    id: '3',
    title: 'Community Event Registration',
    description: 'Registration form for community events including contact information collection, event preferences, and volunteer interest identification',
    type: 'Event',
    status: 'active',
    responses: 589,
    targetResponses: 1000,
    completionRate: 58.9,
    createdAt: '2025-04-10',
    lastUpdated: '2025-04-24',
    questions: 10,
    avgCompletionTime: '2:45',
    creator: 'Event Coordinator',
    tags: ['events', 'registration', 'community']
  },
  {
    id: '4',
    title: 'Volunteer Feedback Form',
    description: 'Detailed feedback collection form from volunteers after campaign activities to improve volunteer experience and operational effectiveness',
    type: 'Survey',
    status: 'draft',
    responses: 0,
    targetResponses: 200,
    completionRate: 0,
    createdAt: '2025-04-20',
    lastUpdated: '2025-04-20',
    questions: 15,
    avgCompletionTime: '5:00',
    creator: 'Volunteer Coordinator',
    tags: ['volunteers', 'feedback', 'improvement']
  },
  {
    id: '5',
    title: 'Issues Priority Questionnaire',
    description: 'In-depth questionnaire on key issues that matter most to voters, including ranking of priorities and open-ended comment collection',
    type: 'Survey',
    status: 'active',
    responses: 876,
    targetResponses: 2500,
    completionRate: 35.0,
    createdAt: '2025-03-28',
    lastUpdated: '2025-04-23',
    questions: 18,
    avgCompletionTime: '6:10',
    creator: 'Policy Director',
    tags: ['issues', 'priorities', 'policy']
  },
];

const FieldSurveyList: React.FC<FieldSurveyListProps> = ({ searchTerm }) => {
  // Filter surveys based on search term
  const filteredSurveys = mockSurveys.filter(survey => 
    survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    survey.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    survey.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [surveyToDelete, setSurveyToDelete] = React.useState<string | null>(null);

  const handleDeleteClick = (surveyId: string) => {
    setSurveyToDelete(surveyId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (surveyToDelete) {
      // Here you would typically make an API call to delete the survey
      toast.success("Form deleted successfully", {
        description: "The form has been permanently deleted.",
      });
      setIsDeleteDialogOpen(false);
      setSurveyToDelete(null);
    }
  };
  
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
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <Edit className="h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <Copy className="h-4 w-4" /> Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <Share2 className="h-4 w-4" /> Share
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="flex items-center gap-2 cursor-pointer text-destructive"
                      onClick={() => handleDeleteClick(survey.id)}
                    >
                      <Trash className="h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h3 className="font-medium mt-2 text-lg">{survey.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{survey.description}</p>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {survey.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-slate-100">{tag}</Badge>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-b bg-slate-50">
              <div className="flex justify-between text-sm">
                <div>
                  <div className="flex items-center mb-1">
                    <FileText className="h-3.5 w-3.5 mr-1" />
                    <span className="text-muted-foreground">{survey.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3.5 w-3.5 mr-1" />
                    <span className="text-muted-foreground">{survey.responses} responses</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Completion</div>
                  <div className="text-sm text-muted-foreground">{survey.completionRate}%</div>
                </div>
              </div>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" /> Last updated: {survey.lastUpdated}
              </div>
              <Button variant="ghost" size="sm" className="text-xs h-8 flex items-center gap-1">
                View Details <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredSurveys.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No surveys found matching "{searchTerm}"</p>
        </div>
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the form
              and all of its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FieldSurveyList;
