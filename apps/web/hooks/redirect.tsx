"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Redirect() {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/room");
    }
  }, [router]);

  return <div></div>;
}
