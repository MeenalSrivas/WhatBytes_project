// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header'; // Relative path
import Footer from '../components/Footer'; // Relative path

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Logo E-Commerce', // From image reference
  description: 'High-quality products at the best prices.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-100`}>
        <Header />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}