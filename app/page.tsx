import Atmosphere from '@/components/Atmosphere';
import BookingProvider from '@/components/BookingProvider';
import CtaBand from '@/components/CtaBand';
import Events from '@/components/Events';
import Hero from '@/components/Hero';
import LocationSection from '@/components/LocationSection';
import MenuTeaser from '@/components/MenuTeaser';
import MobileActionBar from '@/components/MobileActionBar';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import StoryGallery from '@/components/StoryGallery';

export default function Home() {
  return (
    <BookingProvider>
      <SiteHeader />
      <main>
        <Hero />
        <Events />
        <MenuTeaser />
        <StoryGallery />
        <Atmosphere />
        <CtaBand />
        <LocationSection />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </BookingProvider>
  );
}
