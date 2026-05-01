import { getMetaFiles, getKommoFiles } from './storage.js';
export function buildAnalytics(){
  const meta=getMetaFiles(); const kommo=getKommoFiles();
  const ms=meta.at(-1)?.summary||{}; const ks=kommo.at(-1)?.summary||{};
  const relation = meta.length&&kommo.length ? 'Se intentó cruzar campaña/origen por texto; tomar como señal, no atribución cerrada.' : 'No hay suficiente data para cruzar Meta y Kommo todavía.';
  return {
    executive:`Campañas activas: ${ms.activeCampaigns||0}. Leads gestionables: ${ks.totalManageable||0}. Lo que funciona: ${ms.bestCampaign||'sin definir'}. A revisar: ${ms.worstCampaign||'sin definir'}.`,
    bestCampaign: ms.bestCampaign || null,
    reviewCampaign: ms.worstCampaign || null,
    leadQuality: ks.manageablePct ? `${ks.manageablePct.toFixed(1)}% de leads gestionables.` : 'Sin datos de calidad suficientes.',
    recommendations:[
      'Priorizar inversión en campañas con mejor costo por resultado.',
      'Reducir ruido ajustando formularios y segmentación para filtrar laborales.',
      relation
    ]
  };
}
