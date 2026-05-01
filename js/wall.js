import { getWallPosts, saveWallPosts } from './storage.js';
import { applyReaction, summarizeReactions, REACTION_TYPES } from './reactions.js';
import { addComment } from './comments.js';
export function createPost(user,text,image=''){ const posts=getWallPosts(); posts.unshift({id:crypto.randomUUID(),author:user.name||user.email,authorEmail:user.email,date:new Date().toISOString(),text,image,featured:false,comments:[],reactions:{}}); saveWallPosts(posts); }
export function updatePost(id,patch){ const posts=getWallPosts().map(p=>p.id===id?{...p,...patch}:p); saveWallPosts(posts); }
export function deletePost(id){ saveWallPosts(getWallPosts().filter(p=>p.id!==id)); }
export function reactToPost(id,userEmail,reaction){ const posts=getWallPosts().map(p=>p.id===id?applyReaction(p,userEmail,reaction):p); saveWallPosts(posts); }
export function commentPost(id,user,text){ const posts=getWallPosts().map(p=>p.id===id?addComment(p,user,text):p); saveWallPosts(posts); }
export function renderWall(container,user){ const posts=getWallPosts(); container.innerHTML=posts.map(p=>{const s=summarizeReactions(p); return `<article class='card'><h4>${p.author} ${p.featured?'⭐':''}</h4><small>${new Date(p.date).toLocaleString()}</small><p>${p.text}</p><div>${REACTION_TYPES.map(r=>`<button data-r='${r}' data-id='${p.id}'>${r} ${s.byType[r]||0}</button>`).join('')} <b>Total: ${s.total}</b></div><div>${(p.comments||[]).map(c=>`<p>💬 <b>${c.author}</b>: ${c.text}</p>`).join('')}</div><input data-cid='${p.id}' placeholder='Comentar...'/><button data-cbtn='${p.id}'>Enviar</button></article>`;}).join('');
}
