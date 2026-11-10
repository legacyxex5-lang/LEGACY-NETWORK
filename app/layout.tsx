import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = 'https://legacynets.xyz';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Legacy Network — Digital systems for businesses with a long view', template: '%s | Legacy Network' },
  description: 'Legacy Network is a founder-led digital studio designing websites, business systems, and intelligent workflows for ambitious businesses.',
  applicationName: 'Legacy Network',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: siteUrl, siteName: 'Legacy Network', title: 'Legacy Network — Digital systems for businesses with a long view', description: 'Websites, business systems, and intelligent workflows designed with clarity and care.', images: [{ url: '/og-cover.jpg', width: 1200, height: 630, alt: 'Legacy Network digital studio' }] },
  twitter: { card: 'summary_large_image', title: 'Legacy Network — Digital systems for businesses with a long view', description: 'Websites, business systems, and intelligent workflows designed with clarity and care.' },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#080a09' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Organization', name: 'Legacy Network', url: siteUrl,
    description: 'Founder-led digital studio creating websites, business systems, and intelligent workflows.',
    founder: { '@type': 'Person', name: 'Yamagiri', jobTitle: 'Founder and Developer' }
  };
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />{children}</body></html>;
}
