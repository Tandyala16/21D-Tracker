import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export function AuthView() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ text: '', type: '' });

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg({ text: '', type: '' });

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setMsg({ text: error.message, type: 'error' });
            setLoading(false);
        } else {
            // Success! App.jsx will catch the onAuthStateChange event
            setMsg({ text: 'Success! Loading dashboard...', type: 'success' });
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg({ text: '', type: '' });

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setMsg({ text: error.message, type: 'error' });
        } else {
            setMsg({ text: 'Check your email for the confirmation link!', type: 'success' });
        }
        setLoading(false);
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
                    <p className="text-[#888] text-sm mt-2">Log in to sync your progress across devices via Supabase.</p>
                </div>

                {msg.text && (
                    <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${msg.type === 'error' ? 'bg-[#ff450015] border border-[#ff450040] text-[#ff4500]' : 'bg-[#3b82f615] border border-[#3b82f640] text-white'}`}>
                        {msg.text}
                    </div>
                )}

                <form className="space-y-4">
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

                    <div>
                        <label className="block text-xs font-bold text-[#666] uppercase tracking-wider mb-2">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#1a1a2a] border border-[#333344] focus:border-[#3b82f6] outline-none text-white p-3 rounded-lg transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="pt-4 flex flex-col gap-3">
                        <button
                            type="submit"
                            onClick={handleLogin}
                            disabled={loading}
                            className={`w-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 text-white p-3 rounded-lg font-bold transition-opacity ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Processing...' : 'Log In'}
                        </button>

                        <div className="relative flex py-4 items-center">
                            <div className="flex-grow border-t border-[#333344]"></div>
                            <span className="flex-shrink-0 mx-4 text-[#555] text-xs">OR</span>
                            <div className="flex-grow border-t border-[#333344]"></div>
                        </div>

                        <button
                            type="button"
                            onClick={handleSignup}
                            disabled={loading}
                            className="w-full bg-[#222233] hover:bg-[#2a2a3a] border border-[#333344] text-white p-3 rounded-lg font-bold transition-colors"
                        >
                            Create New Account
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
