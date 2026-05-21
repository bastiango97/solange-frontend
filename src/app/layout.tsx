import Navbar from "@/components/Navbar";
import "@/app/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* Se muestra en todas las páginas */}
        {children}
      </body>
    </html>
  );
}
