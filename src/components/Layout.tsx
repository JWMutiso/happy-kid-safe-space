
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  showBackground?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showBackground = false }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className={`flex-grow ${showBackground ? 'bg-[url("/child-background.jpg")] bg-cover bg-center bg-fixed bg-opacity-20' : ''}`}>
        <div className={`${showBackground ? 'bg-white/85 backdrop-blur-sm' : ''} min-h-full`}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
