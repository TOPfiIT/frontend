export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>This is login header (layout)</header>
        <main>{children}</main>
      </body>
    </html>
  );
}
