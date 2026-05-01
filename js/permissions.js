export const isAdmin = (u) => u?.role === 'admin';
export const canPost = (u) => u?.role === 'admin' || u?.role === 'editor' || !!u?.canPost;
export const canEditPost = (u,p) => u?.role === 'admin' || p.authorEmail===u?.email;
