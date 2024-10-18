"use client";
import React from 'react'

import { 
	Card,
	CardContent,
    CardTitle,
} from '@/components/ui/card';
import { PackageSearch } from 'lucide-react';

type Props = {
    children?: React.ReactNode;
    message?: string;
};

export default function NotFound({ children, message="No products found" }: Props) {
    return (
        <Card className="flex flex-1 items-center justify-center gap-4 flex-col mx-4 mb-4 p-4 sm:px-6 sm:py-0">
            <CardTitle className='flex items-center justify-center flex-col gap-2 text-muted-foreground opacity-40 font-medium capitalize'>
                <PackageSearch strokeWidth={1} size={80}/>
                {message}
            </CardTitle>
            <CardContent className='flex items-center justify-center flex-col gap-2'>
                {children}
            </CardContent>
        </Card>
    )
}
