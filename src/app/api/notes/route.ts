import { prisma } from "@/globals/db";
import { NextResponse } from "next/server";

// 1. 動的レンダリングを強制する
export const dynamic = 'force-dynamic';

// 2. ノート一覧を取得するAPI
export async function GET() {
  // 3. DBからノート一覧を取得
  const notes = await prisma.note.findMany();
  return NextResponse.json(notes)
}
