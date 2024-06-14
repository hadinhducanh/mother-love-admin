import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { User } from '@/model/User';
import { refreshTokenIfNeeded, login, getUserInfo } from './auth'; // Assuming these functions are implemented

interface AuthContextType {
    isLoggedIn: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    getUserInfo: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: async (username: string, password: string) => {},
    logout: () => {},
    getUserInfo: async () => null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const initializeAuth = async () => {
            const isAuthenticated = await refreshTokenIfNeeded();
            setIsLoggedIn(isAuthenticated);
        };

        initializeAuth();
    }, []);

    const handleLogin = async (username: string, password: string) => {
        const success = await login(username, password);
        if (success) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            throw new Error('Login failed. Please check your credentials.');
        }
    };

    const handleLogout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login: handleLogin, logout: handleLogout, getUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
