
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface Case {
  id: string;
  date: string;
  victim_name: string;
  incident_location: string;
  violence_type: string;
  days_elapsed: number;
  status: string;
  created_at: string;
}

const DelayedCases = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cases, setCases] = useState<Case[]>([]);
  const [allCases, setAllCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authLoading && !user) {
      toast({
        title: "Authentication required",
        description: "You need to sign in to view this page",
        variant: "destructive",
      });
      navigate('/auth');
    } else if (user) {
      fetchCases();
    }
  }, [authLoading, user, navigate]);

  const fetchCases = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('is_delayed', true)
        .order('days_elapsed', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        const formattedData = data.map(caseItem => ({
          id: caseItem.id,
          date: caseItem.incident_date || caseItem.created_at.split('T')[0],
          victim_name: caseItem.victim_name,
          incident_location: caseItem.incident_location || 'Unknown',
          violence_type: caseItem.violence_type,
          days_elapsed: caseItem.days_elapsed || 0,
          status: caseItem.status || 'Pending',
          created_at: caseItem.created_at
        }));

        setCases(formattedData);
        setAllCases(formattedData);
      }
    } catch (error) {
      console.error('Error fetching cases:', error);
      toast({
        title: "Error fetching cases",
        description: "Could not load delayed cases. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') {
      setCases(allCases);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filteredCases = allCases.filter(
      (caseItem) =>
        caseItem.id.toLowerCase().includes(query) ||
        caseItem.victim_name.toLowerCase().includes(query) ||
        caseItem.incident_location.toLowerCase().includes(query) ||
        caseItem.violence_type.toLowerCase().includes(query) ||
        caseItem.status.toLowerCase().includes(query)
    );
    
    setCases(filteredCases);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Delayed Cases</h1>
          <p className="text-gray-600 mt-2">Monitor cases requiring immediate attention</p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 md:mb-0">
            <div className="flex items-center">
              <div className="bg-safeMinor-purple/10 p-4 rounded-lg">
                <span className="text-3xl font-bold text-safeMinor-purple">{cases.length}</span>
              </div>
              <div className="ml-4">
                <p className="text-gray-600 text-sm">Total Delayed Cases</p>
                <div className="h-1 w-16 bg-safeMinor-purple rounded-full mt-1"></div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="relative w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search cases..."
                className="safeminor-input pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-6 text-center">Loading cases...</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Case ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Victim Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      County
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days Elapsed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cases.map((caseItem) => (
                    <tr key={caseItem.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {caseItem.id.substring(0, 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {caseItem.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {caseItem.victim_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {caseItem.incident_location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {caseItem.violence_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          {caseItem.days_elapsed} days
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {caseItem.status}
                      </td>
                    </tr>
                  ))}
                  
                  {cases.length === 0 && !isLoading && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                        No cases found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DelayedCases;
