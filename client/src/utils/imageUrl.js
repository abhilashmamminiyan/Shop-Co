export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  // REACT_APP_API_URL is usually https://.../api
  // We want the base URL for images which is https://...
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4001/api';
  const baseUrl = apiUrl.replace(/\/api\/?$/, '');
  
  return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};
