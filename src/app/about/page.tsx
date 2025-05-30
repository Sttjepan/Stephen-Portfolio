// src/app/about/page.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import Layout from '@/components/layout';

export default function About() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate stars
    if (!starsRef.current) return;
    gsap.to(starsRef.current.children, {
      y: 'random(-20, 20)',
      x: 'random(-20, 20)',
      rotation: 'random(-360, 360)',
      duration: 3,
      ease: 'none',
      repeat: -1,
      yoyo: true,
      stagger: 0.1,
    });
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-200 via-purple-300 to-yellow-200">
      <Layout title="About Me" center>
        <div className="relative min-h-screen">
          <div ref={starsRef}>
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-white opacity-70"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              {/* Left column: Profile image */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="rounded-full blur-3xl" />
                  <Image
                    className="relative z-10 mx-auto h-auto w-full max-w-sm rounded-t-full shadow-lg"
                    width={1440}
                    height={1800}
                    src="/images/profile2.jpg"
                    alt="Stephen Semren"
                  />
                </div>
              </div>

              {/* Right column: Text content */}
              <div className="flex flex-col gap-8">
                <p className="text-2xl font-semibold">About Me</p>
                <p className="text-lg sm:text-xl">
                  Hello! I’m Stephen Semren — Currently studying Marketing &amp;
                  Advertising at Sheridan College. I build custom keyboards,
                  create databases for Team Fight Tactics, and code
                  retro-style games in my free time.
                </p>

                <div>
                  <h3 className="text-xl font-semibold">Goals</h3>
                  <ol className="list-decimal list-inside space-y-2 mt-2">
                    <li>
                      End of Summer 2025, develop an AI bot that can play Osu! 4k
                      Mania by feeding it gameplay data and training via my
                      rendered overlay.
                    </li>
                    <li>
                      End of Fall 2025, train my AI bot to speak using free
                      Vtuber software or a voice actor.
                    </li>
                    <li>
                      Early January 2026, launch a site showcasing my AI across
                      Osu! modes.
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold">Skills</h3>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>UI/UX Design</li>
                    <li>Webflow &amp; Development</li>
                    <li>Programming</li>
                  </ul>
                </div>

                {/* ──────────────── Resume Preview ──────────────── */}
                <div className="mt-8">
                  <div className="w-full h-[600px] border border-border rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src="/Stephen_Semren_Resume.pdf"
                      title="Resume Preview"
                      className="w-full h-full"
                    />
                  </div>
                  <a
                    href="/Stephen_Semren_Resume.pdf"
                    download
                    className="inline-block mt-4 px-5 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition"
                  >
                    Download PDF
                  </a>
                </div>
                {/* ──────────────────────────────────────────────── */}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
