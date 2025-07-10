"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

interface FahndungFormData {
  title: string;
  description: string;
  category: string;
  location: string;
  contactInfo: string;
}

export default function FahndungForm() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState<FahndungFormData>({
    title: "",
    description: "",
    category: "",
    location: "",
    contactInfo: "",
  });
  const [errors, setErrors] = useState<Partial<FahndungFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const categories = [
    "Vermisste Person",
    "Diebstahl",
    "Einbruch",
    "Verkehrsunfall",
    "Sachbeschädigung",
    "Sonstiges",
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<FahndungFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Titel ist erforderlich";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Beschreibung ist erforderlich";
    } else if (formData.description.length < 20) {
      newErrors.description =
        "Beschreibung muss mindestens 20 Zeichen lang sein";
    }

    if (!formData.category) {
      newErrors.category = "Kategorie ist erforderlich";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Ort ist erforderlich";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // TODO: Implement actual form submission
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      setSubmitStatus("success");
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        contactInfo: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FahndungFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (!session) {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 text-center">
        <h3 className="mb-2 text-lg font-semibold text-yellow-800">
          Anmeldung erforderlich
        </h3>
        <p className="text-yellow-700">
          Sie müssen sich anmelden, um eine neue Fahndung zu erstellen.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Neue Fahndung erstellen
        </h2>

        {submitStatus === "success" && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-green-800">
              ✅ Fahndung wurde erfolgreich erstellt!
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-red-800">
              ❌ Fehler beim Erstellen der Fahndung. Bitte versuchen Sie es
              erneut.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titel */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Titel der Fahndung *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Kurzer, beschreibender Titel"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Kategorie */}
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Kategorie *
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Kategorie auswählen</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          {/* Ort */}
          <div>
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Ort/Region *
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="z.B. Stuttgart, Karlsruhe, etc."
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-500">{errors.location}</p>
            )}
          </div>

          {/* Beschreibung */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Beschreibung *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={6}
              className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Detaillierte Beschreibung des Vorfalls, der gesuchten Person oder des gesuchten Objekts..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Kontaktinformationen */}
          <div>
            <label
              htmlFor="contactInfo"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Kontaktinformationen (optional)
            </label>
            <textarea
              id="contactInfo"
              value={formData.contactInfo}
              onChange={(e) => handleInputChange("contactInfo", e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Telefonnummer, E-Mail oder andere Kontaktmöglichkeiten für Rückfragen..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  title: "",
                  description: "",
                  category: "",
                  location: "",
                  contactInfo: "",
                });
                setErrors({});
                setSubmitStatus("idle");
              }}
              className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Wird erstellt..." : "Fahndung erstellen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
