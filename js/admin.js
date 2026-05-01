import { getSessionUser } from './auth.js';
import { isAdmin } from './permissions.js';
import { getUsers, saveUsers, getSettings, saveSettings, getMetaFiles, saveMetaFiles, getKommoFiles, saveKommoFiles } from './storage.js';
import { processMetaCsv, consolidateMeta } from './metaParser.js';
import { processKommoCsv } from './kommoParser.js';
import { getWallPosts } from './storage.js';
import { upsertSocial, getSocialCards } from './socialPreview.js';
export function initAdmin(){const u=getSessionUser(); if(!isAdmin(u)){location.href='index.html'; return;} render();
function render(){ document.querySelector('#users').innerHTML=getUsers().map(x=>`<li>${x.email} - ${x.role} - publicar:${x.canPost}<button data-del='${x.email}'>x</button></li>`).join('');
document.querySelector('#metaList').innerHTML=getMetaFiles().map(f=>`<li>${f.fileName} (${f.rowsProcessed})</li>`).join(''); document.querySelector('#metaSummary').textContent=JSON.stringify(consolidateMeta());
const k=getKommoFiles(); document.querySelector('#kommoList').innerHTML=k.map(f=>`<li>${f.fileName}: ${f.summary.totalImported} leads</li>`).join('');
const s=getSettings(); document.querySelector('#filters').value=JSON.stringify(s,null,2); const social=getSocialCards(); document.querySelector('#socialCfg').value=JSON.stringify(social,null,2);
 document.querySelector('#wallAdmin').innerHTML=getWallPosts().map(p=>`<li>${p.text.slice(0,50)}...</li>`).join(''); }
 document.querySelector('#createUser').onsubmit=(e)=>{e.preventDefault(); const email=e.target.email.value; const role=e.target.role.value; const users=getUsers(); users.push({email,role,canPost:role!=='viewer',name:email.split('@')[0]}); saveUsers(users); render();};
 document.querySelector('#users').onclick=(e)=>{if(e.target.dataset.del){saveUsers(getUsers().filter(u=>u.email!==e.target.dataset.del)); render();}};
 document.querySelector('#metaFile').onchange=async (e)=>{for(const f of e.target.files){processMetaCsv(f.name,await f.text());} render();};
 document.querySelector('#kommoFile').onchange=async (e)=>{for(const f of e.target.files){processKommoCsv(f.name,await f.text());} render();};
 document.querySelector('#clearMeta').onclick=()=>{saveMetaFiles([]);render();}; document.querySelector('#clearKommo').onclick=()=>{saveKommoFiles([]);render();};
 document.querySelector('#saveFilters').onclick=()=>{saveSettings(JSON.parse(document.querySelector('#filters').value)); render();};
 document.querySelector('#saveSocial').onclick=()=>{const d=JSON.parse(document.querySelector('#socialCfg').value); Object.entries(d).forEach(([k,v])=>upsertSocial(k,v)); render();};
}
