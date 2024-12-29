import React, { useState } from 'react';
import { useRegisterUserMutation } from '../../redux/features/auth/authApi';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [registerUser] = useRegisterUserMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await registerUser({ email, password, username }).unwrap();
            setMessage('Registration successful!');
        } catch (error) {
            setMessage(error.data?.message || 'Registration failed');
        }
    };

    return (
        <div className='max-w-sm bg-slate-100 mx-auto p-8 mt-36 rounded-lg shadow-lg'>
            <h2 className='text-3xl font-bold pt-5'>Register To BTCNEWS</h2>
            <form className='space-y-5 mx-w-sm mx-auto pt-8' onSubmit={handleSubmit}>
                <input
                    type="text"
                    maxLength={10}
                    required
                    placeholder='Enter a username'
                    className='w-full bg-slate-200 rounded-lg focus:outline-none px-5 py-3'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    maxLength={30}
                    required
                    placeholder='Enter a valid Email address'
                    className='w-full bg-slate-200 rounded-lg focus:outline-none px-5 py-3'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    maxLength={16}
                    required
                    placeholder='Password must have at least 8 characters'
                    className='w-full bg-slate-200 rounded-lg focus:outline-none px-5 py-3'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {message && <p className='text-blue-900'>{message}</p>}
                <button type="submit" className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg'>
                    Sign Up
                </button>
            </form>
            <p className='my-5 text-center text-gray-500'>
                Already have an account? <a href='/login' className='text-blue-500 hover:text-blue-700'>Sign In</a>
            </p>
        </div>
    );
};

export default Register;
