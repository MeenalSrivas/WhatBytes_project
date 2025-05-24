// components/Footer.tsx
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react'; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 pt-12 pb-8"> 
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-sm">
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Filters</h5> 
            <ul className="space-y-2">
              <li><Link href="/products?category=all" className="hover:text-white">All</Link></li>
              <li><Link href="/products?category=electronics" className="hover:text-white">Electronics</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold text-white mb-3">About Us</h5>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center md:text-left">
          <p>&copy; {currentYear} American</p> 
        </div>
      </div>
    </footer>
  );
}