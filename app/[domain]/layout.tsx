// import Image from "next/image";
// import Link from "next/link";
import { ReactNode } from "react";
import type { Metadata } from 'next';
import { auth } from '@/auth';
import SideBar from '@/components/menus/SideBar';
import NavBar from '@/components/menus/NavBar';
import { SessionProvider, ApolloNextAppProvider } from '@/lib/providers';
import { makeClient } from '@/lib/providers/apollo';

export const metadata: Metadata = {
  title: 'Qirave - Dashboard',
  description: 'Qirave Saas Next App'
};

export default async function DashboardLayout({
  params,
  children: boards
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const domain = decodeURIComponent(params.domain);
  const session = await auth();
  console.table({ domain, session });
  // const data = await getSiteData(domain);


  // Optional: Redirect to custom domain if it exists
  // if (
  //   domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
  //   data.customDomain &&
  //   process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === "true"
  // ) {
  //   return redirect(`https://${data.customDomain}`);
  // }

      // {domain == `demo.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
  return (
    <SessionProvider session={session}>
      <ApolloNextAppProvider makeClient={makeClient}>
        <body>
          <SideBar />
          <section className="antialiased min-h-screen w-full bg-muted/40 flex flex-col sm:gap-1 sm:pl-14">
            <NavBar />
            {boards}
          </section>
        </body>
      </ApolloNextAppProvider>
    </SessionProvider>
  );
}
