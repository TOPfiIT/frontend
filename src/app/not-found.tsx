import "./global.css";
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div className="errorContainer">
          <img className="error" src="/404.svg" alt="404" />
        </div>
      </body>
    </html>
  );
}
