import { FIXY_CONFIG } from '../js/config.js';
import { getUsers, saveUsers, getWallPosts, saveWallPosts, getMetaFiles, saveMetaFiles, getKommoFiles, saveKommoFiles, getSettings, saveSettings, getSocialPreviews, saveSocialPreviews } from '../js/storage.js';

export function ensureDemoData() {
  if (!getUsers().length) saveUsers([
    { email: 'debora@fixy.com.ar', role: 'admin', canPost: true, name: 'Debora' },
    { email: 'marketing@fixy.com.ar', role: 'editor', canPost: true, name: 'Marketing' },
    { email: 'equipo@fixy.com.ar', role: 'viewer', canPost: false, name: 'Equipo' }
  ]);
  if (!getWallPosts().length) saveWallPosts([{ id: crypto.randomUUID(), author:'Debora', authorEmail:'debora@fixy.com.ar', date:new Date().toISOString(), text:'Semana fuerte: más leads gestionables y menos ruido. 🙌', image:'', featured:true, comments:[], reactions:{} }]);
  if (!getMetaFiles().length) saveMetaFiles([{ id: crypto.randomUUID(), fileName:'demo_meta.csv', uploadedAt:new Date().toISOString(), rowsProcessed:2, rows:[{campaign:'Campaña Pymes',status:'active',spent:150000,results:120},{campaign:'Campaña E-commerce',status:'paused',spent:90000,results:40}], summary:{ totalInvestment:240000,totalResults:160,activeCampaigns:1,pausedCampaigns:1,bestCampaign:'Campaña Pymes',worstCampaign:'Campaña E-commerce'} }]);
  if (!getKommoFiles().length) saveKommoFiles([{ id: crypto.randomUUID(), fileName:'demo_kommo.csv', uploadedAt:new Date().toISOString(), normalizedRows:[{name:'Lead 1'}], summary:{ totalImported:90,totalValidSource:75,totalExcluded:15,totalManageable:60,totalNotManageable:30,won:20,lost:15,inProgress:25,reasons:{'Búsqueda laboral':10,'Particular':8},manageablePct:66.7,conversionPct:33.3 } }]);
  if (!Object.keys(getSocialPreviews()).length) saveSocialPreviews({ instagram:{ profile:'https://instagram.com/fixylogistica', text:'Nuevo caso de éxito B2B', date:'2026-04-29', postLink:'https://instagram.com/fixylogistica/p/demo', image:'' }, linkedin:{ profile:'https://linkedin.com/company/fixylogistica', text:'Cómo escalamos logística comercial', date:'2026-04-25', postLink:'https://linkedin.com/company/fixylogistica', image:'' }, tiktok:{ profile:'https://tiktok.com/@fixylogistica', text:'Behind de operaciones 🚚', date:'2026-04-20', postLink:'https://tiktok.com/@fixylogistica', image:'' } });
  const settings = getSettings();
  if (!Object.keys(settings).length) saveSettings({ ...FIXY_CONFIG });
}
