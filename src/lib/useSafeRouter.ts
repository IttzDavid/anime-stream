// Absolute path: /src/lib/useSafeRouter.ts
"use client";

import { useRouter } from "next/navigation";

export function useSafeRouter() {
  const router = useRouter();

  const safePush = (path: string, allowProtected = false) => {
    if (allowProtected) {
      sessionStorage.setItem("allow-navigation", "true");
    }
    router.push(path);
  };

  return { push: safePush };
}
