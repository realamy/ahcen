/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { AsyncLocalStorage } from 'async_hooks';
import { cookies } from 'next/headers';
import { getToken } from 'next-auth/jwt';

interface LocalStorageContext {
  trpc: {};
}
const asyncStorage: AsyncLocalStorage<LocalStorageContext> =
  require('next/dist/client/components/request-async-storage').requestAsyncStorage;

asyncStorage.getStore();
export interface User {
  id: string;
  email: string;
  name: string;
}
export async function getUser(): Promise<User | null> {
  const newCookies = cookies()
    .getAll()
    .reduce((cookiesObj, cookie) => {
      cookiesObj[cookie.name] = cookie.value;
      return cookiesObj;
    }, {} as Record<string, string>);

  const token = await getToken({
    req: {
      cookies: newCookies,
      headers: {},
    } as any,
  });
  if (!token || !token.name || !token.email || !token.sub) {
    return null;
  }
  return {
    id: token.sub,
    name: token.name,
    email: token.email,
  };
}
