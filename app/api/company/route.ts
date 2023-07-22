import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export const POST = async (request: Request) => {
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

    const company = await prisma.company.create({
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

    return NextResponse.json(company, { status: 201 });
  } catch (err) {
    console.log(`Company-Post Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const GET = async (request: Request) => {
  try {
    const companies = await prisma.company.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(companies);
  } catch (err) {
    console.log(`Company-GetAll Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
