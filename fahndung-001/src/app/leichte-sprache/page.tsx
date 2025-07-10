"use client";

import React from 'react';
import Link from 'next/link';

export default function LeichteSprachePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-blue-900 dark:text-blue-100">
            Willkommen bei der Polizei Baden-Württemberg
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Diese Seite ist in Leichter Sprache geschrieben.
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
          
          {/* Was ist diese Seite? */}
          <section className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Was ist diese Seite?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Diese Seite ist von der Polizei Baden-Württemberg. 
              Hier können Sie nach vermissten Personen suchen. 
              Und nach Zeugen für Verbrechen.
            </p>
          </section>

          {/* Wie können Sie helfen? */}
          <section className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Wie können Sie helfen?
            </h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <p>
                Wenn Sie etwas gesehen haben, können Sie der Polizei helfen.
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Haben Sie eine vermisste Person gesehen?</li>
                <li>Waren Sie Zeuge bei einem Verbrechen?</li>
                <li>Haben Sie wichtige Informationen?</li>
              </ul>
              <p>
                Dann melden Sie sich bei der Polizei. 
                Jede Information kann wichtig sein.
              </p>
            </div>
          </section>

          {/* Wie funktioniert die Suche? */}
          <section className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Wie funktioniert die Suche?
            </h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <p>
                Auf der Startseite sehen Sie alle aktuellen Fahndungen.
              </p>
              <p>
                Sie können nach verschiedenen Dingen suchen:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Nach dem Ort, wo etwas passiert ist</li>
                <li>Nach dem Datum</li>
                <li>Nach der Art des Verbrechens</li>
              </ul>
              <p>
                Geben Sie einfach ein Wort in die Suchleiste ein.
              </p>
            </div>
          </section>

          {/* Kontakt */}
          <section className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Kontakt zur Polizei
            </h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <p>
                Wenn Sie Informationen haben, können Sie sich melden:
              </p>
              <div className="space-y-2">
                <p><strong>Telefon:</strong> 110 (Notruf)</p>
                <p><strong>E-Mail:</strong> info@polizei-bw.de</p>
                <p><strong>Adresse:</strong> Polizeipräsidium Baden-Württemberg</p>
              </div>
              <p>
                Sie können auch direkt zur Polizei gehen.
              </p>
            </div>
          </section>

          {/* Wichtige Hinweise */}
          <section className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <h2 className="mb-4 text-2xl font-bold text-blue-900 dark:text-blue-100">
              Wichtige Hinweise
            </h2>
            <div className="space-y-4 text-lg text-blue-800 dark:text-blue-200">
              <p>
                <strong>Bitte beachten Sie:</strong>
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Geben Sie nur echte Informationen weiter</li>
                <li>Ihre Daten werden vertraulich behandelt</li>
                <li>Sie können anonym bleiben</li>
                <li>Bei Gefahr rufen Sie sofort 110 an</li>
              </ul>
            </div>
          </section>

          {/* Weitere Hilfe */}
          <section className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Weitere Hilfe
            </h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <p>
                Wenn Sie weitere Hilfe brauchen:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link 
                  href="/hilfe"
                  className="block rounded-lg border-2 border-blue-600 p-4 text-center text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                >
                  Hilfe-Seite
                </Link>
                <Link 
                  href="/gebaerdensprache"
                  className="block rounded-lg border-2 border-green-600 p-4 text-center text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20"
                >
                  Gebärdensprache
                </Link>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Diese Seite wurde in Leichter Sprache geschrieben. 
            Stand: Dezember 2024
          </p>
        </div>

      </div>
    </div>
  );
} 