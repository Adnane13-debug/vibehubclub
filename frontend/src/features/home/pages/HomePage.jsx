import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import AboutSection from "../components/AboutSection";
import ActivitySection from "../components/ActivitySection";
import EventsPreviewSection from "../components/EventsPreviewSection";
import GallerySection from "../components/GallerySection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ActivitySection />
      <EventsPreviewSection />
      <GallerySection />
    </>
  );
}

export default HomePage;