import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    console.log(body);
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
    prisma.company;
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
