import type { AppProps } from 'next/app'
import Script from 'next/script'
import { useEffect, useState } from 'react'

function PiLoader() {
  const [piReady, setPiReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: true });
      setPiReady(true);
    }
  }, []);

  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script 
        src="https://sdk.minepi.com/pi-sdk.js" 
        strategy="afterInteractive"
        onLoad={() => console.log('Pi SDK loaded')}
      />
      <PiLoader />
      <Component {...pageProps} />
    </>
  )
}
