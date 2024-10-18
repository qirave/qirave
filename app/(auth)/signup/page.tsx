'use client';
import React from 'react';
import { signInGoogle } from '@/auth/helpers';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo/logo-transparent.svg';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignUpForm() {
  return (
    <>
      <CardHeader className="flex justify-center items-center">
        <Image src={logo} alt="Qirave" width={60} />
        <CardTitle className="text-2xl uppercase">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signInGoogle()}
          >
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </>
  );
}
