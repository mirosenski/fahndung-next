"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import FahndungForm from "~/components/fahndung/FahndungForm";

export default function FahndungErstellenPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      return; // Warte auf Session-Loading
    }

    if (!session) {
      router.push("/login");
      return;
    }

    setIsLoading(false);
  }, [session, status, router]);

  if (status === "loading" || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Lade Seite...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Wird zur Login-Seite weitergeleitet
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Neue Fahndung erstellen
          </h1>
          <p className="mt-2 text-gray-600">
            Erstellen Sie eine neue Fahndung für die Polizei Baden-Württemberg
          </p>
        </div>

        <FahndungForm />
      </div>
    </div>
  );
}
