'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import SlidingImages from '@/components/home/SlidingImages';
import ContrastCursor from '@/components/animations/cursor/contrastCursor';
import { LetterCollision } from '@/components/animations/textAnimations/scrollText';
import Magnetic from '@/components/animations/magnetic';
import Hero from '@/components/home/hero';
import Description from '@/components/home/Description/description';

const slider1 = [
  {
    color: 'white',
    src: 'pa/astronaut.png'
  },
  {
    color: 'white',
    src: 'pa/concept.png'
  },
  {
    color: '#21242b',
    src: 'pa/poster1.png'
  },
  {
    color: '#21242b',
    src: 'bltkq/controller.png'
  }
];
const slider2 = [
  {
    color: '#d4e3ec',
    src: 'pa/poster3.png'
  },
  {
    color: '#9289BD',
    src: 'pa/poster4.png'
  },
  {
    color: 'white',
    src: 'pa/poster2.png'
  },
];

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(true);
  const scrollContainerRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window?.scrollY > 0) {
        setShowScrollButton(false);
      } else {
        setShowScrollButton(true);
      }
    };

    window?.addEventListener('scroll', handleScroll);

    return () => {
      window?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToHero = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={scrollContainerRef} className="overflow-x-hidden">
      <LetterCollision />
      {showScrollButton && (
        <Magnetic>
          <div
            className="fixed bottom-4 right-8 flex cursor-pointer items-center space-x-2 text-3xl font-semibold sm:bottom-8"
            onClick={scrollToHero}
          >
            <p>Scroll</p>

            <ArrowDownRight strokeWidth={3} className="size-6" />
          </div>
        </Magnetic>
      )}
      <div id="hero" ref={heroRef}>
        <Hero />
      </div>
      <Description />
      <SlidingImages slider1={slider1} slider2={slider2} />
      <ContrastCursor isActive={false} text={'Go to project'} />
    </div>
  );
}
