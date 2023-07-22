import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export const GET = async (
  request: Request,
  { params }: { params: { companyId: string } }
) => {
  try {
    const company = await prisma.company.findFirst({
      where: {
        id: params.companyId,
      },
    });

    return NextResponse.json(company);
  } catch (err) {
    console.log(`Company-Get Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: { companyId: string } }
) => {
  try {
    const body = await request.json();
    const {
      name,
      industry,
      capacity,
      desc,
      url,
      address,
      city,
      state,
      zip,
      logo,
      ownerId,
    } = body;

    if (
      !name ||
      !capacity ||
      !industry ||
      !address ||
      !city ||
      !state ||
      !zip ||
      !logo
    ) {
      return new NextResponse('Please enter all required fields.', {
        status: 400,
      });
    }

    const company = await prisma.company.update({
      where: {
        id: params.companyId,
      },
      data: {
        name,
        industry,
        capacity,
        desc,
        url,
        address,
        city,
        state,
        zip,
        logo,
        ownerId,
      },
    });

    return NextResponse.json(company, { status: 200 });
  } catch (err) {
    console.log(`Company-Patch Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

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
