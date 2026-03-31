"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-(--background-dark) border-b border-slate-200/20 dark:border-white/10 p-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Signal</h1>

        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Focus
            </Link>
          </li>
          <li>
            <Link href="/signals" className="hover:text-gray-300">
              Signals
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
