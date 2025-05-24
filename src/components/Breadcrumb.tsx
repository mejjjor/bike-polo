import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { routes } from "@/routes";
import Link from "next/link";

export default function BreadcrumbComponent({ path }: { path: string }) {
  const segments = path.split("/").filter(Boolean);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={routes.home}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {["dashboard"].includes(segments[0]) && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={routes.dashboard}>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          {["referee"].includes(segments[1]) && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={routes.referee(segments[2])}>Referee</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
