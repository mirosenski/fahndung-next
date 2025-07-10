"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FahndungPage() {
  const router = useRouter();

  useEffect(() => {
    // Weiterleitung zur Suchseite, da dort die Fahndungsliste angezeigt wird
    router.replace("/suche");
  }, [router]);

  // Fallback während der Weiterleitung
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Leite weiter...</p>
        <Link 
          href="/suche" 
          className="mt-4 inline-block text-blue-600 hover:text-blue-800 underline"
        >
          Zur Fahndungssuche
        </Link>
      </div>
    </div>
  );
} 