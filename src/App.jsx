import CookieBanner from "@/components/common/CookieBanner.jsx";
import Countdown from "@/components/common/Countdown.jsx";
import Footer from "@/components/layout/Footer.jsx";
import Header from "@/components/layout/Header.jsx";
import AboutProject from "@/components/sections/AboutProject/AboutProject.jsx";
import CrashSlider from "@/components/sections/CrashSlider/CrashSlider.jsx";
import Documents from "@/components/sections/Documents/Documents.jsx";
import DriverStories from "@/components/sections/DriverStories/DriverStories.jsx";
import Hero from "@/components/sections/Hero/Hero.jsx";
import NewsSlider from "@/components/sections/NewsSlider/NewsSlider.jsx";
import QuizSection from "@/components/sections/Quiz/QuizSection.jsx";
import Statement from "@/components/sections/Statement/Statement.jsx";
import VideoStats from "@/components/sections/VideoStats/VideoStats.jsx";
import { useGoogleTagManager } from "@/hooks/useGoogleTagManager.js";

export default function App() {
  useGoogleTagManager();

  return (
    <Countdown>
      <Header />
      <main>
        <Hero />
        <Statement />
        <VideoStats />
        <CrashSlider />
        <section className="section-bleed">
          {/* <Documentary /> */}
          <DriverStories />
        </section>
        <section className="section-bleed">
          <QuizSection />
          <NewsSlider />
        </section>
        <Documents />
        <AboutProject />
      </main>
      <Footer />
      <CookieBanner />
    </Countdown>
  );
}
