export const dynamic = 'force-dynamic';
export const revalidate: number = 0

import {auth} from '@/auth';
import {getUserSessionServer} from '@/auth/actions/auth-actions';
import {NewTodo, TodosGrid} from '@/todos';
import prisma from '@/lib/prisma';
import {redirect} from 'next/navigation';

export const metadata = {
    title: 'Rest Todos',
    description: 'Rest Todos page',
};

const ServerTodosPage = async() => {

    const user = await getUserSessionServer();

    if( !user ) {
        redirect('/api/auth/signin');
    }

    const todos = await prisma.todo.findMany({
        where: { userId: user.id },
        orderBy: {description: 'asc'}
    });

    return (
        <>
            <span className='text-3xl mb-10'>Server Actions</span>
            <div className='w-full px-3 mx-5 mb-5'>
            <NewTodo/>
            </div>
            <TodosGrid todos={todos}/>
        </>
    );
};

export default ServerTodosPage;
