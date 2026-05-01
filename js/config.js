export const FIXY_CONFIG = {
  companyDomain: 'fixy.com.ar',
  adminEmail: 'debora@fixy.com.ar',
  allowedLeadSources: [
    'Facebook Fixy Logística',
    'Instagram Fixy Logística',
    'facebook fixy',
    'instagram fixy',
    'fb fixy',
    'ig fixy'
  ],
  allowedPhones: ['COMPLETAR_TELEFONO_1', 'COMPLETAR_TELEFONO_2'],
  excludedKeywords: [
    'trabajo','empleo','cv','curriculum','currículum','repartidor','mensajero','chofer','moto',
    'busco trabajo','quiero trabajar','postularme','particular','envío particular','envio particular','paquete personal'
  ],
  wonStatuses: ['Logrado con éxito', 'Logrado MENOS de 10 ENVIOS', 'ganado', 'won'],
  lostStatuses: ['perdido', 'lost'],
  activeStatuses: ['nuevo', 'en gestión', 'en gestion', 'contactado', 'seguimiento'],
  fieldsMap: {
    source: ['fuente', 'source', 'origen', 'canal'],
    phone: ['teléfono', 'telefono', 'phone', 'whatsapp', 'contacto'],
    status: ['estado', 'status', 'etapa', 'pipeline stage'],
    lossReason: ['motivo de pérdida', 'motivo de perdida', 'loss reason', 'motivo'],
    name: ['nombre', 'name', 'lead'],
    createdAt: ['fecha', 'created at', 'fecha creación', 'fecha creacion'],
    campaign: ['campaña', 'campaign', 'utm campaign'],
    notes: ['comentario', 'notes', 'mensaje']
  }
};
