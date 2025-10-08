import React, { useState } from 'react';
import { useAppStore } from '../store/appStore.ts';
import { Input, Button } from './ui.tsx';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const login = useAppStore(state => state.login);

    const handleLogin = () => {
        setError('');
        // Password is not checked in this demo
        if (login(email)) {
            // successful login is handled by the store
        } else {
            setError('Invalid email address. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
                <div className="flex items-center mb-6 justify-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg mr-2"></div>
                    <span className="font-bold text-2xl">RotaApp</span>
                </div>
                <h2 className="text-xl font-bold text-center mb-1">Sign in to your account</h2>
                <p className="text-center text-gray-500 mb-6 text-sm">Welcome back!</p>
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div className="space-y-4">
                        <Input
                            label="Email Address"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                        <Input
                            label="Password"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                         {error && <p className="text-sm text-red-600">{error}</p>}
                        <Button className="w-full" type="submit">
                            Sign In
                        </Button>
                        <p className="text-xs text-gray-500 text-center">
                           Demo: Use any email from the mock data, e.g., <span className="font-mono">alice@example.com</span>. Password can be anything.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
