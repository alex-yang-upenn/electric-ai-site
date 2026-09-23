import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

const base =
  "group relative inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_0_0_1px_rgb(255_42_42/.6),0_8px_30px_-6px_rgb(255_42_42/.6)] hover:bg-accent-soft hover:shadow-[0_0_0_1px_rgb(255_90_79/.8),0_10px_44px_-4px_rgb(255_42_42/.8)]",
  ghost:
    "border border-line-strong bg-white/[0.03] text-ink backdrop-blur hover:border-white/30 hover:bg-white/[0.07]",
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
