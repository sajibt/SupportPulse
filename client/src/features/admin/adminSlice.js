import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    loading: false,
    error: null,
    selectedUser: null
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        updateUserInList: (state, action) => {
            const index = state.users.findIndex(user => user._id === action.payload._id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user._id !== action.payload);
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        }
    }
});

export const {
    setUsers,
    setLoading,
    setError,
    updateUserInList,
    removeUser,
    setSelectedUser
} = adminSlice.actions;
export default adminSlice.reducer;
