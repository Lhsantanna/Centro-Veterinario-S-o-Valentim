import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, Check, ChevronDown, Clock3, Cross, Heart, Instagram, MapPin, Menu, Microscope, PawPrint, Phone, ShieldCheck, Sparkles, Star, Syringe, Stethoscope, Wallet, X } from 'lucide-react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './style.css'

gsap.registerPlugin(ScrollTrigger)

// DADOS DO NEGÓCIO: atualize aqui os links e os IDs de rastreamento.
const PHONE = '5535999443077'
const WHATSAPP_MESSAGE = 'Olá! Acessei o site do Centro Veterinário São Valentim e gostaria de informações/agendar uma consulta.'
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}` // {{LINK_WHATSAPP}}
const LOGO_URL = '/assets/logo-mascote.png' // Emblema da logo enviada, recortado para o selo circular.
const META_PIXEL_ID = '' // {{META_PIXEL_ID}}
const GA4_ID = '' // {{GA4_ID}}
const HERO_IMAGE = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1300&q=85' // {{HERO_IMAGE}}

const services = [
  { icon: Stethoscope, no: '01', title: 'Atendimento clínico', desc: 'Cuidado preventivo e diagnósticos precisos para acompanhar cada fase da vida do seu pet.' },
  { icon: Cross, no: '02', title: 'Farmácia veterinária', desc: 'Tudo o que seu pet precisa, com orientação profissional e praticidade em um só lugar.' },
  { icon: Syringe, no: '03', title: 'Vacinas importadas', desc: 'Proteção segura para cães e gatos, com vacinas de qualidade e acompanhamento.' },
  { icon: Heart, no: '04', title: 'Cirurgias e internação', desc: 'Estrutura e cuidado dedicado para seu melhor amigo durante toda a recuperação.' },
  { icon: Microscope, no: '05', title: 'Exames complementares', desc: 'Exames de sangue e imagem com agilidade para apoiar os próximos passos.' },
]
const reviews = [
  { quote: 'Fui muito bem atendido, comprei remédios para meu cachorro. Lugar bem limpo e organizado...', name: 'Carlos Eduardo Pires', initials: 'CP', color: 'sage' },
  { quote: 'Profissionais cuidadosos, com preço justo!', name: 'Gabriel Costa', initials: 'GC', color: 'peach' },
]
const faqs = [
  { q: 'Vocês atendem urgências?', a: 'Fale com a nossa equipe pelo WhatsApp para informar o que aconteceu e verificar a disponibilidade de atendimento.' },
  { q: 'A clínica possui farmácia própria para já sair com o remédio?', a: 'Sim! Temos farmácia veterinária na clínica. Nossa equipe orienta você sobre os produtos indicados para o seu pet.' },
  { q: 'Quais as formas de pagamento?', a: 'Entre em contato pelo WhatsApp para consultar as formas de pagamento disponíveis.' },
]

function trackConversion() {
  if (typeof window.fbq === 'function') window.fbq('track', 'Contact')
  if (typeof window.gtag === 'function') window.gtag('event', 'conversion', { event_category: 'WhatsApp', event_label: 'Agendamento' })
}
function WhatsAppLink({ children, className = '', icon = true, label }) {
  return <a className={className} href={WHATSAPP_URL} aria-label={label} target="_blank" rel="noopener noreferrer" onClick={trackConversion}>{icon && <WhatsAppIcon className="wa-icon" />}{children}</a>
}
function WhatsAppIcon({ className = '' }) {
  return <svg className={className} viewBox="0 0 24 24" role="img" aria-label="WhatsApp" fill="currentColor"><path d="M20.52 3.48A11.88 11.88 0 0 0 12.05 0C5.45 0 .08 5.37.08 11.97c0 2.11.55 4.17 1.59 5.99L0 24l6.2-1.63a11.94 11.94 0 0 0 5.84 1.49h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.21-3.5-8.41Zm-8.47 18.35h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.68.97.98-3.59-.23-.37a9.87 9.87 0 0 1-1.51-5.28c0-5.44 4.43-9.87 9.88-9.87a9.8 9.8 0 0 1 6.99 2.9 9.8 9.8 0 0 1 2.89 6.99c0 5.45-4.43 9.87-9.91 9.87Zm5.42-7.39c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.29-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.49-1.78-1.66-2.08-.17-.29-.02-.45.13-.6.14-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.51.07-.78.37-.27.3-1.02 1-1.02 2.44s1.05 2.83 1.2 3.02c.15.2 2.07 3.16 5.01 4.43.7.3 1.24.49 1.66.62.7.22 1.34.19 1.84.12.56-.08 1.75-.72 2-1.41.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" /></svg>
}
function Brand({ light = false }) {
  return <a href="#inicio" className={`brand ${light ? 'brand-light' : ''}`} aria-label="Centro Veterinário São Valentim, início">
    {LOGO_URL ? <span className="brand-round"><img className="brand-logo" src={LOGO_URL} alt="Emblema da logo do Centro Veterinário São Valentim" /></span> : <span className="brand-mark"><PawPrint size={23} strokeWidth={2.4} /></span>}
    <span className="brand-name">centro veterinário<strong>São Valentim</strong></span>
  </a>
}
function Header() {
  const [open, setOpen] = React.useState(false)
  const links = [['Serviços', '#servicos'], ['A clínica', '#clinica'], ['Depoimentos', '#depoimentos'], ['Dúvidas', '#duvidas']]
  return <header className="header"><nav className="nav wrap"><Brand /><div className={`nav-links ${open ? 'nav-open' : ''}`}>{links.map(([name, href]) => <a href={href} onClick={() => setOpen(false)} key={name}>{name}</a>)}</div><WhatsAppLink className="button button-dark nav-cta">Fale com a gente <ArrowUpRight size={16} /></WhatsAppLink><button className="menu-toggle" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></nav></header>
}
function Hero() {
  // Variações de headline para teste A/B:
  // 1. O Cuidado que seu Pet Merece, com a Estrutura que Toledo Confia.
  // 2. Seu Pet em Boas Mãos: Clínica Completa, Preço Justo e Atendimento Humanizado.
  return <section className="hero" id="inicio"><div className="hero-bg-dot dot-one"/><div className="hero-bg-dot dot-two"/><div className="wrap hero-grid"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"/> UM CUIDADO DE TODO CORAÇÃO</div><h1>Seu pet merece<br />uma vida <span>cheia de saúde.</span></h1><p className="hero-lede">Cuidado completo, carinho de verdade e preço justo. Tudo para o bem-estar do seu melhor amigo, aqui em Toledo.</p><div className="hero-points"><span><Check size={15} /> Atendimento clínico</span><span><Check size={15} /> Cirurgias e exames</span><span><Check size={15} /> Vacinas e farmácia</span></div><div className="hero-actions"><WhatsAppLink className="button button-green">Agendar pelo WhatsApp <ArrowUpRight size={17} /></WhatsAppLink><a href="#servicos" className="text-link">Conheça a clínica <ArrowDown size={15} /></a></div><div className="hero-rating"><div className="rating-stars">{[1,2,3,4,5].map(x=><Star key={x} size={15} fill="currentColor" />)}</div><div><strong>5 estrelas no Google</strong><span>Mais de 35 clientes satisfeitos</span></div></div></div><div className="hero-visual"><div className="hero-image-frame"><img src={HERO_IMAGE} alt="Cachorros felizes e saudáveis ao ar livre" fetchPriority="high" /><div className="image-overlay"/></div><div className="floating-note"><span className="note-icon"><Heart size={19} fill="currentColor" /></span><div><strong>Amor em cada cuidado</strong><span>Seu pet em boas mãos</span></div></div><div className="hero-stamp"><span>TOLEDO</span><PawPrint size={20} /><span>MG</span></div><div className="image-index">01 <span/> SAÚDE &amp; CARINHO</div></div></div><a href="#servicos" className="scroll-hint"><span className="scroll-wheel"/> ROLE PARA DESCOBRIR</a></section>
}
function Marquee() { return <div className="marquee"><div className="marquee-track">{[1,2,3,4].map(n=><span key={n}>SAÚDE <PawPrint size={15} fill="currentColor"/> CARINHO <PawPrint size={15} fill="currentColor"/> CONFIANÇA <PawPrint size={15} fill="currentColor"/> SÃO VALENTIM <PawPrint size={15} fill="currentColor"/></span>)}</div></div> }
function Services() { return <section className="section services-section" id="servicos"><div className="wrap"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> TUDO EM UM SÓ LUGAR</div><h2>O cuidado completo<br />que seu pet <span>precisa.</span></h2></div><p>Da prevenção à recuperação, aqui seu melhor amigo encontra uma equipe pronta para cuidar de cada detalhe.</p></div><div className="service-grid">{services.map(({icon:Icon,no,title,desc},i)=><article className={`service-card ${i===0?'service-featured':''}`} key={no}><div className="service-top"><span className="service-icon"><Icon size={22} strokeWidth={1.7}/></span><span className="service-no">{no} / 05</span></div><div><h3>{title}</h3><p>{desc}</p></div><a href={`https://wa.me/${PHONE}?text=${encodeURIComponent(`Olá! Gostaria de informações sobre ${title.toLowerCase()} no Centro Veterinário São Valentim.`)}`} onClick={trackConversion} className="service-arrow" aria-label={`Perguntar sobre ${title} pelo WhatsApp`} title={`Perguntar sobre ${title} pelo WhatsApp`}><ArrowUpRight size={16}/></a></article>)}</div><div className="services-bottom"><span><Sparkles size={17}/> Cuidar bem também é cuidar de você.</span><WhatsAppLink className="text-link">Precisa de algum serviço? Fale conosco <ArrowRight size={16}/></WhatsAppLink></div></div></section> }
function About() { return <section className="section about-section" id="clinica"><div className="wrap about-grid"><div className="about-visual"><img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1100&q=85" alt="Cachorro tranquilo recebendo carinho e atenção" loading="lazy"/><div className="about-tag"><PawPrint size={18}/><span>Mais cuidado.<br/><strong>Mais tranquilidade.</strong></span></div><span className="about-photo-label">CUIDADO DE PERTO, TODOS OS DIAS</span></div><div className="about-copy"><div className="eyebrow"><span className="eyebrow-line"/> FEITO PARA CUIDAR BEM</div><h2>Mais do que uma clínica.<br/><span>Um lugar de confiança.</span></h2><p className="about-lede">A gente sabe: seu pet é parte da família. Por isso, cada consulta, cada vacina e cada cuidado por aqui são feitos com atenção, carinho e respeito.</p><p className="about-lede about-lede-small">Do atendimento clínico à farmácia veterinária, você encontra uma equipe cuidadosa, um ambiente limpo e organizado, e a tranquilidade de ter tudo por perto.</p><div className="trust-list"><div><span><Wallet size={18}/></span><div><strong>Preço justo</strong><p>Qualidade e transparência, sem sustos.</p></div></div><div><span><ShieldCheck size={18}/></span><div><strong>Ambiente limpo e organizado</strong><p>Um espaço acolhedor para pets e famílias.</p></div></div><div><span><Heart size={18}/></span><div><strong>Profissionais cuidadores</strong><p>Empatia e atenção em primeiro lugar.</p></div></div></div><WhatsAppLink className="text-link">Venha conhecer <ArrowRight size={16}/></WhatsAppLink></div></div></section> }
function Reviews() { return <section className="section reviews-section" id="depoimentos"><div className="wrap"><div className="reviews-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> QUEM CUIDA, RECOMENDA</div><h2>Palavra de quem<br/><span>já confiou na gente.</span></h2></div><div className="google-rating"><div className="google-g">G</div><div><div className="rating-stars">{[1,2,3,4,5].map(x=><Star key={x} size={14} fill="currentColor"/>)}</div><strong>5.0 no Google</strong><span>+35 avaliações</span></div></div></div><div className="reviews-grid">{reviews.map(r=><article className="review-card" key={r.name}><div className="review-top"><div className="rating-stars">{[1,2,3,4,5].map(x=><Star key={x} size={14} fill="currentColor"/>)}</div><span className="review-google">G</span></div><span className="quote-mark">“</span><blockquote>{r.quote}</blockquote><div className="review-author"><span className={`avatar ${r.color}`}>{r.initials}</span><div><strong>{r.name}</strong><span>Cliente da clínica</span></div><BadgeCheck size={19} className="verified"/></div></article>)}</div><div className="reviews-foot"><span><span className="green-dot"/> Histórias reais de cuidado em Toledo e região.</span><a href="https://www.google.com/maps/search/?api=1&query=Centro+Veterin%C3%A1rio+S%C3%A3o+Valentim+Toledo+MG" target="_blank" rel="noopener noreferrer" className="text-link">Encontre a gente no Google <ArrowUpRight size={15}/></a></div></div></section> }
function FAQ() { const [active,setActive] = React.useState(0); return <section className="section faq-section" id="duvidas"><div className="wrap faq-grid"><div className="faq-intro"><div className="eyebrow"><span className="eyebrow-line"/> SEM DÚVIDA, COM CARINHO</div><h2>Ficou com<br/>alguma <span>dúvida?</span></h2><p>Estamos aqui para ajudar. Se preferir, é só mandar uma mensagem — a gente conversa.</p><WhatsAppLink className="text-link">Pergunte pelo WhatsApp <ArrowUpRight size={16}/></WhatsAppLink><div className="faq-paw"><PawPrint size={65}/></div></div><div className="faq-list">{faqs.map((f,i)=><article className={`faq-item ${active===i?'faq-active':''}`} key={f.q}><button onClick={()=>setActive(active===i?-1:i)} aria-expanded={active===i}><span className="faq-num">0{i+1}</span><span className="faq-question">{f.q}</span><ChevronDown size={19} className="faq-chevron"/></button><div className="faq-answer-wrap"><div className="faq-answer"><p>{f.a}</p></div></div></article>)}</div></div></section> }
function Contact() { return <section className="contact-section" id="contato"><div className="wrap contact-wrap"><div className="contact-copy"><div className="eyebrow eyebrow-light"><span className="eyebrow-line"/> CUIDADO BOM COMEÇA COM UMA CONVERSA</div><h2>Seu pet merece esse carinho.<br/><span>Vamos conversar?</span></h2><p>Agende uma consulta, tire suas dúvidas ou conte pra gente como podemos ajudar.</p><WhatsAppLink className="button button-cream">Falar com um veterinário <ArrowUpRight size={17}/></WhatsAppLink></div><div className="contact-info"><a href="https://maps.google.com/?q=R.+S%C3%A3o+Francisco+de+Assis,+180+A,+Toledo+-+MG" target="_blank" rel="noopener noreferrer" className="contact-info-row"><span className="contact-icon"><MapPin size={19}/></span><span><small>ONDE ESTAMOS</small><strong>R. São Francisco de Assis, 180 A<br/>Toledo – MG</strong></span><ArrowUpRight className="contact-row-arrow" size={17}/></a><a href={WHATSAPP_URL} onClick={trackConversion} target="_blank" rel="noopener noreferrer" className="contact-info-row"><span className="contact-icon"><WhatsAppIcon/></span><span><small>FALE COM A GENTE NO WHATSAPP</small><strong>(35) 99944-3077</strong></span><ArrowUpRight className="contact-row-arrow" size={17}/></a><div className="contact-info-row"><span className="contact-icon"><Clock3 size={18}/></span><span><small>ATENDIMENTO</small><strong>Consulte a disponibilidade pelo WhatsApp</strong></span></div></div><div className="contact-bottom"><span>CENTRO VETERINÁRIO SÃO VALENTIM · TOLEDO, MG</span><PawPrint size={19}/><span>UM PET FELIZ COMEÇA COM UM CUIDADO DE CADA VEZ.</span></div></div></section> }
function MiniMap() {
  return <div className="footer-map-visual" role="img" aria-label="Mapa ilustrado de Toledo, Minas Gerais, com a localização do Centro Veterinário São Valentim">
    <svg viewBox="0 0 410 208" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="410" height="208" fill="#e8eee2"/>
      <path d="M-20 27 75 0 119 50 35 81ZM150-10l78 18-17 57-79-17ZM276-8l92 24-26 54-75-21ZM-18 132l82-41 55 54-69 62ZM124 112l80-53 47 53-73 64ZM287 94l98-48 48 61-87 52ZM201 180l83-44 46 55-95 36Z" fill="#d9e6d2"/>
      <g fill="none" stroke="#fffdf6" stroke-width="13" stroke-linecap="round" stroke-linejoin="round">
        <path d="M-12 106 87 73l74 25 83-38 82 29 100-46"/><path d="M57-12l42 67-21 76 48 87"/><path d="M181-8l-23 65 33 72-11 88"/><path d="M300-7l-21 79 35 59-24 86"/><path d="M-12 176l102-38 73 18 78-40 93 8 88-33"/>
      </g>
      <g fill="none" stroke="#d9cda9" stroke-width="2" stroke-linecap="round"><path d="M-12 106 87 73l74 25 83-38 82 29 100-46"/><path d="M-12 176l102-38 73 18 78-40 93 8 88-33"/></g>
      <path d="M234 70c-15 0-27 12-27 27 0 20 27 49 27 49s27-29 27-49c0-15-12-27-27-27Zm0 37a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" fill="#337652" stroke="#fff" stroke-width="4"/>
    </svg>
    <span className="map-area">TOLEDO · MG</span><span className="map-place">SÃO VALENTIM</span>
  </div>
}
function Footer() { return <footer className="footer"><div className="wrap footer-main"><Brand light/><div className="footer-note">Cuidando com carinho de quem faz<br/>seus dias mais felizes.</div><div className="footer-links"><a href="#servicos">Serviços</a><a href="#clinica">A clínica</a><a href="#depoimentos">Depoimentos</a><a href="#duvidas">Dúvidas</a></div><div className="footer-map"><MiniMap/><a href="https://www.google.com/maps/dir/?api=1&destination=R.%20S%C3%A3o%20Francisco%20de%20Assis%2C%20180%20A%2C%20Toledo%20MG" target="_blank" rel="noopener noreferrer"><MapPin size={13}/> Como chegar <ArrowUpRight size={13}/></a></div><a className="instagram-link" href="https://instagram.com/centrovetsvalentim" target="_blank" rel="noopener noreferrer"><Instagram size={18}/> @centrovetsvalentim <ArrowUpRight size={14}/></a></div><div className="wrap footer-legal"><span>© {new Date().getFullYear()} Centro Veterinário São Valentim. Todos os direitos reservados.</span><span className="developer-credit">Desenvolvido por <strong>lhsoludev</strong></span><a href="#inicio">VOLTAR AO TOPO ↑</a></div></footer> }
function FloatingWhatsApp() { return <WhatsAppLink className="floating-wa" label="Agende ou tire dúvidas pelo WhatsApp" icon={false}><WhatsAppIcon/><span>Fale com a gente</span></WhatsAppLink> }
function App() {
  useEffect(()=>{
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({ duration: prefersReducedMotion ? 0 : 1.1, smoothWheel: !prefersReducedMotion, anchors: true })
    let rafId
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)
    const onRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener('refresh', onRefresh)
    const ctx = gsap.context(()=>{
      if (prefersReducedMotion) return
      gsap.from('.hero-copy > *', { y: 24, opacity: 0, duration: .72, stagger: .09, ease: 'power2.out', delay: .1 })
      gsap.from('.hero-visual', { y: 24, opacity: 0, duration: .9, ease: 'power2.out', delay: .32 })
      gsap.to('.hero-copy', { y: -24, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 } })
      gsap.utils.toArray('.section-heading, .service-card, .about-visual, .about-copy, .reviews-heading, .review-card, .faq-intro, .faq-item, .contact-copy, .contact-info, .footer-map').forEach((el)=>gsap.fromTo(el,{y:26,autoAlpha:0},{y:0,autoAlpha:1,duration:.62,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%',end:'bottom 12%',toggleActions:'play reverse play reverse'}}))
      gsap.to('.floating-wa', {scale:1.055,duration:1.3,repeat:-1,yoyo:true,ease:'sine.inOut'})
    })
    return ()=>{ cancelAnimationFrame(rafId); ScrollTrigger.removeEventListener('refresh', onRefresh); ctx.revert(); lenis.destroy() }
  },[])
  return <><Header/><main><Hero/><Marquee/><Services/><About/><Reviews/><FAQ/><Contact/></main><Footer/><FloatingWhatsApp/></>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
