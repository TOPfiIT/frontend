export default function PrivacyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>This is privacy page header</header>
        <main>{children}</main>
      </body>
    </html>
  );
}
