export default function RoomConnectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>This is room connection header</header>
        <main>{children}</main>
      </body>
    </html>
  );
}
