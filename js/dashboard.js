import { getSessionUser } from './auth.js';
import { getMetaFiles, getKommoFiles } from './storage.js';
import { buildAnalytics } from './analytics.js';
import { renderWall, reactToPost, commentPost } from './wall.js';
import { getSocialCards } from './socialPreview.js';
export function initDashboard(){ const u=getSessionUser(); if(!u) return; document.querySelector('#userInfo').textContent=`${u.email} · ${u.role}`;
const a=buildAnalytics(); document.querySelector('#executive').textContent=a.executive; const m=getMetaFiles().at(-1)?.summary||{}; const k=getKommoFiles().at(-1)?.summary||{};
const kpi=document.querySelector('#kpis'); kpi.innerHTML=`<div class='kpi'>Leads recibidos: ${k.totalImported||0}</div><div class='kpi'>Leads gestionables: ${k.totalManageable||0}</div><div class='kpi'>No gestionables: ${k.totalNotManageable||0}</div><div class='kpi'>Campañas activas: ${m.activeCampaigns||0}</div><div class='kpi'>Campañas a revisar: ${m.worstCampaign?1:0}</div>`;
const wall=document.querySelector('#wallContainer'); renderWall(wall,u); wall.onclick=(e)=>{if(e.target.dataset.r) {reactToPost(e.target.dataset.id,u.email,e.target.dataset.r); renderWall(wall,u);} if(e.target.dataset.cbtn){const id=e.target.dataset.cbtn; const text=wall.querySelector(`[data-cid='${id}']`).value; if(text) {commentPost(id,u,text); renderWall(wall,u);}}};
const social=getSocialCards(); document.querySelector('#social').innerHTML=['instagram','linkedin','tiktok'].map(n=>{const s=social[n]||{};return `<div class='card'><h4>${n}</h4><a href='${s.profile||"#"}' target='_blank'>Perfil</a><p>${s.text||'Sin preview'}</p><small>${s.date||''}</small><a href='${s.postLink||"#"}' target='_blank'>Ir al post</a></div>`}).join(''); }
