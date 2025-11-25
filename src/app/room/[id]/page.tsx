export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: id } = await params;
  return <h1>Room id: {id}</h1>;
}
