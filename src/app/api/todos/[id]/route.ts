import {getUserSessionServer} from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import {Todo} from '@prisma/client';
import {NextResponse} from 'next/server';
import * as yup from 'yup';

interface Segments {
    params: {
        id: string;
    };
}

const getTodo = async (id: string): Promise<Todo | null> => {
    const user = await getUserSessionServer();

    if (!user) {
        return null;
    }

    const todo = prisma.todo.findFirst({where: {id}});

    if (todo?.userId !== user.id) {
        return null;
    }

    return todo;
}

export async function GET(req: Request, {params}: Segments) {
    const {id} = params;
    const todo = await getTodo(id);

    if (!todo) {
        return NextResponse.json({message: 'not found'}, {status: 404});
    }

    return NextResponse.json(todo);
}

const putSchema = yup.object({
    title: yup.string().optional(),
    description: yup.string().optional(),
    completed: yup.boolean().optional().default(false),
});

export async function PUT(req: Request, {params}: Segments) {
    const {id} = params;
    const todo = await getTodo(id);

    if ( !todo ) {
        return NextResponse.json({ message: `Todo with id ${ params.id } does not exists` }, { status: 404 });
    }

    try {
        const { title, completed, description } = await putSchema.validate(await req.json());

        const updatedTodo = await prisma.todo.update({
            where: {id: params.id},
            data: { title, completed, description },
        });

        return NextResponse.json(updatedTodo);
    } catch (error) {
        return NextResponse.json(error, {status: 400});
    }

}
