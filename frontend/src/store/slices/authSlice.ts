import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: Record<string, unknown> | null;
    token: string | null;
    isAuthenticated: boolean;
}

const getUserFromStorage = () => {
    try {
        const item = localStorage.getItem('user');
        return item ? JSON.parse(item) : null;
    } catch {
        return null;
    }
};

const getTokenFromStorage = () => {
    return localStorage.getItem('token') || null;
};

const initialState: AuthState = {
    user: getUserFromStorage(),
    token: getTokenFromStorage(),
    isAuthenticated: !!getTokenFromStorage(),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: Record<string, unknown>; token: string }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
