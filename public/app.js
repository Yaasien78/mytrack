// CLIENT ID My Track
Pi.init({ version: "2.0", sandbox: true }); // sandbox true dulu buat testing

async function login() {
  try {
    const scopes = ['username', 'payments'];
    const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
    document.getElementById("user").innerText = "Halo, " + auth.user.username + " ✅";
    console.log("Auth sukses:", auth);
  } catch (err) {
    alert("Login gagal: " + err);
  }
}

async function bayar() {
  const paymentData = {
    amount: 1,
    memo: "Test Pembayaran My Track",
    metadata: { product: "Test Item" }
  };

  const callbacks = {
    onReadyForServerApproval: function(paymentId) {
      document.getElementById("status").innerText = "Menunggu persetujuan server...";
      console.log("PaymentID:", paymentId);
      // Nanti kirim ke server.js
    },
    onReadyForServerCompletion: function(paymentId, txid) {
      document.getElementById("status").innerText = "Pembayaran Sukses! TxID: " + txid;
    },
    onCancel: function(paymentId) { alert("Pembayaran dibatalkan"); },
    onError: function(error) { alert("Error: " + error); }
  };

  Pi.createPayment(paymentData, callbacks);
}

function onIncompletePaymentFound(payment) {
  console.log("Ada pembayaran belum selesai:", payment);
        }
