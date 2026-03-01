import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
// import { title } from "process";
import {Roboto} from "next/font/google" 

export const metadata: Metadata = {
  title: 'NoteHub',
  description: "A simple and efficient app for creating and organizing your notes.",
  openGraph: {
    type: "website",
    url: "https://notehub.com", //link na vercel
    title: "NoteHub",
    description: "A simple and efficient app for creating and organizing your notes.",
    //для презентабельності
    siteName: "NoteHub", //can change it depends what do we want to include here
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 600,
      height: 300,
      alt: "note image"
     }]
}
}

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'], 
  weight: ['400', '700'],
  display: 'swap', 
});
  
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
          <div id="modal-root"></div>
        </TanStackProvider>
      </body>
    </html>
  );
}
