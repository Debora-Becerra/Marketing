const KEYS = {
  users: 'fixy_users', currentUser: 'fixy_current_user', wall: 'fixy_wall_posts',
  meta: 'fixy_meta_files', kommo: 'fixy_kommo_files', settings: 'fixy_settings', social: 'fixy_social_previews'
};
const read = (k, fallback) => JSON.parse(localStorage.getItem(k) || JSON.stringify(fallback));
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

export const getUsers = () => read(KEYS.users, []);
export const saveUsers = (v) => write(KEYS.users, v);
export const getCurrentUser = () => read(KEYS.currentUser, null);
export const setCurrentUser = (v) => write(KEYS.currentUser, v);
export const logout = () => localStorage.removeItem(KEYS.currentUser);
export const getWallPosts = () => read(KEYS.wall, []);
export const saveWallPosts = (v) => write(KEYS.wall, v);
export const getMetaFiles = () => read(KEYS.meta, []);
export const saveMetaFiles = (v) => write(KEYS.meta, v);
export const getKommoFiles = () => read(KEYS.kommo, []);
export const saveKommoFiles = (v) => write(KEYS.kommo, v);
export const getSettings = () => read(KEYS.settings, {});
export const saveSettings = (v) => write(KEYS.settings, v);
export const getSocialPreviews = () => read(KEYS.social, {});
export const saveSocialPreviews = (v) => write(KEYS.social, v);
export const resetDemoData = () => Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
