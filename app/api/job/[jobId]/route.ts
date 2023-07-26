import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export const GET = async (
  request: Request,
  { params }: { params: { jobId: string } }
) => {
  try {
    const job = await prisma.job.findFirst({
      where: {
        id: params.jobId,
      },
      include: {
        category: true,
        company: true,
      },
    });

    return NextResponse.json(job);
  } catch (err) {
    console.log(`Job-Get Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: { jobId: string } }
) => {
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

    const job = await prisma.job.update({
      where: {
        id: params.jobId,
      },
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

    return NextResponse.json(job, { status: 200 });
  } catch (err) {
    console.log(`Job-Patch Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
