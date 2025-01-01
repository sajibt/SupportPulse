import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setUsers,
    setLoading,
    setError,
    updateUserInList,
    removeUser,
    setSelectedUser
} from '../features/admin/adminSlice';
import { adminActions } from '../features/admin/adminActions';

export const useAdmin = () => {
    const dispatch = useDispatch();
    const { users, loading, error, selectedUser } = useSelector((state) => state.admin);
    const { token } = useSelector((state) => state.auth);

    const fetchAllUsers = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const data = await adminActions.getAllUsers(token);
            dispatch(setUsers(data.data));
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Failed to fetch users'));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, token]);

    const updateUserRole = useCallback(async (userId, newRole) => {
        try {
            dispatch(setLoading(true));
            const data = await adminActions.updateUserRole(userId, newRole, token);
            dispatch(updateUserInList(data.data));
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Failed to update user role'));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, token]);

    const deleteUser = useCallback(async (userId) => {
        try {
            dispatch(setLoading(true));
            await adminActions.deleteUser(userId, token);
            dispatch(removeUser(userId));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Failed to delete user'));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, token]);

    return {
        users,
        loading,
        error,
        selectedUser,
        fetchAllUsers,
        updateUserRole,
        deleteUser
    };
};
