import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FinalistBanner from './components/FinalistBanner';
import { isFinalistAnnounced } from './utils/registrationUtils';
import InfoSection from './components/InfoSection';
import QASection from './components/QASection';
import PastHighlights from './components/PastHighlights';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen font-body relative">
      <Navbar />
      <main>
        {isFinalistAnnounced() ? <FinalistBanner /> : <Hero />}
        <InfoSection />
        <QASection />
        <PastHighlights />
      </main>
      <Footer />
    </div>
  );
}

export default App;
