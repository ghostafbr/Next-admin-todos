import {auth} from '@/auth';
import {WidgetItem} from '@/components';
import {Session} from 'next-auth';
import {redirect} from 'next/navigation';


const DashboardPage = async () => {

    const session: Session | null = await auth();

    if (!session) {
        redirect('/api/auth/signin');
    }

    return (
        <div>
            <div className="grid gap-6 grid-cols-1">
                <WidgetItem title='Connected user s-Side'>
                    <div className='flex flex-col'>
                        <span>{session?.user?.name}</span>
                        <span>{session?.user?.image}</span>
                        <span>{session?.user?.email}</span>
                        <span>{session?.user?.roles}</span>

                    </div>
                </WidgetItem>

            </div>
        </div>
    );
};

export default DashboardPage;
