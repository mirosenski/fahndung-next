"use client";

interface FilterChip {
  id: string;
  label: string;
  active: boolean;
}

interface FilterChipsProps {
  filters: FilterChip[];
  onFilterChange: (filterId: string) => void;
  title?: string;
}

export default function FilterChips({
  filters,
  onFilterChange,
  title,
}: FilterChipsProps) {
  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      )}

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter.active
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
