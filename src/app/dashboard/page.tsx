'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaRegNewspaper, FaBookmark, FaStar, FaCog } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [featuredArticles, setFeaturedArticles] = useState([
    {
      id: 1,
      title: 'The Rise of AI in Everyday Technology',
      excerpt: 'How artificial intelligence is changing the way we interact with our devices',
      category: 'Technology',
      imageUrl: 'https://images.unsplash.com/photo-1677442135146-92ad1ff5f8eb?q=80&w=500&auto=format&fit=crop',
      publishedAt: '2023-09-15',
    },
    {
      id: 2,
      title: 'Global Climate Policies Shifting in 2023',
      excerpt: 'Recent developments in international climate agreements are showing new directions',
      category: 'Environment',
      imageUrl: 'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?q=80&w=500&auto=format&fit=crop',
      publishedAt: '2023-09-12',
    },
    {
      id: 3,
      title: 'Financial Markets Outlook for Q4 2023',
      excerpt: 'Expert analysis on what to expect in the global economy for the remainder of the year',
      category: 'Finance',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=500&auto=format&fit=crop',
      publishedAt: '2023-09-10',
    },
  ]);
  
  const [recommendedArticles, setRecommendedArticles] = useState([
    {
      id: 4,
      title: 'The Evolution of Remote Work Culture',
      excerpt: 'How companies are adapting their policies to accommodate the new normal',
      category: 'Business',
      imageUrl: 'https://images.unsplash.com/photo-1584661156681-540e80a161d3?q=80&w=500&auto=format&fit=crop',
      publishedAt: '2023-09-08',
    },
    {
      id: 5,
      title: 'Breakthroughs in Quantum Computing Research',
      excerpt: 'Recent scientific advances are pushing the boundaries of computational power',
      category: 'Science',
      imageUrl: 'https://images.unsplash.com/photo-1643275229258-e710a5994d88?q=80&w=500&auto=format&fit=crop',
      publishedAt: '2023-09-05',
    },
    {
      id: 6,
      title: 'The Impact of Social Media on Mental Health',
      excerpt: 'New studies reveal the psychological effects of digital platform usage',
      category: 'Health',
      imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=500&auto=format&fit=crop',
      publishedAt: '2023-09-03',
    },
  ]);

  useEffect(() => {
    // Redirect if not authenticated
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      setIsLoading(false);
    }
  }, [status, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {session?.user?.name || 'User'}</h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">Here's your personalized news feed</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <FaBookmark className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <FaCog className="w-5 h-5" />
              </button>
              <div className="relative">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    {session?.user?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['All', 'Technology', 'Business', 'Science', 'Health', 'Politics', 'Entertainment'].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  category === 'All'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured articles */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured for you</h2>
              <Link href="/featured" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Link key={article.id} href={`/article/${article.id}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {article.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{article.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-500">{article.publishedAt}</span>
                        <button className="text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400">
                          <FaStar className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recommended articles */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recommended for you</h2>
              <Link href="/recommended" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedArticles.map((article) => (
                <Link key={article.id} href={`/article/${article.id}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {article.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{article.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-500">{article.publishedAt}</span>
                        <button className="text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400">
                          <FaStar className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent reads */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your recent reads</h2>
              <Link href="/history" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                View history
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <div className="text-center py-8">
                <FaRegNewspaper className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No recent articles</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Start reading to see your history here.</p>
                <div className="mt-6">
                  <Link href="/" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                    Browse trending articles
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}