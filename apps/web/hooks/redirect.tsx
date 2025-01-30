"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function Redirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const protectedRoutes = ["/room/join", "/room/create"];

    if (protectedRoutes.includes(pathname) && !token) {
      router.push("/auth/signin");
    } else if (pathname.startsWith("/canvas/") && !token) {
      router.push("/auth/signin");
    } else if (
      token &&
      (pathname === "/auth/signin" ||
        pathname === "/auth/signup" ||
        pathname === "/")
    ) {
      router.push("/room/join");
    }
  }, [router, pathname]);

  return <div></div>;
}
