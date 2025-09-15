"use client";

import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Heart, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
    
      <SignedIn>
        <Link
          href="/snippets/new"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Snippet</span>
        </Link>
      </SignedIn>

   
      <ThemeToggle />

     
     <div className="hidden sm:block">
       <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
            },
          }}
        >
          <UserButton.MenuItems>
            <UserButton.Link
              label="Favorites (Comming soon)"
              labelIcon={<Heart className="w-4 h-4" />}
              href="/snippets/favorites"
            />
            <UserButton.Link
              label="Trash (Comming soon)"
              labelIcon={<Trash2 className="w-4 h-4" />}
              href="/snippets/trash"
            />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
     </div>

      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
