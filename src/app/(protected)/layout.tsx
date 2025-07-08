"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const allowedNav = sessionStorage.getItem("allow-navigation");
    if (allowedNav === "true") {
      setAllowed(true);
      sessionStorage.removeItem("allow-navigation");
    } else {
      setAllowed(false);
      router.replace("/"); // Redirect to home or login page
    }
  }, [router]);

  if (allowed === null) {
    // Loading or checking permission state
    return null; // or a spinner component
  }

  if (!allowed) {
    return null; // redirect will happen anyway
  }

  // Render protected routes here
  return <>{children}</>;
}
