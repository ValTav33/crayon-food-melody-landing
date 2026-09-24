import Atmosphere from '@/components/Atmosphere';
import BookingProvider from '@/components/BookingProvider';
import Events from '@/components/Events';
import Hero from '@/components/Hero';
import LocationSection from '@/components/LocationSection';
import MenuTeaser from '@/components/MenuTeaser';
import MobileActionBar from '@/components/MobileActionBar';
import Reviews from '@/components/Reviews';
import SectionNav from '@/components/SectionNav';
import SiteBackground from '@/components/SiteBackground';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import StoryGallery from '@/components/StoryGallery';

export default function Home() {
  return (
    <BookingProvider>
      <SiteBackground />
      <SiteHeader />
      <SectionNav />
      <main>
        <Hero />
        <Events />
        <MenuTeaser />
        <StoryGallery />
        <Atmosphere />
        <Reviews />
        <LocationSection />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </BookingProvider>
  );
}
