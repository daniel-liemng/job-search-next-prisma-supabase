import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const {
      name,
      description,
      requirement,
      location,
      salary,
      type,
      workType,
      schedule,
      startDate,
      categoryId,
      companyId,
      status,
      benefit,
    } = body;

    if (
      !name ||
      !description ||
      !requirement ||
      !location ||
      !salary ||
      !type ||
      !workType ||
      !schedule ||
      !startDate ||
      !categoryId ||
      !companyId ||
      !status ||
      !benefit
    ) {
      return new NextResponse('Please enter all required fields.', {
        status: 400,
      });
    }

    console.log('$$$', typeof startDate);

    const job = await prisma.job.create({
      data: {
        name,
        description,
        requirement,
        location,
        salary,
        type,
        workType,
        schedule,
        startDate,
        categoryId,
        companyId,
        status,
        benefit,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (err) {
    console.log(`Company-Post Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const GET = async (request: Request) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(jobs);
  } catch (err) {
    console.log(`Job-GetAll Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
