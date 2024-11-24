'use client';

import {auth} from '@/auth';
import {Session} from 'next-auth';
import {useSession} from 'next-auth/react';
import {useEffect} from 'react';

const Page = () => {

    const { data: session } = useSession();

    useEffect(() => {
        console.log('Profile page - client Side');
    }, []);

    return (
        <div className='flex flex-col'>
            <span>{ session?.user?.name ?? 'No name'} </span>
            <span>{ session?.user?.email ?? 'No Email'} </span>
            <span>{ session?.user?.image ?? 'No Image'} </span>
            <span>{ session?.user?.id ?? 'No UUID'} </span>
            <span>{ session?.user?.roles?.join(',') ?? ['no-roles']} </span>
        </div>
    );
};

export default Page;
