const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if(token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  if(!res.ok) throw new Error(await res.text());
  return res.json();
};

export const authAPI = {
  register: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  getMe: () => request('/auth/me')
};

export const postsAPI = {
  getAll: () => request('/posts'),
  create: (data) => request('/posts', { method: 'POST', body: JSON.stringify(data) })
};p
