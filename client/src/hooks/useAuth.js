import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setError, setAuth, clearAuth, updateUser } from '../features/auth/authSlice';
import { authActions } from '../features/auth/authActions';

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);

    const login = useCallback(async (credentials) => {
        try {
            dispatch(setLoading(true));
            const data = await authActions.login(credentials);
            dispatch(setAuth(data));
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Login failed'));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const register = useCallback(async (userData) => {
        try {
            dispatch(setLoading(true));
            const data = await authActions.register(userData);
            dispatch(setAuth(data));
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Registration failed'));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const logout = useCallback(() => {
        dispatch(clearAuth());
    }, [dispatch]);

    const getProfile = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const data = await authActions.getProfile(token);
            dispatch(updateUser(data.user));
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Failed to fetch profile'));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, token]);

    return {
        user,
        token,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        getProfile
    };
};
