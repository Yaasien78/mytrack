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
      <head>
        <script src="https://sdk.minepi.com/pi-sdk.js" async defer></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
