import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { useAuth } from './AuthContext';
import { User } from '@/model/User'; // Đảm bảo đường dẫn đúng đến model User

export const Login: React.FC = () => {
    const { login, getUserInfo } = useAuth();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.username.trim() || !formData.password.trim()) {
            setError('Username and password are required.');
            return;
        }

        try {
            await login(formData.username, formData.password);
            const userInfo: User | null = await getUserInfo();
            if (userInfo && userInfo.roleName === 'ROLE_STAFF') {
                navigate('/home');
            } else {
                setError('Bạn không có quyền truy cập.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="container-login">
            <div className="screen">
                <div className="screen__content">
                    <form className="login" onSubmit={handleSubmit}>
                        <div className="login__field">
                            <FontAwesomeIcon icon={faUser} className="login__icon" />
                            <input
                                type="text"
                                name="username"
                                className="login__input"
                                placeholder="User name / Email"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="login__field">
                            <FontAwesomeIcon icon={faLock} className="login__icon" />
                            <input
                                type="password"
                                name="password"
                                className="login__input"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="button login__submit">
                            <span className="button__text">Log In Now</span>
                            <FontAwesomeIcon icon={faChevronRight} className="button__icon" />
                        </button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    );
};

export default Login;
