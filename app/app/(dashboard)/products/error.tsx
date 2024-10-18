'use client';
import React from 'react';
import { useEffect } from 'react';

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { PackageX } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import Image from 'next/image';

type Props = {
  children?: React.ReactNode;
  message?: string;
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({
  error,
  reset,
  message = 'Error Loading Products'
}: Props) {
  useEffect(() => {
    console.error('Error loading products', error);
  }, [error]);

  return (
    <Card className="w-[800px] flex items-center justify-center gap-2 flex-col m-auto p-4 border border-red-200">
      <CardTitle className="flex items-center justify-center flex-col gap-2 text-red-500 opacity-40 font-medium">
        <PackageX strokeWidth={1} size={80} />
        {message}
      </CardTitle>
      <CardContent className="w-full p-2 flex items-center justify-center flex-col gap-2 bg-red-100 rounded-sm border border-red-200">
        <p className="text-lg text-red-600 capitalize">{error.message}</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant={'secondary'} onClick={() => reset()}>
          Try again
        </Button>
      </CardFooter>
    </Card>
  );
}
