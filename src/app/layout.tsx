import './globals.css';
import { Noto_Serif_JP } from 'next/font/google'

const NotoSerifJP = Noto_Serif_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: true,
});

export const metadata = {
  title: 'Next.js Awesome Memo App',
  description: 'Generated by create-next-app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={NotoSerifJP.className}>{children}</body>
    </html>
  )
}