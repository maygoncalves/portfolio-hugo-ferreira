import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Link } from 'react-router';
import svgPaths from "../../imports/Sobre/svg-lh2fqzfewc";
import imgBg from "../../imports/Sobre/c7c1f8bc4297271495b65fddb697b9034042325b.png";
const imgHugoPerfil = "/images/Sobre/hugo-foto-perfil.jpeg";

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

/* ─── Arrow icon ───────────────────────────────────────────────────────── */
function ArrowRight({ stroke = '#C9A84C', size = 14 }: { stroke?: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '20.83%', right: '20.83%', bottom: '50%' }}>
        <div style={{ position: 'absolute', inset: '-0.58px -7.14%' }}>
          <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 1.16667">
            <path d="M0.583333 0.583333H8.75" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '20.83%', left: '50%', right: '20.83%', top: '20.83%' }}>
        <div style={{ position: 'absolute', inset: '-7.14% -14.29%' }}>
          <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 5.25 9.33333">
            <path d={svgPaths.p1ab1aba0} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
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

/* ─── Hero Interno ─────────────────────────────────────────────────────── */
function HeroInterno() {
  // Headline split into words with special styling
  const heroWords: { text: string; italic?: boolean; gold?: boolean; br?: boolean }[] = [
    { text: 'NÃO' }, { text: 'SOU' }, { text: 'APENAS' }, { text: 'UM', br: true },
    { text: 'CHEF.' }, { text: 'SOU' }, { text: 'O' },
    { text: 'MÉTODO', italic: true, gold: true }, { text: 'DO', br: true },
    { text: 'SEU' }, { text: 'EVENTO.' },
  ];

  // Build lines: each line is an array of words
  const lines: typeof heroWords[] = [];
  let currentLine: typeof heroWords = [];
  for (const word of heroWords) {
    currentLine.push(word);
    if (word.br) {
      lines.push(currentLine);
      currentLine = [];
    }
  }
  if (currentLine.length) lines.push(currentLine);

  let wordCounter = 0;

  return (
    <>
      {/* Desktop */}
      <section
        className="hidden md:flex items-center relative overflow-hidden"
        style={{ background: '#0f0d0a', paddingTop: 64, minHeight: 550 }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.07 }}>
          <img alt="" src={imgBg} className="absolute inset-0 size-full object-cover" />
        </div>
        <div className="absolute inset-[10%_0_10%_55%]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 648 440\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(91.641 0 0 31.113 648 220)\\'><stop stop-color=\\'rgba(201,168,76,0.13)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(201,168,76,0)\\' offset=\\'0.7\\'/></radialGradient></defs></svg>')" }} />

        <div className="relative z-10 mx-auto w-full px-[72px] py-[80px]" style={{ maxWidth: 1280 }}>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-6"
          >
            <div style={{ width: 32, height: '0.5px', background: '#c9a84c' }} />
            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', color: '#c9a84c', letterSpacing: '3.3px', textTransform: 'uppercase' }}>
              Quem Sou Eu
            </span>
          </motion.div>

          {/* Headline word-by-word */}
          <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, fontSize: 'clamp(2rem, 6.5vw, 84px)', textTransform: 'uppercase', color: '#faf7f2', lineHeight: '0.91', letterSpacing: '0.832px' }}>
            {lines.map((line, lineIdx) => {
              const lineEl = (
                <div key={lineIdx} style={{ lineHeight: '0.91' }}>
                  {line.map((word) => {
                    const delay = 0.1 + wordCounter * 0.08;
                    wordCounter++;
                    return (
                      <motion.span
                        key={`${lineIdx}-${word.text}-${delay}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay, ease: 'easeOut' }}
                        style={{
                          display: 'inline-block',
                          marginRight: '0.22em',
                          fontStyle: word.italic ? 'italic' : 'normal',
                          color: word.gold ? '#c9a84c' : '#faf7f2',
                        }}
                      >
                        {word.text}
                      </motion.span>
                    );
                  })}
                </div>
              );
              return lineEl;
            })}
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 16, color: '#faf7f2', maxWidth: 460, lineHeight: '24.48px', marginTop: 22, marginBottom: 0 }}
          >
            Conheça minha história, minha formação e o que me move a cada evento.
          </motion.p>
        </div>
      </section>

      {/* Mobile */}
      <section
        className="md:hidden relative overflow-hidden"
        style={{ background: '#0f0d0a', paddingTop: 64, minHeight: '60svh' }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.1 }}>
          <img alt="" src={imgBg} className="absolute inset-0 size-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,13,10,0.4), rgba(15,13,10,0.7))' }} />

        <div className="relative z-10 px-6 py-12" style={{ paddingTop: 'max(80px, 14svh)' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0, ease: 'easeOut' }}
            className="flex items-center gap-3 mb-5"
          >
            <div style={{ width: 32, height: '0.5px', background: '#c9a84c' }} />
            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', color: '#c9a84c', letterSpacing: '3.3px', textTransform: 'uppercase' }}>
              Quem Sou Eu
            </span>
          </motion.div>

          <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, fontSize: 'clamp(2rem, 8vw, 3rem)', textTransform: 'uppercase', color: '#faf7f2', lineHeight: '0.92', marginBottom: 20 }}>
            {['NÃO SOU APENAS', 'UM CHEF. SOU O'].map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: 'easeOut' }}>
                {line}
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.26, ease: 'easeOut' }}>
              <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>MÉTODO</span> DO
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.34, ease: 'easeOut' }}>
              SEU EVENTO.
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: '0.85rem', color: '#faf7f2', lineHeight: '1.65', marginBottom: 0 }}
          >
            Conheça minha história, minha formação e o que me move a cada evento.
          </motion.p>
        </div>
      </section>
    </>
  );
}

/* ─── Historia Section ─────────────────────────────────────────────────── */
function HistoriaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isMobile = useIsMobile();
  const [btnHovered, setBtnHovered] = useState(false);

  const bullets = [
    'Mais de 20 anos de experiência em gastronomia e eventos',
    'Cardápios personalizados para cada tipo de celebração',
    'Gestão completa de cozinha — do planejamento ao serviço',
    'Formação em liderança: Líderes Conectados, Líder Integral e Desenvolvimento de Líderes',
    'Selo de Boas Práticas de Segurança Alimentar',
    'Disponível em Piracicaba/SP, em qualquer lugar do Brasil e no exterior',
  ];

  return (
    <section id="historia" style={{ background: '#1a1612' }}>
      <div ref={ref} className="flex flex-col items-center">
        <div className="px-[72px] py-[112px] max-md:px-6 max-md:py-16 w-full" style={{ maxWidth: 1424, boxSizing: 'border-box' }}>
          <div className="flex gap-20 items-start max-md:flex-col max-md:gap-0">

            {/* Photo column */}
            <div className="flex-1 min-w-0 self-center max-md:w-full">
              {/* Outer container for frame offset — padding creates the double-frame visual */}
              <div className="relative" style={{ paddingLeft: isMobile ? 12 : 24, paddingTop: isMobile ? 12 : 24 }}>
                {/* Photo */}
                <motion.div
                  initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 20 : 0 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="relative overflow-hidden"
                  style={{ height: isMobile ? 'auto' : 800, aspectRatio: isMobile ? '3/4' : undefined }}
                >
                  <img
                    alt="Hugo Ferreira — Chefe de Cozinha"
                    src={imgHugoPerfil}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center top' }}
                  />
                  {/* Badge "20+ Anos" */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                    className="absolute flex flex-col gap-[2px] items-start"
                    style={{ background: '#c9a84c', bottom: isMobile ? 16 : 18, right: isMobile ? 16 : 19, padding: '14.4px 17.6px' }}
                  >
                    <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 400, fontSize: 32, color: '#1a1612', lineHeight: '32px', textAlign: 'center' }}>
                      20+
                    </div>
                    <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '8.3px', color: '#1a1612', letterSpacing: '1.498px', textTransform: 'uppercase', textAlign: 'center' }}>
                      Anos de Paixão
                    </div>
                  </motion.div>
                </motion.div>
                {/* Golden frame — positioned at inset:0 of the padding-offset wrapper, creating the double-frame effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    border: '1px solid #c9a84c',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>

            {/* Text column */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 20 : 0 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
              className="flex-1 min-w-0 flex flex-col gap-5 max-md:pt-12"
              style={{ paddingTop: 8 }}
            >
              {/* Label */}
              <div className="flex items-center gap-3">
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 16, color: '#c9a84c', letterSpacing: '3.3px', textTransform: 'uppercase' }}>
                  Minha História
                </span>
                <div style={{ flex: 1, height: '0.5px', background: 'rgba(201,168,76,0.3)' }} />
              </div>

              {/* Headline */}
              <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, fontSize: 46.4, textTransform: 'uppercase', color: '#faf7f2', lineHeight: '44px', letterSpacing: '0.464px' }}>
                <div>Gastronomia</div>
                <div>
                  <span>Com </span>
                  <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Alma</span>
                  <span>,</span>
                </div>
                <div>Gestão Com</div>
                <div>Precisão.</div>
              </div>

              {/* Italic paragraph */}
              <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontStyle: 'italic', fontWeight: 300, fontSize: 24, color: '#faf7f2', lineHeight: '32px' }}>
                Minha história na gastronomia nasceu de uma paixão que virou ofício — e o ofício, referência.
              </div>

              {/* Body paragraphs */}
              <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 16, color: '#b0a89a', lineHeight: '26.75px' }}>
                <p style={{ margin: '0 0 12px 0' }}>
                  São mais de 20 anos entre restaurantes, cozinhas industriais e eventos de alto padrão. Sou formado em Gestão de Serviços de Alimentação e Chef de Cozinha Internacional pelo Instituto Gourmet, com passagens por grupos de eventos, restaurantes e cozinhas corporativas de grande escala.
                </p>
                <p style={{ margin: 0 }}>
                  Para mim, o cardápio começa quando entendo quem você é — e o que você quer sentir. Estou disponível para casamentos, debutantes, jantares intimistas, eventos corporativos, propostas de gestão e oportunidades como chefe de cozinha. Atuo em Piracicaba/SP, em qualquer lugar do Brasil e no exterior.
                </p>
              </div>

              {/* Divider */}
              <div style={{ background: 'rgba(201,168,76,0.25)', height: '0.5px', width: '100%' }} />

              {/* Bullets */}
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {bullets.map((bullet, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
                  >
                    <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, color: '#c9a84c', fontSize: '13.1px', lineHeight: '20.99px', flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, color: '#b0a89a', fontSize: '13.1px', lineHeight: '20.99px' }}>{bullet}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="/#contato"
                className="inline-flex items-center gap-2 max-md:justify-center max-md:w-full rounded-[2px] px-[35.2px] py-[13.6px]"
                style={{ background: '#c9a84c', fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '12.5px', color: '#1a1612', letterSpacing: '1.248px', textTransform: 'uppercase', textDecoration: 'none', minHeight: 44, alignSelf: 'flex-start', transition: 'transform 0.25s ease, filter 0.25s ease', display: 'inline-flex' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; }}
                onTouchStart={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
                onTouchEnd={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <ArrowRight stroke="#1A1612" /> Solicitar Proposta
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Diferenciais card icons ──────────────────────────────────────────── */
function IconExperiencia() {
  return (
    <div style={{ width: 20, height: 20, position: 'relative', flexShrink: 0 }}>
      <svg viewBox="0 0 20 20" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="10" cy="10" r="8.33" stroke="#C9A84C" strokeWidth="0.833" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 5.5V10L13 11.5" stroke="#C9A84C" strokeWidth="0.833" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
function IconCardapios() {
  return (
    <div style={{ width: 20, height: 20, position: 'relative', flexShrink: 0 }}>
      <svg viewBox="0 0 20 20" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M2.5 15V2.5H8.33C9.17 2.5 10 3.33 10 4.17C10 3.33 10.83 2.5 11.67 2.5H17.5V15H12.5C11.57 15 10.83 15.83 10 16.67C9.17 15.83 8.43 15 7.5 15H2.5Z" stroke="#C9A84C" strokeWidth="0.833" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 4.17V16.67" stroke="#C9A84C" strokeWidth="0.833" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
function IconGestao() {
  return (
    <div style={{ width: 20, height: 20, position: 'relative', flexShrink: 0 }}>
      <svg viewBox="0 0 20 20" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M3.5 7.5H16.5V14.5C16.5 15.33 15.83 16 15 16H5C4.17 16 3.5 15.33 3.5 14.5V7.5Z" stroke="#C9A84C" strokeWidth="0.833" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 7.5V6C7 5.17 8.35 4 10 4C11.65 4 13 5.17 13 6V7.5" stroke="#C9A84C" strokeWidth="0.833" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.5 7.5V6.5" stroke="#C9A84C" strokeWidth="0.833" strokeLinecap="round"/>
        <path d="M14.5 7.5V6.5" stroke="#C9A84C" strokeWidth="0.833" strokeLinecap="round"/>
      </svg>
    </div>
  );
}
function IconLideranca() {
  return (
    <div style={{ width: 20, height: 20, position: 'relative', flexShrink: 0 }}>
      <svg viewBox="0 0 20 20" fill="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="10" cy="7.5" r="3.33" stroke="#C9A84C" strokeWidth="0.833" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 1.5L11.25 5.67H15.5L12 8.17L13.25 12.33L10 9.83L6.75 12.33L8 8.17L4.5 5.67H8.75L10 1.5Z" stroke="#C9A84C" strokeWidth="0.833" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
function IconSeguranca() {
  return (
    <div style={{ width: 20, height: 20, position: 'relative', flexShrink: 0 }}>
      <svg viewBox="0 0 20 20" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M10 2.5C10 2.5 4 4.5 4 9.5C4 13.5 7 15.83 10 17.5C13 15.83 16 13.5 16 9.5C16 4.5 10 2.5 10 2.5Z" stroke="#C9A84C" strokeWidth="0.833" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
function IconAtendimento() {
  return (
    <div style={{ width: 20, height: 20, position: 'relative', flexShrink: 0 }}>
      <svg viewBox="0 0 20 20" fill="none" style={{ width: '100%', height: '100%' }}>
        <path d="M10 2C7.24 2 5 4.24 5 7C5 10.75 10 17 10 17C10 17 15 10.75 15 7C15 4.24 12.76 2 10 2Z" stroke="#C9A84C" strokeWidth="0.833" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="7" r="2" stroke="#C9A84C" strokeWidth="0.833" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

/* ─── Diferenciais Section ─────────────────────────────────────────────── */
function DiferenciaisCard({
  icon, title, detail, delay,
}: { icon: React.ReactNode; title: string; detail: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      style={{
        background: '#1a1612',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.3s ease',
        cursor: 'default',
        position: 'relative',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ border: `0.5px solid ${hovered ? '#c9a84c' : '#2e2922'}`, transition: 'border-color 0.3s ease' }}
      />
      <div className="flex flex-col gap-[7px] px-[25px] py-[29.8px]">
        <div style={{ color: '#c9a84c' }}>{icon}</div>
        <div
          style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 400, fontSize: 18, color: hovered ? '#c9a84c' : '#faf7f2', lineHeight: '22.88px', transition: 'color 0.3s ease', paddingTop: 7.9 }}
        >
          {title}
        </div>
        <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 14, color: '#7a6f62', lineHeight: '21.22px' }}>
          {detail}
        </div>
      </div>
    </motion.div>
  );
}

function DiferenciaisSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.2 });

  const cards = [
    { icon: <IconExperiencia />, title: '20+ Anos de Experiência', detail: 'Desde 2004 em cozinhas, restaurantes e eventos de alto padrão', delay: 0.1 },
    { icon: <IconCardapios />, title: 'Cardápios Personalizados', detail: 'Cada evento recebe uma proposta gastronômica única e sob medida', delay: 0.2 },
    { icon: <IconGestao />, title: 'Gestão Completa', detail: 'Do planejamento à operação — cuido de tudo, do primeiro ao último prato', delay: 0.3 },
    { icon: <IconLideranca />, title: 'Formação em Liderança', detail: 'Certificado em Líderes Conectados, Líder Integral e Desenvolvimento de Líderes', delay: 0.4 },
    { icon: <IconSeguranca />, title: 'Segurança Alimentar', detail: 'Selo oficial de Boas Práticas de Segurança Alimentar em todos os serviços', delay: 0.5 },
    { icon: <IconAtendimento />, title: 'Atendimento Nacional & Internacional', detail: 'Disponível em Piracicaba/SP, em qualquer lugar do Brasil e no exterior.', delay: 0.6 },
  ];

  return (
    <section style={{ background: '#0f0d0a' }}>
      <div className="flex flex-col items-center px-[72px] py-[112px] max-md:px-6 max-md:py-16">
        <div className="flex flex-col gap-[18.5px] items-center w-full" style={{ maxWidth: 1280 }}>
          {/* Label + Headline */}
          <div ref={titleRef}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex items-center justify-center"
            >
              <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 16, color: '#c9a84c', letterSpacing: '3.3px', textTransform: 'uppercase' }}>
                Por Que Me Escolher
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="text-center pb-[37.5px] pt-2"
            >
              <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, fontSize: 'clamp(1.8rem, 7vw, 3.2rem)', textTransform: 'uppercase', color: '#faf7f2', lineHeight: '0.95', letterSpacing: '0.512px' }}>
                O Que Me Torna
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(1.8rem, 7vw, 3.2rem)', textTransform: 'uppercase', color: '#c9a84c', lineHeight: '0.95' }}>
                Diferente.
              </div>
            </motion.div>
          </div>

          {/* Grid 3×2 — desktop, 2×3 — mobile */}
          <div
            className="w-full grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-3"
            style={{ display: 'grid', background: '#2e2922', gap: '1px', width: '100%' }}
          >
            {cards.map(c => (
              <DiferenciaisCard key={c.title} icon={c.icon} title={c.title} detail={c.detail} delay={c.delay} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Formação Section ─────────────────────────────────────────────────── */
function FormacaoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isMobile = useIsMobile();

  const certItems = [
    'Líderes Conectados',
    'Desenvolvimento de Líderes',
    'Líder Integral',
    'Boas Práticas de Segurança Alimentar (selo oficial)',
    'Controle de Estoque — Instituto Gourmet',
    'Curso de Pizzaiolo — Escola da Pizza',
  ];

  return (
    <section style={{ background: '#1a1612' }}>
      <div ref={ref} className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center px-[72px] py-[112px] max-md:px-6 max-md:py-16 w-full">
          <div className="flex flex-col gap-[18.5px] items-start w-full" style={{ maxWidth: 1280 }}>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex items-center gap-3"
            >
              <div style={{ width: 32, height: '0.5px', background: '#c9a84c' }} />
              <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 16, color: '#c9a84c', letterSpacing: '3.3px', textTransform: 'uppercase' }}>
                Formação &amp; Certificações
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 3.2rem)', textTransform: 'uppercase', color: '#faf7f2', lineHeight: '0.95', letterSpacing: '0.512px' }}>
                Técnica Com
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(2rem, 5vw, 3.2rem)', textTransform: 'uppercase', color: '#c9a84c', lineHeight: '0.95' }}>
                Propósito.
              </div>
            </motion.div>

            {/* Split layout */}
            <div className="flex items-start w-full max-md:flex-col" style={{ paddingTop: 37.5, position: 'relative' }}>

              {/* Left: Formação Acadêmica */}
              <motion.div
                className="flex-1 min-w-0"
                initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 20 : 0 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ paddingRight: isMobile ? 0 : 48, paddingBottom: 32 }}
              >
                <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: 16, color: '#c9a84c', letterSpacing: '2.176px', textTransform: 'uppercase', lineHeight: '16.32px', marginBottom: 24 }}>
                  Formação Acadêmica
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.07, ease: 'easeOut' }}
                  style={{ marginBottom: 24 }}
                >
                  <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 400, fontSize: 20, color: '#faf7f2', lineHeight: '20.8px' }}>
                    Gastronômico — Gestão de Serviços de Alimentação
                  </div>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 14, color: '#b0a89a', lineHeight: '19.2px', marginTop: 4 }}>
                    Instituto Gourmet · Jan 2021 – Ago 2022
                  </div>
                </motion.div>

                <div style={{ background: '#2e2922', height: '0.5px', width: '100%', marginBottom: 24 }} />

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.14, ease: 'easeOut' }}
                >
                  <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 400, fontSize: 20, color: '#faf7f2', lineHeight: '20.8px' }}>
                    Chef de Cozinha Internacional
                  </div>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 14, color: '#b0a89a', lineHeight: '19.2px', marginTop: 4 }}>
                    Instituto Gourmet Brasil · Set 2020 – Mai 2021
                  </div>
                </motion.div>
              </motion.div>

              {/* Vertical golden line (desktop only) */}
              {!isMobile && (
                <div style={{ width: 1, alignSelf: 'stretch', position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    style={{ position: 'absolute', inset: 0, background: 'rgba(201,168,76,0.18)', transformOrigin: 'top' }}
                  />
                </div>
              )}

              {/* Mobile separator */}
              {isMobile && (
                <div style={{ height: '0.5px', width: '100%', background: '#2e2922', margin: '8px 0 24px' }} />
              )}

              {/* Right: Cursos & Certificações */}
              <motion.div
                className="flex-1 min-w-0"
                initial={{ opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                style={{ paddingLeft: isMobile ? 0 : 49 }}
              >
                <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: 16, color: '#c9a84c', letterSpacing: '2.176px', textTransform: 'uppercase', lineHeight: '16.32px', marginBottom: 28.8 }}>
                  Cursos &amp; Certificações
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 11.2 }}>
                  {certItems.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: 'easeOut' }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
                    >
                      <span style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, color: '#c9a84c', fontSize: 16, lineHeight: '24px', flexShrink: 0 }}>─</span>
                      <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, color: '#faf7f2', fontSize: 14, lineHeight: '20.4px' }}>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Final Section ────────────────────────────────────────────────── */
function CTAFinalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const headline = ['PRONTO PARA', 'CRIAR ALGO', 'INESQUECÍVEL?'];

  return (
    <section style={{ background: '#c9a84c' }}>
      <div ref={ref} className="flex flex-col items-center justify-center px-[72px] py-[144px] max-md:px-6 max-md:py-16">
        <div className="flex flex-col items-center gap-6 w-full" style={{ maxWidth: 720 }}>

          {/* Headline line by line */}
          <div className="text-center" style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, textTransform: 'uppercase', color: '#1a1612', lineHeight: '0.95', letterSpacing: '0.512px', fontSize: 'clamp(2rem, 9vw, 3.2rem)' }}>
            {headline.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
              >
                {line}
              </motion.div>
            ))}
          </div>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="text-center"
          >
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 16, color: '#2e2922', lineHeight: '25.84px', margin: '0 0 0 0' }}>
              Estou disponível para casamentos, debutantes, eventos corporativos e<br className="max-md:hidden" /> jantares privativos. Vamos conversar sobre o seu evento.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-wrap justify-center gap-4 w-full max-md:flex-col"
          >
            <a
              href="mailto:hugo.284356@gmail.com"
              className="flex items-center justify-center gap-2 rounded-[2px] px-[35.2px] py-[14px] max-md:w-full"
              style={{ background: '#1a1612', fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '12.5px', color: '#c9a84c', letterSpacing: '1.248px', textTransform: 'uppercase', textDecoration: 'none', minHeight: 44, transition: 'transform 0.25s ease, filter 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; }}
              onTouchStart={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onTouchEnd={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <ArrowRight stroke="#C9A84C" /> Solicitar Proposta
            </a>
            <a
              href="mailto:hugo.284356@gmail.com"
              className="flex items-center justify-center rounded-[2px] px-[36.2px] py-[14px] max-md:w-full"
              style={{ border: '1px solid #1a1612', fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '12.5px', color: '#1a1612', letterSpacing: '1.248px', textTransform: 'uppercase', textDecoration: 'none', minHeight: 44, transition: 'transform 0.25s ease, background 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'rgba(26,22,18,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'transparent'; }}
              onTouchStart={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onTouchEnd={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              Falar Comigo
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Frase Final Section ──────────────────────────────────────────────── */
function FraseFinalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section style={{ background: '#0f0d0a' }}>
      <div ref={ref} className="flex flex-col items-center justify-center px-[72px] py-[80px] max-md:px-6 max-md:py-12">
        <div className="flex flex-col items-center gap-6" style={{ maxWidth: 700 }}>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center"
            style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1rem, 4vw, 1.4rem)', color: '#faf7f2', letterSpacing: '0.448px', lineHeight: '1.6' }}
          >
            <p style={{ margin: 0 }}>"NÃO SOU APENAS UM CHEF.</p>
            <p style={{ margin: 0 }}>SOU O MÉTODO DO SEU EVENTO."</p>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 60 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            style={{ height: 2, background: '#c9a84c', flexShrink: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <div className="flex items-center gap-2">
              <div style={{ width: 18, height: 18, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                <div style={{ position: 'absolute', inset: '12.48% 12.48% 12.5% 12.49%' }}>
                  <div style={{ position: 'absolute', inset: '-4.17%' }}>
                    <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 14.6301 14.628">
                      <path d={svgPaths.p266d3a00} stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
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
                      <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 14.6301 14.628">
                        <path d={svgPaths.p266d3a00} stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
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
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main ──────────────────────────────────────────────────────────────── */
export default function SobrePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    window.scrollTo(0, 0);
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#0f0d0a', width: '100%', overflowX: 'hidden' }}>
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <HeroInterno />
      <HistoriaSection />
      <DiferenciaisSection />
      <FormacaoSection />
      <CTAFinalSection />
      <FraseFinalSection />
      <FooterSection />
    </div>
  );
}
