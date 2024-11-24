'use server';

import prisma from '@/lib/prisma';
import {Todo} from '@prisma/client';
import {revalidatePath} from 'next/cache';

export const sleep = async (seconds: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}


export const toggleTodo = async (id: string, completed: boolean): Promise<Todo> => {
    await sleep(3);
    const todo: Todo | null = await prisma.todo.findFirst({where: {id}});

    if (!todo) {
        throw new Error(`Todo with id ${id} not found`);
    }

    revalidatePath('/dashboard/server-todos');
    return prisma.todo.update({
        where: {id},
        data: {completed},
    });

}

export const addTodo = async (description: string, userId: string): Promise<Todo> => {
    try {
        revalidatePath('/dashboard/server-todos');
        return await prisma.todo.create({data: {description}});
    } catch (error) {
        throw new Error(`Error creating todo: ${error}`);
    }
}

export const deleteCompletedTodos = async (): Promise<void> => {
    try {
        revalidatePath('/dashboard/server-todos');
        await prisma.todo.deleteMany({where: {completed: true}});
    } catch (error) {
        throw new Error(`Error deleting completed todos: ${error}`);
    }
}
