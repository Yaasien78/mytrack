// CLIENT ID My Track
Pi.init({ 
  version: "2.0", 
  sandbox: true,
  clientId: "MU0h1YCvr5HMSJdt_iNaR7YPv0T4qV7MtUnv5uGUz48" 
});

async function login() {
  try {
    const scopes = ['username', 'payments'];
    const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
    document.getElementById("user").innerText = "Halo, " + auth.user.username;
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
    onReadyForServerApproval: async function(paymentId) {
      document.getElementById("status").innerText = "Menunggu persetujuan server...";
      await fetch("/api/payments/approve", { // <-- TAMBAH /payments
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ paymentId })
      });
    },
    onReadyForServerCompletion: async function(paymentId, txid) {
      await fetch("/api/payments/complete", { // <-- TAMBAH /payments
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ paymentId, txid })
      });
      document.getElementById("status").innerText = "Pembayaran Sukses! Tx: " + txid;
    },
    onCancel: function(paymentId) { alert("Pembayaran dibatalkan"); },
    onError: function(error) { alert("Error: " + error); }
  };

  Pi.createPayment(paymentData, callbacks);
}

function onIncompletePaymentFound(payment) {
  console.log("Pembayaran belum selesai:", payment);
                  }
