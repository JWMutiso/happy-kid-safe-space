
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { ShieldCheck, BarChart, Phone, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

const GBVRateCard = ({ county, rate, rank }: { county: string; rate: string; rank: string }) => {
  return (
    <div className="safeminor-card">
      <div className={`bg-safeMinor-lightPurple p-4`}>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-800">{county}</span>
          <span className="text-xs text-gray-600">{rank}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="text-3xl font-bold text-gray-800">{rate}</div>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div 
            className="bg-safeMinor-purple h-2 rounded-full" 
            style={{ width: `${parseInt(rate)}%` }} 
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="safeminor-card p-6">
      <div className="bg-safeMinor-lightPurple p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Home = () => {
  return (
    <Layout showBackground={true}>
      <div className="animate-fade-in">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              <span className="text-safeMinor-purple">SAFEMINOR</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10">
              SafeMinor Kenya provides a secure platform for reporting and managing gender-based violence cases against minors. Our goal is to create a safer environment for all children across Kenya.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/report-case" className="safeminor-btn-primary">
                Report a Case
              </Link>
              <Link to="/resources" className="safeminor-btn-secondary">
                Get Help
              </Link>
            </div>
          </div>
        </section>

        {/* GBV Rate Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">GBV Rate in Kenya</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">Counties with the highest rates of gender-based violence</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <GBVRateCard county="Bungoma" rate="33%" rank="Rank #1" />
              <GBVRateCard county="Homabay" rate="33%" rank="Rank #2" />
              <GBVRateCard county="Migori" rate="30%" rank="Rank #3" />
              <GBVRateCard county="Narok" rate="27%" rank="Rank #4" />
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How SafeMinor Kenya Works</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">Our platform connects victims, reporters, medical professionals, and law enforcement.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={<ShieldCheck className="h-6 w-6 text-safeMinor-purple" />} 
                title="Easy Reporting" 
                description="Report cases through our mobile app or USSD for areas with limited internet access." 
              />
              <FeatureCard 
                icon={<BarChart className="h-6 w-6 text-safeMinor-purple" />} 
                title="Case Tracking" 
                description="Monitor the progress of reported cases from initial report to resolution." 
              />
              <FeatureCard 
                icon={<Phone className="h-6 w-6 text-safeMinor-purple" />} 
                title="Stakeholder Notifications" 
                description="Automatic alerts to police officers and medical professionals when cases are reported." 
              />
              <FeatureCard 
                icon={<Users className="h-6 w-6 text-safeMinor-purple" />} 
                title="Support Network" 
                description="Connect victims with professional psychologists and support groups." 
              />
            </div>
          </div>
        </section>

        {/* USSD Section */}
        <section className="py-16 bg-safeMinor-purple">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Access SafeMinor Kenya via USSD</h2>
                <p className="text-xl text-white/90 mb-8">No internet? No problem. Access our services by dialing:</p>
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
                  <p className="text-3xl font-bold text-white text-center">*XXX*YYY#</p>
                  <p className="text-sm text-white/80 text-center mt-2">Available on all major mobile networks in Kenya</p>
                </div>
                
                <button className="bg-white text-safeMinor-purple font-medium rounded-lg px-6 py-3 hover:bg-white/90 transition-colors">
                  Learn More About USSD Access
                </button>
              </div>
              
              <div className="hidden md:block">
                <div className="relative w-64 h-96 mx-auto bg-gray-800 rounded-3xl overflow-hidden border-8 border-gray-900">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden flex items-center justify-center bg-black">
                    <div className="text-white text-center">
                      <h3 className="font-bold mb-2">SafeMinor USSD</h3>
                      <p className="text-sm text-gray-300">Dial *XXX*YYY# to access services</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
