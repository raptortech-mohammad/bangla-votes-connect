
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Users, CalendarDays, Plus, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface CreateFieldDataFormProps {
  onClose: () => void;
}

type FormValues = {
  title: string;
  description: string;
  type: 'survey' | 'canvassing' | 'event';
  isPublic: boolean;
  collectLocation: boolean;
  startDate: string;
  endDate: string;
  targetResponseCount?: number;
  volunteerCount?: number;
  eventLocation?: string;
  eventType?: string;
};

const CreateFieldDataForm: React.FC<CreateFieldDataFormProps> = ({ onClose }) => {
  const [formType, setFormType] = useState<'survey' | 'canvassing' | 'event'>('survey');
  const form = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      type: 'survey',
      isPublic: false,
      collectLocation: true,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      targetResponseCount: 1000,
      volunteerCount: 10,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
    
    // Here you would typically send this data to an API
    // For now, let's simulate a successful creation
    setTimeout(() => {
      toast.success("Form created successfully", {
        description: `"${data.title}" has been created and is ready to use.`,
      });
      onClose();
    }, 500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter form title..." {...field} />
              </FormControl>
              <FormDescription>
                A clear, descriptive title for your data collection form.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the purpose of this form..." 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Form Type</FormLabel>
              <FormControl>
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className={`flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer transition-all ${formType === 'survey' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => {
                      setFormType('survey');
                      field.onChange('survey');
                    }}
                  >
                    <FileText className="h-8 w-8 mb-2 text-primary" />
                    <span className="font-medium text-sm">Survey</span>
                  </div>
                  
                  <div 
                    className={`flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer transition-all ${formType === 'canvassing' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => {
                      setFormType('canvassing');
                      field.onChange('canvassing');
                    }}
                  >
                    <Users className="h-8 w-8 mb-2 text-primary" />
                    <span className="font-medium text-sm">Canvassing</span>
                  </div>
                  
                  <div 
                    className={`flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer transition-all ${formType === 'event' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => {
                      setFormType('event');
                      field.onChange('event');
                    }}
                  >
                    <CalendarDays className="h-8 w-8 mb-2 text-primary" />
                    <span className="font-medium text-sm">Event</span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Type-specific fields */}
        {formType === 'survey' && (
          <FormField
            control={form.control}
            name="targetResponseCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Response Count</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="1000" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value))} 
                  />
                </FormControl>
                <FormDescription>
                  Set a goal for how many responses you aim to collect.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {formType === 'canvassing' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="targetResponseCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Doors</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="1000" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="volunteerCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Required Volunteers</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="10" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {formType === 'event' && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="eventLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Location</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input placeholder="Enter location..." {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="rally">Rally</SelectItem>
                      <SelectItem value="townhall">Town Hall</SelectItem>
                      <SelectItem value="doorknock">Door Knocking</SelectItem>
                      <SelectItem value="phonebank">Phone Banking</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-end space-x-2 space-y-0 pt-6">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange} 
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Make this form publicly accessible</FormLabel>
                <FormDescription>
                  Anyone with the link can view and submit this form
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="collectLocation"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange} 
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Collect location data</FormLabel>
                <FormDescription>
                  Record GPS coordinates when the form is submitted
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="pt-4 flex justify-end space-x-4">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            <Plus className="mr-2 h-4 w-4" />
            Create Form
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateFieldDataForm;
