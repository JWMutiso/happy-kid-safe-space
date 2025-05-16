
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Phone, MapPin, Clock, FileText, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EmergencyContact = ({ title, number, available }: { title: string; number: string; available: string }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="text-4xl font-bold text-safeMinor-purple mb-2">{number}</div>
      <div className="flex items-center text-gray-600">
        <Clock className="h-4 w-4 mr-1" />
        <span className="text-sm">{available}</span>
      </div>
    </div>
  );
};

const SupportCenter = ({ name, location, services, phone }: { name: string; location: string; services: string[]; phone: string }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <div className="flex items-start mb-2">
        <MapPin className="h-5 w-5 text-safeMinor-purple mr-2 mt-0.5" />
        <p className="text-gray-700">{location}</p>
      </div>
      <div className="flex items-start mb-2">
        <Phone className="h-5 w-5 text-safeMinor-purple mr-2 mt-0.5" />
        <p className="text-gray-700">{phone}</p>
      </div>
      <div className="mt-3">
        <p className="text-sm text-gray-600 mb-1">Services offered:</p>
        <div className="flex flex-wrap gap-2">
          {services.map((service, index) => (
            <span key={index} className="bg-safeMinor-lightPurple px-2 py-1 rounded-full text-xs">
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const LegalResource = ({ title, description, link }: { title: string; description: string; link: string }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <a 
        href={link} 
        className="text-safeMinor-purple hover:underline flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FileText className="h-5 w-5 mr-2" />
        View Document
      </a>
    </div>
  );
};

const EducationalMaterial = ({ title, type, audience, link }: { title: string; type: string; audience: string; link: string }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="text-gray-700 mb-4">
        <p><span className="font-medium">Type:</span> {type}</p>
        <p><span className="font-medium">Target audience:</span> {audience}</p>
      </div>
      <a 
        href={link} 
        className="text-safeMinor-purple hover:underline flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BookOpen className="h-5 w-5 mr-2" />
        Access Material
      </a>
    </div>
  );
};

const Resources = () => {
  const [activeTab, setActiveTab] = useState("emergency");
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Resources & Help</h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Find support services and information to help victims of gender-based violence
          </p>
        </div>
        
        <Tabs defaultValue="emergency" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            <TabsTrigger value="emergency" className="data-[state=active]:bg-safeMinor-purple data-[state=active]:text-white">
              Emergency Help
            </TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-safeMinor-purple data-[state=active]:text-white">
              Support Centers
            </TabsTrigger>
            <TabsTrigger value="legal" className="data-[state=active]:bg-safeMinor-purple data-[state=active]:text-white">
              Legal Resources
            </TabsTrigger>
            <TabsTrigger value="educational" className="data-[state=active]:bg-safeMinor-purple data-[state=active]:text-white">
              Educational Materials
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="emergency" className="mt-0">
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex items-center mb-4">
                <Phone className="h-6 w-6 text-safeMinor-purple mr-3" />
                <h2 className="text-2xl font-bold">Emergency Contacts</h2>
              </div>
              <p className="text-gray-700">
                If you or someone you know is in immediate danger, please contact one of these emergency services:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <EmergencyContact 
                title="National Police Service" 
                number="999" 
                available="Available 24/7" 
              />
              <EmergencyContact 
                title="Child Protection Hotline" 
                number="116" 
                available="Available 24/7" 
              />
              <EmergencyContact 
                title="Gender Violence Helpline" 
                number="1195" 
                available="Available 24/7" 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="support" className="mt-0">
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-2">Support Centers</h2>
              <p className="text-gray-700">
                Find support centers near you that provide assistance to victims of gender-based violence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SupportCenter 
                name="Nairobi Women's Hospital Gender Violence Recovery Centre"
                location="Argwings Kodhek Road, Nairobi"
                services={["Medical care", "Counseling", "Legal aid"]}
                phone="+254 719 638 006"
              />
              <SupportCenter 
                name="COVAW (Coalition on Violence Against Women)"
                location="Kindaruma Road, Nairobi"
                services={["Legal aid", "Counseling", "Community outreach"]}
                phone="+254 722 594 794"
              />
              <SupportCenter 
                name="FIDA Kenya"
                location="Muranga Road, Nairobi"
                services={["Legal representation", "Counseling", "Advocacy"]}
                phone="+254 722 509 760"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="legal" className="mt-0">
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-2">Legal Resources</h2>
              <p className="text-gray-700">
                Important legal information and documents relating to child protection and gender-based violence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LegalResource 
                title="Children's Act Kenya"
                description="The legal framework for child protection in Kenya, outlining the rights of children and measures for their protection."
                link="/resources/childrens-act.pdf"
              />
              <LegalResource 
                title="Sexual Offences Act"
                description="Comprehensive legislation addressing sexual violence and exploitation, including provisions specifically protecting minors."
                link="/resources/sexual-offences-act.pdf"
              />
              <LegalResource 
                title="Protection Against Domestic Violence Act"
                description="Legal provisions for protection orders and other measures to protect victims of domestic violence, including children."
                link="/resources/domestic-violence-act.pdf"
              />
              <LegalResource 
                title="National Gender-Based Violence Policy"
                description="Kenya's policy framework for addressing gender-based violence, including prevention and response mechanisms."
                link="/resources/gbv-policy.pdf"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="educational" className="mt-0">
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-2">Educational Materials</h2>
              <p className="text-gray-700">
                Resources for learning about gender-based violence prevention, response, and support.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <EducationalMaterial 
                title="Understanding GBV: A Guide for Communities"
                type="Handbook"
                audience="Community leaders, teachers, and parents"
                link="/resources/gbv-community-guide.pdf"
              />
              <EducationalMaterial 
                title="Recognizing Signs of Abuse in Children"
                type="Brochure"
                audience="Parents, teachers, and caregivers"
                link="/resources/abuse-signs-brochure.pdf"
              />
              <EducationalMaterial 
                title="Child-Friendly GBV Awareness"
                type="Illustrated Booklet"
                audience="Children ages 7-12"
                link="/resources/child-gbv-awareness.pdf"
              />
              <EducationalMaterial 
                title="Supporting GBV Survivors: Best Practices"
                type="Training Manual"
                audience="Healthcare providers and social workers"
                link="/resources/survivor-support-manual.pdf"
              />
              <EducationalMaterial 
                title="School-Based GBV Prevention Curriculum"
                type="Curriculum Guide"
                audience="Teachers and school administrators"
                link="/resources/school-gbv-curriculum.pdf"
              />
              <EducationalMaterial 
                title="Digital Safety for Youth"
                type="Online Course"
                audience="Teenagers and young adults"
                link="/resources/digital-safety-course.pdf"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Resources;
