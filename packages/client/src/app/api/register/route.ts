import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { UserStatus } from '@prisma/client';

const SALT_LENGTH = 12;
export async function POST(request: Request) {
  const { email, name, password } = await request.json();

  const passwordHash = await bcrypt.hash(password, SALT_LENGTH);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      preference: {
        create: {
          status: UserStatus.UNKNOWN,
          startPointR: {
            create: {
              lat: 0,
              lng: 0,
            },
          },
          endPointR: {
            create: {
              lat: 0,
              lng: 0,
            },
          },
        },
      },
    },
  });

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
}
