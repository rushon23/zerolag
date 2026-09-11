// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import ClientAnimatedLoader from "@/components/ui/ClientAnimatedLoader"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZeroLag - High Performance Web Solutions",
  description: "ZeroLag provides high-performance web solutions with zero compromise on quality or speed.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.onerror = function(message, source, lineno, colno, error) {
                console.error('Global error handler:', { message, source, lineno, colno, error });
                return false;
              };
            `,
          }}
        />
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-M71JKQJGQ9" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M71JKQJGQ9');
          `}
        </Script>
        <Script id="error-handler" strategy="afterInteractive">
          {`
            window.addEventListener('error', function(event) {
              if (event.target && event.target.tagName && ['IMG', 'SCRIPT', 'LINK'].includes(event.target.tagName)) {
                console.warn('Resource error caught:', event.target);
                return false;
              }
            }, true);
          `}
        </Script>
        <Script id="disable-context-menu" strategy="afterInteractive">
          {`
            document.addEventListener('contextmenu', function(e) {
              e.preventDefault();
              return false;
            });

            document.addEventListener('keydown', function(e) {
              if (e.keyCode === 123 || 
                  (e.ctrlKey && e.shiftKey && [73, 67, 74].includes(e.keyCode)) ||
                  (e.ctrlKey && [85, 83].includes(e.keyCode))) {
                e.preventDefault();
                return false;
              }
            });

            document.addEventListener('selectstart', function(e) {
              if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
              }
            });

            document.addEventListener('dragstart', function(e) {
              if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
              }
            });

            document.addEventListener('touchstart', function(e) {
              if (e.touches.length > 1) {
                e.preventDefault();
              }
            });
          `}
        </Script>
        <Script id="schema-org" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "ZeroLag Tech Agency",
              "url": "https://www.zerolag.tech",
              "logo": "https://www.zerolag.tech/logo.png",
              "description": "Elite tech agency providing high performance computing solutions and custom software development by industry experts Samrudh, Suhas, and Chirag.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "founder": [
                { "@type": "Person", "name": "Samrudh" },
                { "@type": "Person", "name": "Suhas" },
                { "@type": "Person", "name": "Chirag" }
              ],
              "sameAs": [
                "https://twitter.com/zerolagtech",
                "https://www.linkedin.com/company/zerolagtech",
                "https://github.com/zerolagtech"
              ],
              "knowsAbout": [
                "High Performance Computing",
                "Software Development",
                "Web Development",
                "Tech Consulting",
                "Cloud Solutions"
              ],
              "serviceType": [
                "Software Development",
                "Web Application Development",
                "Tech Consulting"
              ]
            }
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ClientAnimatedLoader />
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
