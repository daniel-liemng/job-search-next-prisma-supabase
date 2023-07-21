import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export const PUT = async (
  request: Request,
  { params }: { params: { catId: string } }
) => {
  try {
    const body = await request.json();
    const { name } = body;

    const category = await prisma.category.update({
      where: {
        id: params.catId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.log(`Cat-Put Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const GET = async (
  request: Request,
  { params }: { params: { catId: string } }
) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: params.catId,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.log(`Cat-Put Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { catId: string } }
) => {
  try {
    await prisma.category.delete({
      where: {
        id: params.catId,
      },
    });

    return new NextResponse('Category Deleted');
  } catch (err) {
    console.log(`Cat-Put Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
