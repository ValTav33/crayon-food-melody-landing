'use client';

import { useEffect } from 'react';

/** Escape-to-close and page scroll lock while a dialog is open. */
export function useModal(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, onClose]);
}
