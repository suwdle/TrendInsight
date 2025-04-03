import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// 모든 관심사 가져오기
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const userWithInterests = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        interests: true,
      },
    });

    return NextResponse.json(userWithInterests?.interests || []);
  } catch (error) {
    console.error("Error fetching interests:", error);
    return NextResponse.json(
      { error: "Failed to fetch interests" },
      { status: 500 }
    );
  }
}

// 관심사 추가
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { name } = await request.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Interest name is required" },
        { status: 400 }
      );
    }

    // 이미 존재하는 관심사 확인
    let interest = await prisma.interest.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive", // 대소문자 구분 없음
        },
      },
    });

    // 관심사가 없으면 새로 생성
    if (!interest) {
      interest = await prisma.interest.create({
        data: {
          name,
        },
      });
    }

    // 사용자에게 관심사 연결
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        interests: {
          connect: {
            id: interest.id,
          },
        },
      },
    });

    return NextResponse.json(interest);
  } catch (error) {
    console.error("Error adding interest:", error);
    return NextResponse.json(
      { error: "Failed to add interest" },
      { status: 500 }
    );
  }
}

// 관심사 삭제
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
    const interestId = searchParams.get("id");

    if (!interestId) {
      return NextResponse.json(
        { error: "Interest ID is required" },
        { status: 400 }
      );
    }

    // 사용자로부터 관심사 연결 해제
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        interests: {
          disconnect: {
            id: interestId,
          },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing interest:", error);
    return NextResponse.json(
      { error: "Failed to remove interest" },
      { status: 500 }
    );
  }
} 