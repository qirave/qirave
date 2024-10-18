'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo/logo-transparent.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { signInResend, signInGoogle } from '@/auth/helpers';
// import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
// import { actionCodeSettings } from "@/firebase/actioncode";
// import { app } from "@/firebase";
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoadingSpinner } from '@/components/icons/loading-spinner';

const schema = z.object({
  email: z.string().email()
});

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true
  });

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    // const auth = getAuth(app);
    try {
      // await sendSignInLinkToEmail(auth, data.email, actionCodeSettings);
      const formData = new FormData();
      formData.append('email', data.email);
      signInResend(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardHeader className="flex justify-center items-center">
        <Image src={logo} alt="Qirave" width={60} />
        <CardTitle className="text-2xl uppercase">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4" role="form">
        <fieldset className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="why.be@example.co"
            className={errors.email && 'border-red-500 text-red-500'}
            {...register('email')}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">
              {errors.email.message?.toString()}
            </span>
          )}
        </fieldset>
        <Button
          type="submit"
          className={`w-full ${isLoading && 'bg-primary/40'}`}
        >
          {isLoading && <LoadingSpinner className="w-5 h-5 mr-2" />}
          Login
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => signInGoogle()}
        >
          Login with Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </form>
  );
}
