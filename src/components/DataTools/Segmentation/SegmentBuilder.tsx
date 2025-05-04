
import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronRight, 
  Database, 
  Filter, 
  Fingerprint, 
  Geography, 
  Map,
  Plus, 
  Save, 
  Tags, 
  Trash2, 
  Users, 
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';

const SegmentBuilder: React.FC = () => {
  const [conditions, setConditions] = useState([
    { id: 1, type: 'demographic', field: 'age', operator: 'between', value: '18-35' },
    { id: 2, type: 'location', field: 'district', operator: 'is', value: 'Dhaka' },
  ]);
  
  const [segmentName, setSegmentName] = useState('');
  const [segmentDescription, setSegmentDescription] = useState('');
  const [conditionGroup, setConditionGroup] = useState('all'); // 'all' or 'any'
  
  const addCondition = () => {
    const newId = conditions.length > 0 ? Math.max(...conditions.map(c => c.id)) + 1 : 1;
    setConditions([...conditions, { 
      id: newId, 
      type: 'demographic', 
      field: 'select-field', 
      operator: 'equals', 
      value: '' 
    }]);
  };
  
  const removeCondition = (id: number) => {
    setConditions(conditions.filter(condition => condition.id !== id));
  };
  
  const updateCondition = (id: number, field: string, value: string) => {
    setConditions(conditions.map(condition => 
      condition.id === id ? { ...condition, [field]: value } : condition
    ));
  };
  
  const categoryIcons: Record<string, JSX.Element> = {
    demographic: <Users className="h-4 w-4" />,
    location: <Map className="h-4 w-4" />,
    behavior: <Fingerprint className="h-4 w-4" />,
    tag: <Tags className="h-4 w-4" />,
    custom: <Database className="h-4 w-4" />
  };
  
  const getMatchCount = () => {
    // This would normally be a database query - mocking for now
    return Math.floor(Math.random() * 10000) + 1000;
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Create New Segment</CardTitle>
          </CardHeader>
          <CardContent>
            <Form>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <FormItem>
                    <FormLabel>Segment Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter segment name" 
                        value={segmentName} 
                        onChange={(e) => setSegmentName(e.target.value)}
                      />
                    </FormControl>
                  </FormItem>
                  
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter segment description" 
                        value={segmentDescription} 
                        onChange={(e) => setSegmentDescription(e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      Clearly describe the purpose of this segment and who it includes
                    </FormDescription>
                  </FormItem>
                </div>
                
                <div>
                  <Label>Match Conditions</Label>
                  
                  <div className="flex items-center gap-2 mt-2 mb-4">
                    <span className="text-sm">Match</span>
                    <Select value={conditionGroup} onValueChange={setConditionGroup}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">ALL</SelectItem>
                        <SelectItem value="any">ANY</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm">of the following conditions:</span>
                  </div>
                  
                  <div className="space-y-3">
                    {conditions.map((condition) => (
                      <div key={condition.id} className="flex items-center gap-2 p-3 border border-border rounded-md">
                        <div className="flex-shrink-0">
                          {categoryIcons[condition.type] || <Filter className="h-4 w-4" />}
                        </div>
                        
                        <Select
                          value={condition.type}
                          onValueChange={(value) => updateCondition(condition.id, 'type', value)}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="demographic">Demographic</SelectItem>
                            <SelectItem value="location">Location</SelectItem>
                            <SelectItem value="behavior">Behavior</SelectItem>
                            <SelectItem value="tag">Tag</SelectItem>
                            <SelectItem value="custom">Custom Field</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        
                        <Select
                          value={condition.field}
                          onValueChange={(value) => updateCondition(condition.id, 'field', value)}
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {condition.type === 'demographic' && (
                              <>
                                <SelectItem value="age">Age</SelectItem>
                                <SelectItem value="gender">Gender</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="occupation">Occupation</SelectItem>
                              </>
                            )}
                            
                            {condition.type === 'location' && (
                              <>
                                <SelectItem value="district">District</SelectItem>
                                <SelectItem value="constituency">Constituency</SelectItem>
                                <SelectItem value="ward">Ward</SelectItem>
                                <SelectItem value="postal-code">Postal Code</SelectItem>
                              </>
                            )}
                            
                            {condition.type === 'behavior' && (
                              <>
                                <SelectItem value="donation-history">Donation History</SelectItem>
                                <SelectItem value="event-attendance">Event Attendance</SelectItem>
                                <SelectItem value="volunteer-hours">Volunteer Hours</SelectItem>
                                <SelectItem value="email-engagement">Email Engagement</SelectItem>
                              </>
                            )}
                            
                            {condition.type === 'tag' && (
                              <>
                                <SelectItem value="has-tag">Has Tag</SelectItem>
                                <SelectItem value="tag-count">Tag Count</SelectItem>
                              </>
                            )}
                            
                            {condition.type === 'custom' && (
                              <>
                                <SelectItem value="custom-field-1">Support Level</SelectItem>
                                <SelectItem value="custom-field-2">Issue Priority</SelectItem>
                                <SelectItem value="custom-field-3">Contact Preference</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                        
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        
                        <Select
                          value={condition.operator}
                          onValueChange={(value) => updateCondition(condition.id, 'operator', value)}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equals">Equals</SelectItem>
                            <SelectItem value="not-equals">Not Equals</SelectItem>
                            <SelectItem value="contains">Contains</SelectItem>
                            <SelectItem value="starts-with">Starts With</SelectItem>
                            <SelectItem value="greater-than">Greater Than</SelectItem>
                            <SelectItem value="less-than">Less Than</SelectItem>
                            <SelectItem value="between">Between</SelectItem>
                            <SelectItem value="is-empty">Is Empty</SelectItem>
                            <SelectItem value="is-not-empty">Is Not Empty</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        
                        <Input
                          className="flex-1"
                          placeholder="Value"
                          value={condition.value}
                          onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                        />
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="flex-shrink-0"
                          onClick={() => removeCondition(condition.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full" onClick={addCondition}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Condition
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between gap-4 pt-2">
                  <Button variant="outline" className="w-1/2">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button className="w-1/2">
                    <Save className="h-4 w-4 mr-2" />
                    Save Segment
                  </Button>
                </div>
              </div>
            </Form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Segment Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">{segmentName || 'New Segment'}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {segmentDescription || 'No description provided'}
                </p>
              </div>
              
              <Separator />
              
              <div>
                <div className="text-sm font-medium mb-2">Match {conditionGroup === 'all' ? 'ALL' : 'ANY'} conditions:</div>
                <div className="space-y-2">
                  {conditions.map(condition => (
                    <div key={condition.id} className="text-sm flex items-center gap-2">
                      <Badge variant="outline" className="bg-primary/5">
                        {categoryIcons[condition.type]}
                      </Badge>
                      <span>{condition.field}</span>
                      <span className="text-muted-foreground">{condition.operator}</span>
                      <span className="font-medium">{condition.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="text-sm mb-2">Estimated Match Count:</div>
                <div className="text-2xl font-bold">{getMatchCount().toLocaleString()}</div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="text-sm font-medium">What you can do with this segment:</div>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    Create targeted messaging campaigns
                  </li>
                  <li className="flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    Export segment data for field operations
                  </li>
                  <li className="flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" />
                    Analyze trends and engagement metrics
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SegmentBuilder;
