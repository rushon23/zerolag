import Link from "next/link";
import { Linkedin, Instagram } from "lucide-react";
import { XLogo } from "./ui/ui-components"; // Assuming these are in your project
import { Logo } from "./logo";               // Assuming these are in your project

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Logo and Socials */}
          <div>
            <Link href="/" className="flex items-center mb-6">
              <Logo size="medium" />
            </Link>
            <p className="text-gray-400 mb-6">
              Building highly scalable software applications with AI-driven processes and automated agents.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/Zero_lag_tech"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="Follow us on X"
              >
                <XLogo />
              </a>
              <a
                href="https://www.linkedin.com/in/zero-lag-22b954361/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-gray-300" />
              </a>
              <a
                href="#" // Add your Instagram link here
                className="bg-gray-800 p-2 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5 text-gray-300" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Navigation</h3>
            <div className="grid grid-cols-2 gap-x-8">
              <ul className="space-y-4">
                <li><Link href="/#about" className="text-gray-400 hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/#services" className="text-gray-400 hover:text-primary transition-colors">Services</Link></li>
                <li><Link href="/#previous-projects" className="text-gray-400 hover:text-primary transition-colors">Previous Projects</Link></li>
                <li><Link href="/#process" className="text-gray-400 hover:text-primary transition-colors">Process</Link></li>
              </ul>
              <ul className="space-y-4">
                <li><Link href="/#team" className="text-gray-400 hover:text-primary transition-colors">Team</Link></li>
                <li><Link href="/#testimonials" className="text-gray-400 hover:text-primary transition-colors">Testimonials</Link></li>
                <li><Link href="/#contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Legal Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ZeroLag.tech. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
