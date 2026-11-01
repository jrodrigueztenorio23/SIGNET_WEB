import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

// El header toma la tinta del capítulo que tiene debajo.
document.querySelectorAll<HTMLElement>('[data-ink]').forEach((section) => {
  const ink = section.dataset.ink!;
  ScrollTrigger.create({
    trigger: section,
    start: 'top 36px',
    end: 'bottom 36px',
    onToggle: (self) => self.isActive && root.style.setProperty('--header-ink', ink),
  });
});

if (reduce) {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
} else {
  const lenis = new Lenis({ lerp: 0.11 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href')!);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { duration: 1.2 });
    }),
  );

  // Hero: el nombre sube línea por línea; los arcos del logo giran con el scroll y siguen al cursor.
  gsap.from('.hero .line-inner', { yPercent: 105, duration: 1.1, ease: 'expo.out', stagger: 0.12, delay: 0.1 });
  gsap.from('.rings svg', { rotation: -90, scale: 0.6, opacity: 0, duration: 1.8, ease: 'expo.out', delay: 0.15 });
  gsap.utils.toArray<SVGElement>('.ring').forEach((ring, i) => {
    gsap.set(ring, { svgOrigin: '0 0' });
    gsap.to(ring, {
      rotation: (i % 2 ? -1 : 1) * (120 + i * 60),
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
    });
  });
  gsap.to('.hero h1', {
    yPercent: -18,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  const rings = document.querySelector<HTMLElement>('.rings');
  if (rings && window.matchMedia('(hover: hover)').matches) {
    const rx = gsap.quickTo(rings, 'x', { duration: 0.9, ease: 'power3.out' });
    const ry = gsap.quickTo(rings, 'y', { duration: 0.9, ease: 'power3.out' });
    window.addEventListener('pointermove', (e) => {
      rx((e.clientX / innerWidth - 0.5) * 40);
      ry((e.clientY / innerHeight - 0.5) * 40);
    });
  }

  // Entradas: dentro de cada capítulo, sus partes en orden, una tras otra.
  document.querySelectorAll<HTMLElement>('.chapter').forEach((section) => {
    const items = section.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!items.length) return;
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'expo.out',
      stagger: 0.075,
      scrollTrigger: { trigger: section, start: 'top 72%', once: true },
    });
  });

  // Cifras: el total cuenta hacia arriba y las barras crecen desde el borde.
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const n = Number(el.dataset.count);
    const o = { v: 0 };
    gsap.to(o, {
      v: n,
      duration: 1.6,
      ease: 'expo.out',
      onUpdate: () => (el.textContent = Math.round(o.v).toString()),
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
  const vertical = window.matchMedia('(min-width: 768px)').matches;
  gsap.from('.bar-fill', {
    [vertical ? 'scaleY' : 'scaleX']: 0,
    duration: 1.2,
    ease: 'expo.out',
    stagger: 0.05,
    scrollTrigger: { trigger: '.bars', start: 'top 85%', once: true },
  });

  // Módulos: los mosaicos se arman de a uno y su pieza de interfaz entra en cámara.
  gsap.utils.toArray<HTMLElement>('[data-tile]').forEach((tile, i) => {
    gsap.from(tile, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'expo.out',
      delay: (i % 4) * 0.06,
      scrollTrigger: { trigger: tile, start: 'top 92%', once: true },
    });
    const ui = tile.querySelector('.ui');
    if (ui) {
      gsap.fromTo(ui, { yPercent: 18 }, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: tile, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }
  });

  // Plan: el ticket se imprime con un pequeño giro que se endereza.
  gsap.from('.ticket', {
    rotate: -4,
    y: 60,
    duration: 1.2,
    ease: 'expo.out',
    scrollTrigger: { trigger: '.ticket', start: 'top 85%', once: true },
  });

  // Footer: el nombre entra deslizándose.
  gsap.from('.wordmark', {
    xPercent: 30,
    ease: 'none',
    scrollTrigger: { trigger: '.foot', start: 'top bottom', end: 'bottom bottom', scrub: true },
  });

  // Botones magnéticos.
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((btn) => {
      const mx = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
      const my = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        mx((e.clientX - r.left - r.width / 2) * 0.25);
        my((e.clientY - r.top - r.height / 2) * 0.35);
      });
      btn.addEventListener('pointerleave', () => { mx(0); my(0); });
    });
  }
}
