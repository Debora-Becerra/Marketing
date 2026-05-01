import { FIXY_CONFIG } from './config.js';
import { getUsers, getCurrentUser, setCurrentUser, logout } from './storage.js';

export function loginWithEmail(email){
  const normalized = (email || '').trim().toLowerCase();
  if (!normalized.endsWith(`@${FIXY_CONFIG.companyDomain}`)) return { ok:false, message:'Usá tu email corporativo @fixy.com.ar' };
  const user = getUsers().find((u) => u.email.toLowerCase() === normalized);
  if (!user) return { ok:false, message:'Usuario no registrado en Fixy Hub Marketing.' };
  setCurrentUser(user); return { ok:true, user };
}
export const getSessionUser = () => getCurrentUser();
export const signOut = () => logout();
