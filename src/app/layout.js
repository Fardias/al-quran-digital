import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AL-QURAN DIGITAL - Baca Al-Quran Online',
  description: 'Baca Al-Quran digital dengan terjemahan bahasa Indonesia. Akses 114 surat Al-Quran lengkap dengan fitur pencarian dan navigasi yang mudah.',
  keywords: 'Al-Quran, Quran Digital, Baca Quran Online, Al-Quran Online, Terjemahan Al-Quran, Quran Indonesia',
  authors: [{ name: 'Quran Digital' }],
  creator: 'Quran Digital',
  publisher: 'Quran Digital',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'AL-QURAN DIGITAL - Baca Al-Quran Online',
    description: 'Baca Al-Quran digital dengan terjemahan bahasa Indonesia. Akses 114 surat Al-Quran lengkap dengan fitur pencarian dan navigasi yang mudah.',
    url: 'https://quran-digital.vercel.app',
    siteName: 'AL-QURAN DIGITAL',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AL-QURAN DIGITAL - Baca Al-Quran Online',
    description: 'Baca Al-Quran digital dengan terjemahan bahasa Indonesia. Akses 114 surat Al-Quran lengkap dengan fitur pencarian dan navigasi yang mudah.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification', // Add your Google Search Console verification code
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1e293b" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AL-QURAN DIGITAL" />
      </head>
      <body className={inter.className}>
        <Navbar/>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
