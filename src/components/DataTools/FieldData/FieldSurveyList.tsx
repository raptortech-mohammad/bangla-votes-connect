
import React from 'react';
import { Calendar, FileText, MoreHorizontal, Users, Edit, Copy, Share2, Trash, ExternalLink, CheckCircle, HelpCircle, BarChart4, ChevronRight, Tag } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

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
    tags: ['voters', 'preferences', 'election'],
    responseDetails: [
      { date: '2025-04-25', count: 120 },
      { date: '2025-04-24', count: 115 },
      { date: '2025-04-23', count: 95 },
      { date: '2025-04-22', count: 110 },
      { date: '2025-04-21', count: 88 },
    ],
    topQuestions: [
      { question: 'Which policy issue matters most to you?', responseRate: 98 },
      { question: 'How likely are you to vote in the upcoming election?', responseRate: 100 },
      { question: "Are you familiar with our candidate's platform?", responseRate: 95 },
    ],
    demographicData: {
      ageGroups: [
        { group: '18-24', percentage: 15 },
        { group: '25-34', percentage: 25 },
        { group: '35-44', percentage: 22 },
        { group: '45-54', percentage: 18 },
        { group: '55+', percentage: 20 },
      ],
      locations: [
        { area: 'Urban', percentage: 55 },
        { area: 'Suburban', percentage: 35 },
        { area: 'Rural', percentage: 10 },
      ]
    }
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
    tags: ['canvassing', 'door-to-door', 'field'],
    responseDetails: [
      { date: '2025-04-26', count: 215 },
      { date: '2025-04-25', count: 198 },
      { date: '2025-04-24', count: 205 },
      { date: '2025-04-23', count: 187 },
      { date: '2025-04-22', count: 210 },
    ],
    canvassingData: {
      contactRates: [
        { status: 'Contacted', count: 1845 },
        { status: 'Not Home', count: 760 },
        { status: 'Refused', count: 232 }
      ],
      supportLevel: [
        { level: 'Strong Support', percentage: 35 },
        { level: 'Leaning Support', percentage: 22 },
        { level: 'Undecided', percentage: 18 },
        { level: 'Leaning Against', percentage: 14 },
        { level: 'Strong Against', percentage: 11 }
      ],
      volunteers: {
        total: 45,
        activeToday: 28,
        averageDoors: 32
      }
    }
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
    tags: ['events', 'registration', 'community'],
    responseDetails: [
      { date: '2025-04-24', count: 45 },
      { date: '2025-04-23', count: 52 },
      { date: '2025-04-22', count: 38 },
      { date: '2025-04-21', count: 41 },
      { date: '2025-04-20', count: 39 },
    ],
    eventDetails: {
      upcomingEvents: [
        { name: 'Community Town Hall', date: '2025-05-15', registrations: 128 },
        { name: 'Policy Discussion Panel', date: '2025-05-28', registrations: 95 },
        { name: 'Campaign Rally', date: '2025-06-10', registrations: 210 }
      ],
      volunteerSignups: 157,
      topInterests: [
        { interest: 'Speaking with candidate', percentage: 45 },
        { interest: 'Policy information', percentage: 28 },
        { interest: 'Volunteer opportunities', percentage: 18 },
        { interest: 'Donations', percentage: 9 }
      ]
    }
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
  const [detailsDialogOpen, setDetailsDialogOpen] = React.useState(false);
  const [selectedSurvey, setSelectedSurvey] = React.useState<typeof mockSurveys[0] | null>(null);

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

  const handleViewDetails = (survey: typeof mockSurveys[0]) => {
    setSelectedSurvey(survey);
    setDetailsDialogOpen(true);
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
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs h-8 flex items-center gap-1"
                onClick={() => handleViewDetails(survey)}
              >
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

      {/* Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedSurvey && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-2xl">{selectedSurvey.title}</DialogTitle>
                    <DialogDescription className="mt-2">
                      {selectedSurvey.description}
                    </DialogDescription>
                  </div>
                  <Badge variant={selectedSurvey.status === 'active' ? 'default' : 'outline'} className="ml-2">
                    {selectedSurvey.status === 'active' ? 'Active' : 'Draft'}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedSurvey.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="flex items-center">
                      <Tag className="h-3 w-3 mr-1" /> {tag}
                    </Badge>
                  ))}
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Key metrics section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-md">
                    <div className="text-sm text-muted-foreground">Responses</div>
                    <div className="text-2xl font-bold mt-1">{selectedSurvey.responses}</div>
                    <div className="text-xs text-muted-foreground">Target: {selectedSurvey.targetResponses}</div>
                    <Progress value={selectedSurvey.completionRate} className="h-1.5 mt-2" />
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-md">
                    <div className="text-sm text-muted-foreground">Questions</div>
                    <div className="text-2xl font-bold mt-1">{selectedSurvey.questions}</div>
                    <div className="text-xs text-muted-foreground">Avg. completion time: {selectedSurvey.avgCompletionTime}</div>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-md">
                    <div className="text-sm text-muted-foreground">Created</div>
                    <div className="text-2xl font-bold mt-1">{selectedSurvey.createdAt}</div>
                    <div className="text-xs text-muted-foreground">By: {selectedSurvey.creator}</div>
                  </div>
                </div>

                {/* Recent responses */}
                <div className="border rounded-md">
                  <div className="bg-slate-50 p-4 border-b">
                    <h3 className="font-medium">Recent Responses</h3>
                  </div>
                  <div className="p-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Responses</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedSurvey.responseDetails?.map((response, index) => (
                          <TableRow key={index}>
                            <TableCell>{response.date}</TableCell>
                            <TableCell className="text-right">{response.count}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Type-specific details */}
                {selectedSurvey.type === 'Survey' && (
                  <Accordion type="single" collapsible className="border rounded-md">
                    <AccordionItem value="top-questions" className="border-b">
                      <AccordionTrigger className="px-4 py-2">Top Questions</AccordionTrigger>
                      <AccordionContent className="px-4 py-2">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Question</TableHead>
                              <TableHead className="text-right">Response Rate (%)</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedSurvey.topQuestions?.map((q, index) => (
                              <TableRow key={index}>
                                <TableCell>{q.question}</TableCell>
                                <TableCell className="text-right">{q.responseRate}%</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="demographics" className="border-b">
                      <AccordionTrigger className="px-4 py-2">Demographics</AccordionTrigger>
                      <AccordionContent className="px-4 py-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Age Groups</h4>
                            {selectedSurvey.demographicData?.ageGroups.map((age, index) => (
                              <div key={index} className="flex justify-between mb-1">
                                <span>{age.group}</span>
                                <span>{age.percentage}%</span>
                              </div>
                            ))}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Locations</h4>
                            {selectedSurvey.demographicData?.locations.map((location, index) => (
                              <div key={index} className="flex justify-between mb-1">
                                <span>{location.area}</span>
                                <span>{location.percentage}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

                {selectedSurvey.type === 'Canvassing' && (
                  <Accordion type="single" collapsible className="border rounded-md">
                    <AccordionItem value="contact-rates" className="border-b">
                      <AccordionTrigger className="px-4 py-2">Contact Rates</AccordionTrigger>
                      <AccordionContent className="px-4 py-2">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Count</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedSurvey.canvassingData?.contactRates.map((rate, index) => (
                              <TableRow key={index}>
                                <TableCell>{rate.status}</TableCell>
                                <TableCell className="text-right">{rate.count}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="support-level" className="border-b">
                      <AccordionTrigger className="px-4 py-2">Support Level</AccordionTrigger>
                      <AccordionContent className="px-4 py-2">
                        <div className="space-y-2">
                          {selectedSurvey.canvassingData?.supportLevel.map((level, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{level.level}</span>
                                <span>{level.percentage}%</span>
                              </div>
                              <Progress value={level.percentage} className="h-1.5" />
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="volunteers" className="border-b">
                      <AccordionTrigger className="px-4 py-2">Volunteer Stats</AccordionTrigger>
                      <AccordionContent className="px-4 py-2">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-3 bg-slate-50 rounded-md">
                            <div className="text-3xl font-bold">
                              {selectedSurvey.canvassingData?.volunteers.total}
                            </div>
                            <div className="text-sm text-muted-foreground">Total Volunteers</div>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-md">
                            <div className="text-3xl font-bold">
                              {selectedSurvey.canvassingData?.volunteers.activeToday}
                            </div>
                            <div className="text-sm text-muted-foreground">Active Today</div>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-md">
                            <div className="text-3xl font-bold">
                              {selectedSurvey.canvassingData?.volunteers.averageDoors}
                            </div>
                            <div className="text-sm text-muted-foreground">Avg. Doors/Day</div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

                {selectedSurvey.type === 'Event' && (
                  <Accordion type="single" collapsible className="border rounded-md">
                    <AccordionItem value="upcoming-events" className="border-b">
                      <AccordionTrigger className="px-4 py-2">Upcoming Events</AccordionTrigger>
                      <AccordionContent className="px-4 py-2">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Event</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead className="text-right">Registrations</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedSurvey.eventDetails?.upcomingEvents.map((event, index) => (
                              <TableRow key={index}>
                                <TableCell>{event.name}</TableCell>
                                <TableCell>{event.date}</TableCell>
                                <TableCell className="text-right">{event.registrations}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="attendee-interests" className="border-b">
                      <AccordionTrigger className="px-4 py-2">Attendee Interests</AccordionTrigger>
                      <AccordionContent className="px-4 py-2">
                        <div className="space-y-3">
                          <div className="bg-slate-50 p-3 rounded-md text-center">
                            <div className="text-3xl font-bold">
                              {selectedSurvey.eventDetails?.volunteerSignups}
                            </div>
                            <div className="text-sm text-muted-foreground">Volunteer Signups</div>
                          </div>
                          
                          <h4 className="text-sm font-medium mt-4">Top Interests</h4>
                          <div className="space-y-2">
                            {selectedSurvey.eventDetails?.topInterests.map((item, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{item.interest}</span>
                                  <span>{item.percentage}%</span>
                                </div>
                                <Progress value={item.percentage} className="h-1.5" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" /> Edit Form
                  </Button>
                  <Button variant="outline">
                    <BarChart4 className="h-4 w-4 mr-2" /> View Analytics
                  </Button>
                  <Button>
                    <Share2 className="h-4 w-4 mr-2" /> Share Form
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FieldSurveyList;
