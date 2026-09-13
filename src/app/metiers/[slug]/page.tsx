import { MetierScreen } from "@/components/metier-screen";
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <MetierScreen key={slug} slug={slug} />;
}
