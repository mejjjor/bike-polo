import Title from "@/components/Title";
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { routes } from "@/routes";
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

  if (session) {
    redirect(routes.dashboard); // Navigate to the new post page
  } else {
    return <>{children}</>;
  }

  return (
    <div className="grid grid-rows-[1fr_5fr] min-h-svh p-2 lg:p-8 ">
      <div className="flex">
        <Title size="small" className="" />
      </div>
      <div>
        <div className="flex justify-center">{children}</div>
      </div>
    </div>
  );
}
