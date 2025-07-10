"use client";

import FahndungCard from "./FahndungCard";

interface Fahndung {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  status: "aktiv" | "gelöst" | "archiviert";
  imageUrl?: string;
}

interface FahndungListProps {
  fahndungen: Fahndung[];
}

export default function FahndungList({ fahndungen }: FahndungListProps) {
  if (fahndungen.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-lg text-gray-500">
          Keine Fahndungen gefunden
        </div>
        <p className="text-gray-400">
          Aktuell sind keine Fahndungen verfügbar.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {fahndungen.map((fahndung) => (
        <FahndungCard key={fahndung.id} {...fahndung} />
      ))}
    </div>
  );
}
