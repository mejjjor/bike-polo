"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Reload = () => {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [router]);

  return null;
};

export default Reload;
