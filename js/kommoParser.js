import { getKommoFiles, saveKommoFiles, getSettings } from './storage.js';
const n=(s='')=>s.toString().toLowerCase();
const split=(txt)=>{const lines=txt.split(/\r?\n/).filter(Boolean);const sep=(lines[0]?.includes(';')?';':',');return lines.map(l=>l.split(sep));};
export function processKommoCsv(name,text){const settings=getSettings();const rows=split(text);const headers=rows[0].map(n);const idx=(opts)=>headers.findIndex((h)=>opts.some((o)=>h.includes(o)));
const map={source:idx(['fuente','source','origen','canal']),phone:idx(['teléfono','telefono','phone','whatsapp','contacto']),status:idx(['estado','status','etapa']),lossReason:idx(['motivo']),name:idx(['nombre','name','lead']),campaign:idx(['campaña','campaign','utm']),notes:idx(['comentario','notes','mensaje'])};
const normalized=rows.slice(1).map(r=>({source:r[map.source]||'',phone:r[map.phone]||'',status:r[map.status]||'',lossReason:r[map.lossReason]||'',name:r[map.name]||'',campaign:r[map.campaign]||'',notes:r[map.notes]||''}));
const reasons={};let valid=0,manageable=0,won=0,lost=0,inProgress=0;const excluded=[];
normalized.forEach(l=>{const content=n(Object.values(l).join(' '));const sourceMatch=(settings.allowedLeadSources||[]).some((s)=>content.includes(n(s)));const phoneMatch=(settings.allowedPhones||[]).some((p)=>p&&n(l.phone).includes(n(p)));const socialMatch=content.includes('facebook')||content.includes('instagram');
if(!(sourceMatch||phoneMatch||socialMatch)){excluded.push('fuera de fuente');return;} valid++;
const kw=(settings.excludedKeywords||[]).find((k)=>content.includes(n(k))); if(kw){const why=kw.includes('trab')||kw.includes('cv')?'Búsqueda laboral':kw.includes('particular')?'Envío particular':'Otro'; reasons[why]=(reasons[why]||0)+1; excluded.push(why); return;}
if(!l.name&&!l.phone){reasons['Dato incompleto']=(reasons['Dato incompleto']||0)+1; excluded.push('Dato incompleto'); return;} manageable++;
const st=n(l.status); if((settings.wonStatuses||[]).some((s)=>st.includes(n(s)))) won++; else if((settings.lostStatuses||[]).some((s)=>st.includes(n(s)))) lost++; else if((settings.activeStatuses||[]).some((s)=>st.includes(n(s)))) inProgress++; });
const summary={totalImported:normalized.length,totalValidSource:valid,totalExcluded:normalized.length-manageable,totalManageable:manageable,totalNotManageable:normalized.length-manageable,won,lost,inProgress,reasons,manageablePct:normalized.length?(manageable/normalized.length)*100:0,conversionPct:manageable?(won/manageable)*100:0};
const file={id:crypto.randomUUID(),fileName:name,uploadedAt:new Date().toISOString(),normalizedRows:normalized,summary}; saveKommoFiles([...getKommoFiles(),file]); return file; }
