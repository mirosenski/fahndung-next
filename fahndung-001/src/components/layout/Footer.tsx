import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo und Beschreibung */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <span className="text-sm font-bold text-gray-900">BW</span>
              </div>
              <span className="text-xl font-bold">
                Polizei Baden-Württemberg
              </span>
            </div>
            <p className="mb-4 text-gray-300">
              Die Polizei Baden-Württemberg setzt sich für die Sicherheit der
              Bürger ein. Diese Plattform dient der Unterstützung bei Fahndungen
              und der Aufklärung von Straftaten.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <span className="sr-only">Facebook</span>
                📘
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <span className="sr-only">Instagram</span>
                📷
              </a>
            </div>
          </div>

          {/* Wichtige Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Wichtige Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/hilfe"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  Hilfe & FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/impressum"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Kontakt</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <span className="font-medium">Notruf:</span> 110
              </li>
              <li className="text-gray-300">
                <span className="font-medium">E-Mail:</span> info@polizei-bw.de
              </li>
              <li className="text-gray-300">
                <span className="font-medium">Adresse:</span>
                <br />
                Polizeipräsidium
                <br />
                Baden-Württemberg
                <br />
                70173 Stuttgart
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Polizei Baden-Württemberg. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
