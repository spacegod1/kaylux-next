
import "./globals.css";
import { Inter, Space_Grotesk, Rajdhani, Italiana } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-space-grotesk'
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-rajdhani'
})

const italiana = Italiana({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-italiana'
})

export const metadata = {
  title: "KayLux",
  description: "Interior Design & Architecture Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${rajdhani.variable} ${italiana.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
