import {getUserSessionServer} from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import {NextResponse} from 'next/server';
import * as yup from 'yup';

export async function GET(req: Request, res: Response) {
    const { searchParams } = new URL(req.url);
    const take: number = Number(searchParams.get('take')) || 10;
    const skip: number = Number(searchParams.get('skip')) || 0;

    const todos = await prisma.todo.findMany({
        take,
        skip,
    });

    return NextResponse.json(todos);
}

const postSchema = yup.object({
    description: yup.string().optional(),
    completed: yup.boolean().optional().default(false),
});

export async function POST(req: Request) {

    const user = await getUser();

    try {
        const {description, completed } = await req.json();
        const todo = await postSchema.validate(await prisma.todo.create({data: {description, completed, userId: user.id}}));

        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(error, {status: 400});
    }

}

export async function DELETE(request: Request) {
    const user = await getUser();

    try {

        await prisma.todo.deleteMany({ where: { completed: true, userId: user.id } });
        return NextResponse.json('Borrados');

    } catch (error) {
        return NextResponse.json( error, { status: 400 } );
    }
}

const getUser= async() => {
    const user = await getUserSessionServer();

    if (!user) {
        return NextResponse.json('unauthorized', {status: 401});
    }

    return user;
}
