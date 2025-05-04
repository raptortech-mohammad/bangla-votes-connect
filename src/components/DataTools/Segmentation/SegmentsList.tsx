
import React from 'react';
import { Calendar, ChartBar, Clock, Filter, MoreHorizontal, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

interface SegmentsListProps {
  searchTerm: string;
}

// Mock data for segments
const mockSegments = [
  {
    id: '1',
    name: 'High-Potential Donors',
    description: 'Supporters with high donation potential based on past giving and engagement',
    type: 'Donors',
    lastRun: '2025-04-01',
    count: 3240,
    percentOfTotal: 12.5,
    engagementRate: 67,
  },
  {
    id: '2',
    name: 'Youth Advocates',
    description: 'Supporters aged 18-30 with high social media engagement',
    type: 'Engagement',
    lastRun: '2025-04-25',
    count: 8450,
    percentOfTotal: 32.8,
    engagementRate: 45,
  },
  {
    id: '3',
    name: 'Loyal Volunteers',
    description: 'Individuals who have volunteered for 3+ events in the last 6 months',
    type: 'Volunteers',
    lastRun: '2025-04-23',
    count: 1230,
    percentOfTotal: 4.8,
    engagementRate: 92,
  },
  {
    id: '4',
    name: 'Swing Voters - Dhaka North',
    description: 'Potential swing voters identified in Dhaka North constituency',
    type: 'Geographic',
    lastRun: '2025-04-20',
    count: 4570,
    percentOfTotal: 17.7,
    engagementRate: 28,
  },
  {
    id: '5',
    name: 'Healthcare Issue Advocates',
    description: 'Supporters who have indicated healthcare as their top priority issue',
    type: 'Issues',
    lastRun: '2025-04-15',
    count: 6280,
    percentOfTotal: 24.3,
    engagementRate: 53,
  },
  {
    id: '6',
    name: 'First-time Voters',
    description: 'Citizens who will be voting for the first time in the upcoming election',
    type: 'Demographic',
    lastRun: '2025-04-18',
    count: 7890,
    percentOfTotal: 30.6,
    engagementRate: 42,
  },
];

const SegmentsList: React.FC<SegmentsListProps> = ({ searchTerm }) => {
  // Filter segments based on search term
  const filteredSegments = mockSegments.filter(segment => 
    segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    segment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    segment.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getEngagementColor = (rate: number) => {
    if (rate >= 70) return 'bg-green-500';
    if (rate >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {filteredSegments.map(segment => (
          <Card key={segment.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-medium">{segment.name}</h3>
                    <p className="text-sm text-muted-foreground">{segment.description}</p>
                    <div className="flex items-center gap-2 pt-1">
                      <Badge variant="outline" className="bg-secondary/10 text-secondary">
                        {segment.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Last run: {segment.lastRun}
                      </span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Export Data</DropdownMenuItem>
                      <DropdownMenuItem>Create Campaign</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="space-y-3 sm:border-l sm:pl-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1 flex justify-between">
                    <span>Population Count</span>
                    <span className="font-medium text-black">{segment.count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={segment.percentOfTotal} className="h-2" />
                    <span className="text-xs w-12 text-muted-foreground">{segment.percentOfTotal}%</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-1 flex justify-between">
                    <span>Engagement Rate</span>
                    <span className="font-medium text-black">{segment.engagementRate}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={segment.engagementRate} 
                      className={`h-2 ${getEngagementColor(segment.engagementRate)}`}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-1">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ChartBar className="h-3.5 w-3.5" />
                    Analyze
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredSegments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No segments found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default SegmentsList;
