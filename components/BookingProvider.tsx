'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import BookingModal from './BookingModal';

type BookingContextValue = {
  open: (occasion?: string) => void;
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

  const open = useCallback((next?: string) => {
    setOccasion(next);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal isOpen={isOpen} occasion={occasion} onClose={close} />
    </BookingContext.Provider>
  );
}
