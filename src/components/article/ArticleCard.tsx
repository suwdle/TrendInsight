"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiBookmark, FiExternalLink, FiClock } from "react-icons/fi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// dayjs 플러그인 설정
dayjs.extend(relativeTime);

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    summary: string | null;
    imageUrl: string | null;
    sourceUrl: string;
    sourceName: string;
    publishedAt: Date;
    category: string;
  };
  isBookmarked?: boolean;
  onBookmark?: (id: string) => void;
  onRemoveBookmark?: (id: string) => void;
}

export function ArticleCard({
  article,
  isBookmarked = false,
  onBookmark,
  onRemoveBookmark,
}: ArticleCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleBookmarkClick = () => {
    if (bookmarked) {
      onRemoveBookmark?.(article.id);
      setBookmarked(false);
    } else {
      onBookmark?.(article.id);
      setBookmarked(true);
    }
  };

  const formattedDate = dayjs(article.publishedAt).fromNow();
  const placeholderImage = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=60";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 group overflow-hidden flex flex-col h-full hover:translate-y-[-4px]">
      {/* Image Section */}
      <Link href={`/article/${article.id}`} className="relative block">
        <div className="relative w-full pt-[56.25%] bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <Image
            src={article.imageUrl || placeholderImage}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block px-2.5 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
            {article.category}
          </span>
        </div>
      </Link>

      {/* Content Section */}
      <div className="flex-1 p-5 flex flex-col">
        <Link href={`/article/${article.id}`} className="mb-2 block">
          <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-grow">
          {article.summary || "No summary available for this article. Click to read the full content."}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center">
            <FiClock className="mr-1.5" />
            <span>{formattedDate}</span>
          </div>
          <span>{article.sourceName}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex border-t border-slate-100 dark:border-slate-800">
        <Link 
          href={article.sourceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center py-3 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <FiExternalLink className="mr-1.5" />
          <span>Read</span>
        </Link>
        <button
          className="flex-1 flex items-center justify-center py-3 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          onClick={handleBookmarkClick}
          title={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
        >
          <FiBookmark 
            className={`mr-1.5 ${bookmarked ? "fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400" : ""}`} 
          />
          <span>{bookmarked ? "Saved" : "Save"}</span>
        </button>
      </div>
    </div>
  );
} 