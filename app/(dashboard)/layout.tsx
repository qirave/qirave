import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import SideBar from "@/components/menus/SideBar";
import NavBar from "@/components/menus/NavBar";
import { SessionProvider, ApolloNextAppProvider } from "@/providers";
import { makeClient } from "@/providers/apollo";

export const metadata: Metadata = {
	title: "Qirave - Dashboard",
	description: "Qirave Saas Next App",
};

export default async function DashboardLayout({ children: boards, }: Readonly<React.PropsWithChildren>) {
	const session = await auth();
	if (!session) { redirect("/signin"); }

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
