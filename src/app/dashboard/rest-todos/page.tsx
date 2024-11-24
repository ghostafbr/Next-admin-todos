export const dynamic: string = 'force-dynamic';
export const revalidate: number = 0

import {getUserSessionServer} from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import {NewTodo, TodosGrid} from '@/todos';
import {redirect} from 'next/navigation';

export const metadata = {
    title: 'Rest Todos',
    description: 'Rest Todos page',
};

const RestTodosPage = async() => {

    const user = await getUserSessionServer();

    if( !user ) {
        redirect('/api/auth/signin');
    }

    const todos = await prisma.todo.findMany({
        where: { userId: user.id },
        orderBy: {description: 'asc'}
    });

    /*useEffect((): void => {
        fetch('/api/todos')
            .then((response) => response.json())
            .then(console.log);
    }, []);*/

    return (
        <div>
            <div className='w-full px-3 mx-5 mb-5'>
            <NewTodo/>
            </div>
            <TodosGrid todos={todos}/>
        </div>
    );
};

export default RestTodosPage;
