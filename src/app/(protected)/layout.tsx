import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Protectedlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  console.log("session", session);
  if (!session) {
    redirect(`/`); // Navigate to the new post page
  } else {
    return <>{children}</>;
  }
}
