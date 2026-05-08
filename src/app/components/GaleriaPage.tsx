import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Link } from 'react-router';
import svgPaths from "../../imports/Galeria-1/svg-636jzgaf5k";
import imgBg from "../../imports/Galeria-1/c7c1f8bc4297271495b65fddb697b9034042325b.png";

/* ─── Responsive hook ──────────────────────────────────────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

/* ─── Camera Icon ─────────────────────────────────────────────────────── */
function CameraIcon({ opacity = 0.25, size = 36 }: { opacity?: number; size?: number }) {
  return (
    <div style={{ width: size, height: size, position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: '16.67% 8.33%' }}>
        <div style={{ position: 'absolute', inset: '-6.25% -5%' }}>
          <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 33 27">
            <path d={svgPaths.p1aef3a00} stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={opacity} strokeWidth="3" />
          </svg>
        </div>
      </div>
      <div style={{ position: 'absolute', inset: '41.67% 37.5% 33.33% 37.5%' }}>
        <div style={{ position: 'absolute', inset: '-16.67%' }}>
          <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p19792100} stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round" strokeOpacity={opacity} strokeWidth="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── NavBar ───────────────────────────────────────────────────────────── */
function NavBar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Serviços', href: '/servicos' },
    { label: 'Galeria', href: '/galeria' },
    { label: 'Contato', href: '/contato' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16"
      style={{
        background: scrolled ? 'rgba(15,13,10,0.92)' : 'rgba(15,13,10,0.82)',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(6px)',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : '1px solid rgba(201,168,76,0.1)',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div className="flex items-center justify-between h-full px-[72px] max-md:px-6">
        <Link
          to="/"
          style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontStyle: 'italic', fontWeight: 300, fontSize: '18.4px', color: '#c9a84c', letterSpacing: '0.736px', lineHeight: '27.6px', textDecoration: 'none' }}
        >
          Hugo Ferreira
        </Link>

        <div className="hidden lg:flex gap-8 items-center">
          {navLinks.map(link => {
            const isRoute = link.href.startsWith('/');
            const Component = isRoute ? Link : 'a';
            const props = isRoute ? { to: link.href } : { href: link.href };
            return (
              <Component
                key={link.label}
                {...props}
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '14px', color: '#b0a89a', letterSpacing: '2.074px', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
                onMouseLeave={e => (e.currentTarget.style.color = '#b0a89a')}
              >
                {link.label}
              </Component>
            );
          })}
        </div>

        <a
          href="/#contato"
          className="hidden lg:flex items-center rounded-[2px] px-[22.4px] py-[8.5px]"
          style={{ background: '#c9a84c', fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '14px', color: '#1a1612', letterSpacing: '1.382px', textTransform: 'uppercase', textDecoration: 'none', transition: 'transform 0.25s ease, filter 0.25s ease' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; }}
        >
          Solicitar Proposta
        </a>

        <button
          className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block', width: 22, height: 1.5, background: '#c9a84c', borderRadius: 1,
                transition: 'transform 0.3s, opacity 0.3s',
                transform: menuOpen
                  ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                  : 'scaleX(0)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>
    </nav>
  );
}

/* ─── Mobile Menu ──────────────────────────────────────────────────────── */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Serviços', href: '/servicos' },
    { label: 'Galeria', href: '/galeria' },
    { label: 'Contato', href: '/contato' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-start overflow-y-auto"
          style={{ background: 'rgba(15,13,10,0.98)' }}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-6 w-11 h-11 flex items-center justify-center"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c9a84c', fontSize: '28px', lineHeight: 1 }}
          >
            ×
          </button>
          <nav className="flex flex-col items-center w-full pt-[72px] pb-4">
            {links.map((link, i) => {
              const isRoute = link.href.startsWith('/');
              const Component = isRoute ? Link : 'a';
              const props = isRoute ? { to: link.href } : { href: link.href };
              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.15 }}
                  className="w-full"
                >
                  <Component
                    {...props}
                    onClick={onClose}
                    className="w-full text-center py-3"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: '#faf7f2', textDecoration: 'none', borderBottom: '0.5px solid rgba(201,168,76,0.15)', display: 'block' }}
                  >
                    {link.label}
                  </Component>
                </motion.div>
              );
            })}
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.07 + 0.25 }}
              href="/#contato"
              onClick={onClose}
              className="mt-4 px-8 py-3"
              style={{ background: '#c9a84c', fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '14px', color: '#1a1612', letterSpacing: '1.382px', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px' }}
            >
              Solicitar Proposta
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Hero Interno ─────────────────────────────────────────────────────── */
function HeroInterno() {
  const isMobile = useIsMobile();

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden pt-16"
      style={{
        background: '#0f0d0a',
        height: isMobile ? '480px' : '550px',
        paddingTop: 64,
        paddingBottom: 72,
      }}
    >
      <div className="absolute inset-0 opacity-7">
        <img src={imgBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ maxWidth: 'none' }} />
      </div>
      <div
        className="absolute"
        style={{
          inset: '10% 0 10% 55%',
          backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 648 440\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(91.641 0 0 31.113 648 220)\\'><stop stop-color=\\'rgba(201,168,76,0.13)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(201,168,76,0)\\' offset=\\'0.7\\'/></radialGradient></defs></svg>')",
        }}
      />
      <div className="relative w-full flex justify-center" style={{ maxWidth: 1280 }}>
        <div className="flex flex-col gap-[22.8px] items-start justify-center px-[72px] py-20 w-full max-md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="flex items-center gap-3 w-full"
          >
            <div className="bg-[#c9a84c] h-[0.5px] w-8" />
            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', color: '#c9a84c', letterSpacing: '3.3px', textTransform: 'uppercase' }}>
              Quem Sou Eu
            </span>
          </motion.div>

          <div className="flex flex-col items-start w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: "'Cormorant Garamond', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(2rem, 6.5vw, 84px)',
                color: '#faf7f2',
                letterSpacing: '0.832px',
                textTransform: 'uppercase',
                lineHeight: '1.09',
                marginBottom: 0,
              }}
            >
              Meus pratos
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                fontFamily: "'Cormorant Garamond', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(2rem, 6.5vw, 84px)',
                letterSpacing: '0.832px',
                textTransform: 'uppercase',
                lineHeight: '1.09',
                marginTop: 0,
              }}
            >
              <span style={{ color: '#faf7f2' }}>& </span>
              <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Momentos.</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: isMobile ? '0.85rem' : '16px',
              color: '#faf7f2',
              lineHeight: '1.665',
              maxWidth: 460,
            }}
          >
            Da mise en place ao emplatamento final —<br />
            uma amostra do que faço com dedicação em cada evento.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ─── Lightbox ─────────────────────────────────────────────────────────── */
interface LightboxProps {
  open: boolean;
  index: number;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  cells: Array<{ category: string; imageUrl?: string }>;
}

function Lightbox({ open, index, onClose, onNavigate, cells }: LightboxProps) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };

    const preventScroll = (e: TouchEvent) => e.preventDefault();

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [open, onClose, onNavigate]);

  if (!open) return null;

  const currentCell = cells[index];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex items-center justify-center"
        style={{ background: 'rgba(15,13,10,0.96)', zIndex: 9999 }}
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center z-50"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c9a84c', fontSize: '1.5rem', fontWeight: 300, transition: 'opacity 0.25s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          ×
        </button>

        {!isMobile && (
          <>
            <button
              onClick={e => { e.stopPropagation(); onNavigate('prev'); }}
              className="absolute left-4 w-12 h-12 flex items-center justify-center z-50"
              style={{ background: 'none', border: '1px solid #c9a84c', borderRadius: '2px', cursor: 'pointer', color: '#c9a84c', fontSize: '1.2rem', transition: 'opacity 0.25s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              ←
            </button>
            <button
              onClick={e => { e.stopPropagation(); onNavigate('next'); }}
              className="absolute right-4 w-12 h-12 flex items-center justify-center z-50"
              style={{ background: 'none', border: '1px solid #c9a84c', borderRadius: '2px', cursor: 'pointer', color: '#c9a84c', fontSize: '1.2rem', transition: 'opacity 0.25s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              →
            </button>
          </>
        )}

        <motion.div
          key={index}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative flex flex-col items-center justify-center gap-4"
          style={{ maxWidth: '90vw', maxHeight: '90vh', padding: 20 }}
          onClick={e => e.stopPropagation()}
        >
          {currentCell?.imageUrl ? (
            <>
              <img
                src={currentCell.imageUrl}
                alt={currentCell.category}
                style={{
                  maxWidth: '100%',
                  maxHeight: '85vh',
                  objectFit: 'contain',
                  borderRadius: '2px'
                }}
              />
            </>
          ) : (
            <div className="flex items-center justify-center">
              <CameraIcon opacity={0.4} size={80} />
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Gallery Cell ────────────────────────────────────────────────────── */
interface CellProps {
  index: number;
  category: string;
  bg: string;
  delay: number;
  onClick: () => void;
  imageUrl?: string;
}

function GalleryCell({ index, category, bg, delay, onClick, imageUrl }: CellProps) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: isInView ? delay : 0 }}
      className="relative overflow-hidden cursor-pointer"
      style={{ background: bg, transition: 'filter 0.3s ease', height: '100%' }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt={category}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: hovered ? 'brightness(0.7)' : 'brightness(1)',
              transition: 'filter 0.3s ease, transform 0.5s ease',
              transform: hovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
          <div className="absolute inset-0 bg-black" style={{ opacity: hovered ? 0.2 : 0, transition: 'opacity 0.3s' }} />
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <CameraIcon opacity={hovered ? 1 : 0.25} />
        </div>
      )}
    </motion.div>
  );
}

/* ─── Masonry Gallery ──────────────────────────────────────────────────── */
function MasonryGallery() {
  const isMobile = useIsMobile();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(12);
  const categoryCycle = ['Eventos', 'Casamentos', 'Debutantes', 'Personal Chef', 'Corporativo'];
  const masonryPattern = [
    { bg: '#252018', colSpan: 1, rowSpan: 2 },
    { bg: '#1e1b14', colSpan: 1, rowSpan: 1 },
    { bg: '#32291f', colSpan: 1, rowSpan: 1 },
    { bg: '#262018', colSpan: 1, rowSpan: 1 },
    { bg: '#1e1b14', colSpan: 1, rowSpan: 1 },
    { bg: '#3a332a', colSpan: 1, rowSpan: 1 },
    { bg: '#2e2922', colSpan: 1, rowSpan: 1 },
    { bg: '#1a1612', colSpan: 2, rowSpan: 1 },
    { bg: '#322b22', colSpan: 1, rowSpan: 2 },
    { bg: '#332d24', colSpan: 1, rowSpan: 1 },
    { bg: '#3a332a', colSpan: 1, rowSpan: 1 },
    { bg: '#2e2922', colSpan: 1, rowSpan: 1 },
  ] as const;

  const imageNumbers = Array.from({ length: 58 }, (_, idx) => idx + 1).filter((number) => number !== 27);
  const cells = imageNumbers.map((imageNumber, index) => {
    const pattern = masonryPattern[index % masonryPattern.length];
    return {
      category: categoryCycle[index % categoryCycle.length],
      bg: pattern.bg,
      colSpan: pattern.colSpan,
      rowSpan: pattern.rowSpan,
      imageUrl: `/images/Galeria/foto-${String(imageNumber).padStart(2, '0')}.jpeg`,
    };
  });
  const visibleCells = cells.slice(0, visibleCount);
  const hasMorePhotos = visibleCount < cells.length;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const navigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setLightboxIndex(prev => (prev === 0 ? cells.length - 1 : prev - 1));
    } else {
      setLightboxIndex(prev => (prev === cells.length - 1 ? 0 : prev + 1));
    }
  };

  if (isMobile) {
    return (
      <>
        <section style={{ background: '#0f0d0a', padding: '3rem 0' }}>
          <div style={{ padding: '0 1.5rem' }}>
            <div
              className="grid gap-[3px]"
              style={{
                gridTemplateColumns: window.innerWidth < 380 ? '1fr' : 'repeat(2, 1fr)',
                gridAutoRows: '180px',
              }}
            >
              {visibleCells.map((cell, i) => (
                <GalleryCell
                  key={i}
                  index={i}
                  category={cell.category}
                  bg={cell.bg}
                  delay={i * 0.03}
                  onClick={() => openLightbox(i)}
                  imageUrl={cell.imageUrl}
                />
              ))}
            </div>
            {hasMorePhotos && (
              <div className="flex justify-center pt-8">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 12, cells.length))}
                  className="inline-flex items-center justify-center rounded-[2px] px-[29.8px] py-[13px]"
                  style={{
                    border: '1px solid #c9a84c',
                    background: 'transparent',
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 300,
                    fontSize: '13.1px',
                    color: '#c9a84c',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    minHeight: 44,
                  }}
                >
                  Ver mais fotos
                </button>
              </div>
            )}
          </div>
        </section>
        <Lightbox
          open={lightboxOpen}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={navigate}
          cells={cells}
        />
      </>
    );
  }

  return (
    <>
      <section style={{ background: '#0f0d0a', padding: '96px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 72px' }}>
          <div
            className="grid gap-[3px]"
            style={{
              gridTemplateColumns: 'repeat(4, 1fr)',
              gridAutoRows: 'minmax(220px, auto)',
            }}
          >
            {visibleCells.map((cell, i) => (
              <div
                key={i}
                style={{
                  gridColumn: `span ${cell.colSpan}`,
                  gridRow: `span ${cell.rowSpan}`,
                  minHeight: cell.rowSpan === 2 ? '443px' : '220px',
                }}
              >
                <GalleryCell
                  index={i}
                  category={cell.category}
                  bg={cell.bg}
                  delay={i * 0.05}
                  onClick={() => openLightbox(i)}
                  imageUrl={cell.imageUrl}
                />
              </div>
            ))}
          </div>
          {hasMorePhotos && (
            <div className="flex justify-center pt-8">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 12, cells.length))}
                className="inline-flex items-center justify-center rounded-[2px] px-[29.8px] py-[13px]"
                style={{
                  border: '1px solid #c9a84c',
                  background: 'transparent',
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: '13.1px',
                  color: '#c9a84c',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  minHeight: 44,
                }}
              >
                Ver mais fotos
              </button>
            </div>
          )}
        </div>
      </section>
      <Lightbox
        open={lightboxOpen}
        index={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={navigate}
        cells={cells}
      />
    </>
  );
}

/* ─── Instagram Section ───────────────────────────────────────────────── */
function InstagramSection() {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  useEffect(() => {
    if (document.querySelector('script[data-behold-widget="true"]')) return;
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://w.behold.so/widget.js';
    script.dataset.beholdWidget = 'true';
    document.head.append(script);
  }, []);

  return (
    <section ref={ref} style={{ background: '#0f0d0a', padding: isMobile ? '4rem 0' : '96px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 1.5rem' : '0 72px' }}>
        <div className={isMobile ? 'flex flex-col gap-12' : 'grid grid-cols-2 gap-20'}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', color: '#c9a84c', letterSpacing: '3.3px', textTransform: 'uppercase' }}>
                Mais conteúdo
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', sans-serif",
                  fontWeight: 300,
                  fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.8rem)' : '64px',
                  color: '#faf7f2',
                  lineHeight: '1.1',
                  letterSpacing: '0.64px',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                Siga minha <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>jornada</span><br />
                no Instagram.
              </h2>
            </div>

            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: isMobile ? '0.9rem' : '16px', color: '#faf7f2', lineHeight: '1.665', margin: 0 }}>
              Acompanhe os bastidores, novidades e criações diárias — do planejamento à execução.
            </p>

            <a
              href="https://www.instagram.com/chefehugoferreira/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: '16px', color: '#c9a84c', textDecoration: 'none', letterSpacing: '0.5px', transition: 'color 0.25s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#E8D5A3')}
              onMouseLeave={e => (e.currentTarget.style.color = '#c9a84c')}
            >
              @chefehugoferreira
            </a>

            <a
              href="https://www.instagram.com/chefehugoferreira/"
              target="_blank"
              rel="noopener noreferrer"
              className={isMobile ? 'w-full' : ''}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#c9a84c',
                padding: isMobile ? '14px 24px' : '13px 29.8px',
                borderRadius: '2px',
                fontFamily: "'Jost', sans-serif",
                fontWeight: 500,
                fontSize: '13.1px',
                color: '#1a1612',
                letterSpacing: '1.31px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'transform 0.25s ease, filter 0.25s ease',
                alignSelf: 'flex-start',
                width: isMobile ? '100%' : 'auto',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; }}
            >
              Ver no Instagram
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            className="w-full"
          >
            <behold-widget feed-id="ifUcMLp0pF4k1zMkCHPa" style={{ display: 'block', width: '100%' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Final ────────────────────────────────────────────────────────── */
function CTAFinalSection() {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} style={{ background: '#c9a84c', padding: isMobile ? '4rem 1.5rem' : '80px 72px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="flex flex-col items-center text-center gap-8">
          <div className="flex flex-col gap-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0 }}
              style={{
                fontFamily: "'Cormorant Garamond', sans-serif",
                fontWeight: 300,
                fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.8rem)' : '64px',
                color: '#1a1612',
                lineHeight: '1.1',
                letterSpacing: '0.64px',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Gostou do que viu?
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: "'Cormorant Garamond', sans-serif",
                fontWeight: 300,
                fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.8rem)' : '64px',
                color: '#1a1612',
                lineHeight: '1.1',
                letterSpacing: '0.64px',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Vamos criar <span style={{ fontStyle: 'italic' }}>juntos.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: isMobile ? '0.9rem' : '16px',
              color: '#1a1612',
              lineHeight: '1.665',
              maxWidth: 580,
              margin: 0,
            }}
          >
            Entre em contato e vamos conversar sobre como posso transformar seu evento em uma experiência gastronômica única.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className={isMobile ? 'flex flex-col gap-4 w-full' : 'flex gap-4'}
          >
            <a
              href="/#contato"
              className={isMobile ? 'w-full' : ''}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#1a1612',
                padding: isMobile ? '14px 24px' : '13px 29.8px',
                borderRadius: '2px',
                fontFamily: "'Jost', sans-serif",
                fontWeight: 500,
                fontSize: '13.1px',
                color: '#c9a84c',
                letterSpacing: '1.31px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'transform 0.25s ease, filter 0.25s ease',
                width: isMobile ? '100%' : 'auto',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; }}
            >
              Solicitar proposta
            </a>
            <Link
              to="/servicos"
              className={isMobile ? 'w-full' : ''}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: '1px solid #1a1612',
                padding: isMobile ? '13px 24px' : '12px 29.8px',
                borderRadius: '2px',
                fontFamily: "'Jost', sans-serif",
                fontWeight: 500,
                fontSize: '13.1px',
                color: '#1a1612',
                letterSpacing: '1.31px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'transform 0.25s ease, background 0.25s ease',
                width: isMobile ? '100%' : 'auto',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'rgba(26,22,18,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'transparent'; }}
            >
              Conhecer serviços
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Frase Final ─────────────────────────────────────────────────────── */
function FraseFinalSection() {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} style={{ background: '#0f0d0a', padding: isMobile ? '3rem 1.5rem' : '80px 72px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="flex flex-col items-center gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: isMobile ? 'clamp(1rem, 4vw, 1.4rem)' : '22.4px',
              color: '#faf7f2',
              lineHeight: '1.4',
              letterSpacing: '0.448px',
              textAlign: 'center',
              margin: 0,
            }}
          >
            "Cozinhar é o ato de transformar<br />
            ingredientes em memórias."
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 60 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ height: 2, background: '#c9a84c' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: '12px',
              color: '#faf7f2',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Hugo Ferreira · Chefe de Cozinha · Piracicaba/SP
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer Link ──────────────────────────────────────────────────────── */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isRoute = href.startsWith('/') && !href.startsWith('/#');
  const Component = isRoute ? Link : 'a';
  const props = isRoute ? { to: href } : { href };
  return (
    <Component
      {...props}
      style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '12.8px', color: '#7a6f62', textDecoration: 'none', lineHeight: '19.2px', display: 'block', transition: 'color 0.3s ease' }}
      onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
      onMouseLeave={e => (e.currentTarget.style.color = '#7a6f62')}
    >
      {children}
    </Component>
  );
}

function FooterSection() {
  return (
    <footer style={{ background: '#0f0d0a', borderTop: '1px solid #2e2922' }}>
      <div className="flex flex-col items-center pb-8 pt-[65px] px-[72px] max-md:px-6 max-md:pt-12 max-md:pb-8">
        <div className="w-full" style={{ maxWidth: 1200 }}>
          <div className="grid grid-cols-4 gap-12 mb-12 max-md:grid-cols-1 max-md:gap-8">
            <div className="flex flex-col gap-[15.47px]">
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d={svgPaths.p266d3a00} stroke="#C9A84C" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M0.5625 0.5625H9.5625" stroke="#C9A84C" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" transform="translate(4, 12.5)" />
                </svg>
                <span style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, fontSize: '17.6px', color: '#faf7f2' }}>Hugo Ferreira</span>
              </div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '12.5px', color: '#7a6f62', lineHeight: '1.8' }}>
                <p style={{ margin: 0 }}>Chefe de Cozinha & Gestor de Eventos</p>
                <p style={{ margin: 0 }}>(19) 98137-7754</p>
                <p style={{ margin: 0 }}>hugo.284356@gmail.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-[9.5px]">
              <h4 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '10.4px', color: '#c9a84c', letterSpacing: '2.08px', textTransform: 'uppercase', margin: 0 }}>Páginas</h4>
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/sobre">Sobre</FooterLink>
              <FooterLink href="/servicos">Serviços</FooterLink>
              <FooterLink href="/galeria">Galeria</FooterLink>
              <FooterLink href="/#contato">Contato</FooterLink>
            </div>

            <div className="flex flex-col gap-[9.5px]">
              <h4 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '10.4px', color: '#c9a84c', letterSpacing: '2.08px', textTransform: 'uppercase', margin: 0 }}>Serviços</h4>
              <FooterLink href="/servicos">Casamentos & Debutantes</FooterLink>
              <FooterLink href="/servicos">Personal Chef</FooterLink>
              <FooterLink href="/servicos">Eventos Corporativos</FooterLink>
              <FooterLink href="/servicos">Gestão de Cozinha</FooterLink>
            </div>

            <div className="flex flex-col gap-[9.5px]">
              <h4 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '10.4px', color: '#c9a84c', letterSpacing: '2.08px', textTransform: 'uppercase', margin: 0 }}>Redes Sociais</h4>
              <FooterLink href="https://www.instagram.com/chefehugoferreira/">@chefehugoferreira — Instagram</FooterLink>
              <FooterLink href="https://www.linkedin.com/in/hugoalexandreferreira/">Hugo Alexandre Ferreira — LinkedIn</FooterLink>
            </div>
          </div>

          <div className="pt-8" style={{ borderTop: '0.5px solid #2e2922' }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', color: '#7a6f62', textAlign: 'center', margin: 0 }}>
              © {new Date().getFullYear()} Hugo Ferreira · Chefe de Cozinha. Piracicaba, São Paulo.
            </p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', color: '#7a6f62', textAlign: 'center', margin: '8px 0 0' }}>
              Desenvolvido por{' '}
              <a
                href="https://www.mythikastudio.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#C9A84C', textDecoration: 'none', transition: 'opacity 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                Mythika Studio
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────────── */
export default function GaleriaPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#0f0d0a', minHeight: '100vh' }}>
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <HeroInterno />
        <MasonryGallery />
        <InstagramSection />
        <CTAFinalSection />
        <FraseFinalSection />
      </main>
      <FooterSection />
    </div>
  );
}