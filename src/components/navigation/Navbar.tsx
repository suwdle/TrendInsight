'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FiMenu, FiX, FiMoon, FiSun, FiUser } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  
  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">TrendInsight</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/" 
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100 border-b-2 border-transparent hover:border-blue-500"
              >
                Home
              </Link>
              <Link 
                href="/categories" 
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:border-blue-500 hover:text-gray-700 dark:hover:text-gray-200"
              >
                Categories
              </Link>
              <Link 
                href="/trending" 
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:border-blue-500 hover:text-gray-700 dark:hover:text-gray-200"
              >
                Trending
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:border-blue-500 hover:text-gray-700 dark:hover:text-gray-200"
              >
                About
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {mounted && theme === 'dark' ? (
                <FiSun className="h-5 w-5" />
              ) : (
                <FiMoon className="h-5 w-5" />
              )}
            </button>

            {status === 'authenticated' ? (
              <div className="relative ml-3 flex items-center space-x-4">
                <Link 
                  href="/dashboard" 
                  className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  Dashboard
                </Link>
                
                <div className="relative">
                  <div className="flex items-center space-x-3">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {session.user?.name}
                      </span>
                    </div>
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        {session.user?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => signIn()}
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Sign in
                </button>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {mounted && theme === 'dark' ? (
                <FiSun className="h-5 w-5" />
              ) : (
                <FiMoon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="ml-2 p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 dark:text-gray-100 border-l-4 border-blue-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/trending"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trending
            </Link>
            <Link
              href="/about"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            
            {status === 'authenticated' ? (
              <>
                <Link
                  href="/dashboard"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="pl-3 pr-4 py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        {session?.user?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {session?.user?.name}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-red-500 border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    signIn();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  Sign in
                </button>
                <Link
                  href="/auth/signup"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-blue-600 dark:text-blue-400 border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}