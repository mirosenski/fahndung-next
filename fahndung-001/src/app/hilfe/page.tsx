import Link from "next/link";

export default function HilfePage() {
  const faqs = [
    {
      question: "Wie kann ich eine Fahndung erstellen?",
      answer:
        "Um eine Fahndung zu erstellen, müssen Sie sich zunächst anmelden. Klicken Sie auf 'Anmelden' und verwenden Sie Ihre Dienst-E-Mail-Adresse. Nach der Anmeldung können Sie über das Dashboard eine neue Fahndung erstellen.",
    },
    {
      question: "Welche Informationen benötige ich für eine Fahndung?",
      answer:
        "Für eine Fahndung benötigen Sie: Titel, Kategorie, Ort/Region, detaillierte Beschreibung und optional Kontaktinformationen für Rückfragen.",
    },
    {
      question: "Wie kann ich einen Hinweis geben?",
      answer:
        "Wenn Sie Informationen zu einer Fahndung haben, können Sie diese über die Kontaktinformationen in der jeweiligen Fahndung melden. Bei akuten Notfällen wenden Sie sich bitte direkt an die Notrufnummer 110.",
    },
    {
      question: "Wer kann Fahndungen erstellen?",
      answer:
        "Fahndungen können nur von autorisierten Polizeibeamten erstellt werden. Für die Anmeldung ist eine gültige Dienst-E-Mail-Adresse erforderlich.",
    },
    {
      question: "Wie lange bleiben Fahndungen aktiv?",
      answer:
        "Fahndungen bleiben so lange aktiv, bis sie als gelöst markiert oder archiviert werden. Die Dauer hängt vom Einzelfall ab.",
    },
    {
      question: "Was passiert mit meinen Daten?",
      answer:
        "Ihre Daten werden entsprechend der Datenschutzrichtlinien der Polizei Baden-Württemberg behandelt. Weitere Informationen finden Sie in unserer Datenschutzerklärung.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Hilfe & FAQ</h1>
          <p className="text-xl text-gray-600">
            Häufig gestellte Fragen und Support-Informationen
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mb-8 rounded-lg bg-white shadow-lg">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Häufig gestellte Fragen
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="leading-relaxed text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              Kontakt
            </h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-900">Notruf</p>
                <p className="text-gray-600">110</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">E-Mail</p>
                <p className="text-gray-600">info@polizei-bw.de</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Adresse</p>
                <p className="text-gray-600">
                  Polizeipräsidium Baden-Württemberg
                  <br />
                  70173 Stuttgart
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              Wichtige Hinweise
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <span className="text-lg text-red-600">⚠️</span>
                <p className="text-sm text-gray-600">
                  Bei akuten Notfällen wenden Sie sich bitte direkt an die
                  Notrufnummer 110.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-lg text-blue-600">ℹ️</span>
                <p className="text-sm text-gray-600">
                  Diese Plattform dient der Unterstützung bei laufenden
                  Fahndungen.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-lg text-green-600">🔒</span>
                <p className="text-sm text-gray-600">
                  Alle Daten werden verschlüsselt übertragen und sicher
                  gespeichert.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 rounded-lg bg-white shadow-lg">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Weitere Ressourcen
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Link
                href="/impressum"
                className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
              >
                <span className="mr-3 text-2xl">📄</span>
                <div>
                  <p className="font-medium text-gray-900">Impressum</p>
                  <p className="text-sm text-gray-600">
                    Rechtliche Informationen
                  </p>
                </div>
              </Link>

              <Link
                href="/datenschutz"
                className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
              >
                <span className="mr-3 text-2xl">🔒</span>
                <div>
                  <p className="font-medium text-gray-900">Datenschutz</p>
                  <p className="text-sm text-gray-600">Datenschutzerklärung</p>
                </div>
              </Link>

              <a
                href="https://polizei.baden-wuerttemberg.de"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
              >
                <span className="mr-3 text-2xl">🌐</span>
                <div>
                  <p className="font-medium text-gray-900">Polizei BW</p>
                  <p className="text-sm text-gray-600">Offizielle Website</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
