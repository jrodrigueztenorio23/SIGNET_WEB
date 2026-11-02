// Datos del sitio. Todo lo que el cliente debe confirmar antes de publicar está marcado con POR CONFIRMAR.

export const empresa = {
  producto: 'SIG Advanced',
  nombre: 'Lite Software & Consulting SAC',
  // Para textos en pantalla: espacios que no se parten, así el nombre sólo puede bajar de línea antes del «&».
  nombreTexto: 'Lite Software & Consulting SAC',
  // POR CONFIRMAR: teléfono, correo y dirección vienen del sitio anterior (sigerp.pe).
  whatsapp: '51933647183',
  whatsappVisible: '+51 933 647 183',
  telefono: '+51 (1) 642-1902',
  correo: '', // POR CONFIRMAR: el correo anterior era de RC Soft Consulting.
  direccion: 'Av. Javier Prado Este 4473, Of. 301, Surco, Lima',
  ciudad: 'Lima',
};

/** Enlace a WhatsApp con el mensaje ya escrito. */
export function wa(mensaje: string): string {
  return `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export const mensajes = {
  demo: 'Hola, quiero ver una demo de SIG Advanced.',
  plan: 'Hola, quiero una cotización del plan SIG Advanced.',
  general: 'Hola, tengo una consulta sobre SIG Advanced.',
};

export type Modulo = {
  id: string;
  nombre: string;
  opciones: number;
  resumen: string;
  pantallas: string[];
  claves: string[];
};

// Opciones por módulo: SIGNET_ADVANCED/docs/MENU_MAESTRO.md (377 opciones con pantalla).
export const modulos: Modulo[] = [
  {
    id: 'comercial', nombre: 'Comercial', opciones: 55,
    resumen: 'Haces la cotización, la conviertes en pedido, despachas y emites la factura o boleta electrónica. Después ves cuánto te debe cada cliente.',
    pantallas: ['Ingreso de cotizaciones', 'Despacho y facturación', 'Registro de ventas oficial'],
    claves: ['factura', 'facturar', 'boleta', 'venta', 'vender', 'sunat', 'cotiza', 'pedido', 'cobranza', 'cobrar', 'cliente', 'electronica'],
  },
  {
    id: 'contabilidad', nombre: 'Contabilidad', opciones: 66,
    resumen: 'Los asientos se generan solos desde ventas, compras y bancos. Tú revisas los libros, generas el PLE para SUNAT y ves tu flujo de caja.',
    pantallas: ['Libro diario', 'Libros electrónicos PLE', 'Reporte de flujo de caja'],
    claves: ['contab', 'libro', 'ple', 'asiento', 'balance', 'diario', 'mayor', 'flujo', 'estados financieros', 'centro de costo'],
  },
  {
    id: 'planillas', nombre: 'Planillas', opciones: 47,
    resumen: 'Registras a tus trabajadores y sus contratos, y SIG calcula la planilla de cada mes según el régimen laboral y el sistema de pensiones de cada uno.',
    pantallas: ['Trabajadores', 'Periodo laboral por trabajador', 'Régimen pensionario'],
    claves: ['planilla', 'sueldo', 'trabajador', 'personal', 'empleado', 'rrhh', 'nomina', 'contrato', 'afp', 'pago de personal'],
  },
  {
    id: 'compras', nombre: 'Compras', opciones: 46,
    resumen: 'Cada área pide lo que necesita, el pedido pasa a orden de compra y nada se compra sin la aprobación que corresponde.',
    pantallas: ['Requerimientos', 'Orden de compra', 'Autorización de órdenes de compra'],
    claves: ['compra', 'comprar', 'proveedor', 'orden de compra', 'requerimiento', 'o/c'],
  },
  {
    id: 'produccion', nombre: 'Producción', opciones: 31,
    resumen: 'Planificas lo que vas a fabricar, lanzas las órdenes con sus máquinas y operarios, y sabes cuánto te costó de verdad cada una.',
    pantallas: ['Plan de producción', 'Órdenes de producción', 'Distribución de costos'],
    claves: ['produc', 'fabrica', 'maquina', 'operario', 'orden de produccion', 'costo'],
  },
  {
    id: 'configuracion', nombre: 'Configuración', opciones: 31,
    resumen: 'La base de todo el sistema: tus productos, unidades de medida, líneas, familias y zonas de venta.',
    pantallas: ['Unidades de medida', 'Líneas de producto', 'Zonas'],
    claves: ['configura', 'unidad', 'linea', 'familia', 'catalogo'],
  },
  {
    id: 'almacen', nombre: 'Almacén', opciones: 28,
    resumen: 'Sabes cuánto tienes de cada producto y en qué almacén está. Registras entradas, salidas, transferencias y guías de remisión electrónicas.',
    pantallas: ['Guías de remisión', 'Transferencias entre almacenes', 'Ubicaciones de productos'],
    claves: ['almacen', 'stock', 'inventario', 'kardex', 'guia', 'remision', 'producto', 'existencia', 'bodega'],
  },
  {
    id: 'bancos', nombre: 'Bancos', opciones: 23,
    resumen: 'Llevas tus cuentas, la caja chica y los pagos a proveedores, y cuadras lo que dice el banco con lo que dicen tus libros.',
    pantallas: ['Movimientos de banco', 'Caja chica', 'Conciliación bancaria'],
    claves: ['banco', 'caja', 'pago', 'pagar', 'tesoreria', 'concilia', 'transferencia', 'rendir'],
  },
  {
    id: 'activos', nombre: 'Activos fijos', opciones: 22,
    resumen: 'Cada activo de la empresa con su ubicación, sus componentes, sus traslados y sus reparaciones.',
    pantallas: ['Activos fijos', 'Movimiento de activos fijos', 'Reparación / overhaul'],
    claves: ['activo', 'depreciac', 'equipo', 'vehiculo', 'maquinaria'],
  },
  {
    id: 'crm', nombre: 'CRM', opciones: 15,
    resumen: 'Le haces seguimiento a cada posible cliente: con quién hablaste, qué le ofreciste y en qué etapa está la venta.',
    pantallas: ['Pipeline', 'Oportunidades', 'Mi día'],
    claves: ['crm', 'oportunidad', 'pipeline', 'prospecto', 'contacto', 'seguimiento', 'lead'],
  },
  {
    id: 'seguridad', nombre: 'Seguridad', opciones: 11,
    resumen: 'Decides quién entra y qué puede ver o hacer cada usuario, y queda registro de quién hizo cada cambio.',
    pantallas: ['Usuarios', 'Registro de accesos por usuario', 'Auditoría'],
    claves: ['seguridad', 'usuario', 'acceso', 'permiso', 'perfil', 'auditoria', 'clave'],
  },
  {
    id: 'dashboard', nombre: 'Dashboard', opciones: 1,
    resumen: 'Los números principales de tu empresa en una sola pantalla, para ver cómo vas sin pedir reportes.',
    pantallas: ['Dashboard'],
    claves: ['dashboard', 'indicador', 'reporte', 'kpi', 'grafico', 'gerencia'],
  },
];

export const totalOpciones = modulos.reduce((s, m) => s + m.opciones, 0);

// Clientes publicados en sigerp.pe. POR CONFIRMAR: permiso para seguir mostrándolos.
// Logos descargados de sigerp.pe (01/11/2026) a public/img/clientes.
export const clientes = [
  { nombre: 'Seprocal', logo: '/img/clientes/seprocal.png' },
  { nombre: 'IESA', logo: '/img/clientes/iesa.png' },
  { nombre: 'Transvida', logo: '/img/clientes/transvida.jpg' },
  { nombre: 'Point Andina', logo: '/img/clientes/point-andina.png' },
  { nombre: 'Mundo sin Cáncer', logo: '/img/clientes/mundo-sin-cancer.jpg' },
  { nombre: 'Cobertura', logo: '/img/clientes/cobertura.jpg' },
  { nombre: 'Rauletti', logo: '/img/clientes/rauletti.jpg' },
  { nombre: "D'Cocina", logo: '/img/clientes/dcocina.jpg' },
  { nombre: 'Probela', logo: '/img/clientes/probela.png' },
  { nombre: 'Liguria', logo: '/img/clientes/liguria.jpg' },
];

export const ejemplosNecesidad = [
  'facturar a SUNAT',
  'controlar mi stock',
  'pagar la planilla',
  'aprobar compras',
  'llevar el PLE',
];
