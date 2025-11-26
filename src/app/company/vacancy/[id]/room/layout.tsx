export default function RoomConnectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>This is room connection header</header>
      <main>{children}</main>
    </>
  );
}
