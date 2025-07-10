"use client";

import Link from "next/link";
import Hero from "~/components/layout/Hero";
import FahndungList from "~/components/fahndung/FahndungList";
import SearchBar from "~/components/filter/SearchBar";

// Mock data für die Demo
const mockFahndungen = [
  {
    id: "1",
    title: "Vermisste Person gesucht",
    description:
      "Wir suchen nach einer vermissten Person im Raum Stuttgart. Letzte Sichtung am Hauptbahnhof. Die Person ist 25 Jahre alt und war zuletzt in einem schwarzen Pullover gesehen worden.",
    category: "Vermisste Person",
    location: "Stuttgart",
    date: "15.12.2024",
    status: "aktiv" as const,
    imageUrl: "/placeholder-fahndung.jpg",
  },
  {
    id: "2",
    title: "Zeuge für Verkehrsunfall gesucht",
    description:
      "Für einen Verkehrsunfall am 10.12.2024 in Karlsruhe suchen wir nach Zeugen. Der Unfall ereignete sich um 14:30 Uhr an der Kreuzung Hauptstraße/Marktplatz.",
    category: "Verkehrsunfall",
    location: "Karlsruhe",
    date: "10.12.2024",
    status: "aktiv" as const,
    imageUrl: "/placeholder-fahndung.jpg",
  },
  {
    id: "3",
    title: "Diebstahl von Fahrrad",
    description:
      "Am 8.12.2024 wurde ein blaues Mountainbike vom Bahnhofsvorplatz in Mannheim gestohlen. Das Fahrrad hat eine auffällige gelbe Satteltasche.",
    category: "Diebstahl",
    location: "Mannheim",
    date: "8.12.2024",
    status: "aktiv" as const,
    imageUrl: "/placeholder-fahndung.jpg",
  },
  {
    id: "4",
    title: "Einbruch in Wohnhaus",
    description:
      "In der Nacht vom 5.12.2024 wurde in ein Wohnhaus in Freiburg eingebrochen. Die Täter sind über ein Kellerfenster eingestiegen und haben Schmuck und Bargeld entwendet.",
    category: "Einbruch",
    location: "Freiburg",
    date: "5.12.2024",
    status: "gelöst" as const,
    imageUrl: "/placeholder-fahndung.jpg",
  },
  {
    id: "5",
    title: "Sachbeschädigung an Auto",
    description:
      "Am 3.12.2024 wurde ein silberner VW Golf in Heidelberg beschädigt. Zeugen haben gesehen, wie jemand mit einem Schlüssel Kratzer in die Motorhaube geritzt hat.",
    category: "Sachbeschädigung",
    location: "Heidelberg",
    date: "3.12.2024",
    status: "aktiv" as const,
    imageUrl: "/placeholder-fahndung.jpg",
  },
  {
    id: "6",
    title: "Vermisster Hund",
    description:
      "Ein brauner Labrador ist am 1.12.2024 in Ulm vermisst worden. Der Hund trägt ein rotes Halsband und ist sehr menschenfreundlich.",
    category: "Vermisste Person",
    location: "Ulm",
    date: "1.12.2024",
    status: "archiviert" as const,
    imageUrl: "/placeholder-fahndung.jpg",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Search and Filter Section */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Aktuelle Fahndungen
            </h2>
            <p className="text-gray-600">
              Unterstützen Sie die Polizei bei der Aufklärung von Straftaten.
              Jeder Hinweis kann entscheidend sein.
            </p>
          </div>

          <SearchBar
            onSearch={(query) => {
              // Navigation zur Suchseite
              const searchUrl = `/suche?q=${encodeURIComponent(query)}`;
              window.location.href = searchUrl;
            }}
            onFilterChange={(filters) => {
              // Navigation zur Suchseite mit Filtern
              const params = new URLSearchParams();
              if (filters.query) params.set('q', filters.query);
              if (filters.category) params.set('category', filters.category);
              if (filters.status) params.set('status', filters.status);
              if (filters.location) params.set('location', filters.location);
              if (filters.dateRange) params.set('dateRange', filters.dateRange);
              
              const searchUrl = `/suche?${params.toString()}`;
              window.location.href = searchUrl;
            }}
          />
        </div>
      </section>

      {/* Fahndungsliste */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FahndungList fahndungen={mockFahndungen} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">Haben Sie einen Hinweis?</h2>
          <p className="mb-8 text-xl text-blue-100">
            Ihre Informationen können bei der Aufklärung von Straftaten helfen.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/hilfe"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-900 transition-colors hover:bg-blue-50"
            >
              Wie kann ich helfen?
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-blue-900"
            >
              Zum Dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
