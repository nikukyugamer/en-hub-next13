import { zUpsertNote } from "@/app/notes/type";
import { prisma } from "@/globals/db";
import { NextRequest, NextResponse } from "next/server";

// /api/notes/[id]/route.ts
// ノートのIDはパスパラメーター`[id]`で受け取る

// ノートを1件取得
export async function GET(
  request: NextRequest,
) {
  const id = request.nextUrl.pathname.split('/').pop();
  if (!id) {
    return new NextResponse(null, { status: 404 });
  }

  const note = await prisma.note.findUnique({
    where: { id: Number(id) },
  });
  if (note === null) {
    return new NextResponse(null, { status: 404 })
  }
  return NextResponse.json(note)
}

// ノートを更新
export async function PUT(
  request: NextRequest,
) {
  const id = request.nextUrl.pathname.split('/').pop();
  if (!id) {
    return new NextResponse(null, { status: 404 });
  }

  const data = await request.json();
  const parsedData = zUpsertNote.parse(data);
  const note = await prisma.note.update({
    where: { id: Number(id) },
    data: { title: parsedData.title, body: parsedData.body },
  });
  return new NextResponse(null, { status: 204 })
}

// ノートを削除
export async function DELETE(
  request: NextRequest,
) {
  const id = request.nextUrl.pathname.split('/').pop();
  if (!id) {
    return new NextResponse(null, { status: 404 });
  }

  const note = await prisma.note.delete({
    where: { id: Number(id) },
  });
  return new NextResponse(null, { status: 204 })
}
