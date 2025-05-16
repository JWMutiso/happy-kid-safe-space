
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { 
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Mock data for cases
const initialCases = [
  {
    id: "CASE-001",
    date: "2025-01-15",
    victimName: "Jane Doe",
    victimAge: 12,
    county: "Nairobi",
    type: "Physical Abuse",
    status: "Pending Police Response",
    reporter: "Sarah Kimani"
  },
  {
    id: "CASE-002",
    date: "2025-01-23",
    victimName: "John Mwangi",
    victimAge: 10,
    county: "Kisumu",
    type: "Neglect",
    status: "Investigation",
    reporter: "David Omondi"
  },
  {
    id: "CASE-003",
    date: "2025-02-01",
    victimName: "Mary Johnson",
    victimAge: 15,
    county: "Kisumu",
    type: "Child Marriage",
    status: "Awaiting Medical Report",
    reporter: "Peter Nyaga"
  },
  {
    id: "CASE-004",
    date: "2025-02-05",
    victimName: "Samuel Njoroge",
    victimAge: 8,
    county: "Mombasa",
    type: "Physical Abuse",
    status: "Resolved",
    reporter: "Mercy Achieng"
  },
  {
    id: "CASE-005",
    date: "2025-02-07",
    victimName: "Rebecca Wafula",
    victimAge: 14,
    county: "Nakuru",
    type: "Sexual Abuse",
    status: "Court Process",
    reporter: "Daniel Kariuki"
  },
  {
    id: "CASE-006",
    date: "2025-02-08",
    victimName: "Brian Kimutai",
    victimAge: 9,
    county: "Eldoret",
    type: "Neglect",
    status: "Investigation",
    reporter: "Nancy Mokaya"
  },
  {
    id: "CASE-007",
    date: "2025-02-10",
    victimName: "Grace Wanjiku",
    victimAge: 13,
    county: "Narok",
    type: "FGM",
    status: "Pending Investigation",
    reporter: "James Gitau"
  }
];

const CaseManagement = () => {
  const { toast } = useToast();
  const [cases, setCases] = useState(initialCases);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddCaseOpen, setIsAddCaseOpen] = useState(false);
  const [newCase, setNewCase] = useState({
    id: `CASE-${String(initialCases.length + 1).padStart(3, '0')}`,
    date: new Date().toISOString().split('T')[0],
    victimName: '',
    victimAge: '',
    county: '',
    type: '',
    status: 'New',
    reporter: ''
  });
  const [editingCase, setEditingCase] = useState<null | typeof initialCases[0]>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState<null | string>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterCases();
  };

  const filterCases = () => {
    let filteredCases = [...initialCases];
    
    if (searchQuery) {
      filteredCases = filteredCases.filter(
        (caseItem) =>
          caseItem.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          caseItem.victimName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          caseItem.county.toLowerCase().includes(searchQuery.toLowerCase()) ||
          caseItem.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          caseItem.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filterStatus !== 'all') {
      filteredCases = filteredCases.filter(
        (caseItem) => caseItem.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }
    
    setCases(filteredCases);
  };

  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate fields
    if (!newCase.victimName || !newCase.victimAge || !newCase.county || !newCase.type || !newCase.reporter) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Add new case
    const updatedCases = [...initialCases, {
      ...newCase,
      victimAge: Number(newCase.victimAge)
    }];
    
    setCases(updatedCases);
    initialCases.push({
      ...newCase,
      victimAge: Number(newCase.victimAge)
    });
    
    toast({
      title: "Success",
      description: `Case ${newCase.id} has been added successfully`,
      variant: "default",
    });
    
    setIsAddCaseOpen(false);
    setNewCase({
      id: `CASE-${String(updatedCases.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      victimName: '',
      victimAge: '',
      county: '',
      type: '',
      status: 'New',
      reporter: ''
    });
  };

  const handleEditCase = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingCase) return;
    
    // Validate fields
    if (!editingCase.victimName || !editingCase.victimAge || !editingCase.county || !editingCase.type || !editingCase.reporter) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Update case
    const updatedCases = initialCases.map(caseItem => 
      caseItem.id === editingCase.id ? {
        ...editingCase,
        victimAge: Number(editingCase.victimAge)
      } : caseItem
    );
    
    setCases(updatedCases);
    initialCases.splice(0, initialCases.length, ...updatedCases);
    
    toast({
      title: "Success",
      description: `Case ${editingCase.id} has been updated successfully`,
      variant: "default",
    });
    
    setEditingCase(null);
  };

  const handleDeleteCase = () => {
    if (!caseToDelete) return;
    
    const updatedCases = initialCases.filter(caseItem => caseItem.id !== caseToDelete);
    setCases(updatedCases);
    initialCases.splice(0, initialCases.length, ...updatedCases);
    
    toast({
      title: "Success",
      description: `Case ${caseToDelete} has been deleted successfully`,
      variant: "default",
    });
    
    setCaseToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (editingCase) {
      setEditingCase({
        ...editingCase,
        [name]: value
      });
    } else {
      setNewCase({
        ...newCase,
        [name]: value
      });
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Case Management</h1>
          <p className="text-gray-600">Manage and track all reported gender-based violence cases</p>
        </div>
        
        <button
          className="mt-4 md:mt-0 flex items-center bg-safeMinor-purple text-white px-4 py-2 rounded-lg font-medium hover:bg-safeMinor-purple/90 transition-colors"
          onClick={() => setIsAddCaseOpen(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Case
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <form onSubmit={handleSearch} className="relative flex-grow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search cases by ID, name, county, etc."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-safeMinor-purple focus:border-safeMinor-purple"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                className="border border-gray-300 rounded-md text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-safeMinor-purple focus:border-safeMinor-purple"
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  filterCases();
                }}
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="investigation">Investigation</option>
                <option value="pending police response">Pending Police Response</option>
                <option value="awaiting medical report">Awaiting Medical Report</option>
                <option value="court process">Court Process</option>
                <option value="resolved">Resolved</option>
              </select>
              
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                onClick={filterCases}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Victim</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">County</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reporter</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{caseItem.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{caseItem.victimName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.victimAge}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.county}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${caseItem.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
                        caseItem.status === 'Pending Investigation' || caseItem.status === 'Pending Police Response' ? 'bg-orange-100 text-orange-800' :
                          caseItem.status === 'New' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.reporter}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        title="View details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit case"
                        onClick={() => setEditingCase({ ...caseItem })}
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        title="Delete case"
                        onClick={() => {
                          setCaseToDelete(caseItem.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {cases.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                    No cases found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-3 flex items-center justify-between border-t">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{cases.length}</span> cases
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="inline-flex shadow-sm">
              <button className="border border-gray-300 rounded-l-md px-3 py-1 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="border-t border-b border-gray-300 px-3 py-1 text-sm font-medium text-white bg-safeMinor-purple">
                1
              </button>
              <button className="border border-gray-300 rounded-r-md px-3 py-1 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add New Case Dialog */}
      <Dialog open={isAddCaseOpen} onOpenChange={setIsAddCaseOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Case</DialogTitle>
            <DialogDescription>
              Enter the details for a new gender-based violence case.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddCase}>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium text-gray-700">Case ID</label>
                <input
                  type="text"
                  name="id"
                  className="safeminor-input"
                  value={newCase.id}
                  disabled
                  readOnly
                />
              </div>
              
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  className="safeminor-input"
                  value={newCase.date}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium text-gray-700">Victim Name</label>
                <input
                  type="text"
                  name="victimName"
                  className="safeminor-input"
                  placeholder="Enter victim name"
                  value={newCase.victimName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium text-gray-700">Victim Age</label>
                <input
                  type="number"
                  name="victimAge"
                  className="safeminor-input"
                  placeholder="Enter victim age"
                  value={newCase.victimAge}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium text-gray-700">County</label>
                <input
                  type="text"
                  name="county"
                  className="safeminor-input"
                  placeholder="Enter county"
                  value={newCase.county}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium text-gray-700">Type of Violence</label>
                <select
                  name="type"
                  className="safeminor-input"
                  value={newCase.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="Physical Abuse">Physical Abuse</option>
                  <option value="Sexual Abuse">Sexual Abuse</option>
                  <option value="Neglect">Neglect</option>
                  <option value="Child Marriage">Child Marriage</option>
                  <option value="FGM">FGM</option>
                  <option value="Emotional Abuse">Emotional Abuse</option>
                </select>
              </div>
              
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  className="safeminor-input"
                  value={newCase.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="New">New</option>
                  <option value="Investigation">Investigation</option>
                  <option value="Pending Police Response">Pending Police Response</option>
                  <option value="Awaiting Medical Report">Awaiting Medical Report</option>
                  <option value="Court Process">Court Process</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium text-gray-700">Reporter</label>
                <input
                  type="text"
                  name="reporter"
                  className="safeminor-input"
                  placeholder="Enter reporter name"
                  value={newCase.reporter}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddCaseOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Case</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Case Dialog */}
      <Dialog open={!!editingCase} onOpenChange={(open) => !open && setEditingCase(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Case</DialogTitle>
            <DialogDescription>
              Update the details for case {editingCase?.id}.
            </DialogDescription>
          </DialogHeader>
          
          {editingCase && (
            <form onSubmit={handleEditCase}>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-sm font-medium text-gray-700">Case ID</label>
                  <input
                    type="text"
                    name="id"
                    className="safeminor-input"
                    value={editingCase.id}
                    disabled
                    readOnly
                  />
                </div>
                
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="safeminor-input"
                    value={editingCase.date}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-sm font-medium text-gray-700">Victim Name</label>
                  <input
                    type="text"
                    name="victimName"
                    className="safeminor-input"
                    placeholder="Enter victim name"
                    value={editingCase.victimName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-sm font-medium text-gray-700">Victim Age</label>
                  <input
                    type="number"
                    name="victimAge"
                    className="safeminor-input"
                    placeholder="Enter victim age"
                    value={editingCase.victimAge}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-sm font-medium text-gray-700">County</label>
                  <input
                    type="text"
                    name="county"
                    className="safeminor-input"
                    placeholder="Enter county"
                    value={editingCase.county}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-sm font-medium text-gray-700">Type of Violence</label>
                  <select
                    name="type"
                    className="safeminor-input"
                    value={editingCase.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Physical Abuse">Physical Abuse</option>
                    <option value="Sexual Abuse">Sexual Abuse</option>
                    <option value="Neglect">Neglect</option>
                    <option value="Child Marriage">Child Marriage</option>
                    <option value="FGM">FGM</option>
                    <option value="Emotional Abuse">Emotional Abuse</option>
                  </select>
                </div>
                
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    className="safeminor-input"
                    value={editingCase.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="New">New</option>
                    <option value="Investigation">Investigation</option>
                    <option value="Pending Police Response">Pending Police Response</option>
                    <option value="Awaiting Medical Report">Awaiting Medical Report</option>
                    <option value="Court Process">Court Process</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-sm font-medium text-gray-700">Reporter</label>
                  <input
                    type="text"
                    name="reporter"
                    className="safeminor-input"
                    placeholder="Enter reporter name"
                    value={editingCase.reporter}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingCase(null)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete case {caseToDelete}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCase}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default CaseManagement;
