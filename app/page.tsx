import { auth } from '@/auth';
import Fight from '@/components/fight';
import FormPlay from '@/components/form-play';
import Navbar from '@/components/navbar';
import { getUserById } from './actions/user';

export default async function Home() {
  const session = await auth();
  const user = await getUserById(session?.user?.id!);

  return (
    <section className="min-h-screen max-w-[500px] m-auto">
      <Navbar point={user?.point!} />
      <div className="w-full px-4">
        <Fight />
        <FormPlay />
      </div>
    </section>
  );
}
