
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Phone, Mail } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Contact = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            user_id: user?.id || null
          }
        ]);

      if (error) throw error;
      
      // Show success message
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Get in touch with our team for support, questions, or partnerships
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div className="bg-safeMinor-lightPurple p-3 rounded-full mb-4">
              <Phone className="h-6 w-6 text-safeMinor-purple" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <p className="text-gray-600 mb-3">Call our support line for assistance</p>
            <p className="text-safeMinor-purple text-xl font-bold">1195</p>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div className="bg-safeMinor-lightPurple p-3 rounded-full mb-4">
              <Mail className="h-6 w-6 text-safeMinor-purple" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-gray-600 mb-3">Send us an email anytime</p>
            <a 
              href="mailto:support@safeminorkenya.org" 
              className="text-safeMinor-purple text-xl font-bold hover:underline"
            >
              support@safeminorkenya.org
            </a>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <div className="bg-safeMinor-lightPurple p-3 rounded-full mb-4">
              <svg className="h-6 w-6 text-safeMinor-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Office Location</h3>
            <p className="text-gray-600 mb-3">Visit our central office</p>
            <p className="text-gray-800">Nairobi, Kenya</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="safeminor-input"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="safeminor-input"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="safeminor-input"
                      placeholder="What is your message about?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="safeminor-input"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      className="safeminor-btn-primary w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="hidden md:block">
              <div className="h-full rounded-xl overflow-hidden">
                <iframe 
                  title="Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19036281522!2d36.70730473092367!3d-1.3031637952356832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1621506762079!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
