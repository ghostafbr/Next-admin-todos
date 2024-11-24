'use client';
import {TodoItem} from '@/todos';
import {toggleTodo} from '@/todos/actions/todo-actions';
import {Todo} from '@prisma/client';

// import * as todosApi from '@/todos/helpers/todos';
import { useRouter } from "next/navigation";


interface TodosGridProps {
    todos?: Todo[];
}

export const TodosGrid = ({todos = []}: TodosGridProps) => {

    const router = useRouter();

    /*const toggleTodo = async(id: string, completed: boolean) => {
        const updatedTodo = await todosApi.updateTodo( id, completed );
        router.refresh();
    }*/

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {
                todos.map( todo => (
                    <TodoItem key={ todo.id } todo={ todo } toggleTodo={ toggleTodo }  />
                ))
            }
        </div>
    )
};
