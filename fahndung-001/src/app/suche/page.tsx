"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import FahndungList from '~/components/fahndung/FahndungList';
import SearchBar from '~/components/filter/SearchBar';
import { useRouter } from 'next/navigation';

// Mock data für die Demo
const mockFahndungen = [
  {
    id: "1",
    title: "Vermisste Person gesucht",
    description: "Wir suchen nach einer vermissten Person im Raum Stuttgart. Letzte Sichtung am Hauptbahnhof. Die Person ist 25 Jahre alt und war zuletzt in einem schwarzen Pullover gesehen worden.",
    category: "Vermisste Person",
    location: "Stuttgart",
    date: "15.12.2024",
    status: "aktiv" as const,
    imageUrl: "/placeholder-fahndung.jpg",
  },
  {
    id: "2",
    title: "Zeuge für Verkehrsunfall gesucht",
    description: "Für einen Verkehrsunfall am 10.12.2024 in Karlsruhe suchen wir nach Zeugen. Der Unfall ereignete sich um 14:30 Uhr an der Kreuzung Hauptstraße/Marktplatz.",
    category: "Verkehrsunfall",
    location: "Karlsruhe",
    date: "10.12.2024",
    status: "aktiv" as const,
    imageUrl: "/placeholder-fahndung.jpg",
  },
  {
    id: "3",
    title: "Diebstahl von Fahrrad",
    description: "Am 8.12.2024 wurde ein blaues Mountainbike vom Bahnhofsvorplatz in Mannheim gestohlen. Das Fahrrad hat eine auffällige gelbe Satteltasche.",
    category: "Diebstahl",
    location: "Mannheim",
    date: "8.12.2024",
    status: "aktiv" as const,
    imageUrl: "/placeholder-fahndung.jpg",
  },
  {
    id: "4",
    title: "Einbruch in Wohnhaus",
    description: "In der Nacht vom 5.12.2024 wurde in ein Wohnhaus in Freiburg eingebrochen. Die Täter sind über ein Kellerfenster eingestiegen und haben Schmuck und Bargeld entwendet.",
    category: "Einbruch",
    location: "Freiburg",
    date: "5.12.2024",
    status: "gelöst" as const,
    imageUrl: "/placeholder-fahndung.jpg",
  },
  {
    id: "5",
    title: "Sachbeschädigung an Auto",
    description: "Am 3.12.2024 wurde ein silberner VW Golf in Heidelberg beschädigt. Zeugen haben gesehen, wie jemand mit einem Schlüssel Kratzer in die Motorhaube geritzt hat.",
    category: "Sachbeschädigung",
    location: "Heidelberg",
    date: "3.12.2024",
    status: "aktiv" as const,
    imageUrl: "/placeholder-fahndung.jpg",
  },
  {
    id: "6",
    title: "Vermisster Hund",
    description: "Ein brauner Labrador ist am 1.12.2024 in Ulm vermisst worden. Der Hund trägt ein rotes Halsband und ist sehr menschenfreundlich.",
    category: "Vermisste Person",
    location: "Ulm",
    date: "1.12.2024",
    status: "archiviert" as const,
    imageUrl: "/placeholder-fahndung.jpg",
  },
];

function SuchePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filteredFahndungen, setFilteredFahndungen] = useState(mockFahndungen);

  // URL-Parameter auslesen
  const query = searchParams.get('q') ?? '';
  const category = searchParams.get('category') ?? '';
  const status = searchParams.get('status') ?? '';
  const location = searchParams.get('location') ?? '';
  const dateRange = searchParams.get('dateRange') ?? '';

  // Suchlogik
  useEffect(() => {
    let results = mockFahndungen;

    // Text-Suche
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(fahndung => 
        fahndung.title.toLowerCase().includes(searchTerm) ||
        fahndung.description.toLowerCase().includes(searchTerm) ||
        fahndung.location.toLowerCase().includes(searchTerm)
      );
    }

    // Kategorie-Filter
    if (category) {
      results = results.filter(fahndung => fahndung.category === category);
    }

    // Status-Filter
    if (status) {
      results = results.filter(fahndung => fahndung.status === status);
    }

    // Ort-Filter
    if (location) {
      const locationTerm = location.toLowerCase();
      results = results.filter(fahndung => 
        fahndung.location.toLowerCase().includes(locationTerm)
      );
    }

    // Datum-Filter (vereinfacht)
    if (dateRange) {
      const today = new Date();
      const filterDate = new Date();
      
      switch (dateRange) {
        case 'today':
          filterDate.setDate(today.getDate() - 1);
          break;
        case 'week':
          filterDate.setDate(today.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(today.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(today.getFullYear() - 1);
          break;
      }
      
      results = results.filter(fahndung => {
        const fahndungDate = new Date(fahndung.date.split('.').reverse().join('-'));
        return fahndungDate >= filterDate;
      });
    }

    setFilteredFahndungen(results);
  }, [query, category, status, location, dateRange]);

  // URL-Parameter aktualisieren
  const updateSearchParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`/suche?${params.toString()}`);
  };

  const handleSearch = (searchQuery: string) => {
    updateSearchParams({ q: searchQuery });
  };

  const handleFilterChange = (filters: { query?: string; category?: string; status?: string; location?: string; dateRange?: string }) => {
    updateSearchParams({
      q: filters.query ?? '',
      category: filters.category ?? '',
      status: filters.status ?? '',
      location: filters.location ?? '',
      dateRange: filters.dateRange ?? ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Fahndungssuche
          </h1>
          <p className="text-gray-600">
            Durchsuchen Sie alle aktuellen Fahndungen und Vermisstenfälle
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          placeholder="Fahndungen durchsuchen..."
        />
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Search Summary */}
        {(query || category || status || location || dateRange) && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              Suchergebnisse
            </h2>
            <div className="text-sm text-blue-700">
              {filteredFahndungen.length} Fahndung{filteredFahndungen.length !== 1 ? 'en' : ''} gefunden
              {query && ` für "${query}"`}
              {(category || status || location || dateRange) && (
                <span> mit angewendeten Filtern</span>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        <FahndungList fahndungen={filteredFahndungen} />
      </div>
    </div>
  );
}

export default function SuchePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Suchseite...</p>
        </div>
      </div>
    }>
      <SuchePageContent />
    </Suspense>
  );
} 