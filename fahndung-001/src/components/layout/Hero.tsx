"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                Hinweise helfen
              </h1>
              <p className="text-xl leading-relaxed text-blue-100 md:text-2xl">
                Unterstützen Sie die Polizei Baden-Württemberg bei der
                Aufklärung von Straftaten. Jeder Hinweis kann entscheidend sein.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/fahndung"
                className="rounded-lg bg-white px-8 py-4 text-center font-semibold text-blue-900 transition-colors hover:bg-blue-50"
              >
                Fahndungen anzeigen
              </Link>
              <Link
                href="/hilfe"
                className="rounded-lg border-2 border-white px-8 py-4 text-center font-semibold text-white transition-colors hover:bg-white hover:text-blue-900"
              >
                Wie kann ich helfen?
              </Link>
            </div>

            <div className="rounded-lg bg-blue-800/50 p-6">
              <h3 className="mb-2 text-lg font-semibold">Wichtiger Hinweis</h3>
              <p className="text-blue-100">
                Bei akuten Notfällen wenden Sie sich bitte direkt an die
                Notrufnummer 110. Diese Plattform dient der Unterstützung bei
                laufenden Fahndungen.
              </p>
            </div>
          </div>

          {/* Right Side - Featured Fahndung Card */}
          <div className="rounded-xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-medium text-white">
                  AKTIV
                </span>
                <span className="text-sm text-blue-200">vor 2 Stunden</span>
              </div>

              <h3 className="text-2xl font-bold text-white">
                Vermisste Person gesucht
              </h3>

              <p className="text-blue-100">
                Wir suchen nach einer vermissten Person im Raum Stuttgart.
                Letzte Sichtung am Hauptbahnhof.
              </p>

              <div className="flex items-center space-x-4 text-sm text-blue-200">
                <span>📍 Stuttgart</span>
                <span>👤 25 Jahre</span>
                <span>📅 15.12.2024</span>
              </div>

              <Link
                href="/fahndung/1"
                className="block w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Details anzeigen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
