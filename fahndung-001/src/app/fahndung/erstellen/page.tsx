"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FahndungForm from "~/components/fahndung/FahndungForm";

export default function FahndungErstellenPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prüfe Demo-Session
    const demoSession = localStorage.getItem("demo-session");
    if (!demoSession) {
      router.push("/login");
      return;
    }

    try {
      JSON.parse(demoSession);
    } catch {
      router.push("/login");
      return;
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lade Seite...</p>
        </div>
      </div>
    );
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
