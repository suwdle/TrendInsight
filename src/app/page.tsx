import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArticleCard } from "@/components/article/ArticleCard";
import { prisma } from "@/lib/prisma";
import { Article } from "@/types";
import { FiArrowRight, FiBarChart2, FiBookOpen, FiCpu, FiLayers } from "react-icons/fi";

export const revalidate = 3600; // 1시간마다 재검증

async function getArticles(): Promise<Article[]> {
  const articles = await prisma.article.findMany({
    take: 6,
    orderBy: {
      publishedAt: "desc",
    },
  });

  return articles;
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-blue-950 z-0" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 aspect-square bg-gradient-to-br from-blue-400/10 to-violet-400/10 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
              AI-Powered News Curation
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">Stay Informed</span> with <br />
              Personalized News & Insights
            </h1>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              TrendInsight delivers tailored news and trends based on your interests, 
              helping you stay ahead in today&apos;s fast-paced information landscape.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up" className="button-primary py-3 px-6 text-base">
                Get Started for Free
              </Link>
              <Link href="/categories" className="button-secondary py-3 px-6 text-base">
                Browse Categories
              </Link>
            </div>
            
            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Active Users", value: "10K+" },
                { label: "Articles Curated", value: "50K+" },
                { label: "Sources", value: "500+" },
                { label: "Categories", value: "20+" },
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm">
                  <p className="text-blue-600 dark:text-blue-400 font-bold text-2xl md:text-3xl">{stat.value}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Insights</h2>
              <p className="text-slate-600 dark:text-slate-400">Stay on top of the latest trends and news</p>
            </div>
            <Link href="/categories" className="group inline-flex items-center mt-4 md:mt-0 text-blue-600 dark:text-blue-400 font-medium">
              View All Categories
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <Suspense fallback={<div className="py-20 text-center">Loading the latest trends...</div>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.length > 0 ? (
                articles.map((article: Article) => (
                  <ArticleCard key={article.id} article={article} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-slate-600 dark:text-slate-400 mb-4">No articles found. Check back soon!</p>
                  <Link href="/categories" className="button-primary">Browse Categories</Link>
                </div>
              )}
            </div>
          </Suspense>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose TrendInsight?</h2>
            <p className="text-slate-600 dark:text-slate-400">Our platform is designed to help you discover what matters most, without the noise.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiCpu className="w-6 h-6" />,
                title: "AI-Powered",
                description: "Our algorithms learn your preferences and deliver personalized content."
              },
              {
                icon: <FiLayers className="w-6 h-6" />,
                title: "Curated Sources",
                description: "Access verified, high-quality news from trusted publishers worldwide."
              },
              {
                icon: <FiBarChart2 className="w-6 h-6" />,
                title: "Trend Analysis",
                description: "Understand emerging trends with our data-driven insights."
              },
              {
                icon: <FiBookOpen className="w-6 h-6" />,
                title: "Distraction-Free",
                description: "Clean interface designed for focus and productivity."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
                <div className="w-12 h-12 mb-5 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="container-custom">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-1/2 aspect-square bg-gradient-to-br from-blue-500/5 to-violet-500/5 rounded-full blur-3xl"></div>
            
            <div className="relative p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center">
              <div className="flex-1 mb-8 lg:mb-0 lg:mr-8">
                <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                  Join thousands of users who trust TrendInsight for their daily news and insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/sign-up" className="button-primary py-3 px-6">
                    Create Free Account
                  </Link>
                  <Link href="/categories" className="button-secondary py-3 px-6">
                    Explore Categories
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/3 relative">
                <div className="aspect-[4/3] w-full relative rounded-xl overflow-hidden shadow-sm">
        <Image
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1400&auto=format&fit=crop" 
                    alt="TrendInsight App" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">TI</span>
                </div>
                <span className="font-bold text-xl">
                  <span className="text-slate-900 dark:text-white">Trend</span>
                  <span className="text-blue-600 dark:text-blue-400">Insight</span>
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                AI-powered news and trends, personalized for you.
              </p>
            </div>
            
            {[
              {
                title: "Product",
                links: [
                  { name: "Features", href: "/features" },
                  { name: "Pricing", href: "/pricing" },
                  { name: "Categories", href: "/categories" },
                  { name: "Explore", href: "/explore" },
                ]
              },
              {
                title: "Company",
                links: [
                  { name: "About", href: "/about" },
                  { name: "Blog", href: "/blog" },
                  { name: "Careers", href: "/careers" },
                  { name: "Contact", href: "/contact" },
                ]
              },
              {
                title: "Legal",
                links: [
                  { name: "Privacy", href: "/privacy" },
                  { name: "Terms", href: "/terms" },
                  { name: "Cookie Policy", href: "/cookies" },
                ]
              }
            ].map((group, i) => (
              <div key={i}>
                <h3 className="font-bold text-slate-800 dark:text-white mb-4">{group.title}</h3>
                <ul className="space-y-2">
                  {group.links.map((link, j) => (
                    <li key={j}>
                      <Link 
                        href={link.href} 
                        className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </Link>
          </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-600 dark:text-slate-400 text-sm mb-4 md:mb-0">
              © 2024 TrendInsight. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {["Twitter", "LinkedIn", "Instagram", "GitHub"].map((social, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
