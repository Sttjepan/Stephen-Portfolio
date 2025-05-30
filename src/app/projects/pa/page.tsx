'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Image from 'next/image';

export default function Pa() {
  // locomotive-scroll init
  useEffect(() => {
    (async () => {
      // @ts-ignore
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      new LocomotiveScroll();
    })();
  }, []);

  // lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const researchImages = [
    '/images/pa/astronaut.png',
    '/images/pa/concept.png',
    '/images/pa/poster1.png',
    '/images/pa/poster2.png',
    '/images/pa/poster3.png',
    '/images/pa/poster4.png'
  ];

  return (
    <div>
      <div className="h-[20vh] w-full bg-gradient-to-b from-foreground to-background opacity-60" />
      {researchImages.map((asset, index) => (
        <Image
          key={index}
          src={asset}
          alt="Project specs"
          width={700}
          height={500}
          quality={100}
          style={{ width: '100%', height: 'auto' }}
        />
      ))}
    </div>
  );
}
