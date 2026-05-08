import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Link } from 'react-router';
import svgPaths from '../../imports/Contato-1/svg-g4ykcy0w7r';
import imgBg from '../../imports/Contato-1/c7c1f8bc4297271495b65fddb697b9034042325b.png';

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

/* ─── Arrow icon (right) ───────────────────────────────────────────────── */
function ArrowIcon({ size = 14, color = '#C9A84C' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" style={{ display: 'block', flexShrink: 0 }}>
      <path d={`M1 7H13`} stroke={color} strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p1ab1aba0} stroke={color} strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Arrow icon large (16px) ──────────────────────────────────────────── */
function ArrowIconLg({ color = '#C9A84C' }: { color?: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M1 8H15" stroke={color} strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p3f0cc030} stroke={color} strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
          href="https://wa.me/5519981377754?text=Ol%C3%A1%2C+Hugo%21+Vi+seu+portf%C3%B3lio+e+gostaria+de+solicitar+uma+proposta+para+meu+evento."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center rounded-[2px] px-[22.4px] py-[8.5px]"
          style={{ background: '#c9a84c', fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '14px', color: '#1a1612', letterSpacing: '1.382px', textTransform: 'uppercase', textDecoration: 'none', transition: 'transform 0.25s ease, filter 0.25s ease' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.08)'; }}
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
              href="https://wa.me/5519981377754?text=Ol%C3%A1%2C+Hugo%21+Vi+seu+portf%C3%B3lio+e+gostaria+de+solicitar+uma+proposta+para+meu+evento."
              target="_blank"
              rel="noopener noreferrer"
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

/* ─── Hero ─────────────────────────────────────────────────────────────── */
function HeroSection() {
  const isMobile = useIsMobile();

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        background: '#0f0d0a',
        height: isMobile ? '480px' : '550px',
        paddingTop: 64,
      }}
    >
      <div className="absolute inset-0" style={{ opacity: 0.07 }}>
        <img
          src={imgBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ maxWidth: 'none' }}
        />
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
            <div style={{ width: 32, height: 0.5, background: '#c9a84c', flexShrink: 0 }} />
            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', color: '#c9a84c', letterSpacing: '3.3px', textTransform: 'uppercase' }}>
              Quem Sou Eu
            </span>
          </motion.div>

          <div className="flex flex-col items-start w-full">
            <motion.p
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
                lineHeight: '1.1',
                margin: 0,
              }}
            >
              Seu Evento
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                fontFamily: "'Cormorant Garamond', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(2rem, 6.5vw, 84px)',
                color: '#faf7f2',
                letterSpacing: '0.832px',
                textTransform: 'uppercase',
                lineHeight: '1.1',
                margin: 0,
              }}
            >
              Começa Com
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                fontFamily: "'Cormorant Garamond', sans-serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(2rem, 6.5vw, 84px)',
                color: '#c9a84c',
                letterSpacing: '0.832px',
                textTransform: 'uppercase',
                lineHeight: '1.1',
                margin: 0,
              }}
            >
              Uma Mensagem.
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: isMobile ? '0.85rem' : '16px',
              color: '#faf7f2',
              lineHeight: '24.48px',
              maxWidth: 460,
              margin: 0,
            }}
          >
            Estou disponível para casamentos, debutantes, eventos corporativos e jantares privativos.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ─── WhatsApp Pulse style ─────────────────────────────────────────────── */
const pulseKeyframes = `
@keyframes whatsapp-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
  50% { box-shadow: inset 0 0 0 2px rgba(201,168,76,0.4); }
}
`;

/* ─── Contact Cards Section ────────────────────────────────────────────── */
function ContactSection() {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  /* Email card hover state */
  const [emailHover, setEmailHover] = useState(false);
  const [emailLinkHover, setEmailLinkHover] = useState(false);
  const [emailArrowHover, setEmailArrowHover] = useState(false);

  /* Instagram card hover state */
  const [igHover, setIgHover] = useState(false);
  const [igHandleHover, setIgHandleHover] = useState(false);
  const [igArrowHover, setIgArrowHover] = useState(false);

  /* LinkedIn card hover state */
  const [liHover, setLiHover] = useState(false);
  const [liNameHover, setLiNameHover] = useState(false);
  const [liArrowHover, setLiArrowHover] = useState(false);

  const WA_URL = 'https://wa.me/5519981377754?text=Ol%C3%A1%2C+Hugo%21+Vi+seu+portf%C3%B3lio+e+gostaria+de+solicitar+uma+proposta+para+meu+evento.';
  const MAIL_URL = 'mailto:hugo.284356@gmail.com?subject=Proposta%20de%20Evento&body=Ol%C3%A1%2C%20Hugo!%20Gostaria%20de%20solicitar%20uma%20proposta.';

  return (
    <section ref={ref} style={{ background: '#1a1612' }}>
      <style>{pulseKeyframes}</style>
      <div className="flex flex-col items-center" style={{ padding: isMobile ? '4rem 1.5rem' : '96px 72px' }}>
        <div
          className={isMobile ? 'flex flex-col gap-3 w-full' : 'flex gap-6 w-full'}
          style={{ maxWidth: 1200 }}
        >
          {/* ── LEFT COLUMN ─────────────────────────── */}
          <div className={isMobile ? 'flex flex-col gap-3 w-full' : 'flex flex-col gap-4 flex-1 min-w-0'}>

            {/* WhatsApp Card */}
            <motion.a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              style={{
                display: 'block',
                background: '#c9a84c',
                borderRadius: 2,
                padding: isMobile ? '28px 24px' : '40px',
                textDecoration: 'none',
                animation: isInView ? 'whatsapp-pulse 3s ease-in-out 1.5s infinite' : 'none',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div className="flex items-start justify-between w-full">
                <div className="flex flex-col gap-2">
                  <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '10.4px', color: 'rgba(26,22,18,0.6)', letterSpacing: '2.08px', textTransform: 'uppercase' }}>
                    Canal Principal
                  </span>
                  <span style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, fontSize: '32px', color: '#1a1612', lineHeight: '32px' }}>
                    WhatsApp
                  </span>
                </div>
                <svg width="28" height="28" viewBox="0 0 25.08 25.08" fill="none" style={{ flexShrink: 0 }}>
                  <path d={svgPaths.p33ff4840} stroke="#1A1612" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '17.6px', color: '#1a1612', letterSpacing: '0.352px', lineHeight: '26.4px', margin: '14.4px 0' }}>
                (19) 98137-7754
              </p>

              <div
                style={{
                  background: '#1a1612',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '13.6px 28.8px',
                  transition: 'transform 0.25s ease, filter 0.25s ease',
                  width: isMobile ? '100%' : 'auto',
                  boxSizing: 'border-box',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.filter = 'brightness(1.08)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.filter = 'brightness(1)'; }}
              >
                <ArrowIconLg color="#C9A84C" />
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '12.8px', color: '#c9a84c', letterSpacing: '1.536px', textTransform: 'uppercase' }}>
                  Abrir conversa no WhatsApp
                </span>
              </div>
            </motion.a>

            {/* Email Card */}
            <motion.a
              href={MAIL_URL}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              onMouseEnter={() => setEmailHover(true)}
              onMouseLeave={() => setEmailHover(false)}
              style={{
                display: 'block',
                background: '#0f0d0a',
                border: emailHover ? '0.5px solid #C9A84C' : '1px solid #2e2922',
                borderRadius: 2,
                padding: '25px',
                textDecoration: 'none',
                transform: emailHover ? 'translateY(-3px)' : 'translateY(0)',
                transition: 'transform 0.3s ease, border 0.3s ease',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '10.4px', color: '#7a6f62', letterSpacing: '2.08px', textTransform: 'uppercase' }}>
                  E-mail
                </span>
                <svg width="20" height="20" viewBox="0 0 18 15" fill="none" style={{ flexShrink: 0 }}>
                  <path d={svgPaths.pab1a400} stroke="#C9A84C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d={svgPaths.p3173d020} stroke="#C9A84C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p
                onMouseEnter={() => setEmailLinkHover(true)}
                onMouseLeave={() => setEmailLinkHover(false)}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: '14.4px',
                  color: emailLinkHover ? '#E8D5A3' : '#faf7f2',
                  textDecoration: 'underline',
                  lineHeight: '21.6px',
                  margin: '0 0 4px',
                  transition: 'color 0.25s ease',
                }}
              >
                hugo.284356@gmail.com
              </p>
              <div
                className="flex items-center gap-[6.4px] pt-[4.5px]"
                onMouseEnter={() => setEmailArrowHover(true)}
                onMouseLeave={() => setEmailArrowHover(false)}
              >
                <div style={{ transform: emailArrowHover ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.25s ease' }}>
                  <ArrowIcon color="#C9A84C" />
                </div>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '12.8px', color: '#c9a84c', lineHeight: '19.2px' }}>
                  Enviar e-mail
                </span>
              </div>
            </motion.a>
          </div>

          {/* ── RIGHT COLUMN ────────────────────────── */}
          <div className={isMobile ? 'flex flex-col gap-3 w-full' : 'flex flex-col gap-4 flex-1 min-w-0'}>

            {/* Instagram Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              onMouseEnter={() => setIgHover(true)}
              onMouseLeave={() => setIgHover(false)}
              onClick={() => window.open('https://www.instagram.com/chefehugoferreira/', '_blank')}
              style={{
                background: '#0f0d0a',
                border: igHover ? '0.5px solid #C9A84C' : '1px solid #2e2922',
                borderRadius: 2,
                padding: '25px',
                cursor: 'pointer',
                transform: isMobile ? (igHover ? 'translateY(-1px)' : 'translateY(0)') : (igHover ? 'translateY(-3px)' : 'translateY(0)'),
                transition: 'transform 0.3s ease, border 0.3s ease',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div className="flex items-center justify-between w-full mb-[4.6px]">
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '10.4px', color: '#7a6f62', letterSpacing: '2.08px', textTransform: 'uppercase' }}>
                  Instagram
                </span>
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                  <path d={svgPaths.p2f513d00} stroke="#C9A84C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d={svgPaths.p25f4e992} stroke="#C9A84C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5.5 2.5H5.508" stroke="#C9A84C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p
                onMouseEnter={() => setIgHandleHover(true)}
                onMouseLeave={() => setIgHandleHover(false)}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '20px',
                  color: igHandleHover ? '#E8D5A3' : '#faf7f2',
                  lineHeight: '26.4px',
                  margin: '0 0 4px',
                  transition: 'color 0.25s ease',
                }}
              >
                @chefehugoferreira
              </p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '14px', color: '#b0a89a', lineHeight: '18.72px', margin: '0 0 4px' }}>
                Pratos, bastidores e novidades toda semana.
              </p>
              <a
                href="https://www.instagram.com/chefehugoferreira/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[6.4px] pt-[9.1px]"
                style={{ textDecoration: 'none' }}
                onMouseEnter={() => setIgArrowHover(true)}
                onMouseLeave={() => setIgArrowHover(false)}
                onClick={e => e.stopPropagation()}
              >
                <div style={{ transform: igArrowHover ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.25s ease' }}>
                  <ArrowIcon color="#C9A84C" />
                </div>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '12.8px', color: '#c9a84c', lineHeight: '19.2px' }}>
                  Ver perfil
                </span>
              </a>
            </motion.div>

            {/* LinkedIn Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              onMouseEnter={() => setLiHover(true)}
              onMouseLeave={() => setLiHover(false)}
              onClick={() => window.open('https://www.linkedin.com/in/hugoalexandreferreira/', '_blank')}
              style={{
                background: '#0f0d0a',
                border: liHover ? '0.5px solid #C9A84C' : '1px solid #2e2922',
                borderRadius: 2,
                padding: '25px',
                cursor: 'pointer',
                transform: isMobile ? (liHover ? 'translateY(-1px)' : 'translateY(0)') : (liHover ? 'translateY(-3px)' : 'translateY(0)'),
                transition: 'transform 0.3s ease, border 0.3s ease',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div className="flex items-center justify-between w-full mb-[4.6px]">
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '10.4px', color: '#7a6f62', letterSpacing: '2.08px', textTransform: 'uppercase' }}>
                  LinkedIn
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                  <path d={svgPaths.p36e22880} stroke="#C9A84C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" transform="translate(8.33, 2.5)" />
                  <path d={svgPaths.p2674f680} stroke="#C9A84C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" transform="translate(1.67, 7.5)" />
                  <path d={svgPaths.p3eebe600} stroke="#C9A84C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" transform="translate(1.67, 1.67)" />
                </svg>
              </div>
              <p
                onMouseEnter={() => setLiNameHover(true)}
                onMouseLeave={() => setLiNameHover(false)}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '20px',
                  color: liNameHover ? '#E8D5A3' : '#faf7f2',
                  lineHeight: '26.4px',
                  margin: '0 0 4px',
                  transition: 'color 0.25s ease',
                }}
              >
                Hugo Alexandre Ferreira
              </p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '14px', color: '#b0a89a', lineHeight: '18.72px', margin: '0 0 4px' }}>
                Trajetória profissional e conexões.
              </p>
              <a
                href="https://www.linkedin.com/in/hugoalexandreferreira/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[6.4px] pt-[9.1px]"
                style={{ textDecoration: 'none' }}
                onMouseEnter={() => setLiArrowHover(true)}
                onMouseLeave={() => setLiArrowHover(false)}
                onClick={e => e.stopPropagation()}
              >
                <div style={{ transform: liArrowHover ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.25s ease' }}>
                  <ArrowIcon color="#C9A84C" />
                </div>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '12.8px', color: '#c9a84c', lineHeight: '19.2px' }}>
                  Ver perfil
                </span>
              </a>
            </motion.div>

            {/* Localização Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                background: '#0f0d0a',
                border: '1px solid #2e2922',
                borderRadius: 2,
                padding: '25px',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div className="flex items-center justify-between w-full mb-[11.47px]">
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '10.4px', color: '#7a6f62', letterSpacing: '2.08px', textTransform: 'uppercase' }}>
                  Localização
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                  <path d={svgPaths.p24496700} stroke="#C9A84C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" transform="translate(3.33, 1.67)" />
                  <path d={svgPaths.p31c44140} stroke="#C9A84C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" transform="translate(6.67, 5.83)" />
                </svg>
              </div>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '16px', color: '#faf7f2', lineHeight: '24.48px', margin: 0 }}>
                Piracicaba – SP<br />
                Disponível em qualquer lugar do Brasil e no exterior
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Final ────────────────────────────────────────────────────────── */
function CTASection() {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const WA_URL = 'https://wa.me/5519981377754?text=Ol%C3%A1%2C+Hugo%21+Vi+seu+portf%C3%B3lio+e+gostaria+de+solicitar+uma+proposta+para+meu+evento.';

  return (
    <section
      ref={ref}
      style={{
        background: '#c9a84c',
        padding: isMobile ? '4rem 1.5rem' : '94.76px 72px 96px',
      }}
    >
      <div className="flex flex-col items-center text-center gap-[22.9px]">
        <div className="flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0 }}
            style={{
              fontFamily: "'Cormorant Garamond', sans-serif",
              fontWeight: 300,
              fontSize: isMobile ? 'clamp(2rem, 9vw, 3rem)' : '56px',
              color: '#1a1612',
              letterSpacing: '-0.56px',
              textTransform: 'uppercase',
              lineHeight: '51.52px',
              margin: 0,
            }}
          >
            PRONTO PARA
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Cormorant Garamond', sans-serif",
              fontWeight: 300,
              fontSize: isMobile ? 'clamp(2rem, 9vw, 3rem)' : '56px',
              color: '#1a1612',
              letterSpacing: '-0.56px',
              textTransform: 'uppercase',
              lineHeight: '51.52px',
              margin: 0,
            }}
          >
            COMEÇAR?
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: isMobile ? '0.88rem' : '16px',
            color: '#2e2922',
            lineHeight: '25.84px',
            maxWidth: 460,
            margin: 0,
          }}
        >
          Me chame no WhatsApp agora e vamos conversar sobre o seu evento. É rápido, gratuito e sem compromisso.
        </motion.p>

        <motion.a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9.6,
            background: '#1a1612',
            padding: '15.5px 48px',
            textDecoration: 'none',
            transition: 'transform 0.25s ease, filter 0.25s ease',
            width: isMobile ? '100%' : 'auto',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.filter = 'brightness(1.08)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.filter = 'brightness(1)'; }}
        >
          <ArrowIconLg color="#C9A84C" />
          <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '13.6px', color: '#c9a84c', letterSpacing: '2.04px', textTransform: 'uppercase' }}>
            Chamar no WhatsApp
          </span>
        </motion.a>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: '11.2px',
            color: '#2e2922',
            letterSpacing: '1.68px',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Proposta gratuita · Resposta em até 24h · Sem compromisso
        </motion.p>
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
    <section
      ref={ref}
      style={{ background: '#0f0d0a', padding: isMobile ? '3rem 1.5rem' : '80px 72px' }}
    >
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
            "COZINHAR É O ATO DE TRANSFORMAR<br />
            INGREDIENTES EM MEMÓRIAS."
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

/* ─── Footer ───────────────────────────────────────────────────────────── */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isRoute = href.startsWith('/') && !href.startsWith('/#');
  if (isRoute) {
    return (
      <Link
        to={href}
        style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '12.8px', color: '#7a6f62', textDecoration: 'none', lineHeight: '19.2px', display: 'block', transition: 'color 0.3s ease' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
        onMouseLeave={e => (e.currentTarget.style.color = '#7a6f62')}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '12.8px', color: '#7a6f62', textDecoration: 'none', lineHeight: '19.2px', display: 'block', transition: 'color 0.3s ease' }}
      onMouseEnter={e => (e.currentTarget.style.color = '#c9a84c')}
      onMouseLeave={e => (e.currentTarget.style.color = '#7a6f62')}
    >
      {children}
    </a>
  );
}

function FooterSection() {
  const isMobile = useIsMobile();

  return (
    <footer style={{ background: '#0f0d0a', borderTop: '1px solid #2e2922' }}>
      <div
        className="flex flex-col items-center"
        style={{ padding: isMobile ? '3rem 1.5rem 2rem' : '65px 72px 32px' }}
      >
        <div className="w-full" style={{ maxWidth: 1200 }}>
          <div
            className={isMobile ? 'flex flex-col gap-8 mb-8' : 'grid grid-cols-4 gap-12 mb-12'}
          >
            {/* Brand */}
            <div className="flex flex-col gap-[15.47px]">
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 15 15" fill="none">
                  <path d={svgPaths.p266d3a00} stroke="#C9A84C" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: "'Cormorant Garamond', sans-serif", fontWeight: 300, fontSize: '17.6px', color: '#faf7f2' }}>Hugo Ferreira</span>
              </div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '12.5px', color: '#7a6f62', lineHeight: '1.8' }}>
                <p style={{ margin: 0 }}>Chefe de Cozinha &amp; Gestor de Eventos</p>
                <p style={{ margin: 0 }}>(19) 98137-7754</p>
                <p style={{ margin: 0 }}>hugo.284356@gmail.com</p>
              </div>
            </div>

            {/* Páginas */}
            <div className="flex flex-col gap-[9.5px]">
              <h4 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '10.4px', color: '#c9a84c', letterSpacing: '2.08px', textTransform: 'uppercase', margin: 0 }}>Páginas</h4>
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/sobre">Sobre</FooterLink>
              <FooterLink href="/servicos">Serviços</FooterLink>
              <FooterLink href="/galeria">Galeria</FooterLink>
              <FooterLink href="/contato">Contato</FooterLink>
            </div>

            {/* Serviços */}
            <div className="flex flex-col gap-[9.5px]">
              <h4 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '10.4px', color: '#c9a84c', letterSpacing: '2.08px', textTransform: 'uppercase', margin: 0 }}>Serviços</h4>
              <FooterLink href="/servicos">Casamentos &amp; Debutantes</FooterLink>
              <FooterLink href="/servicos">Personal Chef</FooterLink>
              <FooterLink href="/servicos">Eventos Especiais</FooterLink>
              <FooterLink href="/servicos">Gestão de Cozinha</FooterLink>
            </div>

            {/* Redes Sociais */}
            <div className="flex flex-col gap-[9.5px]">
              <h4 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '10.4px', color: '#c9a84c', letterSpacing: '2.08px', textTransform: 'uppercase', margin: 0 }}>Redes Sociais</h4>
              <FooterLink href="https://www.instagram.com/chefehugoferreira/">@chefehugoferreira — Instagram</FooterLink>
              <FooterLink href="https://www.linkedin.com/in/hugoalexandreferreira/">Hugo Alexandre Ferreira — LinkedIn</FooterLink>
            </div>
          </div>

          <div style={{ borderTop: '0.5px solid #2e2922', paddingTop: 32 }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11.5px', color: '#666', textAlign: 'center', margin: 0, letterSpacing: '0.922px' }}>
              © 2026 Hugo Ferreira · Chefe de Cozinha · Piracicaba/SP · Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────── */
export default function ContatoPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#1a1612', minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main style={{ flex: 1 }}>
        <HeroSection />
        <ContactSection />
        <CTASection />
        <FraseFinalSection />
      </main>
      <FooterSection />
    </div>
  );
}
