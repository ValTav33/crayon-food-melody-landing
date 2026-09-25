'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import BookingModal from './BookingModal';

type BookingContextValue = {
  /** `eventId` shows that night's details and prices in the form */
  open: (occasion?: string, eventId?: string) => void;
  close: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}

export default function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [occasion, setOccasion] = useState<string | undefined>(undefined);
  const [eventId, setEventId] = useState<string | undefined>(undefined);

  const open = useCallback((next?: string, nextEventId?: string) => {
    setOccasion(next);
    setEventId(nextEventId);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal isOpen={isOpen} occasion={occasion} eventId={eventId} onClose={close} />
    </BookingContext.Provider>
  );
}
