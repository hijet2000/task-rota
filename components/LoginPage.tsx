// FIX: Implemented placeholder component to resolve build errors.
import React, { useState } from 'react';
import { Button, Input, Card } from './ui.tsx';
import { GoogleIcon, MicrosoftIcon } from './icons.tsx';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would handle authentication here
        alert(`Logging in with Email: ${email}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto p-4">
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-2"></div>
                    <h1 className="text-3xl font-bold">Welcome to RotaApp</h1>
                    <p className="text-gray-500">Sign in to continue</p>
                </div>
                <Card title="" description="">
                    <form onSubmit={handleLogin} className="space-y-4">
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
                        <Button type="submit" className="w-full">Sign In</Button>
                    </form>
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <Button variant="secondary">
                            <GoogleIcon className="w-5 h-5 mr-2" /> Google
                         </Button>
                         <Button variant="secondary">
                             <MicrosoftIcon className="w-5 h-5 mr-2" /> Microsoft
                         </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
