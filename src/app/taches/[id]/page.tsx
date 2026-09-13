import { TacheScreen } from "@/components/tache-screen";
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ metier?: string | string[] }>;
}) {
  const { id } = await params;
  const { metier } = await searchParams;
  return (
    <TacheScreen
      key={`${id}-${metier}`}
      id={id}
      metier={typeof metier === "string" ? metier.trim() : ""}
    />
  );
}
