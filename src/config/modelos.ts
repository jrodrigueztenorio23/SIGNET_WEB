// Tono de cada sección (modelo «Niebla azul», elegido el 01/11/2026).
export type Tono = 'light' | 'soft' | 'tint' | 'dark';

export const tonos = {
  hero: 'dark', cifras: 'light', capacidades: 'soft', flujo: 'light', pantallas: 'tint', sunat: 'light',
  ia: 'soft', modulos: 'dark', nosotros: 'light', clientes: 'soft', footer: 'dark',
} as const satisfies Record<string, Tono>;

export const tono = (t: Tono) => `tone-${t}`;
