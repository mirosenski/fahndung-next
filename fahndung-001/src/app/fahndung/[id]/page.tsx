import Link from 'next/link';

interface FahndungDetailProps {
  params: Promise<{ id: string }>
}

export default async function FahndungDetail({ params }: FahndungDetailProps) {
  const { id } = await params;
  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Fahndung #{id}</h1>
      <p>Hier könnten Details zur Fahndung mit der ID <b>{id}</b> stehen.</p>
      <Link href="/fahndung" className="inline-block mt-6 text-blue-600 underline hover:text-blue-800">Zurück zur Übersicht</Link>
    </div>
  );
} 