import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Link } from 'react-router';
import svgPaths from "../../imports/Home/svg-8qz5rmtaz0";
const imgHeroBg = "/images/Home/hero-bg-01.jpeg";
const imgHeroFoto1 = "/images/Home/hero-foto-1.jpg";
const imgHeroFoto2 = "/images/Home/hero-foto-2.jpg";
const imgHeroFoto3 = "/images/Home/hero-foto-3.jpg";
const imgPerfilHome = "/images/Home/perfil-/hugo-foto-sobre-home.jpeg";

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

/* ─── Counter hook ─────────────────────────────────────────────────────── */
function useCounter(end: number, duration = 1800, shouldStart = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end, duration, shouldStart]);
  return count;
}

/* ─── Arrow icon ───────────────────────────────────────────────────────── */
function ArrowRight({ stroke = '#C9A84C', size = 14 }: { stroke?: string; size?: number }) {
  return (
    <div className="relative shrink-0 overflow-clip" style={{ width: size, height: size }}>
      <div className="absolute" style={{ top: '50%', left: '20.83%', right: '20.83%', bottom: '50%' }}>
        <div className="absolute" style={{ inset: '-0.58px -7.14%' }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 1.16667">
            <path d="M0.583333 0.583333H8.75" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute" style={{ bottom: '20.83%', left: '50%', right: '20.83%', top: '20.83%' }}>
        <div className="absolute" style={{ inset: '-7.14% -14.29%' }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.25 9.33333">
            <path d={svgPaths.p1ab1aba0} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Navigation ───────────────────────────────────────────────────────── */
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
        {/* Logo */}
        <a href="#" style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontStyle: 'italic', fontWeight: 300, fontSize: '18.4px', color: '#c9a84c', letterSpacing: '0.736px', lineHeight: '27.6px', textDecoration: 'none' }}>
          Hugo Ferreira
        </a>

        {/* Desktop links */}
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

        {/* Desktop CTA */}
        <a
          href="https://wa.me/5519981377754?text=Ol%C3%A1%2C+Hugo%21+Vi+seu+portf%C3%B3lio+e+gostaria+de+solicitar+uma+proposta+para+meu+evento."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center rounded-[2px] px-[22.4px] py-[8.5px]"
          style={{ background: '#c9a84c', fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '14px', color: '#1a1612', letterSpacing: '1.382px', textTransform: 'uppercase', textDecoration: 'none', transition: 'transform 0.25s ease, filter 0.25s ease' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; }}
        >
          Solicitar Proposta
        </a>

        {/* Mobile hamburger */}
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
                display: 'block',
                width: 22,
                height: 1.5,
                background: '#c9a84c',
                borderRadius: 1,
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
              href="https://wa.me/5519981377754?text=Ol%C3%A1%2C+Hugo%21+Vi+seu+portf%C3%B3lio+e+gostaria+de+solicitar+uma+proposta+para+meu+evento."
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="mt-4 px-8 py-3 rounded-[2px]"
              style={{ background: '#c9a84c', fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '14px', color: '#1a1612', letterSpacing: '1.382px', textTransform: 'uppercase', textDecoration: 'none', minHeight: 44, display: 'flex', alignItems: 'center' }}
            >
              Solicitar Proposta
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Hero Section ─────────────────────────────────────────────────────── */
function HeroSection() {
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  });
  const fadeIn = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.7, delay, ease: 'easeOut' as const },
  });

  return (
    <>
      {/* ── Desktop Hero ─────────────────────────────────────── */}
      <section
        className="hidden md:block relative overflow-hidden"
        style={{ background: '#0f0d0a', paddingTop: 64, minHeight: 768 }}
      >
        {/* Texture overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.07 }}>
          <img alt="" src={imgHeroBg} className="absolute inset-0 size-full object-cover" />
        </div>
        {/* Radial glow */}
        <div className="absolute pointer-events-none" style={{ inset: '10% 0 10% 55%', backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 648 614.4\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(91.641 0 0 43.445 648 307.2)\\'><stop stop-color=\\'rgba(201,168,76,0.13)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(201,168,76,0)\\' offset=\\'0.7\\'/></radialGradient></defs></svg>')" }} />

        {/* Content row — grid 55/45 no desktop, empilha no tablet */}
        <div className="relative z-10 mx-auto w-full" style={{ padding: '48px 72px 64px', maxWidth: 1440, boxSizing: 'border-box' }}>
          <div className="grid items-start gap-10 [grid-template-columns:1fr] lg:[grid-template-columns:55fr_45fr] lg:gap-[48px]">
            {/* Left: text block */}
            <div className="flex flex-col gap-8 min-w-0">
              <motion.div {...fadeUp(0)} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11.2px', color: '#999', letterSpacing: '2.8px', textTransform: 'uppercase' }}>
                Chefe de Cozinha &amp; Gestor de Eventos · Piracicaba/SP
              </motion.div>

              {/* Desktop: headline — 72px, 4 linhas */}
              <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, fontSize: 72, textTransform: 'uppercase', lineHeight: '1.05', color: '#faf7f2' }}>
                {[
                  { content: <span>O SEU EVENTO</span>, delay: 0.1 },
                  { content: <span>MERECE O</span>, delay: 0.15 },
                  { content: <><span style={{ fontStyle: 'italic', color: '#c9a84c' }}>MELHOR</span> DA</>, delay: 0.2 },
                  { content: <span>GASTRONOMIA.</span>, delay: 0.25 },
                ].map((line, i) => (
                  <motion.div key={i} {...fadeUp(line.delay)} style={{ lineHeight: '1.05' }}>
                    {line.content}
                  </motion.div>
                ))}
              </div>

              <motion.div {...fadeUp(0.55)} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 16, color: '#faf7f2', maxWidth: 460, lineHeight: '26.4px' }}>
                São mais de 20 anos transformando ingredientes em momentos inesquecíveis.
              </motion.div>

              <motion.div {...fadeUp(0.7)} className="flex flex-wrap items-center gap-4">
                <HeroPrimaryBtn />
                <HeroSecondaryBtn />
              </motion.div>

              <motion.div {...fadeUp(0.85)} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 14, color: '#b0a89a', letterSpacing: '1.728px', textTransform: 'uppercase' }}>
                Casamentos · Debutantes · Eventos corporativos · Personal Chef
              </motion.div>
            </div>

            {/* Right: photo grid */}
            <div
              className="grid gap-3 h-[220px] [grid-template-columns:repeat(3,1fr)] [grid-template-rows:1fr] lg:h-[580px] lg:[grid-template-columns:1fr] lg:[grid-template-rows:repeat(3,1fr)]"
            >
              {[
                { src: imgHeroFoto1, delay: 0.3 },
                { src: imgHeroFoto2, delay: 0.5 },
                { src: imgHeroFoto3, delay: 0.7 },
              ].map((photo, i) => (
                <motion.div
                  key={i}
                  {...fadeIn(photo.delay)}
                  className="relative overflow-hidden rounded-[1px]"
                  onMouseEnter={e => { (e.currentTarget.querySelector('img') as HTMLImageElement).style.transform = 'scale(1.04)'; (e.currentTarget.querySelector('img') as HTMLImageElement).style.filter = 'brightness(0.95)'; }}
                  onMouseLeave={e => { (e.currentTarget.querySelector('img') as HTMLImageElement).style.transform = 'scale(1)'; (e.currentTarget.querySelector('img') as HTMLImageElement).style.filter = 'brightness(1)'; }}
                >
                  <img alt="" src={photo.src} className="absolute inset-0 size-full object-cover pointer-events-none" style={{ transition: 'transform 0.7s ease, filter 0.7s ease' }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Hero ──────────────────────────────────────── */}
      <section className="md:hidden relative flex flex-col justify-center" style={{ minHeight: '100svh' }}>
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" src={imgHeroBg} className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(15,13,10,0.72)' }} />
        </div>

        <div className="relative z-10 flex flex-col px-6 pb-10" style={{ paddingTop: 'max(88px, 18svh)' }}>
          <motion.div {...fadeUp(0)} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11.2px', color: '#999', letterSpacing: '2.8px', textTransform: 'uppercase', marginBottom: 16 }}>
            Chefe de Cozinha &amp; Gestor de Eventos · Piracicaba/SP
          </motion.div>

          {/* Mobile: headline — fonte menor, 4 linhas */}
          <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, textTransform: 'uppercase', color: '#faf7f2', fontSize: 'clamp(1.8rem, 8vw, 2.8rem)', marginBottom: 20 }}>
            {[
              { content: <span>O SEU EVENTO</span>, delay: 0.1 },
              { content: <span>MERECE O</span>, delay: 0.15 },
              { content: <><span style={{ fontStyle: 'italic', color: '#c9a84c' }}>MELHOR</span> DA</>, delay: 0.2 },
              { content: <span>GASTRONOMIA.</span>, delay: 0.25 },
            ].map((line, i) => (
              <motion.div key={i} {...fadeUp(line.delay)} style={{ lineHeight: '1.05' }}>
                {line.content}
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.55)} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: '0.85rem', color: '#faf7f2', lineHeight: '1.65', marginBottom: 24 }}>
            São mais de 20 anos transformando ingredientes em momentos inesquecíveis.
          </motion.div>

          <motion.div {...fadeUp(0.7)} className="flex flex-col gap-3" style={{ marginBottom: 24 }}>
            <HeroPrimaryBtn mobile />
            <HeroSecondaryBtn mobile />
          </motion.div>

          <motion.div {...fadeUp(0.85)} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.65rem', color: '#b0a89a', letterSpacing: '1.728px', textTransform: 'uppercase', textAlign: 'center' }}>
            Casamentos · Debutantes · Eventos corporativos · Personal Chef
          </motion.div>
        </div>
      </section>
    </>
  );
}

function HeroPrimaryBtn({ mobile }: { mobile?: boolean }) {
  return (
    <a
      href="https://wa.me/5519981377754?text=Ol%C3%A1%2C+Hugo%21+Vi+seu+portf%C3%B3lio+e+gostaria+de+solicitar+uma+proposta+para+meu+evento."
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 rounded-[2px] ${mobile ? 'py-[14px] w-full' : 'px-[28.8px] py-[13px]'}`}
      style={{ background: '#c9a84c', fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '12.8px', color: '#1a1612', letterSpacing: '1.28px', textTransform: 'uppercase', textDecoration: 'none', minHeight: 44, transition: 'transform 0.25s ease' }}
      onMouseEnter={e => !mobile && (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
      onTouchStart={e => mobile && (e.currentTarget.style.transform = 'translateY(-1px)')}
      onTouchEnd={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <ArrowRight stroke="#1A1612" /> Solicitar Proposta
    </a>
  );
}

function HeroSecondaryBtn({ mobile }: { mobile?: boolean }) {
  return (
    <Link
      to="/galeria"
      className={`flex items-center justify-center gap-2 rounded-[2px] ${mobile ? 'py-[14px] w-full' : 'px-[29.8px] py-[14px]'}`}
      style={{ border: '1px solid #c9a84c', fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '12.8px', color: '#c9a84c', letterSpacing: '1.28px', textTransform: 'uppercase', textDecoration: 'none', minHeight: 44, transition: 'transform 0.25s ease, background 0.25s ease' }}
      onMouseEnter={e => { if (!mobile) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; } }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'transparent'; }}
      onTouchStart={e => mobile && (e.currentTarget.style.transform = 'translateY(-1px)')}
      onTouchEnd={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      Conhecer meu trabalho
    </Link>
  );
}

/* ─── About Section ────────────────────────────────────────────────────── */
function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isMobile = useIsMobile();

  return (
    <section id="sobre" ref={ref} style={{ background: '#1a1612' }}>
      <div className="flex flex-col items-center justify-center">
        <div className="px-[72px] py-[128px] max-md:px-6 max-md:py-16 w-full" style={{ maxWidth: 1344 }}>
          <div className="grid grid-cols-2 gap-24 max-md:grid-cols-1 max-md:gap-8">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 20 : 0 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative self-center"
            >
              <div className="relative pl-6 pt-6">
                <div className="overflow-hidden md:h-[520px] max-md:aspect-[3/4] max-md:min-h-[480px] max-md:w-full">
                  <img alt="Hugo Ferreira — Chefe de Cozinha" src={imgPerfilHome} className="block w-full h-full" style={{ objectFit: 'cover', objectPosition: '50% 0%' }} />
                </div>
                <div className="absolute inset-0 border border-[#c9a84c] border-solid pointer-events-none" />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 20 : 0 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
              className="self-center flex flex-col gap-6"
            >
              <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 16, color: '#c9a84c', letterSpacing: '2.8px', textTransform: 'uppercase' }}>
                Quem sou eu
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontStyle: 'italic', fontWeight: 400, fontSize: 24, color: '#faf7f2', lineHeight: '35.64px' }}>
                <p style={{ margin: 0, maxWidth: '42ch' }}>
                  Sou o Hugo Ferreira — chefe de cozinha com mais de 20 anos de experiência em eventos, restaurantes e cozinhas de alto padrão. Cada prato que preparo carrega um propósito: fazer você e seus convidados viverem algo que vai além da comida.
                </p>
              </div>
              <SaibaMaisLink />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SaibaMaisLink() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#sobre"
      className="inline-flex items-center gap-2 relative"
      style={{ textDecoration: 'none', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      <div style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.25s ease' }}>
        <ArrowRight stroke="#C9A84C" size={14} />
      </div>
      <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 20, color: '#c9a84c', lineHeight: '20.4px', position: 'relative' }}>
        Saiba mais sobre mim
        <span style={{ position: 'absolute', bottom: 0, left: 0, height: 1, background: '#c9a84c', width: hovered ? '100%' : '0%', transition: 'width 0.25s ease' }} />
      </span>
    </a>
  );
}

/* ─── Service icons ────────────────────────────────────────────────────── */
function IconWedding() {
  return (
    <div style={{ width: 24, height: 24, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: '12.48% 12.48% 12.5% 12.49%' }}>
        <div style={{ position: 'absolute', inset: '-5.55%' }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0069 20.0041">
            <path d={svgPaths.p4558300} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '29.17%', left: '25%', right: '25%', top: '70.83%' }}>
        <div style={{ position: 'absolute', inset: '-1px -8.33%' }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 2">
            <path d="M1 1H13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconChef() {
  return (
    <div style={{ width: 24, height: 24, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: '62.5% 33.33% 12.5% 8.33%' }}>
        <div style={{ position: 'absolute', inset: '-16.67% -7.14%' }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 8">
            <path d={svgPaths.p11b86180} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div style={{ position: 'absolute', inset: '13.03% 20.85% 54.7% 66.67%' }}>
        <div style={{ position: 'absolute', inset: '-12.92% -33.38%' }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.99644 9.74449">
            <path d={svgPaths.p2d238840} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div style={{ position: 'absolute', inset: '63.04% 8.33% 12.5% 79.17%' }}>
        <div style={{ position: 'absolute', inset: '-17.04% -33.33% -17.04% -33.34%' }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.00024 7.87024">
            <path d={svgPaths.p19976900} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div style={{ position: 'absolute', inset: '12.5% 45.83% 54.17% 20.83%' }}>
        <div style={{ position: 'absolute', inset: '-12.5%' }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.pb08b100} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconEvent() {
  return (
    <div style={{ width: 24, height: 24, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '8.33%', left: '25%', right: '25%', top: '8.33%' }}>
        <div style={{ position: 'absolute', inset: '-5% -8.33%' }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 22">
            <path d={svgPaths.p792ac80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '8.33%', left: '8.33%', right: '75%', top: '50%' }}>
        <div style={{ position: 'absolute', inset: '-10% -25%' }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 12">
            <path d={svgPaths.p286350a0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '8.33%', left: '75%', right: '8.33%', top: '37.5%' }}>
        <div style={{ position: 'absolute', inset: '-7.69% -25%' }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 15">
            <path d={svgPaths.p9a6a8c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconKitchen() {
  return (
    <div style={{ width: 24, height: 24, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '75%', left: '33.33%', right: '33.33%', top: '8.33%' }}>
        <div style={{ position: 'absolute', inset: '-25% -12.5%' }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
            <path d={svgPaths.p1d2a1500} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div style={{ position: 'absolute', inset: '16.67% 16.67% 8.33% 16.67%' }}>
        <div style={{ position: 'absolute', inset: '-5.56% -6.25%' }}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
            <path d={svgPaths.p27ca6d80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Services Section ─────────────────────────────────────────────────── */
function ServiceCard({ icon, name, delay }: { icon: React.ReactNode; name: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="relative self-stretch min-w-0"
      style={{ background: '#1a1612', transform: hovered ? 'translateY(-4px)' : 'translateY(0)', transition: 'transform 0.3s ease', cursor: 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ border: `0.5px solid ${hovered ? '#c9a84c' : '#2e2922'}`, transition: 'border-color 0.3s ease' }} />
      <div className="flex flex-col gap-5 px-[41px] py-[49px] max-md:px-6 max-md:py-8 relative">
        <div style={{ color: '#7A6F62' }}>{icon}</div>
        <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 400, fontSize: 24, color: hovered ? '#c9a84c' : '#faf7f2', lineHeight: '30px', transition: 'color 0.3s ease' }}>
          {name}
        </div>
        <div style={{ background: '#c9a84c', height: '0.5px', opacity: 0.3, width: 40 }} />
      </div>
    </motion.div>
  );
}

function ServicesSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.2 });
  const [btnHovered, setBtnHovered] = useState(false);

  const services = [
    { icon: <IconWedding />, name: 'Casamentos & Debutantes', delay: 0.1 },
    { icon: <IconChef />, name: 'Personal Chef', delay: 0.2 },
    { icon: <IconEvent />, name: 'Eventos Corporativos', delay: 0.3 },
    { icon: <IconKitchen />, name: 'Gestão de Cozinha', delay: 0.4 },
  ];

  return (
    <section id="servicos" style={{ background: '#0f0d0a' }}>
      <div className="flex flex-col items-center px-[72px] py-[128px] max-md:px-6 max-md:py-16">
        <div className="flex flex-col gap-12 w-full" style={{ maxWidth: 1200 }}>
          {/* Headline */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 24 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col items-center gap-[18px]"
          >
            <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11.2px', color: '#c9a84c', letterSpacing: '2.8px', textTransform: 'uppercase', textAlign: 'center' }}>
              O que faço
            </div>
            <div className="text-center" style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, textTransform: 'uppercase', color: '#faf7f2', lineHeight: '0.95', fontSize: 'clamp(1.8rem, 7vw, 4rem)' }}>
              <div>CADA SERVIÇO,</div>
              <div>
                UMA <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>EXPERIÊNCIA</span> ÚNICA.
              </div>
            </div>
          </motion.div>

          {/* Cards — desktop: 4 cols, mobile: 2 cols, tiny: 1 col */}
          <div className="grid gap-px grid-cols-2 min-[768px]:grid-cols-4 min-[380px]:grid-cols-2 max-[379px]:grid-cols-1" style={{ background: '#2e2922', paddingTop: 16 }}>
            {services.map(s => (
              <ServiceCard key={s.name} icon={s.icon} name={s.name} delay={s.delay} />
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center w-full max-md:w-full">
            <Link
              to="/servicos"
              className="inline-flex items-center justify-center gap-2 px-[29.8px] py-[13px] rounded-[2px] max-md:w-full"
              style={{ border: '1px solid #c9a84c', fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '13.1px', color: '#c9a84c', textDecoration: 'none', minHeight: 44, transition: 'background 0.25s ease' }}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
            >
              <span style={{ transform: btnHovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.25s ease', display: 'inline-flex' }}>
                <ArrowRight stroke="#C9A84C" />
              </span>
              <span style={{ position: 'relative' }}>
                Ver todos os serviços
                <span style={{ position: 'absolute', bottom: 0, left: 0, height: 1, background: '#c9a84c', width: btnHovered ? '100%' : '0%', transition: 'width 0.25s ease' }} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Numbers Section ──────────────────────────────────────────────────── */
function NumberItem({ value, label, detail, isCounter, endValue, delay }: {
  value?: string; label: string; detail: string; isCounter?: boolean; endValue?: number; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const count = useCounter(endValue ?? 0, 1800, isInView && !!isCounter);

  return (
    <div ref={ref} className="flex-1 min-w-0 relative self-stretch number-item">
      <div className="flex flex-col items-center gap-2 px-10 py-10 max-md:px-4 max-md:py-6">
        {/* Golden line */}
        <div style={{ height: 14.8, width: 60, display: 'flex', alignItems: 'flex-start' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 60 } : {}}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
            style={{ height: 2, background: '#c9a84c' }}
          />
        </div>
        {/* Value */}
        <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, color: '#c9a84c', textAlign: 'center', lineHeight: '1.3' }}
          className="text-[56px] max-md:text-[2.8rem]">
          {isCounter
            ? <>{count}<span>{value?.replace(/\d+/, '') ?? ''}</span></>
            : (
              <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: delay + 0.1, duration: 0.6 }}>
                {value}
              </motion.span>
            )
          }
        </div>
        <div className="max-md:text-[0.62rem]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: 12, color: '#faf7f2', textAlign: 'center', letterSpacing: '2.176px', textTransform: 'uppercase' }}>
          {label}
        </div>
        <div className="max-md:text-[0.68rem]" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 14, color: '#faf7f2', textAlign: 'center' }}>
          {detail}
        </div>
      </div>
    </div>
  );
}

function NumbersSection() {
  return (
    <section style={{ background: '#1a1612' }}>
      <style>{`
        .number-item { border-right: 1px solid #2e2922; }
        .number-item:last-child { border-right: none; }
        @media (max-width: 767px) {
          .number-item { border-right: none !important; }
        }
      `}</style>
      <div className="flex flex-col items-center px-[72px] py-[112px] max-md:px-6 max-md:py-12">
        <div className="flex max-md:grid max-md:grid-cols-2 w-full" style={{ maxWidth: 1200 }}>
          <NumberItem isCounter endValue={20} value="20+" label="Anos de experiência" detail="Desde 2004 em cozinhas e eventos" delay={0} />
          <NumberItem isCounter endValue={200} value="200+" label="Eventos realizados" detail="Casamentos, debutantes e especiais" delay={0.15} />
          <NumberItem value="3" label="Certificações de liderança" detail="Líderes Conectados · Líder Integral" delay={0.3} />
          <NumberItem value="∞" label="Cardápios criados" detail="Cada cliente, uma proposta única" delay={0.45} />
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ──────────────────────────────────────────────────────── */
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="contato" style={{ background: '#c9a84c' }}>
      <div ref={ref} className="flex flex-col items-center justify-center px-[72px] py-[144px] max-md:px-6 max-md:py-16">
        <div className="flex flex-col items-center gap-6 w-full" style={{ maxWidth: 900 }}>
          {/* Headline */}
          <div className="text-center" style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, textTransform: 'uppercase', color: '#1A1612', lineHeight: '0.95', fontSize: 'clamp(2rem, 9vw, 4.5rem)' }}>
            {['SEU EVENTO', 'MERECE O MELHOR.', 'VAMOS CONVERSAR.'].map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }} style={{ color: '#1A1612' }}>
                {line}
              </motion.div>
            ))}
          </div>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="text-center"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.88rem', color: '#1A1612', lineHeight: '25px', maxWidth: 520 }}
          >
            <p style={{ margin: 0 }}>Estou disponível para casamentos, debutantes, eventos corporativos e jantares privativos.</p>
            <p style={{ margin: 0 }}>Entre em contato e vamos criar juntos.</p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-wrap justify-center gap-4 w-full max-md:flex-col"
          >
            <a
              href="https://wa.me/5519981377754?text=Ol%C3%A1%2C+Hugo%21+Vi+seu+portf%C3%B3lio+e+gostaria+de+solicitar+uma+proposta+para+meu+evento."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-[2px] px-8 py-[14px] max-md:w-full"
              style={{ background: '#1a1612', fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '12.8px', color: '#c9a84c', letterSpacing: '1.28px', textTransform: 'uppercase', textDecoration: 'none', minHeight: 44, transition: 'transform 0.25s ease, filter 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; }}
              onTouchStart={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onTouchEnd={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <ArrowRight stroke="#C9A84C" /> Solicitar Proposta
            </a>
            <a
              href="mailto:hugo.284356@gmail.com"
              className="flex items-center justify-center rounded-[2px] px-8 py-[14px] max-md:w-full"
              style={{ border: '1px solid #1a1612', fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '12.8px', color: '#1a1612', letterSpacing: '1.28px', textTransform: 'uppercase', textDecoration: 'none', minHeight: 44, transition: 'transform 0.25s ease, background 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'rgba(26,22,18,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'transparent'; }}
              onTouchStart={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onTouchEnd={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              Falar Comigo
            </a>
          </motion.div>

          <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '10.9px', color: '#2e2922', textAlign: 'center', letterSpacing: '1.632px', textTransform: 'uppercase' }}>
            Proposta gratuita · Sem compromisso
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Quote Section ─────────────────────────────────────────────────────── */
function QuoteSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section style={{ background: '#0f0d0a' }}>
      <div ref={ref} className="flex flex-col items-center justify-center px-[72px] py-[80px] max-md:px-6 max-md:py-16">
        <div className="flex flex-col items-center gap-6" style={{ maxWidth: 700 }}>
          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center"
            style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.2rem, 5vw, 1.4rem)', color: '#faf7f2', letterSpacing: '0.448px', lineHeight: '31.36px' }}
          >
            <p style={{ margin: 0 }}>"COZINHAR É O ATO DE TRANSFORMAR</p>
            <p style={{ margin: 0 }}>INGREDIENTES EM MEMÓRIAS."</p>
          </motion.div>

          <motion.div
            initial={{ width: 0 }} animate={isInView ? { width: 60 } : {}} transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            style={{ height: 2, background: '#c9a84c' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <div className="flex items-center gap-2">
              <div style={{ width: 18, height: 18, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                <div style={{ position: 'absolute', inset: '12.48% 12.48% 12.5% 12.49%' }}>
                  <div style={{ position: 'absolute', inset: '-4.17%' }}>
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6301 14.628">
                      <path d={svgPaths.p266d3a00} stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
                    </svg>
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: '29.17%', left: '25%', right: '25%', top: '70.83%' }}>
                  <div style={{ position: 'absolute', inset: '-0.56px -6.25%' }}>
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.125 1.125">
                      <path d="M0.5625 0.5625H9.5625" stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
                    </svg>
                  </div>
                </div>
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, fontSize: '17.6px', color: '#faf7f2', lineHeight: '26.4px' }}>
                Hugo Ferreira
              </span>
            </div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 12, color: '#faf7f2', letterSpacing: '3px', textTransform: 'uppercase' }}>
              Hugo Ferreira · Chefe de Cozinha · Piracicaba/SP
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────────── */
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
            {/* Logo + contact */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div style={{ width: 18, height: 18, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', inset: '12.48% 12.48% 12.5% 12.49%' }}>
                    <div style={{ position: 'absolute', inset: '-4.17%' }}>
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6301 14.628">
                        <path d={svgPaths.p266d3a00} stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
                      </svg>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', bottom: '29.17%', left: '25%', right: '25%', top: '70.83%' }}>
                    <div style={{ position: 'absolute', inset: '-0.56px -6.25%' }}>
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.125 1.125">
                        <path d="M0.5625 0.5625H9.5625" stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
                      </svg>
                    </div>
                  </div>
                </div>
                <span style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, fontSize: '17.6px', color: '#faf7f2' }}>Hugo Ferreira</span>
              </div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '12.5px', color: '#7a6f62', lineHeight: '22.46px' }}>
                <p style={{ margin: 0 }}>Chefe de Cozinha &amp; Gestor de Eventos</p>
                <p style={{ margin: 0 }}>(19) 98137-7754</p>
                <p style={{ margin: 0 }}>hugo.284356@gmail.com</p>
              </div>
            </div>

            {/* Pages */}
            <div className="flex flex-col gap-2">
              <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '10.4px', color: '#c9a84c', letterSpacing: '2.08px', textTransform: 'uppercase', marginBottom: 6 }}>Páginas</div>
              {[['Home', '/'], ['Sobre', '/sobre'], ['Serviços', '/servicos'], ['Galeria', '/galeria'], ['Contato', '/#contato']].map(([label, href]) => (
                <FooterLink key={label} href={href}>{label}</FooterLink>
              ))}
            </div>

            {/* Services */}
            <div className="flex flex-col gap-2">
              <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '10.4px', color: '#c9a84c', letterSpacing: '2.08px', textTransform: 'uppercase', marginBottom: 6 }}>Serviços</div>
              {['Casamentos & Debutantes', 'Personal Chef', 'Eventos Especiais', 'Gestão de Cozinha'].map(s => (
                <div key={s} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '12.8px', color: '#7a6f62', lineHeight: '19.2px' }}>{s}</div>
              ))}
            </div>

            {/* Social */}
            <div className="flex flex-col gap-3">
              <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '10.4px', color: '#c9a84c', letterSpacing: '2.08px', textTransform: 'uppercase', marginBottom: 6 }}>Redes Sociais</div>
              <FooterLink href="https://www.instagram.com/chefehugoferreira/">@chefehugoferreira — Instagram</FooterLink>
              <FooterLink href="https://www.linkedin.com/in/hugoalexandreferreira/">Hugo Alexandre Ferreira — LinkedIn</FooterLink>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #2e2922', paddingTop: 32 }}>
            <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11.5px', color: '#666', textAlign: 'center', letterSpacing: '0.922px' }}>
              © 2026 Hugo Ferreira · Chefe de Cozinha · Piracicaba/SP · Todos os direitos reservados
            </div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11.5px', color: '#666', textAlign: 'center', letterSpacing: '0.922px', marginTop: 8 }}>
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main ──────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <div style={{ background: '#1a1612', width: '100%', overflowX: 'hidden' }}>
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <NumbersSection />
      <CTASection />
      <QuoteSection />
      <FooterSection />
    </div>
  );
}