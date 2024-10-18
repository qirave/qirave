"use client";
import React from 'react'
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
	Tooltip,
    TooltipProvider,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

type AppProps = {
    icon: React.ReactNode;
    name: string;
    href: string;
    className?: string;
};

export default function App({ icon, name, href, className }: AppProps) {
    const path = usePathname();
    const currentApp = '/'+(path.split("/").filter(Boolean)[0] ?? '');

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={href}
                        className={cn(`${currentApp === href ? "group-hover/aside:border-primary group-hover/aside:bg-muted-active-foreground group-hover/aside:shadow-sm group-hover/aside:shadow-muted-active-foreground" : "group-hover/aside:border-input"} group/aside-app group-hover/aside:border group-hover/aside:hover:border-primary hover:bg-muted-active-foreground hover:shadow-sm hover:shadow-primary-op-40 flex w-full items-center justify-center gap-2 rounded-lg group-hover/aside:justify-start group-hover/aside:px-2 group-hover/aside:py-[2px] transition-[width]`, className)}
                    >
                        {/* ${currentApp === href ? "bg-primary text-primary-foreground rounded-full" : "text-muted-foreground hover:text-foreground rounded-lg"} */}
                        <div className={`${currentApp === href ? "bg-primary text-primary-foreground rounded-full group-hover/aside:text-primary group-hover/aside:rounded-none group-hover/aside:bg-transparent" : "text-muted-foreground"} group-hover/aside-app:text-primary flex h-9 w-9 items-center justify-center md:h-8 md:w-8`}>
                            {icon}
                        </div>
                        <span className={`${currentApp === href ? "text-primary" : "text-muted-foreground"} group-hover/aside-app:text-primary capitalize hidden group-hover/aside:inline-block`}>{name}</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{name}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
