import { ensureDemoData } from '../data/mockData.js';
import { loginWithEmail, getSessionUser, signOut } from './auth.js';

export function bootstrapAuth(){
  ensureDemoData();
  const loginForm=document.querySelector('#loginForm');
  const current=getSessionUser();
  if (current) document.body.dataset.userRole=current.role;
  loginForm?.addEventListener('submit',(e)=>{e.preventDefault();const email=document.querySelector('#email').value;const res=loginWithEmail(email);document.querySelector('#loginMessage').textContent=res.ok?`Hola ${res.user.name} (${res.user.role})` : res.message; if(res.ok) location.reload();});
  document.querySelectorAll('[data-logout]').forEach((b)=>b.onclick=()=>{signOut();location.href='index.html';});
}
