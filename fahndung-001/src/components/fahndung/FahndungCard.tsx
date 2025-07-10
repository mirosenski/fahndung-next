"use client";

import Link from "next/link";
import Image from "next/image";

interface FahndungCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  status: "aktiv" | "gelöst" | "archiviert";
  imageUrl?: string;
}

export default function FahndungCard({
  id,
  title,
  description,
  category,
  location,
  date,
  status,
  imageUrl = "/placeholder-fahndung.jpg",
}: FahndungCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "aktiv":
        return "bg-red-600";
      case "gelöst":
        return "bg-green-600";
      case "archiviert":
        return "bg-gray-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "aktiv":
        return "AKTIV";
      case "gelöst":
        return "GELÖST";
      case "archiviert":
        return "ARCHIVIERT";
      default:
        return status.toUpperCase();
    }
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      {/* Image Container */}
      <div className="relative h-48 bg-gray-200">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
        {/* Status Overlay */}
        <div className="absolute right-4 top-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium text-white ${getStatusColor(status)}`}
          >
            {getStatusText(status)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
            {category}
          </span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mb-4 line-clamp-3 text-sm text-gray-600">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>📍 {location}</span>
          </div>

          <Link
            href={`/fahndung/${id}`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Mehr erfahren
          </Link>
        </div>
      </div>
    </div>
  );
}
