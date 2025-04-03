import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// 사용자의 북마크 가져오기
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        article: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(bookmarks);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookmarks" },
      { status: 500 }
    );
  }
}

// 북마크 추가
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { articleId } = await request.json();

    if (!articleId) {
      return NextResponse.json(
        { error: "Article ID is required" },
        { status: 400 }
      );
    }

    // 기사가 존재하는지 확인
    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    // 이미 북마크되어 있는지 확인
    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        userId: session.user.id,
        articleId,
      },
    });

    if (existingBookmark) {
      return NextResponse.json(
        { error: "Article already bookmarked" },
        { status: 400 }
      );
    }

    // 북마크 생성
    const bookmark = await prisma.bookmark.create({
      data: {
        userId: session.user.id,
        articleId,
      },
      include: {
        article: true,
      },
    });

    return NextResponse.json(bookmark);
  } catch (error) {
    console.error("Error adding bookmark:", error);
    return NextResponse.json(
      { error: "Failed to add bookmark" },
      { status: 500 }
    );
  }
}

// 북마크 삭제
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get("articleId");

    if (!articleId) {
      return NextResponse.json(
        { error: "Article ID is required" },
        { status: 400 }
      );
    }

    // 북마크가 존재하는지 확인
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        userId: session.user.id,
        articleId,
      },
    });

    if (!bookmark) {
      return NextResponse.json(
        { error: "Bookmark not found" },
        { status: 404 }
      );
    }

    // 북마크 삭제
    await prisma.bookmark.delete({
      where: {
        id: bookmark.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing bookmark:", error);
    return NextResponse.json(
      { error: "Failed to remove bookmark" },
      { status: 500 }
    );
  }
} 