import { Code } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  href?: string;
  title?: string;
  showTitle?: boolean;
}

export function Logo({
  href = "/",
  title = "Code Snippets",
  showTitle = true,
}: LogoProps) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <Code className="w-6 h-6 text-blue-600" />
      {showTitle && (
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      )}
    </Link>
  );
}
