import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import QASection from './components/QASection';
import PastHighlights from './components/PastHighlights';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen font-body relative">
      <Navbar />
      <main>
        <Hero />
        <InfoSection />
        <QASection />
        <PastHighlights />
      </main>
      <Footer />
    </div>
  );
}

export default App;
