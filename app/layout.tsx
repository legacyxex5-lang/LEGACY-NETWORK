import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = 'https://legacynets.xyz';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Legacy Network — Building Beyond the Ordinary', template: '%s | Legacy Network' },
  description: 'Legacy Network is an independent digital studio founded by Yamagiri, exploring web development, custom software, automation and immersive digital experiences.',
  applicationName: 'Legacy Network',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: siteUrl, siteName: 'Legacy Network', title: 'Legacy Network — Building Beyond the Ordinary', description: 'Building beyond the ordinary through thoughtful engineering and digital experiences.', images: [{ url: '/og-cover.jpg', width: 1200, height: 630, alt: 'Legacy Network digital studio' }] },
  twitter: { card: 'summary_large_image', title: 'Legacy Network — Building Beyond the Ordinary', description: 'Building beyond the ordinary through thoughtful engineering and digital experiences.' },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#080a09' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Organization', name: 'Legacy Network', url: siteUrl,
    description: 'Independent digital studio creating websites, software and digital experiences.',
    founder: { '@type': 'Person', name: 'Yamagiri', jobTitle: 'Founder and Developer' }
  };
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />{children}</body></html>;
}
