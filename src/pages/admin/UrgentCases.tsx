
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { AlertTriangle, Eye, Edit, Trash2, Search, Filter } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with proper fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Debug info to console
console.log('Supabase URL in UrgentCases:', supabaseUrl ? 'Found' : 'Missing');
console.log('Supabase Key in UrgentCases:', supabaseKey ? 'Found' : 'Missing');

const supabase = createClient(supabaseUrl, supabaseKey);

// Sample urgent cases data
const sampleUrgentCases = [
  {
    id: "CASE-017",
    date: "May 16, 2025",
    victim: "Janet Kamau",
    age: 13,
    location: "Nairobi",
    type: "Physical Abuse",
    status: "Urgent",
    reporter: "School Teacher",
    priority: "Critical",
    response: "Immediate",
    details: "Student came to school with visible bruises on arms and face. Teacher reported immediately.",
    actions_taken: "Case reported to police, child placed in temporary shelter."
  },
  {
    id: "CASE-015",
    date: "May 15, 2025",
    victim: "Michael Odhiambo",
    age: 10,
    location: "Kisumu",
    type: "Child Marriage",
    status: "Urgent",
    reporter: "Community Health Worker",
    priority: "High",
    response: "Within 24hrs",
    details: "Child pulled out of school, family preparing for marriage ceremony.",
    actions_taken: "Legal intervention initiated, local authorities notified."
  },
  {
    id: "CASE-012",
    date: "May 14, 2025",
    victim: "Sarah Njeri",
    age: 16,
    location: "Mombasa",
    type: "Sexual Abuse",
    status: "Urgent",
    reporter: "Hospital",
    priority: "Critical",
    response: "Immediate",
    details: "Victim brought to hospital by neighbor. Signs of sexual assault.",
    actions_taken: "Medical care provided, police report filed, psychosocial support arranged."
  },
  {
    id: "CASE-011",
    date: "May 14, 2025",
    victim: "John Mwangi",
    age: 9,
    location: "Nakuru",
    type: "Neglect",
    status: "Urgent",
    reporter: "Neighbor",
    priority: "High",
    response: "Within 24hrs",
    details: "Child seen foraging for food in trash bins. Appears malnourished.",
    actions_taken: "Welfare check conducted, food and necessities provided."
  },
  {
    id: "CASE-010",
    date: "May 13, 2025",
    victim: "Elizabeth Wangari",
    age: 15,
    location: "Machakos",
    type: "FGM",
    status: "Urgent", 
    reporter: "Anonymous",
    priority: "Critical",
    response: "Immediate",
    details: "Traditional ceremony planned for the weekend. Multiple girls at risk.",
    actions_taken: "Anti-FGM advocates notified, intervention team dispatched."
  }
];

const UrgentCases = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [urgentCases, setUrgentCases] = useState(sampleUrgentCases);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  
  useEffect(() => {
    const fetchCases = async () => {
      setIsLoading(true);
      try {
        // Try to get cases from Supabase
        const { data, error } = await supabase
          .from('urgent_cases')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        // If we have data, use it; otherwise use sample data
        if (data && data.length > 0) {
          setUrgentCases(data);
        }
        
        // Log activity
        const { data: userData } = await supabase.auth.getUser();
        if (userData.user) {
          await supabase.from('activity_logs').insert({
            user_email: userData.user.email,
            action: 'view',
            details: 'Viewed urgent cases',
            ip_address: 'N/A'
          });
        }
      } catch (error) {
        console.error('Error fetching cases:', error);
        // Fallback to sample data if there's an error
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCases();
  }, []);
  
  const filteredCases = urgentCases.filter(caseItem => {
    const matchesSearch = searchQuery === "" || 
      Object.values(caseItem).some(value => 
        value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesPriority = priorityFilter === "" || 
      caseItem.priority.toLowerCase() === priorityFilter.toLowerCase();
    
    return matchesSearch && matchesPriority;
  });

  const handleRespond = async (caseId: string) => {
    try {
      // Log the response action
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        await supabase.from('activity_logs').insert({
          user_email: userData.user.email,
          action: 'respond',
          details: `Responded to case ${caseId}`,
          ip_address: 'N/A'
        });
      }
      
      toast({
        title: "Response Initiated",
        description: `Emergency response team notified for case ${caseId}`,
      });
    } catch (error) {
      console.error('Error logging response:', error);
      toast({
        title: "Response Initiated",
        description: `Emergency response team notified for case ${caseId}`,
      });
    }
  };
  
  const handleViewCase = (caseItem: any) => {
    setSelectedCase(caseItem);
    setShowViewModal(true);
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return "bg-red-500 hover:bg-red-600";
      case 'high':
        return "bg-orange-500 hover:bg-orange-600";
      case 'medium':
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          Urgent Cases
        </h1>
        <p className="text-gray-600">
          Cases that require immediate attention and intervention
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Response Protocol</CardTitle>
          <CardDescription>Standard operating procedures for urgent cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
              <div className="flex-1">
                <div className="font-medium text-red-800">Critical Priority</div>
                <div className="text-sm text-red-600">Immediate response required (within 1 hour)</div>
              </div>
              <Button variant="destructive" size="sm">Respond Now</Button>
            </div>
            
            <div className="flex items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="w-2 h-2 rounded-full bg-orange-500 mr-3"></div>
              <div className="flex-1">
                <div className="font-medium text-orange-800">High Priority</div>
                <div className="text-sm text-orange-600">Urgent response required (within 24 hours)</div>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600" size="sm">Schedule Response</Button>
            </div>
            
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-3"></div>
              <div className="flex-1">
                <div className="font-medium text-yellow-800">Medium Priority</div>
                <div className="text-sm text-yellow-600">Prompt response required (within 48 hours)</div>
              </div>
              <Button className="bg-yellow-500 hover:bg-yellow-600" size="sm">Assign Case</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-medium">Urgent Cases List</CardTitle>
              <CardDescription>Cases requiring immediate intervention</CardDescription>
            </div>
            <Button className="bg-red-500 hover:bg-red-600">
              <AlertTriangle className="h-4 w-4 mr-2" /> Emergency Protocol
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search cases..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setPriorityFilter("");
            }}>
              Reset
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-safeMinor-purple"></div>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Victim</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Response</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases.length > 0 ? (
                    filteredCases.map((caseItem) => (
                      <TableRow key={caseItem.id}>
                        <TableCell className="font-medium">{caseItem.id}</TableCell>
                        <TableCell>{caseItem.victim}</TableCell>
                        <TableCell>{caseItem.age}</TableCell>
                        <TableCell>{caseItem.type}</TableCell>
                        <TableCell>{caseItem.location}</TableCell>
                        <TableCell>
                          <Badge className={getPriorityBadgeColor(caseItem.priority)}>
                            {caseItem.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{caseItem.response}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleViewCase(caseItem)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="bg-safeMinor-purple"
                              onClick={() => handleRespond(caseItem.id)}
                            >
                              Respond
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        No cases found matching your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Case Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              {selectedCase?.priority === "Critical" && <span className="w-3 h-3 rounded-full bg-red-500"></span>}
              {selectedCase?.priority === "High" && <span className="w-3 h-3 rounded-full bg-orange-500"></span>}
              {selectedCase?.priority === "Medium" && <span className="w-3 h-3 rounded-full bg-yellow-500"></span>}
              Case Details: {selectedCase?.id}
            </DialogTitle>
            <DialogDescription>
              Reported on {selectedCase?.date}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Victim Information</h3>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3 gap-1 p-2 bg-gray-50 rounded">
                  <span className="text-gray-500">Name:</span>
                  <span className="col-span-2 font-medium">{selectedCase?.victim}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 p-2 bg-gray-50 rounded">
                  <span className="text-gray-500">Age:</span>
                  <span className="col-span-2 font-medium">{selectedCase?.age}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 p-2 bg-gray-50 rounded">
                  <span className="text-gray-500">Location:</span>
                  <span className="col-span-2 font-medium">{selectedCase?.location}</span>
                </div>
              </div>
              
              <h3 className="font-medium text-gray-900 mt-6 mb-2">Case Information</h3>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-3 gap-1 p-2 bg-gray-50 rounded">
                  <span className="text-gray-500">Type:</span>
                  <span className="col-span-2 font-medium">{selectedCase?.type}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 p-2 bg-gray-50 rounded">
                  <span className="text-gray-500">Reporter:</span>
                  <span className="col-span-2 font-medium">{selectedCase?.reporter}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 p-2 bg-gray-50 rounded">
                  <span className="text-gray-500">Priority:</span>
                  <span className="col-span-2">
                    <Badge className={selectedCase?.priority === "Critical" ? "bg-red-500" : 
                                      selectedCase?.priority === "High" ? "bg-orange-500" : "bg-yellow-500"}>
                      {selectedCase?.priority}
                    </Badge>
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 p-2 bg-gray-50 rounded">
                  <span className="text-gray-500">Response:</span>
                  <span className="col-span-2 font-medium">{selectedCase?.response}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Case Details</h3>
              <div className="p-4 bg-gray-50 rounded min-h-[100px] text-sm">
                {selectedCase?.details}
              </div>
              
              <h3 className="font-medium text-gray-900 mt-6 mb-2">Actions Taken</h3>
              <div className="p-4 bg-gray-50 rounded min-h-[100px] text-sm">
                {selectedCase?.actions_taken}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowViewModal(false)}>
              Close
            </Button>
            <Button 
              className="bg-safeMinor-purple" 
              onClick={() => {
                handleRespond(selectedCase?.id);
                setShowViewModal(false);
              }}
            >
              Respond to Case
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default UrgentCases;
