import bcrypt from 'bcrypt';
import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

const SALT_LENGTH = 12;
export async function POST(request: Request) {
  const { email, name, password, status, startPoint, endPoint } =
    await request.json();

  const passwordHash = await bcrypt.hash(password, SALT_LENGTH);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      status,
      startPoint,
      endPoint,
    },
  });

  return NextResponse.json(user);
}
