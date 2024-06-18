import prisma from '@/prisma/db';
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id') as string;

  const data = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json({ data })
}
