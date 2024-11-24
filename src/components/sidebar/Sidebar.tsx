import {auth} from '@/auth';
import {Session} from 'next-auth';
import {
    IoBasketOutline,
    IoCalendarOutline,
    IoCheckboxOutline,
    IoCodeWorkingOutline,
    IoListOutline, IoPersonOutline
} from 'react-icons/io5';
import {LogoutButton, SidebarItem} from '@/components';
import Image from 'next/image';

const menuItems = [
    {
        icon: <IoCalendarOutline/>,
        title: 'Dashboard',
        path: '/dashboard'
    },
    {
        icon: <IoCheckboxOutline/>,
        title: 'Rest Todos',
        path: '/dashboard/rest-todos'
    },
    {
        icon: <IoListOutline/>,
        title: 'Server actions',
        path: '/dashboard/server-todos'
    },
    {
        icon: <IoCodeWorkingOutline/>,
        title: 'Cookies',
        path: '/dashboard/cookies'
    },
    {
        icon: <IoBasketOutline/>,
        title: 'Products',
        path: '/dashboard/products'
    },
    {
        icon: <IoPersonOutline/>,
        title: 'Profile',
        path: '/dashboard/profile'
    },
]

export const Sidebar = async () => {

    const session: Session | null = await auth();


    const avatarUrl: string = session?.user?.image || 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp';
    const userName: string = session?.user?.name || 'No name';
    const userRoles: string[] = session?.user?.roles || ['Client'];

    return (
        <>
            <aside
                className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] overflow-y-auto">
                <div>
                    <div className="mt-8 text-center">
                        <Image src={avatarUrl}
                               alt=""
                               className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                               width={150}
                               height={150}
                        />
                        <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
                        <span className="hidden text-gray-400 lg:block">{userRoles.join(',')}</span>
                    </div>
                    <ul className="space-y-2 tracking-wide mt-8">
                        {
                            menuItems.map((item, index) => (
                                <SidebarItem key={item.path} title={item.title} path={item.path} icon={item.icon}/>
                            ))
                        }
                    </ul>
                </div>
                <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                    <LogoutButton />
                </div>
            </aside>
        </>
    )
        ;
};
