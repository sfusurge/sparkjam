import { Mona_Sans } from 'next/font/google'
import "./globals.css";

const monaSans = Mona_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mona-sans',
})

export const metadata = {
  title: "Sparkjam",
  description: "A design jam created by SFU Surge.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={monaSans.variable}>
      <body>{children}</body>
    </html>
  )
}