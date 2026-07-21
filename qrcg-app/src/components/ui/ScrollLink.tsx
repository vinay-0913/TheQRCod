"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ScrollLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export default function ScrollLink({ href, children, ...props }: ScrollLinkProps) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href === "/" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props} legacyBehavior={false}>
      {children}
    </Link>
  );
}
