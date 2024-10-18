import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Qirave - Sign Up',
  description: 'Create an account'
};

export default function SignUpLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
