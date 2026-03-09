import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export function AuthView() {
    const [mode, setMode] = useState('login'); // 'login', 'signup', 'forgot'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ text: '', type: '' });

    const handleAction = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg({ text: '', type: '' });

        if (mode === 'login') {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) setMsg({ text: error.message, type: 'error' });
            else setMsg({ text: 'Success! Loading dashboard...', type: 'success' });
        } else if (mode === 'signup') {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) setMsg({ text: error.message, type: 'error' });
            else setMsg({ text: 'Check your email for the confirmation link!', type: 'success' });
        } else if (mode === 'forgot') {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + window.location.pathname,
            });
            if (error) setMsg({ text: error.message, type: 'error' });
            else setMsg({ text: 'Password reset link sent to your email!', type: 'success' });
        }
        setLoading(false);
    };

    const toggleMode = (newMode) => {
        setMode(newMode);
        setMsg({ text: '', type: '' });
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#11111a] border border-[#222233] p-8 rounded-2xl shadow-xl">

                <div className="text-center mb-8">
                    <h1 className="font-syne text-[32px] font-extrabold tracking-tight text-white flex items-center justify-center gap-3">
                        <span className="text-[28px]">🎯</span>
                        <span className="bg-gradient-to-r from-white to-[#888] bg-clip-text text-transparent">
                            21D Tracker
                        </span>
                    </h1>
                    <p className="text-[#888] text-sm mt-2">
                        {mode === 'login' && 'Log in to sync your progress across devices.'}
                        {mode === 'signup' && 'Create an account to backup your progress.'}
                        {mode === 'forgot' && 'Reset your password via email.'}
                    </p>
                </div>

                {/* Mode Tabs */}
                {mode !== 'forgot' && (
                    <div className="flex bg-[#1a1a2a] rounded-lg p-1 mb-6 border border-[#333344]">
                        <button
                            type="button"
                            onClick={() => toggleMode('login')}
                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${mode === 'login' ? 'bg-[#3b82f6] text-white shadow-md' : 'text-[#666] hover:text-[#aaa]'}`}
                        >
                            Log In
                        </button>
                        <button
                            type="button"
                            onClick={() => toggleMode('signup')}
                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${mode === 'signup' ? 'bg-[#3b82f6] text-white shadow-md' : 'text-[#666] hover:text-[#aaa]'}`}
                        >
                            Sign Up
                        </button>
                    </div>
                )}

                {msg.text && (
                    <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${msg.type === 'error' ? 'bg-[#ff450015] border border-[#ff450040] text-[#ff4500]' : 'bg-[#3b82f615] border border-[#3b82f640] text-white'}`}>
                        {msg.text}
                    </div>
                )}

                <form className="space-y-5" onSubmit={handleAction}>
                    <div>
                        <label className="block text-xs font-bold text-[#666] uppercase tracking-wider mb-2">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#1a1a2a] border border-[#333344] focus:border-[#3b82f6] outline-none text-white p-3 rounded-lg transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>

                    {mode !== 'forgot' && (
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-bold text-[#666] uppercase tracking-wider">Password</label>
                                {mode === 'login' && (
                                    <button
                                        type="button"
                                        onClick={() => toggleMode('forgot')}
                                        className="text-xs text-[#3b82f6] hover:underline hover:text-[#8b5cf6] transition-colors"
                                    >
                                        Forgot Password?
                                    </button>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#1a1a2a] border border-[#333344] focus:border-[#3b82f6] outline-none text-white p-3 pr-12 rounded-lg transition-colors"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition-colors p-1"
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? '🫣' : '👁️'}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white p-3 rounded-lg font-bold transition-opacity ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Processing...' : (
                                mode === 'login' ? 'Log In' :
                                    mode === 'signup' ? 'Create Account' :
                                        'Send Reset Link'
                            )}
                        </button>
                    </div>

                    {mode === 'forgot' && (
                        <div className="pt-4 text-center">
                            <button
                                type="button"
                                onClick={() => toggleMode('login')}
                                className="text-sm text-[#888] hover:text-white transition-colors"
                            >
                                ← Back to Login
                            </button>
                        </div>
                    )}
                </form>

            </div>
        </div>
    );
}
