
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = {
  title: "StudioSpace | Find Your Creative Space",
  description:
    "Discover and book creative studios, photography spaces, podcast rooms and more with StudioSpace.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
