import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline';

const NotFoundPage: React.FC = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D3547]/5 to-[#8B5E3C]/5 px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Decorative elements */}
        <div className="relative mb-8">
          <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-[#8B5E3C]/10 blur-xl"></div>
          <div className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full bg-[#0D3547]/10 blur-xl"></div>
          
          {/* 404 Illustration */}
          <div className="relative mx-auto w-64 h-64 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#0D3547]/10 rounded-full"></div>
            <div className="absolute inset-8 bg-[#8B5E3C]/10 rounded-full"></div>
            <div className="relative z-10 text-[#0D3547]">
              <span className="text-8xl font-bold">404</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-[#0D3547] mb-4">Page Not Found</h1>
        <p className="text-lg text-[#0D3547]/80 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="flex items-center justify-center px-6 py-3 bg-[#0D3547] text-white rounded-lg hover:bg-[#0D3547]/90 transition group"
          >
            <HomeIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center px-6 py-3 border border-[#0D3547] text-[#0D3547] rounded-lg hover:bg-[#0D3547]/5 transition group"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Return Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-6 border-t border-[#0D3547]/10">
          <p className="text-sm text-[#0D3547]/60 mb-2">Need help?</p>
          <div className="flex justify-center space-x-4">
            <a href="/contact" className="text-sm text-[#8B5E3C] hover:underline">
              Contact Support
            </a>
            <a href="/faq" className="text-sm text-[#8B5E3C] hover:underline">
              Visit FAQ
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;