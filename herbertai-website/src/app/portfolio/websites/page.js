'use client';

import { useState, useEffect, useCallback } from 'react';

const projects = [
  {
    id: 'sparkies',
    name: 'North Adelaide Sparkies',
    industry: 'Electrician',
    description: 'Bold, high-contrast site for a licensed electrical contractor. Built to convert — quote form, services, and trust signals front and centre.',
    screenshots: [
      { src: '/portfolio/home_-_spark.png', label: 'Homepage' },
      { src: '/portfolio/services_-_spark.png', label: 'Services' },
      { src: '/portfolio/about_-_spark.png', label: 'About' },
      { src: '/portfolio/contact_-_spark.png', label: 'Contact' },
    ],
    tag: 'Trades',
    palette: ['#1a1a1a', '#f5c518'],
  },
  {
    id: 'urbanedge',
    name: 'Urban Edge Barber',
    industry: 'Barber Shop',
    description: 'Dark, editorial design for an Adelaide CBD barbershop. Communicates craft and confidence — with an integrated booking flow.',
    screenshots: [
      { src: '/portfolio/home_-_haircut.png', label: 'Homepage' },
      { src: '/portfolio/services_-_haircut.png', label: 'Services' },
      { src: '/portfolio/about_-_haircut.png', label: 'About' },
      { src: '/portfolio/book_-_haircut.png', label: 'Book' },
    ],
    tag: 'Hospitality',
    palette: ['#0d0d0d', '#c0392b'],
  },
  {
    id: 'sammys',
    name: "Sammy's Café",
    industry: 'Café',
    description: 'Warm, editorial café site with a refined aesthetic. Features a seasonal menu, table reservations, and a story-first layout.',
    screenshots: [
      { src: '/portfolio/home_-_cafe.png', label: 'Homepage' },
      { src: '/portfolio/menu_-_cafe.png', label: 'Menu' },
      { src: '/portfolio/about_-_cafe.png', label: 'About' },
      { src: '/portfolio/contact_-_cafe.png', label: 'Contact' },
    ],
    tag: 'Hospitality',
    palette: ['#f5f0e8', '#8b6914'],
  },
];

export default function WebsitesPortfolioPage() {
  const [lightbox, setLightbox] = useState(null);

  const currentProject = lightbox ? projects.find(p => p.id === lightbox.projectId) : null;
  const currentScreenshot = currentProject ? currentProject.screenshots[lightbox.index] : null;

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prevImage = useCallback(() => {
    if (!lightbox || !currentProject) return;
    setLightbox(lb => ({
      ...lb,
      index: (lb.index - 1 + currentProject.screenshots.length) % currentProject.screenshots.length,
    }));
  }, [lightbox, currentProject]);

  const nextImage = useCallback(() => {
    if (!lightbox || !currentProject) return;
    setLightbox(lb => ({
      ...lb,
      index: (lb.index + 1) % currentProject.screenshots.length,
    }));
  }, [lightbox, currentProject]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, closeLightbox, prevImage, nextImage]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Portfolio · Websites</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Real websites.<br />Real Adelaide businesses.
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Every site we build is designed from scratch to match the business — not a template. Here&apos;s a look at what we&apos;ve made for local trades and service businesses.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-5xl space-y-24">
          {projects.map((project) => (
            <div key={project.id}>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
                <div>
                  <span className="inline-block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
                    {project.tag} · {project.industry}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
                  <p className="text-gray-500 mt-1 max-w-xl text-sm">{project.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {project.palette.map((c, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 rounded-full border border-gray-200 inline-block"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {project.screenshots.map((shot, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightbox({ projectId: project.id, index: idx })}
                    className={`group relative rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${idx === 0 ? 'col-span-2' : ''}`}
                    aria-label={`View ${shot.label} screenshot for ${project.name}`}
                  >
                    <div className="relative w-full aspect-video bg-gray-100">
                      <img
                        src={shot.src}
                        alt={`${project.name} – ${shot.label}`}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                          View
                        </span>
                      </div>
                    </div>
                    <div className="px-3 py-2 text-left">
                      <span className="text-xs text-gray-500">{shot.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-4">Want a site like this for your business?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            We build professional websites for Adelaide trades and local businesses — designed to get you more calls and enquiries.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && currentProject && currentScreenshot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-6xl w-full mx-4 flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <div>
                <span className="text-white font-semibold text-sm">{currentProject.name}</span>
                <span className="text-gray-400 text-sm ml-2">— {currentScreenshot.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-xs">
                  {lightbox.index + 1} / {currentProject.screenshots.length}
                </span>
                <button
                  onClick={closeLightbox}
                  className="text-gray-400 hover:text-white transition-colors text-2xl leading-none font-light"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-gray-900 shadow-2xl">
              <img
                src={currentScreenshot.src}
                alt={`${currentProject.name} – ${currentScreenshot.label}`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              {currentProject.screenshots.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors text-xl"
                    aria-label="Previous"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors text-xl"
                    aria-label="Next"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            <div className="flex gap-2 mt-3 justify-center">
              {currentProject.screenshots.map((shot, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightbox(lb => ({ ...lb, index: idx }))}
                  className={`w-16 h-10 rounded overflow-hidden border-2 transition-all ${idx === lightbox.index ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'}`}
                  aria-label={shot.label}
                >
                  <img src={shot.src} alt={shot.label} className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
