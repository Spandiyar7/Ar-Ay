import { ChevronRight } from "lucide-react";

import { Link } from "@/i18n/navigation";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li className="flex items-center gap-2" key={item.href}>
              {isLast ? (
                <span aria-current="page" className="font-medium text-teal-900">
                  {item.label}
                </span>
              ) : (
                <Link
                  className="rounded-sm hover:text-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
                  href={item.href}
                >
                  {item.label}
                </Link>
              )}
              {!isLast ? <ChevronRight aria-hidden="true" className="h-4 w-4" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
