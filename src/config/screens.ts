// Pantallas de SIG Advanced reproducidas en HTML a partir de la interfaz nueva (SIGNET_ADVANCED).
// Los datos son de ejemplo: empresas, productos y montos inventados para la demostración.

export type Chip = { t: string; c: 'ok' | 'warn' | 'info' | 'off' };
export type Celda = string | Chip;

export type Pantalla = {
  id: string;
  modulo: string; // como aparece en la barra de menú de SIG
  titulo: string;
  frase: string; // lo que se ve en la web, debajo del nombre del módulo
  filtros: { label: string; valor?: string }[];
  columnas: { t: string; num?: boolean; total?: boolean }[];
  filas: Celda[][];
};

export const menuSig = [
  'Inicio', 'Seguridad', 'Configuración', 'Almacén', 'Comercial', 'Compras', 'Bancos',
  'Producción', 'Activos Fijos', 'Contabilidad', 'Planillas', 'CRM',
];

const ok = (t: string): Chip => ({ t, c: 'ok' });
const warn = (t: string): Chip => ({ t, c: 'warn' });
const info = (t: string): Chip => ({ t, c: 'info' });

export const pantallas: Pantalla[] = [
  {
    id: 'comercial', modulo: 'Comercial', titulo: 'Despacho y Facturación',
    frase: 'Del pedido a la factura electrónica, con el estado de SUNAT a la vista.',
    filtros: [{ label: 'Cliente' }, { label: 'Serie', valor: 'F001' }, { label: 'Mes', valor: 'OCTUBRE' }],
    columnas: [{ t: 'Fecha' }, { t: 'Documento' }, { t: 'Cliente' }, { t: 'Moneda' }, { t: 'Total', num: true, total: true }, { t: 'SUNAT' }],
    filas: [
      ['28/10/2026', 'F001-00004812', 'Ferretería El Sol S.A.C.', 'SOLES', '12,540.00', ok('Aceptado')],
      ['28/10/2026', 'F001-00004811', 'Agroexport Norte S.A.C.', 'DÓLARES', '3,180.00', ok('Aceptado')],
      ['27/10/2026', 'F001-00004810', 'Constructora Los Pinos S.A.', 'SOLES', '48,920.50', ok('Aceptado')],
      ['27/10/2026', 'F001-00004809', 'Distribuidora Mar Azul E.I.R.L.', 'SOLES', '1,264.00', warn('Pendiente')],
      ['26/10/2026', 'F001-00004808', 'Textiles Andinos S.A.C.', 'SOLES', '7,815.30', ok('Aceptado')],
      ['26/10/2026', 'F001-00004807', 'Minera Altiplano Demo S.A.', 'DÓLARES', '22,400.00', ok('Aceptado')],
    ],
  },
  {
    id: 'almacen', modulo: 'Almacén', titulo: 'Productos / Servicios',
    frase: 'Stock por almacén, costo promedio y movimientos al instante.',
    filtros: [{ label: 'Producto' }, { label: 'Línea', valor: 'FERRETERÍA' }, { label: 'Almacén', valor: 'PRINCIPAL' }],
    columnas: [{ t: 'Código' }, { t: 'Producto' }, { t: 'Unidad' }, { t: 'Almacén' }, { t: 'Stock', num: true, total: true }, { t: 'Costo prom.', num: true }],
    filas: [
      ['PR-00125', 'Cemento Portland tipo I 42.5 kg', 'BOLSA', 'PRINCIPAL', '1,248', '28.40'],
      ['PR-00126', 'Fierro corrugado 1/2" x 9 m', 'VARILLA', 'PRINCIPAL', '860', '41.90'],
      ['PR-00131', 'Tubo PVC SAP 4" x 5 m', 'UNIDAD', 'PRINCIPAL', '312', '36.75'],
      ['PR-00140', 'Pintura látex blanco 4 L', 'GALÓN', 'TIENDA SUR', '96', '58.20'],
      ['PR-00152', 'Alambre negro N° 16', 'KILO', 'PRINCIPAL', '540', '6.10'],
      ['PR-00158', 'Ladrillo King Kong 18 huecos', 'MILLAR', 'PRINCIPAL', '24', '890.00'],
    ],
  },
  {
    id: 'compras', modulo: 'Compras', titulo: 'Orden de Compra',
    frase: 'Requerimientos y órdenes de compra con autorización por niveles.',
    filtros: [{ label: 'Proveedor' }, { label: 'Estado', valor: 'TODOS' }, { label: 'Mes', valor: 'OCTUBRE' }],
    columnas: [{ t: 'N° O/C' }, { t: 'Fecha' }, { t: 'Proveedor' }, { t: 'Moneda' }, { t: 'Total', num: true, total: true }, { t: 'Estado' }],
    filas: [
      ['OC-000731', '28/10/2026', 'Aceros del Centro S.A.C.', 'SOLES', '36,120.00', info('Por autorizar')],
      ['OC-000730', '27/10/2026', 'Plásticos Industriales Lima S.A.', 'SOLES', '8,450.00', ok('Autorizada')],
      ['OC-000729', '25/10/2026', 'Transportes Ruta 1 E.I.R.L.', 'SOLES', '2,300.00', ok('Autorizada')],
      ['OC-000728', '24/10/2026', 'Importadora Pacífico S.A.C.', 'DÓLARES', '15,780.00', ok('Atendida')],
      ['OC-000727', '22/10/2026', 'Papelera Nacional Demo S.A.', 'SOLES', '1,140.00', ok('Atendida')],
      ['OC-000726', '21/10/2026', 'Aceros del Centro S.A.C.', 'SOLES', '29,600.00', ok('Atendida')],
    ],
  },
  {
    id: 'bancos', modulo: 'Bancos', titulo: 'Pago a Proveedores',
    frase: 'Pagos, caja chica y conciliación bancaria sin hojas sueltas.',
    filtros: [{ label: 'Proveedor' }, { label: 'Forma de Pago' }, { label: 'Año', valor: '2026' }, { label: 'Mes', valor: 'OCTUBRE' }],
    columnas: [{ t: 'Fecha' }, { t: 'Proveedor' }, { t: 'Forma de pago' }, { t: 'Moneda' }, { t: 'Banco' }, { t: 'Pago total', num: true, total: true }],
    filas: [
      ['28/10/2026', 'Aceros del Centro S.A.C.', 'TRANSFERENCIA', 'SOLES', 'BCP', '29,600.00'],
      ['27/10/2026', 'Importadora Pacífico S.A.C.', 'TRANSFERENCIA', 'DÓLARES', 'BBVA', '15,780.00'],
      ['25/10/2026', 'Transportes Ruta 1 E.I.R.L.', 'CHEQUE', 'SOLES', 'INTERBANK', '2,300.00'],
      ['24/10/2026', 'Papelera Nacional Demo S.A.', 'TRANSFERENCIA', 'SOLES', 'BCP', '1,140.00'],
      ['22/10/2026', 'Servicios Eléctricos Lima S.A.', 'DÉBITO', 'SOLES', 'SCOTIABANK', '3,412.60'],
      ['21/10/2026', 'Plásticos Industriales Lima S.A.', 'TRANSFERENCIA', 'SOLES', 'BCP', '8,450.00'],
    ],
  },
  {
    id: 'contabilidad', modulo: 'Contabilidad', titulo: 'Libro Diario',
    frase: 'Asientos automáticos desde cada módulo, libros oficiales y PLE.',
    filtros: [{ label: 'Periodo', valor: '2026-10' }, { label: 'Tipo de asiento', valor: 'VENTAS' }, { label: 'Cuenta' }],
    columnas: [{ t: 'Asiento' }, { t: 'Fecha' }, { t: 'Cuenta' }, { t: 'Glosa' }, { t: 'Debe', num: true, total: true }, { t: 'Haber', num: true }],
    filas: [
      ['05-000812', '28/10/2026', '1212 Facturas por cobrar', 'F001-00004812 Ferretería El Sol', '12,540.00', ''],
      ['05-000812', '28/10/2026', '40111 IGV por pagar', 'F001-00004812 Ferretería El Sol', '', '1,912.88'],
      ['05-000812', '28/10/2026', '7011 Mercaderías', 'F001-00004812 Ferretería El Sol', '', '10,627.12'],
      ['05-000813', '28/10/2026', '1212 Facturas por cobrar', 'F001-00004811 Agroexport Norte', '3,180.00', ''],
      ['05-000813', '28/10/2026', '40111 IGV por pagar', 'F001-00004811 Agroexport Norte', '', '485.08'],
      ['05-000813', '28/10/2026', '7011 Mercaderías', 'F001-00004811 Agroexport Norte', '', '2,694.92'],
    ],
  },
  {
    id: 'planillas', modulo: 'Planillas', titulo: 'Trabajadores',
    frase: 'Regímenes laborales, pensiones y planilla calculada a tiempo.',
    filtros: [{ label: 'Trabajador' }, { label: 'Régimen', valor: 'GENERAL' }, { label: 'Estado', valor: 'ACTIVO' }],
    columnas: [{ t: 'Código' }, { t: 'Trabajador' }, { t: 'Cargo' }, { t: 'Pensión' }, { t: 'Sueldo', num: true, total: true }, { t: 'Estado' }],
    filas: [
      ['T-0041', 'Rosa Quispe Mamani', 'Jefa de almacén', 'AFP INTEGRA', '4,200.00', ok('Activo')],
      ['T-0042', 'Luis Torres Vega', 'Asistente contable', 'ONP', '2,600.00', ok('Activo')],
      ['T-0045', 'Carmen Huamán Ríos', 'Ejecutiva de ventas', 'AFP PRIMA', '3,100.00', ok('Activo')],
      ['T-0047', 'Jorge Salas Paredes', 'Operario', 'AFP HABITAT', '1,850.00', ok('Activo')],
      ['T-0050', 'Ana Flores Cárdenas', 'Analista de compras', 'AFP INTEGRA', '3,400.00', info('Vacaciones')],
      ['T-0052', 'Miguel Ramos León', 'Chofer', 'ONP', '2,050.00', ok('Activo')],
    ],
  },
  {
    id: 'produccion', modulo: 'Producción', titulo: 'Órdenes de Producción',
    frase: 'Planifica, produce y conoce el costo real de cada orden.',
    filtros: [{ label: 'Producto' }, { label: 'Estado', valor: 'EN PROCESO' }, { label: 'Mes', valor: 'OCTUBRE' }],
    columnas: [{ t: 'N° O/P' }, { t: 'Fecha' }, { t: 'Producto' }, { t: 'Cantidad', num: true }, { t: 'Avance', num: true, total: true }, { t: 'Estado' }],
    filas: [
      ['OP-002214', '27/10/2026', 'Mesa de trabajo metálica 1.80 m', '120', '76%', info('En proceso')],
      ['OP-002213', '26/10/2026', 'Estante industrial 5 niveles', '80', '100%', ok('Terminada')],
      ['OP-002212', '25/10/2026', 'Puerta metálica 0.90 x 2.10', '45', '40%', info('En proceso')],
      ['OP-002211', '23/10/2026', 'Casillero 12 puertas', '30', '100%', ok('Terminada')],
      ['OP-002210', '22/10/2026', 'Mesa de trabajo metálica 1.20 m', '150', '100%', ok('Terminada')],
      ['OP-002209', '20/10/2026', 'Carrito de herramientas', '60', '10%', warn('Programada')],
    ],
  },
  {
    id: 'activos', modulo: 'Activos Fijos', titulo: 'Activos Fijos',
    frase: 'Cada activo con su ubicación, depreciación y reparaciones.',
    filtros: [{ label: 'Activo' }, { label: 'Grupo', valor: 'TODOS' }, { label: 'Área', valor: 'TODAS' }],
    columnas: [{ t: 'Código' }, { t: 'Activo' }, { t: 'Grupo' }, { t: 'Adquisición' }, { t: 'Valor', num: true, total: true }, { t: 'Estado' }],
    filas: [
      ['AF-00318', 'Montacargas eléctrico 2.5 t', 'MAQUINARIA', '15/03/2024', '98,500.00', ok('Operativo')],
      ['AF-00319', 'Camión de reparto 4 t', 'VEHÍCULOS', '02/07/2024', '182,000.00', ok('Operativo')],
      ['AF-00320', 'Torno CNC 1.5 m', 'MAQUINARIA', '20/01/2025', '146,300.00', warn('En reparación')],
      ['AF-00325', 'Servidor de base de datos', 'CÓMPUTO', '10/05/2025', '24,800.00', ok('Operativo')],
      ['AF-00331', 'Compresora industrial 100 L', 'MAQUINARIA', '08/09/2025', '12,650.00', ok('Operativo')],
      ['AF-00334', 'Estantería de almacén', 'MOBILIARIO', '01/02/2026', '9,900.00', ok('Operativo')],
    ],
  },
  {
    id: 'crm', modulo: 'CRM', titulo: 'Oportunidades',
    frase: 'El pipeline del equipo de ventas, de la primera llamada al cierre.',
    filtros: [{ label: 'Cliente' }, { label: 'Etapa', valor: 'TODAS' }, { label: 'Equipo', valor: 'VENTAS LIMA' }],
    columnas: [{ t: 'Oportunidad' }, { t: 'Cliente' }, { t: 'Responsable' }, { t: 'Cierre' }, { t: 'Monto', num: true, total: true }, { t: 'Etapa' }],
    filas: [
      ['Renovación de equipos', 'Constructora Los Pinos S.A.', 'C. Huamán', '15/11/2026', '86,000.00', info('Propuesta')],
      ['Suministro anual cemento', 'Ferretería El Sol S.A.C.', 'C. Huamán', '30/11/2026', '240,000.00', warn('Negociación')],
      ['Ampliación de línea', 'Textiles Andinos S.A.C.', 'M. Ramos', '05/12/2026', '38,500.00', info('Calificada')],
      ['Pedido de exportación', 'Agroexport Norte S.A.C.', 'C. Huamán', '20/11/2026', '64,200.00', ok('Ganada')],
      ['Mantenimiento de flota', 'Transportes Ruta 1 E.I.R.L.', 'M. Ramos', '12/12/2026', '18,900.00', info('Contacto')],
      ['Proyecto almacenes', 'Distribuidora Mar Azul E.I.R.L.', 'C. Huamán', '18/12/2026', '52,000.00', info('Propuesta')],
    ],
  },
];
