import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/lib/prisma";

// NewsAPI의 응답 타입 정의
interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: {
    source: {
      id: string | null;
      name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "general";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  
  try {
    // 이미 데이터베이스에 있는 기사를 먼저 확인합니다
    const existingArticles = await prisma.article.findMany({
      where: {
        category,
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    // 충분한 기사가 있으면 바로 반환합니다
    if (existingArticles.length >= pageSize) {
      return NextResponse.json(existingArticles);
    }

    // NewsAPI에서 새 기사를 가져옵니다
    const apiKey = process.env.NEWS_API_KEY;
    const response = await axios.get<NewsAPIResponse>(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&page=${page}`,
      {
        headers: {
          "X-Api-Key": apiKey || "",
        },
      }
    );

    // 가져온 기사를 데이터베이스에 저장합니다
    const articles = await Promise.all(
      response.data.articles.map(async (article) => {
        const existingArticle = await prisma.article.findFirst({
          where: {
            sourceUrl: article.url,
          },
        });

        if (existingArticle) {
          return existingArticle;
        }

        return prisma.article.create({
          data: {
            title: article.title || "No Title",
            content: article.content || article.description || "No Content",
            summary: article.description || "No Summary",
            imageUrl: article.urlToImage || null,
            sourceUrl: article.url,
            sourceName: article.source.name || "Unknown Source",
            publishedAt: new Date(article.publishedAt),
            category,
          },
        });
      })
    );

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
} 