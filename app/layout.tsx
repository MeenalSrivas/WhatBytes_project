// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header'; 
import Footer from '../components/Footer';
import { CartProvider } from './context/CartContext'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Logo E-Commerce',
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
         <CartProvider>
        <Header />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
        </CartProvider>
      </body>
    </html>
  );
}