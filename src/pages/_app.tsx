
import type { AppProps } from 'next/app'
import "../styles/global.css";
import { Noto_Sans } from 'next/font/google'

const NotoSans = Noto_Sans({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable:'--font-noto'
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${NotoSans.variable} font-sans`}>
       <Component {...pageProps} />
    </main>
  )
}
