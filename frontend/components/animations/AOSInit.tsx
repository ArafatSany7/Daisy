"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSInit() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
      duration: 600,
      easing: 'ease-out-cubic',
    });
  }, []);

  useEffect(() => {
    // Refresh AOS whenever the route changes so new elements get animated
    AOS.refresh();
  }, [pathname]);

  return null;
}
