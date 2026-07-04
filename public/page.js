export default function Home() {
  return (
    <html>
      <body>
        <h1>My Track - Test Pi Payment</h1>
        <p id="user"></p>
        <button onClick={() => window.login()}>Login</button>
        <button onClick={() => window.bayar()}>Bayar Test 1 Pi</button>
        <p id="status"></p>
        <script src="https://sdk.minepi.com/pi-sdk.js"></script>
        <script src="/app.js"></script>
      </body>
    </html>
  )
}
