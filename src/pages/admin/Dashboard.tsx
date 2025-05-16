import React from 'react';
import AdminLayout from './AdminLayout';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ArrowUp, 
  ArrowDown,
  BarChart2
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart } from "@/components/ui/bar-chart";

const StatCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeType, 
  borderColor 
}: { 
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  changeType: 'increase' | 'decrease';
  borderColor: string;
}) => {
  return (
    <Card className="border-t-4" style={{ borderTopColor: borderColor }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`flex items-center mt-1 text-xs ${
          changeType === 'increase' ? 'text-green-500' : 'text-red-500'
        }`}>
          {changeType === 'increase' ? (
            <ArrowUp className="mr-1 h-3 w-3" />
          ) : (
            <ArrowDown className="mr-1 h-3 w-3" />
          )}
          <span>{change} since last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

const RecentCaseItem = ({ 
  id, 
  name, 
  type, 
  date, 
  status, 
  statusColor 
}: { 
  id: string;
  name: string;
  type: string;
  date: string;
  status: string;
  statusColor: string;
}) => {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-gray-500">{type}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm text-gray-500">{date}</div>
        <div className={`text-sm font-medium ${statusColor}`}>{status}</div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const countyData = {
    labels: ["Nairobi", "Kisumu", "Mombasa", "Nakuru", "Machakos"],
    datasets: [
      {
        label: "GBV Cases",
        data: [65, 42, 38, 31, 26],
        backgroundColor: "rgba(155, 135, 245, 0.8)",
      },
    ],
  };

  const caseTypeData = {
    labels: ["Physical Abuse", "Child Marriage", "Sexual Abuse", "FGM", "Neglect"],
    datasets: [
      {
        label: "Cases",
        data: [45, 32, 28, 22, 18],
        backgroundColor: "rgba(155, 135, 245, 0.8)",
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Admin! Here's an overview of the GBV case management system.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Cases" 
          value="1,284" 
          icon={<FileText className="h-5 w-5 text-blue-600" />}
          change="8.2%" 
          changeType="increase"
          borderColor="#4F46E5"
        />
        <StatCard 
          title="Urgent Cases" 
          value="42" 
          icon={<AlertTriangle className="h-5 w-5 text-red-600" />}
          change="12.5%" 
          changeType="increase"
          borderColor="#DC2626"
        />
        <StatCard 
          title="Resolved Cases" 
          value="867" 
          icon={<CheckCircle className="h-5 w-5 text-green-600" />}
          change="5.3%" 
          changeType="increase"
          borderColor="#16A34A"
        />
        <StatCard 
          title="Avg. Resolution Time" 
          value="18 days" 
          icon={<Clock className="h-5 w-5 text-orange-600" />}
          change="2.1%" 
          changeType="decrease"
          borderColor="#EA580C"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Cases by County</CardTitle>
            <CardDescription>Distribution of GBV cases across counties</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart data={countyData} className="h-[300px]" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Cases by Type</CardTitle>
            <CardDescription>Distribution by type of gender-based violence</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart data={caseTypeData} className="h-[300px]" />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recent Cases</CardTitle>
            <CardDescription>Latest reported incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <RecentCaseItem
                id="CASE-023"
                name="Alice Wanjiku"
                type="Physical Abuse"
                date="Today, 10:24 AM"
                status="New"
                statusColor="text-blue-600"
              />
              <RecentCaseItem
                id="CASE-022"
                name="John Kamau"
                type="Child Neglect"
                date="Yesterday, 3:45 PM"
                status="In Progress"
                statusColor="text-orange-600"
              />
              <RecentCaseItem
                id="CASE-021"
                name="Mary Odhiambo"
                type="Child Marriage"
                date="May 15, 2025"
                status="Urgent"
                statusColor="text-red-600"
              />
              <RecentCaseItem
                id="CASE-020"
                name="Peter Mutua"
                type="Sexual Abuse"
                date="May 14, 2025"
                status="Assigned"
                statusColor="text-purple-600"
              />
              <RecentCaseItem
                id="CASE-019"
                name="Sarah Kimani"
                type="FGM"
                date="May 12, 2025"
                status="Resolved"
                statusColor="text-green-600"
              />
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <a href="#" className="text-safeMinor-purple hover:underline text-sm">
              View all cases →
            </a>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Pending Actions</CardTitle>
            <CardDescription>Tasks requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
                  <div>
                    <div className="font-medium">Urgent Case Review</div>
                    <div className="text-sm text-gray-500">3 cases require immediate attention</div>
                  </div>
                </div>
                <button className="text-xs bg-white border border-gray-300 rounded-lg px-3 py-1 hover:bg-gray-50">
                  Review
                </button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mr-3"></div>
                  <div>
                    <div className="font-medium">Case Assignments</div>
                    <div className="text-sm text-gray-500">12 cases need to be assigned</div>
                  </div>
                </div>
                <button className="text-xs bg-white border border-gray-300 rounded-lg px-3 py-1 hover:bg-gray-50">
                  Assign
                </button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                  <div>
                    <div className="font-medium">User Approvals</div>
                    <div className="text-sm text-gray-500">5 new users awaiting approval</div>
                  </div>
                </div>
                <button className="text-xs bg-white border border-gray-300 rounded-lg px-3 py-1 hover:bg-gray-50">
                  Approve
                </button>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                  <div>
                    <div className="font-medium">Monthly Report</div>
                    <div className="text-sm text-gray-500">May 2025 report is ready for review</div>
                  </div>
                </div>
                <button className="text-xs bg-white border border-gray-300 rounded-lg px-3 py-1 hover:bg-gray-50">
                  View
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <a href="#" className="text-safeMinor-purple hover:underline text-sm">
              View all tasks →
            </a>
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
