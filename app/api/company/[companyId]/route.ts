import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export const DELETE = async (
  request: Request,
  { params }: { params: { companyId: string } }
) => {
  try {
    await prisma.company.delete({
      where: {
        id: params.companyId,
      },
    });

    return new NextResponse('Company Deleted');
  } catch (err) {
    console.log(`Com-Delete Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
