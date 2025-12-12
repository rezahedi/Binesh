"use client";

import { ProgressProvider } from "@/contexts/ProgressContext";
import Content from "./components/Content";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const user = useUser();
  if (!user) return router.push("/");

  return (
    <ProgressProvider>
      <Content />
    </ProgressProvider>
  );
}
