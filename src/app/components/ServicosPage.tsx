import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Link } from 'react-router';
import svgPaths from "../../imports/Servicos/svg-dguawcu1mv";
import imgBg from "../../imports/Servicos/c7c1f8bc4297271495b65fddb697b9034042325b.png";
const imgCasamentos = "/images/servicos/casamentos.jpg";
const imgPersonalChef = "/images/servicos/personal-chef.jpg";
const imgEventos = "/images/servicos/eventos.jpg";
const imgGestao = "/images/servicos/gestao.jpg";

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
  const heroLines = [
    { text: 'Cada Serviço', italic: false, gold: false },
    { text: 'uma experiência', italic: true, gold: true },
    { text: 'única.', italic: false, gold: false },
  ];

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

          {/* Headline line-by-line */}
          <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, fontSize: 'clamp(2rem, 6.5vw, 84px)', textTransform: 'uppercase', lineHeight: '0.91', letterSpacing: '0.832px' }}>
            {heroLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
                style={{
                  color: line.gold ? '#c9a84c' : '#faf7f2',
                  fontStyle: line.italic ? 'italic' : 'normal',
                  lineHeight: '0.91',
                }}
              >
                {line.text}
              </motion.div>
            ))}
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 16, color: '#faf7f2', maxWidth: 460, lineHeight: '24.48px', marginTop: 22, marginBottom: 0 }}
          >
            Do planejamento à execução, cuido de cada detalhe para que o seu evento seja inesquecível.
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

          <div style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, fontSize: 'clamp(2rem, 8vw, 3rem)', textTransform: 'uppercase', lineHeight: '0.92', marginBottom: 20 }}>
            {[
              { text: 'Cada Serviço', italic: false, gold: false },
              { text: 'uma experiência', italic: true, gold: true },
              { text: 'única.', italic: false, gold: false },
            ].map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
                style={{ color: line.gold ? '#c9a84c' : '#faf7f2', fontStyle: line.italic ? 'italic' : 'normal' }}
              >
                {line.text}
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: '0.85rem', color: '#faf7f2', lineHeight: '1.65', marginBottom: 0 }}
          >
            Do planejamento à execução, cuido de cada detalhe para que o seu evento seja inesquecível.
          </motion.p>
        </div>
      </section>
    </>
  );
}

/* ─── Service Card ─────────────────────────────────────────────────────── */
type CardData = {
  tag: string;
  title: string;
  desc: string;
  bullets: string[];
  img: string;
  delay: number;
};

function ServiceCard({ tag, title, desc, bullets, img, delay }: CardData) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [hovered, setHovered] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  const isMobile = useIsMobile();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className="relative overflow-hidden"
      style={{ background: '#0f0d0a', minHeight: 480 }}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => { setHovered(false); setCtaHovered(false); }}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 320)}
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          alt=""
          src={img}
          className="absolute left-0 w-full max-w-none"
          style={{
            height: '133.33%',
            top: '-16.67%',
            objectFit: 'cover',
            filter: hovered ? 'brightness(0.7)' : 'brightness(0.55)',
            transition: 'filter 0.4s ease',
          }}
        />
      </div>

      {/* Dark overlay — lightens slightly on hover */}
      <div
        className="absolute inset-0"
        style={{
          background: hovered ? 'rgba(15,13,10,0.52)' : 'rgba(15,13,10,0.72)',
          transition: 'background 0.4s ease',
        }}
      />

      {/* Category tag — top left */}
      <div
        className="absolute left-6 flex items-center px-[13.8px] py-[5.8px]"
        style={{
          top: 24,
          border: `1px solid ${hovered ? 'rgba(201,168,76,0.7)' : 'rgba(201,168,76,0.4)'}`,
          transition: 'border-color 0.4s ease',
        }}
      >
        <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '9.9px', color: '#c9a84c', letterSpacing: '1.984px', textTransform: 'uppercase' }}>
          {tag}
        </span>
      </div>

      {/* Gradient content area — slides up on hover */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          background: 'linear-gradient(to top, rgba(15,13,10,0.97) 0%, rgba(15,13,10,0.92) 60%, rgba(15,13,10,0) 100%)',
          transform: hovered
            ? `translateY(${isMobile ? '-3px' : '-6px'})`
            : 'translateY(0)',
          transition: 'transform 0.4s ease',
        }}
      >
        <div className="flex flex-col gap-[12.9px] pb-[29.18px] pt-8 px-8">
          {/* Title */}
          <h3 style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 500, fontSize: 24, color: '#faf7f2', lineHeight: '29.44px', margin: 0 }}>
            {title}
          </h3>

          {/* Description */}
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 14, color: '#b0a89a', lineHeight: '23.62px', margin: 0 }}>
            {desc}
          </p>

          {/* Bullets */}
          <div style={{ borderTop: '1px solid rgba(201,168,76,0.2)', paddingTop: 21.69 }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', minHeight: 23.09, gap: 0 }}>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, color: '#c9a84c', fontSize: '12.5px', lineHeight: '23px', flexShrink: 0, width: 16.84 }}>─</span>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, color: '#b0a89a', fontSize: 14, lineHeight: '23px' }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA link */}
          <div style={{ paddingTop: 13.2, paddingBottom: 2.28 }}>
            <a
              href="/#contato"
              className="inline-flex items-center gap-[6.39px]"
              style={{ textDecoration: 'none', minHeight: 44, display: 'inline-flex', alignItems: 'center' }}
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
            >
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: '12.5px',
                  color: ctaHovered ? '#E8D5A3' : '#c9a84c',
                  letterSpacing: '0.998px',
                  display: 'inline-block',
                  transform: ctaHovered ? 'translateX(4px)' : 'translateX(0)',
                  transition: 'transform 0.25s ease, color 0.25s ease',
                }}
              >
                →
              </span>
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: '12.5px',
                  color: ctaHovered ? '#E8D5A3' : '#c9a84c',
                  letterSpacing: '0.998px',
                  transition: 'color 0.25s ease',
                }}
              >
                Solicitar proposta
              </span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Services Grid Wrapper (handles responsive grid) ──────────────────── */
function ServicosSection() {
  const isMobile = useIsMobile();

  const cards: CardData[] = [
    {
      tag: 'CERIMÔNIAS',
      title: 'Casamentos & Debutantes',
      desc: 'Cuido de tudo — do planejamento do cardápio à operação completa no dia mais especial da sua vida. Realizo degustações personalizadas e garanto sincronia total entre minha cozinha e a equipe do salão, do primeiro aperitivo à última sobremesa.',
      bullets: [
        'Reunião de briefing e definição do cardápio',
        'Degustação presencial com ajustes',
        'Coordenação de equipe de cozinha no evento',
        'Sincronia com equipe do salão e organização',
        'Controle de qualidade e apresentação dos pratos',
      ],
      img: imgCasamentos,
      delay: 0,
    },
    {
      tag: 'EXCLUSIVO',
      title: 'Personal Chef',
      desc: 'Crio cardápios sob medida para jantares intimistas, recepções familiares e celebrações privadas. Cuido de tudo: seleciono e compro os insumos, executo e sirvo no local — com atenção total à sua experiência e à dos seus convidados.',
      bullets: [
        'Cardápio personalizado conforme tema e perfil dos convidados',
        'Seleção e compra dos insumos',
        'Execução completa dos pratos no local',
        'Serviço e apresentação durante o jantar',
        'Atendimento exclusivo e direto',
      ],
      img: imgPersonalChef,
      delay: 0.12,
    },
    {
      tag: 'ALTO VOLUME',
      title: 'Eventos Especiais & Corporativos',
      desc: 'Tenho experiência consolidada em cozinhas de grande escala e sei entregar qualidade mesmo sob alta demanda. Atendo confraternizações corporativas, eventos temáticos, formaturas e celebrações que exigem produção em volume com padrão.',
      bullets: [
        'Planejamento e programação de produção',
        'Coordenação de equipe para grandes volumes',
        'Controle rigoroso de insumos e desperdícios',
        'Padronização de apresentação em escala',
        'Gestão do fluxo de serviço',
      ],
      img: imgEventos,
      delay: 0.24,
    },
    {
      tag: 'CONSULTORIA',
      title: 'Gestão de Cozinha',
      desc: 'Ofereço minha experiência para organizar, liderar e padronizar operações de cozinha em restaurantes, empresas e espaços de eventos. Cuido da equipe, dos cardápios e dos processos — para que sua operação funcione com eficiência e consistência.',
      bullets: [
        'Diagnóstico operacional da cozinha',
        'Organização e liderança de equipes',
        'Criação e padronização de processos',
        'Planejamento de cardápios e controle de estoque',
        'Acompanhamento e treinamento da equipe',
      ],
      img: imgGestao,
      delay: 0.36,
    },
  ];

  return (
    <section style={{ background: '#0f0d0a', padding: isMobile ? '3rem 0' : '96px 0' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '3px',
          width: '100%',
        }}
      >
        {cards.map(card => (
          <ServiceCard key={card.tag} {...card} />
        ))}
      </div>
    </section>
  );
}

/* ─── CTA Final Section ────────────────────────────────────────────────── */
function CTAFinalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isMobile = useIsMobile();

  const headline = ['SEU EVENTO', 'MERECE O MELHOR.', 'VAMOS CRIAR JUNTOS.'];

  return (
    <section style={{ background: '#c9a84c' }}>
      <div
        ref={ref}
        className="flex flex-col items-center justify-center"
        style={{
          padding: isMobile ? '4rem 1.5rem' : '111.46px 72px 112px',
        }}
      >
        <div className="flex flex-col items-center gap-[22.9px] w-full" style={{ maxWidth: 720 }}>

          {/* Headline line-by-line */}
          <div
            className="text-center"
            style={{
              fontFamily: "'Cormorant Garamond', sans-serif",
              fontWeight: 300,
              fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.8rem)' : 51.2,
              textTransform: 'uppercase',
              color: '#1a1612',
              lineHeight: '0.95',
              letterSpacing: '2.048px',
            }}
          >
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
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: isMobile ? '0.88rem' : 16, color: '#2e2922', lineHeight: '25.84px', margin: 0 }}>
              Entre em contato e receba uma proposta gratuita e personalizada.<br />
              Respondo em até 24 horas.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-wrap justify-center gap-4 w-full"
            style={{ flexDirection: isMobile ? 'column' : 'row' }}
          >
            <a
              href="/#contato"
              className="flex items-center justify-center gap-2"
              style={{
                background: '#1a1612',
                fontFamily: "'Jost', sans-serif",
                fontWeight: 500,
                fontSize: '13.1px',
                color: '#c9a84c',
                letterSpacing: '1.574px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                minHeight: 49.2,
                padding: '13.6px 32px',
                transition: 'transform 0.25s ease, filter 0.25s ease',
                width: isMobile ? '100%' : 'auto',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; }}
              onTouchStart={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onTouchEnd={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <span style={{ color: '#c9a84c', fontSize: '13.1px', letterSpacing: '1.574px' }}>→</span>
              Solicitar Proposta
            </a>
            <a
              href="mailto:hugo.284356@gmail.com"
              className="flex items-center justify-center gap-2"
              style={{
                border: '1px solid #1a1612',
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: '13.1px',
                color: '#1a1612',
                letterSpacing: '1.574px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                minHeight: 49.2,
                padding: '14.6px 33px',
                transition: 'transform 0.25s ease, background 0.25s ease',
                width: isMobile ? '100%' : 'auto',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'rgba(26,22,18,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'transparent'; }}
              onTouchStart={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onTouchEnd={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <span style={{ fontSize: '13.1px', letterSpacing: '1.574px' }}>→</span>
              Falar Comigo
            </a>
          </motion.div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.75, ease: 'easeOut' }}
          >
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11.2px', color: '#2e2922', letterSpacing: '1.68px', textTransform: 'uppercase', textAlign: 'center', margin: 0 }}>
              Proposta gratuita · Sem compromisso · Resposta em até 24h
            </p>
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
  const isMobile = useIsMobile();

  return (
    <section style={{ background: '#0f0d0a' }}>
      <div
        ref={ref}
        className="flex flex-col items-center justify-center"
        style={{ padding: isMobile ? '3rem 1.5rem' : '80px 72px' }}
      >
        <div className="flex flex-col items-center gap-6" style={{ maxWidth: 700, width: '100%' }}>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center"
            style={{
              fontFamily: "'Cormorant Garamond', sans-serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: isMobile ? 'clamp(1rem, 4vw, 1.4rem)' : '22.4px',
              color: '#faf7f2',
              letterSpacing: '0.448px',
              lineHeight: '31.36px',
            }}
          >
            <p style={{ margin: 0 }}>&quot;COZINHAR É O ATO DE TRANSFORMAR</p>
            <p style={{ margin: 0 }}>INGREDIENTES EM MEMÓRIAS.&quot;</p>
          </motion.div>

          {/* Gold line growing */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 60 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            style={{ height: 2, background: '#c9a84c', flexShrink: 0 }}
          />

          {/* Signature */}
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
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/sobre">Sobre</FooterLink>
              <FooterLink href="/servicos">Serviços</FooterLink>
              <FooterLink href="/galeria">Galeria</FooterLink>
              <FooterLink href="/#contato">Contato</FooterLink>
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

/* ─── Main Page ─────────────────────────────────────────────────────────── */
export default function ServicosPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#0f0d0a', minHeight: '100vh' }}>
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <HeroInterno />
        <ServicosSection />
        <CTAFinalSection />
        <FraseFinalSection />
      </main>
      <FooterSection />
    </div>
  );
}