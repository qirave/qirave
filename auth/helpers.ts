'use server';

import * as NA from '.';

export async function signIn() {
  return await NA.signIn();
}

export async function signInCredentials(formData: FormData) {
  return await NA.signIn('credentials', formData, { redirectTo: '/' });
}

export async function signInResend(formData: FormData) {
  return await NA.signIn('resend', formData, { redirectTo: '/' });
}

export async function signInGoogle() {
  return await NA.signIn('google', { redirectTo: '/' });
}

export async function signOut() {
  return await NA.signOut({ redirectTo: '/' });
}
