import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'NFT Social',
  description: 'Pi NFT App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      
      {/* Pi SDK taruh paling bawah */}
      <Script 
        src="https://sdk.minepi.com/pi-sdk.js" 
        strategy="afterInteractive" 
      />
    </html>
  )
}
