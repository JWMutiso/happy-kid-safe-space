import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ReportCase = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'english' | 'kiswahili'>('english');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Text translations for multilingual support
  const translations = {
    english: {
      title: "Report a Case",
      subtitle: "Fill the form below to report a case of gender-based violence",
      caseInfo: "Case Information",
      confidential: "All information is kept confidential and secure",
      victimName: "Victim Name",
      victimAge: "Victim Age",
      violenceType: "Form of Violence",
      incidentDate: "Date of Incident",
      incidentLocation: "Location of Incident",
      description: "Description of the Incident",
      reporterInfo: "Reporter Information",
      yourName: "Your Name",
      yourContact: "Your Contact Information",
      relationship: "Relationship to Victim",
      confirmation: "By submitting this form, you confirm that the information provided is accurate to the best of your knowledge.",
      submit: "Submit Report",
      successTitle: "Case reported successfully",
      successMsg: "Your case has been submitted and will be processed shortly.",
      enterName: "Enter name",
      enterAge: "Enter age",
      selectType: "Select type",
      countyTown: "County, town, or area",
      provideDetails: "Provide any details that may help in the investigation",
      enterYourName: "Enter your name",
      phoneEmail: "Phone or email",
      selectRelationship: "Select relationship"
    },
    kiswahili: {
      title: "Ripoti Kesi",
      subtitle: "Jaza fomu hapa chini kuripoti kesi ya ukatili wa kijinsia",
      caseInfo: "Maelezo ya Kesi",
      confidential: "Maelezo yote yanawekwa kwa siri na usalama",
      victimName: "Jina la Mwathiriwa",
      victimAge: "Umri wa Mwathiriwa",
      violenceType: "Aina ya Ukatili",
      incidentDate: "Tarehe ya Tukio",
      incidentLocation: "Eneo la Tukio",
      description: "Maelezo ya Tukio",
      reporterInfo: "Maelezo ya Mripoti",
      yourName: "Jina Lako",
      yourContact: "Maelezo ya Mawasiliano",
      relationship: "Uhusiano na Mwathiriwa",
      confirmation: "Kwa kuwasilisha fomu hii, unathibitisha kuwa taarifa ulizotoa ni sahihi kwa kadri ya ufahamu wako.",
      submit: "Wasilisha Ripoti",
      successTitle: "Kesi imeripotiwa kwa mafanikio",
      successMsg: "Kesi yako imewasilishwa na itashughulikiwa hivi karibuni.",
      enterName: "Weka jina",
      enterAge: "Weka umri",
      selectType: "Chagua aina",
      countyTown: "Kaunti, mji, au eneo",
      provideDetails: "Toa maelezo yoyote yanayoweza kusaidia katika uchunguzi",
      enterYourName: "Weka jina lako",
      phoneEmail: "Simu au barua pepe",
      selectRelationship: "Chagua uhusiano"
    }
  };

  // Get the current language text
  const t = translations[language];

  // Violence type options
  const violenceTypeOptions = {
    english: [
      { value: "physical", label: "Physical Abuse" },
      { value: "sexual", label: "Sexual Abuse" },
      { value: "emotional", label: "Emotional Abuse" },
      { value: "neglect", label: "Neglect" },
      { value: "childMarriage", label: "Child Marriage" },
      { value: "fgm", label: "FGM" }
    ],
    kiswahili: [
      { value: "physical", label: "Ukatili wa Kimwili" },
      { value: "sexual", label: "Ukatili wa Kingono" },
      { value: "emotional", label: "Ukatili wa Kihisia" },
      { value: "neglect", label: "Utelekezaji" },
      { value: "childMarriage", label: "Ndoa za Utotoni" },
      { value: "fgm", label: "Ukeketaji" }
    ]
  };

  // Relationship options
  const relationshipOptions = {
    english: [
      { value: "parent", label: "Parent" },
      { value: "guardian", label: "Guardian" },
      { value: "relative", label: "Relative" },
      { value: "neighbor", label: "Neighbor" },
      { value: "teacher", label: "Teacher" },
      { value: "healthWorker", label: "Health Worker" },
      { value: "lawEnforcement", label: "Law Enforcement" },
      { value: "other", label: "Other" }
    ],
    kiswahili: [
      { value: "parent", label: "Mzazi" },
      { value: "guardian", label: "Mlezi" },
      { value: "relative", label: "Jamaa" },
      { value: "neighbor", label: "Jirani" },
      { value: "teacher", label: "Mwalimu" },
      { value: "healthWorker", label: "Mfanyakazi wa Afya" },
      { value: "lawEnforcement", label: "Mtekelezaji Sheria" },
      { value: "other", label: "Nyingine" }
    ]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('cases')
        .insert([
          {
            victim_name: formData.victimName,
            victim_age: formData.victimAge ? parseInt(formData.victimAge, 10) : null,
            violence_type: formData.violenceType,
            incident_date: formData.incidentDate || null,
            incident_location: formData.incidentLocation || null,
            description: formData.description || null,
            reporter_name: formData.reporterName || null,
            reporter_contact: formData.reporterContact || null,
            relationship: formData.relationship || null,
            user_id: user?.id || null
          }
        ]);

      if (error) throw error;
      
      // Show success message
      toast({
        title: t.successTitle,
        description: t.successMsg,
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
    } catch (error: any) {
      toast({
        title: "Error submitting case",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-gray-600 mt-2">{t.subtitle}</p>
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
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t.caseInfo}</h2>
              <p className="text-gray-600 text-sm mb-6">{t.confidential}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t.victimName} *
                  </label>
                  <input
                    type="text"
                    name="victimName"
                    required
                    value={formData.victimName}
                    onChange={handleInputChange}
                    className="safeminor-input"
                    placeholder={t.enterName}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t.victimAge} *
                  </label>
                  <input
                    type="number"
                    name="victimAge"
                    required
                    value={formData.victimAge}
                    onChange={handleInputChange}
                    className="safeminor-input"
                    placeholder={t.enterAge}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t.violenceType} *
                  </label>
                  <select 
                    name="violenceType" 
                    required
                    value={formData.violenceType}
                    onChange={handleInputChange}
                    className="safeminor-input"
                  >
                    <option value="placeholder">{t.selectType}</option>
                    {violenceTypeOptions[language].map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t.incidentDate}
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
                    {t.incidentLocation}
                  </label>
                  <input
                    type="text"
                    name="incidentLocation"
                    value={formData.incidentLocation}
                    onChange={handleInputChange}
                    className="safeminor-input"
                    placeholder={t.countyTown}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t.description}
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="safeminor-input"
                    placeholder={t.provideDetails}
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t.reporterInfo}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t.yourName}
                  </label>
                  <input
                    type="text"
                    name="reporterName"
                    value={formData.reporterName}
                    onChange={handleInputChange}
                    className="safeminor-input"
                    placeholder={t.enterYourName}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t.yourContact}
                  </label>
                  <input
                    type="text"
                    name="reporterContact"
                    value={formData.reporterContact}
                    onChange={handleInputChange}
                    className="safeminor-input"
                    placeholder={t.phoneEmail}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t.relationship}
                  </label>
                  <select 
                    name="relationship" 
                    value={formData.relationship}
                    onChange={handleInputChange}
                    className="safeminor-input"
                  >
                    <option value="placeholder">{t.selectRelationship}</option>
                    {relationshipOptions[language].map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 flex flex-col items-center">
              <p className="text-sm text-gray-600 mb-4">
                {t.confirmation}
              </p>
              <button 
                type="submit" 
                className="safeminor-btn-primary w-full max-w-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? '...' : t.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ReportCase;
