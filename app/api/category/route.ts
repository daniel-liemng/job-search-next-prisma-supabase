import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    console.log(`Cat-Post Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const GET = async (request: Request) => {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json(categories);
  } catch (err) {
    console.log(`Cat-GetAll Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
