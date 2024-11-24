import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse , NextRequest} from 'next/server';

export async function GET(req: Request, res: Response) {

    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data: {
            email: 'test1@google.com',
            password: bcrypt.hashSync('123456'),
            roles: ['Admin', 'client', 'super-user'],
            todos: {
                create: [
                    { description: 'Learn React', completed: true },
                    { description: 'Learn Next.js' },
                    { description: 'Learn Prisma' },
                    { description: 'Learn TypeScript' },
                ],
            },
        }
    })

    /*await prisma.todo.createMany({
        data: [
            { title: 'Learn React', completed: true },
            { title: 'Learn Next.js' },
            { title: 'Learn Prisma' },
            { title: 'Learn TypeScript' },
        ],
    });*/

    return NextResponse.json({ message: 'Seed executed' });
}
