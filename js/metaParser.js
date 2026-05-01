import { getMetaFiles, saveMetaFiles } from './storage.js';
const aliases={campaign:['campaign','campaign name','campaña','nombre de campaña'],status:['delivery','status','estado','entrega'],spent:['amount spent','spent','importe gastado','gasto','inversión'],results:['results','resultados','leads','conversiones']};
const normalize=(s='')=>s.toString().trim().toLowerCase();
const parseNum=(v)=>{ if(v==null) return 0; const t=String(v).replace(/\./g,'').replace(',','.').replace(/[^0-9.-]/g,''); return Number(t)||0; };
const split=(txt)=>{ const lines=txt.split(/\r?\n/).filter(Boolean); const sep=(lines[0]?.includes(';')?';':','); return lines.map(l=>l.split(sep)); };
function mapHeaders(h){const m={};h.forEach((v,i)=>{const n=normalize(v);Object.entries(aliases).forEach(([k,arr])=>{if(arr.includes(n)) m[k]=i;});});return m;}
export function processMetaCsv(name,text){const rows=split(text); const idx=mapHeaders(rows[0]||[]); const parsed=rows.slice(1).map((r)=>({campaign:r[idx.campaign]||'Sin nombre',status:r[idx.status]||'unknown',spent:parseNum(r[idx.spent]),results:parseNum(r[idx.results])})).filter(r=>r.campaign);
const grouped={};parsed.forEach(r=>{grouped[r.campaign]=grouped[r.campaign]||{...r,spent:0,results:0};grouped[r.campaign].spent+=r.spent;grouped[r.campaign].results+=r.results;});
const campaigns=Object.values(grouped); const best=[...campaigns].sort((a,b)=>(b.results/(b.spent||1))-(a.results/(a.spent||1)))[0]; const worst=[...campaigns].sort((a,b)=>(a.results/(a.spent||1))-(b.results/(b.spent||1)))[0];
const summary={totalInvestment:campaigns.reduce((a,c)=>a+c.spent,0),totalResults:campaigns.reduce((a,c)=>a+c.results,0),activeCampaigns:campaigns.filter(c=>normalize(c.status).includes('active')||normalize(c.status).includes('activa')).length,pausedCampaigns:campaigns.filter(c=>normalize(c.status).includes('pause')||normalize(c.status).includes('paus')).length,bestCampaign:best?.campaign||null,worstCampaign:worst?.campaign||null,costPerResult:(campaigns.reduce((a,c)=>a+c.results,0)?campaigns.reduce((a,c)=>a+c.spent,0)/campaigns.reduce((a,c)=>a+c.results,0):0)};
const file={id:crypto.randomUUID(),fileName:name,uploadedAt:new Date().toISOString(),rowsProcessed:parsed.length,rows:parsed,summary};
saveMetaFiles([...getMetaFiles(),file]); return file; }
export function consolidateMeta(){const all=getMetaFiles();const base={totalInvestment:0,totalResults:0,activeCampaigns:0,pausedCampaigns:0};all.forEach(f=>Object.keys(base).forEach(k=>base[k]+=f.summary[k]||0));return {...base,files:all.length};}
