export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <footer>Footer: confidential politics</footer>
      </body>
    </html>
  );
}
