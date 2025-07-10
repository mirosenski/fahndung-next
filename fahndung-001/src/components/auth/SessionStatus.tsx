"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function SessionStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
        <span className="text-sm text-gray-600">Laden...</span>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Link
        href="/login"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        Anmelden
      </Link>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="text-sm">
        <p className="font-medium text-gray-900">
          Willkommen, {session?.user?.name || session?.user?.email}
        </p>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="rounded-md bg-gray-600 px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
      >
        Abmelden
      </button>
    </div>
  );
}
