import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D3547]/5 to-[#8B5E3C]/5 px-4 py-12">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-[#0D3547]/10 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#0D3547]/10 mb-6">
            <CheckCircleIcon className="h-10 w-10 text-[#8B5E3C]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0D3547] mb-2">Registration Successful!</h2>
          <p className="text-[#0D3547]/70 mb-6">
            Welcome to HomeLynk! Your account has been created successfully.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="w-full py-3 px-4 rounded-lg bg-[#0D3547] text-white hover:bg-[#0D3547]/90 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 focus:ring-offset-2 transition"
          >
            Back to Registration
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D3547]/5 to-[#8B5E3C]/5 px-4 py-12">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-[#0D3547]/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-[#8B5E3C]/10 blur-xl"></div>
        <div className="absolute -bottom-12 -left-12 w-24 h-24 rounded-full bg-[#0D3547]/10 blur-xl"></div>
        
        {/* Logo and header */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-[#0D3547] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">HL</span>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-[#0D3547] mb-2">
          Join HomeLynk
        </h1>
        <p className="text-center text-[#0D3547]/70 mb-8">
          Create your account to start exploring beautiful furniture
        </p>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-[#0D3547]">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-[#0D3547]/20 rounded-lg px-4 py-3 placeholder-[#0D3547]/40 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 focus:border-[#0D3547]/30 transition-all duration-200"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-[#0D3547]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-[#0D3547]/20 rounded-lg px-4 py-3 placeholder-[#0D3547]/40 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 focus:border-[#0D3547]/30 transition-all duration-200"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-[#0D3547]">
                Password
              </label>
              <button 
                type="button" 
                className="text-xs text-[#8B5E3C] hover:underline"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="mt-1 block w-full border border-[#0D3547]/20 rounded-lg px-4 py-3 placeholder-[#0D3547]/40 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 focus:border-[#0D3547]/30 pr-10 transition-all duration-200"
                placeholder="••••••••"
              />
              <button 
                type="button" 
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-[#0D3547]/40" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-[#0D3547]/40" />
                )}
              </button>
            </div>
            <div className="text-xs text-[#0D3547]/60 mt-1">
              Must be at least 8 characters
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="focus:ring-[#8B5E3C] h-4 w-4 text-[#0D3547] border-[#0D3547]/30 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-[#0D3547]/80">
                I agree to the <a href="#" className="text-[#8B5E3C] hover:underline">Terms of Service</a> and <a href="#" className="text-[#8B5E3C] hover:underline">Privacy Policy</a>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-sm text-white bg-[#0D3547] hover:bg-[#0D3547]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5E3C]/50 transition-all duration-200 ${isLoading ? 'opacity-80' : ''}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#0D3547]/20"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-white text-sm text-[#0D3547]/60">or sign up with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="flex items-center justify-center py-2 px-4 border border-[#0D3547]/20 rounded-lg hover:bg-[#0D3547]/5 transition">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#4285F4">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
          <button className="flex items-center justify-center py-2 px-4 border border-[#0D3547]/20 rounded-lg hover:bg-[#0D3547]/5 transition">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
            Facebook
          </button>
        </div>

        <p className="text-sm text-center text-[#0D3547]/70">
          Already have an account?{' '}
          <a 
            href="/login" 
            className="font-medium text-[#8B5E3C] hover:text-[#0D3547] hover:underline transition"
          >
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
};

export default Register;