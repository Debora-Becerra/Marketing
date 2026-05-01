import { getSocialPreviews, saveSocialPreviews } from './storage.js';
export const getSocialCards = () => getSocialPreviews();
export function upsertSocial(network,payload){ const d=getSocialPreviews(); d[network]={...(d[network]||{}),...payload}; saveSocialPreviews(d); return d; }
