import { buildAnalytics } from './analytics.js';
import { getWallPosts, getSocialPreviews } from './storage.js';
export function initChat(){const out=document.querySelector('#chatOut'); const input=document.querySelector('#chatIn');
const reply=(q)=>{const t=q.toLowerCase(); const a=buildAnalytics(); if(t.includes('hola')) return 'No lo sep 🤔 Naa... mentira. Hola, ¿miramos campañas o leads?';
if(t.includes('gracias')) return 'De una. Si querés más detalle, coordinamos con Debora y lo bajamos a acciones.';
if(t.includes('mejor')) return `La mejor campaña hoy: ${a.bestCampaign||'todavía sin data confiable'}.`;
if(t.includes('peor')) return `Para revisar: ${a.reviewCampaign||'aún no hay candidata clara'}.`;
if(t.includes('leads')) return a.leadQuality;
if(t.includes('public')) return `Fixy publicó ${getWallPosts().length} novedades internas esta semana.`;
if(t.includes('camp')) return a.executive;
if(t.includes('comercial')) return 'Comercial debería mirar leads gestionables vs perdidos y motivos de descarte para ajustar respuesta.';
return 'No invento datos: con lo que tengo, te sugiero revisar Admin o hablar con Debora para bajar a detalle.';};
 document.querySelector('#chatForm').onsubmit=(e)=>{e.preventDefault(); const q=input.value.trim(); if(!q) return; out.innerHTML+=`<p><b>Vos:</b> ${q}</p><p><b>Flux:</b> ${reply(q)}</p>`; input.value='';};
}
