import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

// Mock-Funktion für das Laden der Fahndungsdaten
// In der echten Implementierung würde hier ein tRPC-Call oder API-Call stehen
async function fetchFahndung(id: string) {
  // Simuliere API-Call
  return {
    id,
    name: `Fahndung ${id}`,
    // Weitere Fahndungsdaten...
  };
}

export default async function BreadcrumbSlot({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Lade Fahndungsdaten vom Server
  const fahndung = await fetchFahndung(id);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/fahndungen">Fahndungen</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{fahndung.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
} 