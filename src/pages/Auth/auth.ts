import { User } from '@/model/User';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


axios.defaults.baseURL = "http://localhost:8080/api/v1/";

const isAccessTokenExpired = (accessToken: string): boolean => {
    try {
        const decodedToken: { exp: number } = jwtDecode(accessToken); 
        const expirationTime = decodedToken.exp * 1000; 
        const currentTime = new Date().getTime();
        return currentTime > expirationTime; 
    } catch (error) {
        console.error('Error decoding access token:', error);
        return true; 
    }
};

export const refreshTokenIfNeeded = async (): Promise<boolean> => {
    const accessToken = Cookies.get('accessToken');
    if (!accessToken || isAccessTokenExpired(accessToken)) {
        try {
            const response = await axios.post('/auth/refresh_token', {
                refresh_token: Cookies.get('refreshToken')
            });
            const newAccessToken = response.data.access_token;
            Cookies.set('accessToken', newAccessToken, { expires: 1 });
            console.log('Refreshed access token successfully');
            return true;
        } catch (error) {
            console.error('Failed to refresh access token:', error);
            return false;
        }
    }
    return true;
};

export const login = async (username: string, password: string): Promise<boolean> => {
    try {
        const response = await axios.post('/auth/user/login', {
            userNameOrEmailOrPhone: username,
            password: password
        });
        const { access_token, refresh_token } = response.data;
        Cookies.set('accessToken', access_token, { expires: 1 }); 
        Cookies.set('refreshToken', refresh_token, { expires: 15 });
        console.log('Login successful');
        return true;
    } catch (error) {
        console.error('Login failed', error);
        return false;
    }
};

export const getUserInfo = async (): Promise<User | null> => {
    try {
        const accessToken = Cookies.get('accessToken');
        if (!accessToken || isAccessTokenExpired(accessToken)) {
            throw new Error('Access token is missing or expired');
        }
        const response = await axios.get('/auth/user/info', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data as User;
    } catch (error) {
        console.error('Failed to get user info:', error);
        return null;
    }
};
