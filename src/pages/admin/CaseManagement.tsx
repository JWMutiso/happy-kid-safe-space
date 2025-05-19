import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { FileText, Search, Filter, Eye, Edit, Trash2, MoreHorizontal, FileCheck, MessageSquare, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Sample case data
const casesData = [
  {
    id: "CASE-023",
    date: "2025-05-16",
    victim: "Alice Wanjiku",
    age: 14,
    county: "Nairobi",
    type: "Physical Abuse",
    status: "New",
    reporter: "School Teacher",
    details: "Victim showed signs of physical abuse including bruises on arms and back. Teacher reported after noticing injuries during PE class.",
    location: "Embakasi, Nairobi",
    contact: "+254 712 345 678",
    evidence: ["Medical report", "Photographs"],
    notes: [
      { date: "2025-05-16", user: "Admin User", content: "Case received and assigned for investigation" }
    ]
  },
  {
    id: "CASE-022",
    date: "2025-05-15",
    victim: "John Kamau",
    age: 8,
    county: "Kisumu",
    type: "Child Neglect",
    status: "In Progress",
    reporter: "Neighbor",
    details: "Child observed frequently alone and unfed. Appears to be living in unsanitary conditions.",
    location: "Kondele, Kisumu",
    contact: "+254 723 456 789",
    evidence: ["Witness statements"],
    notes: [
      { date: "2025-05-15", user: "Case Manager", content: "Initial assessment completed. Child welfare officers to visit location." }
    ]
  },
  {
    id: "CASE-021",
    date: "2025-05-15",
    victim: "Mary Odhiambo",
    age: 16,
    county: "Machakos",
    type: "Child Marriage",
    status: "Urgent",
    reporter: "Community Health Worker",
    details: "Planned marriage to 45-year-old man. Ceremony scheduled for this weekend.",
    location: "Athi River, Machakos",
    contact: "+254 734 567 890",
    evidence: ["Community report", "Voice recording"],
    notes: [
      { date: "2025-05-15", user: "Admin User", content: "Urgent intervention required. Police notified." }
    ]
  },
  {
    id: "CASE-020",
    date: "2025-05-14",
    victim: "Peter Mutua",
    age: 12,
    county: "Nakuru",
    type: "Sexual Abuse",
    status: "Assigned",
    reporter: "Medical Officer",
    details: "Medical examination revealed signs consistent with sexual abuse. Child currently at hospital.",
    location: "Nakuru Town",
    contact: "+254 745 678 901",
    evidence: ["Medical report", "Child statement"],
    notes: [
      { date: "2025-05-14", user: "Medical Officer", content: "Child receiving medical care. Psychological support team requested." },
      { date: "2025-05-15", user: "Case Manager", content: "Child placed in temporary safe housing." }
    ]
  },
  {
    id: "CASE-019",
    date: "2025-05-12",
    victim: "Sarah Kimani",
    age: 13,
    county: "Mombasa",
    type: "FGM",
    status: "Resolved",
    reporter: "Anonymous",
    details: "Planned FGM ceremony for multiple girls including the victim. Community intervention successful.",
    location: "Likoni, Mombasa",
    contact: "Anonymous",
    evidence: ["Community intervention report"],
    notes: [
      { date: "2025-05-12", user: "Field Officer", content: "Intervention successful. Girls removed to safe location." },
      { date: "2025-05-14", user: "Case Manager", content: "Community education program initiated in the area." },
      { date: "2025-05-15", user: "Admin User", content: "Case resolved. Follow-up scheduled for next month." }
    ]
  }
];

const CaseManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [newNote, setNewNote] = useState("");

  // Filter cases based on search query and status filter
  const filteredCases = casesData.filter(caseItem => {
    const matchesSearch = searchQuery === "" || 
      Object.values(caseItem).some(value => 
        typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesStatus = statusFilter === "" || caseItem.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewCase = (caseItem: any) => {
    setSelectedCase(caseItem);
    setShowModal(true);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const updatedCase = {
      ...selectedCase,
      notes: [
        ...selectedCase.notes,
        {
          date: new Date().toISOString().split('T')[0],
          user: "Admin User",
          content: newNote.trim()
        }
      ]
    };
    
    // Update the selected case
    setSelectedCase(updatedCase);
    
    // Update in the main data list
    const updatedCases = casesData.map(c => 
      c.id === selectedCase.id ? updatedCase : c
    );
    
    toast({
      title: "Note Added",
      description: "Your note has been added to the case file."
    });
    
    setNewNote("");
  };

  const handleStatusChange = (status: string) => {
    const updatedCase = {
      ...selectedCase,
      status: status,
      notes: [
        ...selectedCase.notes,
        {
          date: new Date().toISOString().split('T')[0],
          user: "Admin User",
          content: `Case status updated to ${status}`
        }
      ]
    };
    
    // Update the selected case
    setSelectedCase(updatedCase);
    
    // Update in the main data list (if this was a real app with state management)
    const updatedCases = casesData.map(c => 
      c.id === selectedCase.id ? updatedCase : c
    );
    
    toast({
      title: "Status Updated",
      description: `Case status changed to ${status}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return <Badge className="bg-blue-500">New</Badge>;
      case "In Progress":
        return <Badge className="bg-orange-500">In Progress</Badge>;
      case "Urgent":
        return <Badge className="bg-red-500">Urgent</Badge>;
      case "Assigned":
        return <Badge className="bg-purple-500">Assigned</Badge>;
      case "Resolved":
        return <Badge className="bg-green-500">Resolved</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FileText className="h-6 w-6 text-safeMinor-purple" />
          Case Management
        </h1>
        <p className="text-gray-600">
          Manage and track all reported gender-based violence cases
        </p>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-medium">Case Records</CardTitle>
              <CardDescription>All reported cases in the system</CardDescription>
            </div>
            <Button>
              <FileText className="h-4 w-4 mr-2" /> Add New Case
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search cases..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-statuses">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
                <SelectItem value="Assigned">Assigned</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setStatusFilter("");
            }}>
              Reset
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Victim</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>County</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell>{caseItem.date}</TableCell>
                    <TableCell>{caseItem.victim}</TableCell>
                    <TableCell>{caseItem.age}</TableCell>
                    <TableCell>{caseItem.county}</TableCell>
                    <TableCell>{caseItem.type}</TableCell>
                    <TableCell>
                      {getStatusBadge(caseItem.status)}
                    </TableCell>
                    <TableCell>{caseItem.reporter}</TableCell>
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
                        
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2">
                              <FileCheck className="h-4 w-4" /> Assign Case
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4" /> Send Notification
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                              <Trash2 className="h-4 w-4" /> Delete Case
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredCases.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No cases found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredCases.length} of {casesData.length} cases
          </div>
          <div className="flex gap-2">
            <Button variant="outline" disabled>Previous</Button>
            <Button variant="outline">Next</Button>
          </div>
        </CardFooter>
      </Card>
      
      {/* Case View Dialog */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Case Details {selectedCase?.id}
              {selectedCase?.status === "Urgent" && (
                <Badge className="bg-red-500 ml-2">
                  <AlertCircle className="h-3 w-3 mr-1" /> Urgent
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription>
              Reported on {selectedCase?.date} by {selectedCase?.reporter}
            </DialogDescription>
          </DialogHeader>
          
          {selectedCase && (
            <div className="max-h-[70vh] overflow-auto pr-2">
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="details">Case Details</TabsTrigger>
                  <TabsTrigger value="evidence">Evidence</TabsTrigger>
                  <TabsTrigger value="notes">Case Notes</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Victim Information</h3>
                      <div className="mt-2 space-y-3">
                        <div>
                          <Label className="text-xs">Name</Label>
                          <p className="font-medium">{selectedCase.victim}</p>
                        </div>
                        <div>
                          <Label className="text-xs">Age</Label>
                          <p className="font-medium">{selectedCase.age}</p>
                        </div>
                        <div>
                          <Label className="text-xs">Location</Label>
                          <p className="font-medium">{selectedCase.location}</p>
                        </div>
                        <div>
                          <Label className="text-xs">Contact Information</Label>
                          <p className="font-medium">{selectedCase.contact}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Case Information</h3>
                      <div className="mt-2 space-y-3">
                        <div>
                          <Label className="text-xs">Case Type</Label>
                          <p className="font-medium">{selectedCase.type}</p>
                        </div>
                        <div>
                          <Label className="text-xs">County</Label>
                          <p className="font-medium">{selectedCase.county}</p>
                        </div>
                        <div>
                          <Label className="text-xs">Current Status</Label>
                          <div className="mt-1">
                            {getStatusBadge(selectedCase.status)}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs">Reporter</Label>
                          <p className="font-medium">{selectedCase.reporter}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Case Details</h3>
                    <p className="mt-2 text-sm">{selectedCase.details}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Case Timeline</h3>
                    <div className="mt-2">
                      <Accordion type="single" collapsible className="w-full">
                        {selectedCase.notes.map((note: any, index: number) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">
                              <div>
                                <p className="text-sm font-medium">{note.date}</p>
                                <p className="text-xs text-gray-500">{note.user}</p>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm">{note.content}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="evidence" className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Evidence Items</h3>
                    <ul className="mt-2 space-y-2">
                      {selectedCase.evidence.map((item: string, index: number) => (
                        <li key={index} className="flex items-center gap-2 p-2 border rounded-md">
                          <FileText className="h-5 w-5 text-safeMinor-purple" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <Button className="mt-4">
                      Upload New Evidence
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="notes" className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Case Notes</h3>
                    <div className="mt-2 space-y-4">
                      {selectedCase.notes.map((note: any, index: number) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-md">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">{note.user}</span>
                            <span className="text-sm text-gray-500">{note.date}</span>
                          </div>
                          <p className="text-sm">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Add Note</h3>
                    <div className="space-y-4">
                      <Textarea 
                        placeholder="Enter your notes here..." 
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                        Add Note
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="actions" className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Change Status</h3>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3">
                      <Button
                        variant={selectedCase.status === "New" ? "default" : "outline"}
                        onClick={() => handleStatusChange("New")}
                      >
                        New
                      </Button>
                      <Button
                        variant={selectedCase.status === "In Progress" ? "default" : "outline"}
                        onClick={() => handleStatusChange("In Progress")}
                      >
                        In Progress
                      </Button>
                      <Button
                        variant={selectedCase.status === "Assigned" ? "default" : "outline"}
                        onClick={() => handleStatusChange("Assigned")}
                      >
                        Assigned
                      </Button>
                      <Button
                        variant={selectedCase.status === "Urgent" ? "default" : "outline"}
                        className={selectedCase.status === "Urgent" ? "bg-red-500" : ""}
                        onClick={() => handleStatusChange("Urgent")}
                      >
                        <AlertCircle className="h-4 w-4 mr-2" /> Urgent
                      </Button>
                      <Button
                        variant={selectedCase.status === "Resolved" ? "default" : "outline"}
                        className={selectedCase.status === "Resolved" ? "bg-green-500" : ""}
                        onClick={() => handleStatusChange("Resolved")}
                      >
                        <FileCheck className="h-4 w-4 mr-2" /> Resolved
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Case Assignment</h3>
                      <div className="space-y-2">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Assign to officer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="john-doe">John Doe</SelectItem>
                            <SelectItem value="jane-smith">Jane Smith</SelectItem>
                            <SelectItem value="robert-kenyatta">Robert Kenyatta</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button className="w-full">Assign Case</Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Notifications</h3>
                      <div className="space-y-2">
                        <Button className="w-full flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2" /> 
                          Send Update Notification
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Case Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="w-full">
                        Export Case File
                      </Button>
                      <Button variant="outline" className="w-full">
                        Print Details
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default CaseManagement;
