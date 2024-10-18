import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Qirave - Settings',
  description: 'Qirave Saas Next App'
};

export default function SettingsLayout({
  children
}: React.PropsWithChildren<{}>) {
  return (
    <section className="flex h-full flex-1 flex-col gap-6 bg-muted/40 md:gap-8">
      <div className="grid w-full max-w-6xl gap-2 pl-6">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>

      <section className="flex gap-6 grid-cols-2 px-4">
        <aside className="hidden w-64 h-full bg-muted/20 md:block">
          <nav className="grid gap-4 text-sm text-muted-foreground bg-muted-active-foreground/35 p-4 rounded-md">
            <Link href="#" className="font-semibold text-primary">
              General
            </Link>
            <Link href="#">Security</Link>
            <Link href="#">Integrations</Link>
            <Link href="#">Support</Link>
            <Link href="/settings/tax">Tax</Link>
            <Link href="#">Advanced</Link>
          </nav>
        </aside>
        <main className="grid gap-6">{children}</main>
      </section>
    </section>
  );
}
