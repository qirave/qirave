import type { Metadata } from 'next';
// import { auth } from '@/auth';
// import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';
import '@/styles/auth.css';

export const metadata: Metadata = {
  title: 'Qirave - Auth',
  description: 'Authentication'
};

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();
  // // if the user is not logged in, redirect to the login page
  // if (session) {
  //   redirect('/');
  // }

  return (
    <main className="flex items-center justify-center min-h-screen bg-[hsl(var(--primary))] q-bg-noise">
      <Card className="mx-auto max-w-sm shadow-xl drop-shadow-xl">
        {children}
      </Card>
    </main>
  );
}
