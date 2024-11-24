'use client';

import {useSession, signIn, signOut} from 'next-auth/react';
import {IoShieldOutline} from 'react-icons/io5';
import {CiLogout} from 'react-icons/ci';

export const LogoutButton = () => {

    const {data: session, status} = useSession();

    console.log('status', status);

    if (status === 'loading') {
        return (
            <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <IoShieldOutline/>
                <span className="group-hover:text-gray-700">Wait...</span>
            </button>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group" onClick={() => signIn()}>
                <CiLogout/>
                <span className="group-hover:text-gray-700">Login</span>
            </button>
        );
    }

    return (
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group" onClick={() => signOut()}>
            <CiLogout/>
            <span className="group-hover:text-gray-700">Logout</span>
        </button>
    );
};
