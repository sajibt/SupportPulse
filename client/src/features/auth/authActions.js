import axios from 'axios';

const API_URL = '/api/users';

export const authActions = {
    register: async (userData) => {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    },

    getProfile: async (token) => {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    updateProfile: async (profileData, token) => {
        const response = await axios.put(`${API_URL}/profile`, profileData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    changePassword: async (passwordData, token) => {
        const response = await axios.put(`${API_URL}/change-password`, passwordData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    forgotPassword: async (email) => {
        const response = await axios.post(`${API_URL}/forgot-password`, { email });
        return response.data;
    },

    resetPassword: async (token, password) => {
        const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
        return response.data;
    }
};

