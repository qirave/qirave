import Credentials from 'next-auth/providers/credentials';
import { CredentialsSignin } from 'next-auth';

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid identifier or password';
}

export default Credentials({
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'email', placeholder: 'example@qirave.com' },
    password: { label: 'Password', type: 'password' }
  },

  async authorize(credentials): Promise<User | null> {
    let user = null;

    // logic to verify if the user exists
    user = await fetchAuthUser(
      credentials.email as string,
      credentials.password as string
    );

    if (!user) {
      // No user found, so this is their first attempt to login
      // meaning this is also the place you could do registration
      throw new InvalidLoginError('Invalid email or password');
    }

    // return user object with their profile data
    return user as unknown as User;
  }
});
