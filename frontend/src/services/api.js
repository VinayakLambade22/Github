import axios from "axios";
const API_URL = "http://localhost:3002";
const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const signupUser = (userData) => api.post("/signup", userData);
export const loginUser = (credentials) => api.post("/login", credentials);
export const getUserProfile = (id) => api.get(`/userProfile/${id}`);
export const updateUserProfile = (id, userData) =>
  api.put(`/updateProfile/${id}`, userData);
export const deleteUserProfile = (id) => api.delete(`/deleteProfile/${id}`);
export const getAllUsers = () => api.get("/allUsers");
export const createRepo = (repoData) => api.post("/repo/create", repoData);
export const getAllRepos = () => api.get("/repo/all");
export const getUserRepos = (userId) => api.get(`/repo/user/${userId}`);
export const getRepoDetails = (ownerName, repoName) =>
  api.get(`/repo/${ownerName}/${repoName}`);
export const updateRepoDetails = (id, repoData) =>
  api.put(`/repo/update/${id}`, repoData);
export const deleteRepo = (id) => api.delete(`/repo/delete/${id}`);
export const toggleRepoVisibility = (id) => api.patch(`/repo/toggle/${id}`);
export const getIssuesForRepo = (repoId) => api.get(`/issue/repo/${repoId}`);
export const createNewIssue = (issueData) =>
  api.post("/issue/create", issueData);

export default api;
