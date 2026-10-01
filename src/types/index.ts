import type { DefaultSession } from 'next-auth';
import { UserRole } from '@prisma/client';

export { UserRole };

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    role: UserRole;
  }
}
