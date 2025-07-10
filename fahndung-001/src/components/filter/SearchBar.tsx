"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: SearchFilters) => void;
  placeholder?: string;
}

interface SearchFilters {
  query: string;
  category: string;
  status: string;
  location: string;
  dateRange: string;
}

export default function SearchBar({
  onSearch,
  onFilterChange,
  placeholder = "Fahndung suchen...",
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState<Omit<SearchFilters, "query">>({
    category: "",
    status: "",
    location: "",
    dateRange: "",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    onFilterChange({ ...filters, query: searchQuery });
  };

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange({ ...newFilters, query: searchQuery });
  };

  return (
    <div className="space-y-4">
      {/* Basic Search */}
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
        >
          🔍
        </button>
      </form>

      {/* Advanced Filters Toggle */}
      <button
        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        className="text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        {showAdvancedFilters
          ? "Erweiterte Filter ausblenden"
          : "Erweiterte Filter anzeigen"}
      </button>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="space-y-4 rounded-lg bg-gray-50 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Kategorie Filter */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Kategorie
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Alle Kategorien</option>
                <option value="Vermisste Person">Vermisste Person</option>
                <option value="Diebstahl">Diebstahl</option>
                <option value="Einbruch">Einbruch</option>
                <option value="Verkehrsunfall">Verkehrsunfall</option>
                <option value="Sachbeschädigung">Sachbeschädigung</option>
                <option value="Sonstiges">Sonstiges</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Alle Status</option>
                <option value="aktiv">Aktiv</option>
                <option value="gelöst">Gelöst</option>
                <option value="archiviert">Archiviert</option>
              </select>
            </div>

            {/* Ort Filter */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Ort
              </label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                placeholder="Ort eingeben..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Datum Filter */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Zeitraum
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) =>
                  handleFilterChange("dateRange", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Alle Zeiträume</option>
                <option value="today">Heute</option>
                <option value="week">Letzte Woche</option>
                <option value="month">Letzter Monat</option>
                <option value="year">Letztes Jahr</option>
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                setFilters({
                  category: "",
                  status: "",
                  location: "",
                  dateRange: "",
                });
                onFilterChange({
                  query: searchQuery,
                  category: "",
                  status: "",
                  location: "",
                  dateRange: "",
                });
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-800"
            >
              Filter zurücksetzen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
