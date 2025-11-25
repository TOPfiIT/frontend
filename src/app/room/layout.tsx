export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>This is room header (layout)</header>
        <main>{children}</main>
      </body>
    </html>
  );
}
