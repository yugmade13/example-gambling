import FormTopUp from '@/components/form-topup';
import { auth } from '@/auth';

export default async function TopUp() {
  const session = await auth();

  return (
    <section className="min-h-screen max-w-[500px] m-auto">
      <div className="h-[90vh] flex justify-center items-center">
        <FormTopUp userId={session?.user?.id!} />
      </div>
    </section>
  );
}
