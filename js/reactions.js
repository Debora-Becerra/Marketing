export const REACTION_TYPES = ['👍','❤️','🥰','😂','😮','😢','😡'];
export function applyReaction(post,userEmail,reaction){
  const next = { ...(post.reactions || {}) }; next[userEmail]=reaction; post.reactions=next; return post;
}
export function summarizeReactions(post){
  const acc={}; Object.values(post.reactions||{}).forEach((r)=>acc[r]=(acc[r]||0)+1);
  return { byType:acc, total:Object.keys(post.reactions||{}).length };
}
