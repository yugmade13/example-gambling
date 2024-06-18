import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { ProfileNavigation } from '@/components/profile';
import Person from '@/components/svg/person';
import Bell from '@/components/svg/bell';
import { getUserById } from '../actions/user';

export default async function Profile() {
  const session = await auth();
  const user = await getUserById(session?.user?.id!);

  return (
    <section className="min-h-screen max-w-[500px] m-auto">
      <ProfileNavigation />
      <div className="h-[75vh] flex flex-col justify-center items-center px-4">
        <div className="w-[100px] h-[100px] bg-white rounded-full flex justify-center items-center border-2 border-black">
          <Person size="45" />
        </div>
        <div className="flex flex-col justify-center items-center py-2">
          <h1 className="text-lg font-semibold">{user?.name}</h1>
          <div className="text-sm text-slate-500">{user?.username}</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 py-2">
          <h1 className="text-lg font-semibold">Point : {user?.point}K</h1>
          <div className="px-3 py-1 bg-gray-100 text-xs rounded-xl w-full flex items-center gap-1">
            <Bell size="12" />
            <span className="text-slate-500">
              Point baru dapat dicaikan minimal 50K
            </span>
          </div>
        </div>
        <div className="w-full mt-[100px] flex flex-col justify-center items-center gap-y-2">
          <Button type="button" className="w-[300px]">
            Cairkan
          </Button>
          <form
            action={async () => {
              'use server';
              await signOut({
                redirectTo: '/auth',
              });
            }}
          >
            <Button
              variant="outline"
              type="submit"
              className="w-[300px] text-red-500 border-red-300 bg-red-50 hover:bg-red-100 hover:text-red-500"
            >
              Keluar permainan?
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
