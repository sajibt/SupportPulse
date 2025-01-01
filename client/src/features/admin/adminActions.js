const ADMIN_API_URL = '/api/admin';

export const adminActions = {
    getAllUsers: async (token) => {
        const response = await axios.get(`${ADMIN_API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    updateUserRole: async (userId, newRole, token) => {
        const response = await axios.put(
            `${ADMIN_API_URL}/users/${userId}/role`,
            { newRole },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    },

    deleteUser: async (userId, token) => {
        await axios.delete(`${ADMIN_API_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return userId;
    },

    getUserById: async (userId, token) => {
        const response = await axios.get(`${ADMIN_API_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};
