import Header from "@/components/Header";
import { ReactNode } from "react";

interface SnippetsLayoutProps {
  children: ReactNode;
}

export default function SnippetsLayout({ children }: SnippetsLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {children}
      </main>
    </div>
  );
}