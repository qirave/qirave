"use client";
import Link from "next/link";
import Image from "next/image";
import UserMenu from "./UserMenu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import QBreadcrumb from "./breadcrumb";
import {
	Home,
	LineChart,
	Package,
	PanelLeft,
	ShoppingCart,
	Users2,
} from "lucide-react";

import IconBuilding from '@/assets/svg/building.p.svg';

export default function NavBar() {
	return (
		<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:py-2 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
			<Sheet>
				<SheetTrigger asChild>
					<Button size="icon" variant="outline" className="sm:hidden">
						<PanelLeft className="h-5 w-5" />
						<span className="sr-only">Toggle Menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="sm:max-w-xs">
					<nav className="grid gap-6 text-lg font-medium">
						<Link
							href="#"
							className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
						>
							<Home className="h-5 w-5" />
							Dashboard
						</Link>
						<Link
							href="#"
							className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
						>
							<ShoppingCart className="h-5 w-5" />
							Orders
						</Link>
						<Link
							href="#"
							className="flex items-center gap-4 px-2.5 text-foreground"
						>
							<Package className="h-5 w-5" />
							Products
						</Link>
						<Link
							href="#"
							className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
						>
							<Users2 className="h-5 w-5" />
							Customers
						</Link>
						<Link
							href="#"
							className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
						>
							<LineChart className="h-5 w-5" />
							Settings
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
			<QBreadcrumb />
			<div className="relative ml-auto flex items-center justify-center md:grow-0">
				<Image src={IconBuilding} alt={"Icon Building"} className="h-6 w-6 text-muted-foreground" />
				<span>Company</span>
			</div>
			<UserMenu />
		</header>
	);
}
