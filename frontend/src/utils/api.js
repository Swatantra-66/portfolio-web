import axios from 'axios';

const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:8080/api"
  : "https://portfolio-web-0ull.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAuthHeaders = () => {
  const token = localStorage.getItem("admin_token");
  return {
    'X-Admin-Secret': token ? token.trim() : "",
  };
};

export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const getProject = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const getSkills = async () => {
  const response = await api.get('/skills');
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await api.post('/projects', projectData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const response = await api.put(`/projects/${id}`, projectData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export default api;