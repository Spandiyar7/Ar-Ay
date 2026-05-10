import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-mint-500 text-ink-950 shadow-soft hover:bg-mint-400 focus-visible:ring-mint-500",
  secondary:
    "border border-ink-950/15 bg-white text-ink-950 shadow-card hover:bg-skysoft-50 focus-visible:ring-teal-700",
  gold: "bg-gold-500 text-ink-950 shadow-card hover:bg-gold-200 focus-visible:ring-gold-500",
  ghost: "text-ink-950 hover:bg-teal-100/70 focus-visible:ring-teal-700"
};

const sizes = {
  md: "min-h-12 px-5 py-3 text-base",
  sm: "min-h-11 px-4 py-2 text-sm",
  icon: "h-12 w-12 p-0"
};

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

export function buttonClassName({
  variant = "primary",
  size = "md",
  className
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className
  );
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return <button className={buttonClassName({ variant, size, className })} {...props} />;
}

export function ButtonLink({
  href,
  children,
  variant,
  size,
  className,
  ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
}) {
  return (
    <Link
      href={href}
      className={buttonClassName({ variant, size, className })}
      {...props}
    >
      {children}
    </Link>
  );
}

export function ExternalButtonLink({
  href,
  children,
  variant,
  size,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
}) {
  return (
    <a className={buttonClassName({ variant, size, className })} href={href} {...props}>
      {children}
    </a>
  );
}
