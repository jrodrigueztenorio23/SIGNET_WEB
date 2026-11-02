// Ícono de cada módulo (trazos en 24 × 24) y su pequeño movimiento en bucle (mov-*).
export const iconos: Record<string, { d: string; mov: string }> = {
  comercial: { mov: 'bob', d: 'M6 7h12l-1 13H7L6 7Zm3 0V6a3 3 0 0 1 6 0v1' },
  contabilidad: { mov: 'tilt', d: 'M6 3h12v18H6zM9 7h6M9 12h1m2 0h1m2 0h0M9 16h1m2 0h1m2 0h0' },
  planillas: { mov: 'bob', d: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 9a6 6 0 0 1 12 0M17 11a2.5 2.5 0 1 0 0-5M19 20a5 5 0 0 0-3-4.6' },
  compras: { mov: 'roll', d: 'M3 4h2l2.4 11h10.2L20 8H6.2M9 20h.01M17 20h.01' },
  produccion: { mov: 'pulse', d: 'M3 21V10l5 3V10l5 3V10l5 3V4h3v17H3Zm4-4h2m3 0h2' },
  configuracion: { mov: 'spin', d: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.2l2-1.6-2-3.4-2.4.9a7.4 7.4 0 0 0-2-1.2L14.5 3h-5l-.4 2.5a7.4 7.4 0 0 0-2 1.2l-2.4-.9-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-.9a7.4 7.4 0 0 0 2 1.2l.4 2.5h5l.4-2.5a7.4 7.4 0 0 0 2-1.2l2.4.9 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z' },
  almacen: { mov: 'bob', d: 'M3 8l9-5 9 5v8l-9 5-9-5V8Zm0 0 9 5 9-5M12 13v8' },
  bancos: { mov: 'tilt', d: 'M3 10 12 4l9 6M5 10v8m4-8v8m6-8v8m4-8v8M3 21h18' },
  activos: { mov: 'roll', d: 'M2 16V7h11v9M13 10h4l3 3v3h-7M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z' },
  crm: { mov: 'pulse', d: 'M12 21a9 9 0 1 0-9-9M12 16a4 4 0 1 0-4-4m4 0h.01M3 21l6-6' },
  seguridad: { mov: 'pulse', d: 'M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4' },
  dashboard: { mov: 'bars', d: 'M4 20V12M10 20V6M16 20v-9M22 20H2' },
};
