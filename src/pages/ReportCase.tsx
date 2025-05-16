
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useToast } from "@/components/ui/use-toast";

const ReportCase = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState<'english' | 'kiswahili'>('english');
  const [formData, setFormData] = useState({
    victimName: '',
    victimAge: '',
    violenceType: '',
    incidentDate: '',
    incidentLocation: '',
    description: '',
    reporterName: '',
    reporterContact: '',
    relationship: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally submit to an API
    console.log('Form data submitted:', formData);
    
    // Show success message
    toast({
      title: "Case reported successfully",
      description: "Your case has been submitted and will be processed shortly.",
      variant: "default",
    });
    
    // Reset form
    setFormData({
      victimName: '',
      victimAge: '',
      violenceType: '',
      incidentDate: '',
      incidentLocation: '',
      description: '',
      reporterName: '',
      reporterContact: '',
      relationship: ''
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Report a Case</h1>
          <p className="text-gray-600 mt-2">Fill the form below to report a case of gender-based violence</p>
        </div>

        {/* Language Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md overflow-hidden">
            <button
              className={`px-6 py-3 ${
                language === 'english' ? 'bg-safeMinor-purple text-white' : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => setLanguage('english')}
            >
              English
            </button>
            <button
              className={`px-6 py-3 ${
                language === 'kiswahili' ? 'bg-safeMinor-purple text-white' : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => setLanguage('kiswahili')}
            >
              Kiswahili
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Case Information</h2>
              <p className="text-gray-600 text-sm mb-6">All information is kept confidential and secure</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Victim Name *
                  </label>
                  <input
                    type="text"
                    name="victimName"
                    required
                    value={formData.victimName}
                    onChange={handleInputChange}
                    className="safeminor-input"
                    placeholder="Enter name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Victim Age *
                  </label>
                  <input
                    type="number"
                    name="victimAge"
                    required
                    value={formData.victimAge}
                    onChange={handleInputChange}
                    className="safeminor-input"
                    placeholder="Enter age"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Form of Violence *
                  </label>
                  <select 
                    name="violenceType" 
                    required
                    value={formData.violenceType}
                    onChange={handleInputChange}
                    className="safeminor-input"
                  >
                    <option value="">Select type</option>
                    <option value="physical">Physical Abuse</option>
                    <option value="sexual">Sexual Abuse</option>
                    <option value="emotional">Emotional Abuse</option>
                    <option value="neglect">Neglect</option>
                    <option value="childMarriage">Child Marriage</option>
                    <option value="fgm">FGM</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Incident
                  </label>
                  <input
                    type="date"
                    name="incidentDate"
                    value={formData.incidentDate}
                    onChange={handleInputChange}
                    className="safeminor-input"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Location of Incident
                  </label>
                  <input
                    type="text"
                    name="incidentLocation"
                    value={formData.incidentLocation}
                    onChange={handleInputChange}
                    className="safeminor-input"
                    placeholder="County, town, or area"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description of the Incident
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="safeminor-input"
                    placeholder="Provide any details that may help in the investigation"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Reporter Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="reporterName"
                    value={formData.reporterName}
                    onChange={handleInputChange}
                    className="safeminor-input"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Contact Information
                  </label>
                  <input
                    type="text"
                    name="reporterContact"
                    value={formData.reporterContact}
                    onChange={handleInputChange}
                    className="safeminor-input"
                    placeholder="Phone or email"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Relationship to Victim
                  </label>
                  <select 
                    name="relationship" 
                    value={formData.relationship}
                    onChange={handleInputChange}
                    className="safeminor-input"
                  >
                    <option value="">Select relationship</option>
                    <option value="parent">Parent</option>
                    <option value="guardian">Guardian</option>
                    <option value="relative">Relative</option>
                    <option value="neighbor">Neighbor</option>
                    <option value="teacher">Teacher</option>
                    <option value="healthWorker">Health Worker</option>
                    <option value="lawEnforcement">Law Enforcement</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 flex flex-col items-center">
              <p className="text-sm text-gray-600 mb-4">
                By submitting this form, you confirm that the information provided is accurate to the best of your knowledge.
              </p>
              <button type="submit" className="safeminor-btn-primary w-full max-w-md">
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ReportCase;
