
import React, { useState } from 'react';
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

// Sample urgent cases data
const urgentCases = [
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
    response: "Immediate"
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
    response: "Within 24hrs"
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
    response: "Immediate"
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
    response: "Within 24hrs"
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
    response: "Immediate"
  }
];

const UrgentCases = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  
  const filteredCases = urgentCases.filter(caseItem => {
    const matchesSearch = searchQuery === "" || 
      Object.values(caseItem).some(value => 
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesPriority = priorityFilter === "" || 
      caseItem.priority.toLowerCase() === priorityFilter.toLowerCase();
    
    return matchesSearch && matchesPriority;
  });

  const handleRespond = (caseId: string) => {
    toast({
      title: "Response Initiated",
      description: `Emergency response team notified for case ${caseId}`,
    });
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
                {filteredCases.map((caseItem) => (
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
                        <Button variant="ghost" size="icon" className="h-8 w-8">
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default UrgentCases;
