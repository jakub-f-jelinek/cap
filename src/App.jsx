import Footer from "@/components/layout/Footer.jsx";
import Header from "@/components/layout/Header.jsx";
import CrashSlider from "@/components/sections/CrashSlider/CrashSlider.jsx";
import Documentary from "@/components/sections/Documentary/Documentary.jsx";
import DriverStories from "@/components/sections/DriverStories/DriverStories.jsx";
import Hero from "@/components/sections/Hero/Hero.jsx";
import NewsSlider from "@/components/sections/NewsSlider/NewsSlider.jsx";
import QuizSection from "@/components/sections/Quiz/QuizSection.jsx";
import Statement from "@/components/sections/Statement/Statement.jsx";
import VideoStats from "@/components/sections/VideoStats/VideoStats.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <VideoStats />
        <CrashSlider />
        <section className="section-bleed">
          <Documentary />
          <DriverStories />
        </section>
        <section className="section-bleed">
          <QuizSection />
          <NewsSlider />
        </section>
      </main>
      <Footer />
    </>
  );
}
