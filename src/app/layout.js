import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import { ThemeProvider } from "./components/shared/ThemeProvider";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "StudioSpace | Find Your Creative Space",
  description:
    "Discover and book creative studios, photography spaces, podcast rooms and more with StudioSpace.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster
            richColors
            position="top-right"
            duration={3000}
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
