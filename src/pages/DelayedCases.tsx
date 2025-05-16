
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Search } from 'lucide-react';

// Mock data for delayed cases
const mockCases = [
  {
    id: 'CASE-001',
    date: '2025-01-15',
    victimName: 'Jane Doe',
    county: 'Nairobi',
    type: 'Physical Abuse',
    daysElapsed: 45,
    status: 'Pending Police Response'
  },
  {
    id: 'CASE-003',
    date: '2025-02-01',
    victimName: 'Mary Johnson',
    county: 'Kisumu',
    type: 'Child Marriage',
    daysElapsed: 30,
    status: 'Awaiting Medical Report'
  },
  {
    id: 'CASE-007',
    date: '2025-02-10',
    victimName: 'Grace Wanjiku',
    county: 'Narok',
    type: 'FGM',
    daysElapsed: 25,
    status: 'Pending Investigation'
  }
];

const DelayedCases = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cases, setCases] = useState(mockCases);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') {
      setCases(mockCases);
      return;
    }
    
    const filteredCases = mockCases.filter(
      (caseItem) =>
        caseItem.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.victimName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.county.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.status.toLowerCase().includes(searchQuery.toLowerCase())
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
                <span className="text-3xl font-bold text-safeMinor-purple">3</span>
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
                      {caseItem.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {caseItem.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {caseItem.victimName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {caseItem.county}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {caseItem.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        {caseItem.daysElapsed} days
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {caseItem.status}
                    </td>
                  </tr>
                ))}
                
                {cases.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      No cases found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DelayedCases;
