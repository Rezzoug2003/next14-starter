import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import Providers from "./providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Next App Home Page",
    template: "%s | Next.js 14",
  },
  description: "Next.js starter app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOption);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
