import React, { useState } from 'react';
import { useLoginUserMutation } from '../../redux/features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/auth/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        };
        try {
            const response = await loginUser(data).unwrap();
            const { token, user } = response;
            // Store user data in Redux store
            dispatch(setUser({ user }));
            // Store token in local storage
            localStorage.setItem('token', token);
            alert("Login Successful");
            navigate('/');
        } catch (error) {
            setMessage("Invalid email or password");
        }
    };

    return (
        <div className='max-w-sm bg-slate-100 mx-auto p-8 mt-36 rounded-lg shadow-lg'>
            <h2 className='text-3xl font-bold pt-5'>Login to BTCNEWS</h2>
            <form onSubmit={handleSubmit} className='space-y-5 mx-w-sm mx-auto pt-8'>
                <input
                    type="email"
                    value={email}
                    required
                    placeholder='Enter your Email...'
                    className='w-full bg-slate-200 rounded-lg focus:outline-none px-5 py-3'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    required
                    placeholder='Enter your Password...'
                    className='w-full bg-slate-200 rounded-lg focus:outline-none px-5 py-3'
                    onChange={(e) => setPassword(e.target.value)}
                />
                {message && <p className='text-red-500'>{message}</p>}
                <button
                    disabled={loginLoading}
                    type="submit"
                    className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg'
                >
                    {loginLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p className='my-5 text-center text-gray-500'>
                Don't have an account? <a href='/register' className='text-blue-500 hover:text-blue-700'>Sign Up</a>
            </p>
        </div>
    );
};

export default Login;