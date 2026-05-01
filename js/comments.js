export function addComment(post,user,text){
  post.comments = post.comments || [];
  post.comments.push({ id: crypto.randomUUID(), author:user.name||user.email, authorEmail:user.email, date:new Date().toISOString(), text:text.trim() });
  return post;
}
