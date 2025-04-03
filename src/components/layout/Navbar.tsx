"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FiMenu, FiX, FiMoon, FiSun, FiSearch, FiBookmark } from "react-icons/fi";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
        ? "py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm" 
        : "py-4 bg-white dark:bg-slate-900"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">TI</span>
            </div>
            <span className="font-bold text-xl md:text-2xl">
              <span className="text-slate-900 dark:text-white">Trend</span>
              <span className="text-blue-600 dark:text-blue-400">Insight</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { name: 'Home', path: '/' },
              { name: 'Categories', path: '/categories' },
              { name: 'Explore', path: '/explore' },
            ].map(({ name, path }) => (
              <Link 
                key={path} 
                href={path}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isActive(path)
                  ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-medium"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              aria-label="Bookmarks"
            >
              <FiBookmark className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
            <Link href="/sign-in" className="button-secondary">
              Sign in
            </Link>
            <Link href="/sign-up" className="button-primary">
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800 mt-2">
            <nav className="flex flex-col space-y-1">
              {[
                { name: 'Home', path: '/' },
                { name: 'Categories', path: '/categories' },
                { name: 'Explore', path: '/explore' },
                { name: 'Search', path: '/search' },
                { name: 'Bookmarks', path: '/bookmarks' },
              ].map(({ name, path }) => (
                <Link
                  key={path}
                  href={path}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    isActive(path)
                    ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-medium"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                  onClick={toggleMenu}
                >
                  {name}
                </Link>
              ))}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 mt-2 flex flex-col space-y-2">
                <Link href="/sign-in" className="button-secondary w-full">
                  Sign in
                </Link>
                <Link href="/sign-up" className="button-primary w-full">
                  Sign up
                </Link>
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  {theme === "dark" ? (
                    <>
                      <FiSun className="w-5 h-5" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <FiMoon className="w-5 h-5" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 