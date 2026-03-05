type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PartPage({ params }: Props) {
  const { slug } = await params;

  const formatted = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold">{formatted}</h1>
      <p className="mt-4 text-white/60">slug: {slug}</p>
    </main>
  );
}