import type { Session, User } from 'next-auth';

export interface Tenant extends User {
  subdomain: string;
}

export interface ServerSession extends Session {
  user: Tenant;
}