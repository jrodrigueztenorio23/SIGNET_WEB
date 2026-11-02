import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Envuelve cada palabra de un titular en una ranura (.w) con su contenido (.wi), sin tocar las etiquetas. */
function partirPalabras(el: HTMLElement) {
  const textos: Text[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) textos.push(walker.currentNode as Text);
  textos.forEach((t) => {
    const frag = document.createDocumentFragment();
    t.data.split(/(\s+)/).forEach((parte) => {
      if (!parte) return;
      if (/^\s+$/.test(parte)) { frag.append(document.createTextNode(parte)); return; }
      const w = document.createElement('span');
      w.className = 'w';
      const wi = document.createElement('span');
      wi.className = 'wi';
      wi.textContent = parte;
      w.append(wi);
      frag.append(w);
    });
    t.replaceWith(frag);
  });
}
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

  // Portada: sólo existe en la página principal.
  if (document.querySelector('.hero')) {
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
  }

  // Titulares: entran palabra por palabra, cada una subiendo desde su propia ranura.
  document.querySelectorAll<HTMLElement>('.chapter .headline[data-reveal]').forEach((h) => {
    if (h.closest('.hero')) return;
    partirPalabras(h);
    h.removeAttribute('data-reveal');
    h.style.opacity = '1';
    h.style.transform = 'none';
    gsap.from(h.querySelectorAll('.wi'), {
      yPercent: 115,
      rotate: 4,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.045,
      scrollTrigger: { trigger: h, start: 'top 85%', once: true },
    });
  });

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

  // Header: al dejar el inicio se recoge en una cápsula flotante.
  const header = document.getElementById('header');
  if (header) {
    ScrollTrigger.create({
      start: 120,
      end: 'max',
      onToggle: (self) => header.classList.toggle('is-float', self.isActive),
    });
  }

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
  const vertical = window.matchMedia('(min-width: 1200px)').matches;
  if (document.querySelector('.bars')) gsap.from('.bar-fill', {
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

  // Footer: el nombre entra deslizándose.
  if (document.querySelector('.wordmark')) gsap.from('.wordmark', {
    xPercent: 30,
    ease: 'none',
    scrollTrigger: { trigger: '.foot', start: 'top bottom', end: 'bottom bottom', scrub: true },
  });

  // Puntero propio: un punto y un aro que lo sigue. Crece sobre lo que se puede tocar y muestra una
  // etiqueta sobre las partes animadas (data-cursor). Sólo con mouse; en pantallas táctiles no existe.
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.className = 'cur-dot';
    const ring = document.createElement('div');
    ring.className = 'cur-ring';
    const etiqueta = document.createElement('span');
    ring.append(etiqueta);
    document.body.append(dot, ring);
    root.classList.add('has-cursor');
    const dx = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });
    const tocable = 'a, button, label, select, summary, [role="tab"], .ia-col, .logo, .bar, .tile, .build';
    window.addEventListener('pointermove', (e) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      root.classList.add('cur-on');
    });
    document.documentElement.addEventListener('pointerleave', () => root.classList.remove('cur-on'));
    document.addEventListener('pointerover', (e) => {
      const t = e.target as Element;
      const texto = t.closest('input:not([type="radio"]):not([type="checkbox"]), textarea');
      const zona = t.closest<HTMLElement>('[data-cursor]');
      const link = t.closest(tocable);
      root.classList.toggle('cur-text', !!texto);
      root.classList.toggle('cur-link', !texto && !!link);
      root.classList.toggle('cur-label', !texto && !link && !!zona);
      if (zona && !link) etiqueta.textContent = zona.dataset.cursor || '';
    });
    window.addEventListener('pointerdown', () => root.classList.add('cur-down'));
    window.addEventListener('pointerup', () => root.classList.remove('cur-down'));
  }

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
  const estilo = getComputedStyle(section);
  const ink = estilo.color;
  const bg = estilo.backgroundColor;
  const oscuro = section.classList.contains('tone-dark');
  ScrollTrigger.create({
    trigger: section,
    start: 'top 36px',
    end: 'bottom 36px',
    onToggle: (self) => {
      if (!self.isActive) return;
      root.style.setProperty('--header-ink', ink);
      root.style.setProperty('--header-bg', bg);
      root.style.setProperty('--header-line', oscuro ? 'rgb(255 255 255 / 0.08)' : 'rgb(26 35 50 / 0.08)');
    },
  });
});
ScrollTrigger.refresh();
