import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FinalistBanner from './components/FinalistBanner';
import PredictionBanner from './components/PredictionBanner';
import FinalistShowcase from './components/FinalistShowcase';
import LiveBanner from './components/LiveBanner';
import { getHeroMode, HERO_MODE } from './utils/registrationUtils';
import InfoSection from './components/InfoSection';
import QASection from './components/QASection';
import PastHighlights from './components/PastHighlights';
import Footer from './components/Footer';

// 主 Banner 依活動階段自動切換:
// HERO(報名期)→ FINALIST(7/8 名單公佈)→ PREDICTION(8/1 冠軍預測)→ LIVE(9/7 倒數、9/11 直播)
const heroByMode = {
  [HERO_MODE.HERO]: <Hero />,
  [HERO_MODE.FINALIST]: <FinalistBanner />,
  [HERO_MODE.PREDICTION]: <PredictionBanner />,
  [HERO_MODE.LIVE]: <LiveBanner />
};

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

  const heroMode = getHeroMode();

  return (
    <div className="min-h-screen font-body relative">
      <Navbar />
      <main>
        {heroByMode[heroMode]}
        {/* 冠軍預測預告已內嵌於 FinalistBanner / LiveBanner 首屏(PredictionTeaserStrip),此處不再重複顯示 */}
        {/* 8/1 起名單自 Banner 下移為獨立區塊 */}
        {(heroMode === HERO_MODE.PREDICTION || heroMode === HERO_MODE.LIVE) && <FinalistShowcase />}
        <InfoSection />
        <QASection />
        <PastHighlights />
      </main>
      <Footer />
    </div>
  );
}

export default App;
