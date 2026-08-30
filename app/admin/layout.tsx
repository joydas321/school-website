import type { ReactNode } from "react";
import Link from "next/link";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {/* HEADER */}
      <header className="relative z-50 bg-[#102a43] text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* SCHOOL NAME */}
          <Link href="/" className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white">
              <img
                src="/logo.png"
                alt="PM SHRI Adarsh Vidyalaya"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <p className="text-sm font-bold text-amber-400">
                PM SHRI SCHOOL
              </p>

              <h1 className="text-xl font-black md:text-2xl">
                PM SHRI Adarsh Vidyalaya
              </h1>

              <p className="text-sm text-slate-300">
                Barkhetri, Nalbari, Assam
              </p>
            </div>
          </Link>

          {/* NAVIGATION */}
          <nav className="hidden items-center gap-7 lg:flex">

            <Link
              href="/"
              className="font-bold text-white hover:text-amber-400"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="font-bold text-white hover:text-amber-400"
            >
              About
            </Link>

            <Link
              href="/academics"
              className="font-bold text-white hover:text-amber-400"
            >
              Academics
            </Link>

            <Link
              href="/achievements"
              className="font-bold text-white hover:text-amber-400"
            >
              Achievements
            </Link>

            <Link
              href="/facilities"
              className="font-bold text-white hover:text-amber-400"
            >
              Facilities
            </Link>

            <Link
              href="/gallery"
              className="font-bold text-white hover:text-amber-400"
            >
              Gallery
            </Link>

            <Link
              href="/jobs"
              className="font-bold text-white hover:text-amber-400"
            >
              Jobs
            </Link>

            <Link
              href="/contact"
              className="font-bold text-white hover:text-amber-400"
            >
              Contact
            </Link>

            <Link
              href="/admin"
              className="rounded-2xl bg-amber-400 px-7 py-4 font-black text-black hover:bg-amber-300"
            >
              Admin
            </Link>

          </nav>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main>
        {children}
      </main>
    </>
  );
}