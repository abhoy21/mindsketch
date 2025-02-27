"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function Redirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const isProtectedRoute =
      ["/room/join", "/room/create"].includes(pathname) ||
      pathname.startsWith("/canvas/");

    const isAuthRoute = ["/auth/signin", "/auth/signup", "/"].includes(
      pathname
    );

    if (isProtectedRoute && !token) {
      router.replace("/auth/signin");
    } else if (token && isAuthRoute) {
      router.replace("/room/join");
    }
  }, [pathname, router]);

  return null;
}
