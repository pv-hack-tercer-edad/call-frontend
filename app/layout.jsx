import localFont from "next/font/local";
import "./globals.css";
import "../envConfig";
import Layout from "@/app/layouts/LogoLayout";
import NavBar from "@/app/layouts/NavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Hereda.me",
  description: "Hereda.me for your ❤️ family history",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NavBar />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
