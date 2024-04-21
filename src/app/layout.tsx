import ScrollToTop from "@/components/scroll/ScrollToTop";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Providers from "../providers/provider";
import "./globals.css";

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
  ssr: false,
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home",
  description:
    "E-commerce where your business begins, you can list your items and purchase other users's items. Purchase & sell electronics, cars, clothes, collectibles & more on e-commerce, the world's online marketplace. Top brands, low prices & free shipping on many items.",
  verification: {
    google: "h-krulVRrLSSg-fSeJVcQMGF_1XnEb8QYSyYGw6b_t4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-[#f4f4f4]`}>
        <ToastContainer />
        <ScrollToTop />
        <Providers>
          <PostHogPageView />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
