
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import CreateListingModal from "./modals/CreateListingModal";
import FilterModal from "./modals/FilterModal";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "temubnb",
  description: "simple clone of airbnb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />

        <div className='  mt-18  lg:mt-24 px-4 md:px-20 py-2'>
          {children}
        </div>
        <RegisterModal />
        <LoginModal />
        <Toaster/>
        <CreateListingModal/>
         <FilterModal/>
      </body>
    </html>
  );
}
