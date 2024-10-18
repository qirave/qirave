import React from 'react';
import type { Metadata } from 'next';
import { getURL } from '@/utils/helpers';
import '@/styles/globals.css';

const title = 'Qirave';
const description = 'Qirave is a platform ERP tailored for e-commerce businesses.';

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title,
  description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://qirave-client.vercel.app/',
    title,
    description,
    images: [
      {
        url: 'https://qirave-client.vercel.app/imgs/ogp.png',
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
};

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
