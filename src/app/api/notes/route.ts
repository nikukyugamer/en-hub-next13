import { zUpsertNote } from "@/app/notes/type";
import { prisma } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

// 1. 動的レンダリングを強制する
export const dynamic = 'force-dynamic';

// 2. ノート一覧を取得するAPI
export async function GET() {
  // 3. DBからノート一覧を取得
  const notes = await prisma.note.findMany();
  return NextResponse.json(notes)
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedData = zUpsertNote.parse(data);
  const note = await prisma.note.create({
    data: { title: parsedData.title, body: parsedData.body },
  });
  return new NextResponse(`${note.id}`, { status: 201 })
}
