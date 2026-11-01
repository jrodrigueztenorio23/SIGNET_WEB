import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;


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
  gsap.to('.hero-copy', {
    yPercent: -12,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  // Hero: la pantalla de SIG entra inclinada, se endereza con el scroll y las tarjetas flotan delante.
  gsap.from('.hero-screen', { x: 160, opacity: 0, duration: 1.6, ease: 'expo.out', delay: 0.25 });
  gsap.from('.hero .float', { y: 40, opacity: 0, scale: 0.92, duration: 1, ease: 'back.out(1.6)', stagger: 0.15, delay: 0.9 });
  const ancho = innerWidth >= 1024;
  gsap.fromTo('.stage-inner', {
    rotateY: ancho ? -16 : -10,
    rotateX: ancho ? 7 : 5,
    rotateZ: ancho ? 1.5 : 0,
    transformOrigin: '0% 50%',
  }, {
    rotateY: 0,
    rotateX: 0,
    rotateZ: 0,
    scale: 1.04,
    yPercent: -8,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
  });

  // Cada pieza del hero sigue al cursor según su profundidad: las tarjetas más que la pantalla.
  if (window.matchMedia('(hover: hover)').matches) {
    const capas = [
      ...gsap.utils.toArray<HTMLElement>('.hero [data-depth]').map((el) => ({ el, d: Number(el.dataset.depth) })),
      ...gsap.utils.toArray<HTMLElement>('.rings').map((el) => ({ el, d: -0.8 })),
    ].map(({ el, d }) => ({
      d,
      x: gsap.quickTo(el, 'x', { duration: 1, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 1, ease: 'power3.out' }),
    }));
    window.addEventListener('pointermove', (e) => {
      const nx = e.clientX / innerWidth - 0.5;
      const ny = e.clientY / innerHeight - 0.5;
      capas.forEach((c) => { c.x(nx * 28 * c.d); c.y(ny * 22 * c.d); });
    });
  }

  // Así se ve SIG: en escritorio la sección queda fija y el scroll recorre los módulos.
  const tour = document.querySelector<HTMLElement>('.tour-pin');
  const pasos = document.querySelectorAll('.tour-tab').length;
  if (tour && pasos) {
    ScrollTrigger.matchMedia({
      '(min-width: 1024px)': () => {
        const st = ScrollTrigger.create({
          trigger: tour,
          start: 'top top',
          end: () => `+=${pasos * innerHeight * 0.45}`,
          pin: true,
          onUpdate: (self) => {
            const i = Math.min(pasos - 1, Math.floor(self.progress * pasos));
            document.dispatchEvent(new CustomEvent('tour:step', { detail: i }));
          },
        });
        const ir = (e: Event) => {
          const i = (e as CustomEvent<number>).detail;
          lenis.scrollTo(st.start + ((i + 0.5) / pasos) * (st.end - st.start), { duration: 0.9 });
        };
        document.addEventListener('tour:pick', ir);
        return () => document.removeEventListener('tour:pick', ir);
      },
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

// El header toma la tinta del capítulo que tiene debajo. Se crea al final para que cuente el espacio
// que agrega la sección fijada.
document.querySelectorAll<HTMLElement>('[data-ink]').forEach((section) => {
  const ink = section.dataset.ink!;
  const bg = getComputedStyle(section).backgroundColor;
  ScrollTrigger.create({
    trigger: section,
    start: 'top 36px',
    end: 'bottom 36px',
    onToggle: (self) => {
      if (!self.isActive) return;
      root.style.setProperty('--header-ink', ink);
      root.style.setProperty('--header-bg', bg);
    },
  });
});
ScrollTrigger.refresh();
