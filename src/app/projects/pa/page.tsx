'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import ProjectHero from '@/app/projects/project/hero';
import Image from 'next/image';
import TextGradient from '@/components/animations/textAnimations/textGradient';

export default function pa() {
  useEffect(() => {
    (async () => {
      // @ts-ignore
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  const researchImages = [
    '/images/pa/astronaut.png',
    '/images/pa/concept.png',
    '/images/pa/poster1.png',
    '/images/pa/poster2.png',
    '/images/pa/poster3.png',
    '/images/pa/poster4.png'
  ];
  ``;
  const description = 'Art';
  const heroText =
    'Discover Pixel Art for the game BloodLine True Kings Quest';

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div>
      <div className="h-[20vh] w-full bg-gradient-to-b from-foreground to-background opacity-60"></div>
      {researchImages.map((asset, index) => (
        <Image
          key={index}
          src={asset}
          alt="Project specs"
          width={700}
          height={500}
          quality={100}
          layout="responsive"
        />
      ))}
    </div>
  );
}
