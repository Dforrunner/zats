'use client';

import { useRouter } from 'next/navigation';

export function useRouterWithParams() {
  const router = useRouter();

  const setSearchParams = (params: Record<string, string>) => {
    const keys = Object.keys(params);
  
    if (!keys.length) return '';
  
    const query = new URLSearchParams();
    keys.forEach((key) => {
      query.set(key, params[key]);
    });
  
    return '?' + query.toString();
  }

  //Pushes a new route
  const push = (path: string, params: any) => {
    router.push(path + setSearchParams(params));
  };

  //Replaces the current route without pushing a new one. This was back button won't bring them back
  const replace = (path: string, params: any) => {
    router.replace(path + setSearchParams(params));
  };

  return {
    push,
    replace,
  };
}
