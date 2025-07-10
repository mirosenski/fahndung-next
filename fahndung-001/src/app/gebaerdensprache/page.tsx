"use client";

import React from 'react';
import Link from 'next/link';

export default function GebaerdensprachePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-blue-900 dark:text-blue-100">
            Gebärdensprache
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Informationen in Deutscher Gebärdensprache (DGS)
          </p>
        </div>

        {/* Navigation zurück */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
          >
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück zur Startseite
          </Link>
        </div>

        {/* Hauptinhalt */}
        <div className="space-y-8">
          
          {/* Video-Bereich */}
          <section className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Willkommen in Gebärdensprache
            </h2>
            <div className="aspect-video w-full rounded-lg bg-gray-200 dark:bg-gray-700">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <svg className="mx-auto mb-4 h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-400">
                    Video in Deutscher Gebärdensprache wird hier eingebettet
                  </p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                    (Platzhalter für Gebärdensprach-Video)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Gebärdensprachdolmetscher */}
          <section className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Gebärdensprachdolmetscher
            </h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <p>
                Die Polizei Baden-Württemberg bietet Gebärdensprachdolmetscher an.
              </p>
              <p>
                <strong>Kontakt für Gebärdensprachdolmetscher:</strong>
              </p>
              <div className="space-y-2">
                <p><strong>Telefon:</strong> 0711 5401-0</p>
                <p><strong>E-Mail:</strong> gebaerdensprache@polizei-bw.de</p>
                <p><strong>Videotelefon:</strong> Über die Polizei-App verfügbar</p>
              </div>
              <p>
                Gebärdensprachdolmetscher sind rund um die Uhr verfügbar.
              </p>
            </div>
          </section>

          {/* Wie funktioniert die Fahndung? */}
          <section className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Wie funktioniert die Fahndung?
            </h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <p>
                Auf dieser Website können Sie:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Nach vermissten Personen suchen</li>
                <li>Zeugenaufrufe ansehen</li>
                <li>Informationen über Verbrechen finden</li>
                <li>Hinweise an die Polizei geben</li>
              </ul>
              <p>
                Alle Informationen sind auch in Gebärdensprache verfügbar.
              </p>
            </div>
          </section>

          {/* Barrierefreiheit */}
          <section className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Barrierefreiheit
            </h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <p>
                Die Polizei Baden-Württemberg ist für alle Menschen da.
              </p>
              <p>
                <strong>Wir bieten:</strong>
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Gebärdensprachdolmetscher</li>
                <li>Videotelefon-Service</li>
                <li>Schriftliche Kommunikation</li>
                <li>Barrierefreie Polizeireviere</li>
              </ul>
            </div>
          </section>

          {/* Notfall-Kontakt */}
          <section className="rounded-lg bg-red-50 p-6 dark:bg-red-900/20">
            <h2 className="mb-4 text-2xl font-bold text-red-900 dark:text-red-100">
              Notfall-Kontakt
            </h2>
            <div className="space-y-4 text-lg text-red-800 dark:text-red-200">
              <p>
                <strong>Bei Notfällen:</strong>
              </p>
              <div className="space-y-2">
                <p><strong>Notruf:</strong> 110</p>
                <p><strong>SMS-Notruf:</strong> Für Gehörlose verfügbar</p>
                <p><strong>Polizei-App:</strong> Mit Gebärdensprach-Support</p>
              </div>
              <p>
                Bei Gefahr rufen Sie sofort 110 an.
              </p>
            </div>
          </section>

          {/* Weitere Hilfe */}
          <section className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Weitere Hilfe
            </h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <p>
                Weitere Informationen finden Sie hier:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link 
                  href="/leichte-sprache"
                  className="block rounded-lg border-2 border-blue-600 p-4 text-center text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                >
                  Leichte Sprache
                </Link>
                <Link 
                  href="/hilfe"
                  className="block rounded-lg border-2 border-green-600 p-4 text-center text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20"
                >
                  Hilfe-Seite
                </Link>
              </div>
            </div>
          </section>

          {/* Technische Hinweise */}
          <section className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <h2 className="mb-4 text-2xl font-bold text-blue-900 dark:text-blue-100">
              Technische Hinweise
            </h2>
            <div className="space-y-4 text-lg text-blue-800 dark:text-blue-200">
              <p>
                <strong>Für beste Erfahrung:</strong>
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Verwenden Sie einen modernen Browser</li>
                <li>Stellen Sie sicher, dass Videos abgespielt werden können</li>
                <li>Für Videotelefon: Stabile Internetverbindung erforderlich</li>
                <li>Kamera und Mikrofon müssen aktiviert sein</li>
              </ul>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Diese Seite bietet Informationen in Deutscher Gebärdensprache (DGS). 
            Stand: Dezember 2024
          </p>
        </div>

      </div>
    </div>
  );
} 