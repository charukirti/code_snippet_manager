import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/ui/Logo";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex justify-between items-center mb-16">
          <Logo href="/" showTitle={true} />
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link
              href="/snippets"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
        </nav>

        <main className="flex flex-col items-center gap-12">
          <section className="text-center">
            <header>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Your Personal Code Snippet Manager
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Save, organize, and quickly access your code snippets. Never lose
                that perfect piece of code again.
              </p>
            </header>

            <SignedOut>
              <div className="flex gap-4 justify-center">
                <SignInButton mode="redirect">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Get Started
                  </button>
                </SignInButton>
              </div>
            </SignedOut>
          </section>

          <aside className="max-w-2xl w-full">
            <figure className="relative">
              <Image
                src="/hero-image.png"
                alt="Code snippet manager interface"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
                priority
              />
            </figure>
          </aside>
        </main>
      </div>
    </div>
  );
}