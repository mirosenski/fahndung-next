"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900">
                  <span className="text-sm font-bold text-white">BW</span>
                </div>
              </div>
              <h1 className="mt-6 text-6xl font-bold text-gray-900">500</h1>
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                Interner Serverfehler
              </h2>
              <p className="mt-2 text-gray-600">
                Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie
                es später erneut.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={reset}
                className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                Erneut versuchen
              </button>

              <Link
                href="/"
                className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                Zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
