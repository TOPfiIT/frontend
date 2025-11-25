export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>This is registration header (layout)</header>
        <main>{children}</main>
      </body>
    </html>
  );
}
