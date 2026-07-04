Pi.init({ version: "2.0", sandbox: true, clientId: "MU0h1YCvr5HMSJdt_iNaR7YPv0T4qV7MtUnv5uGUz48" });

window.login = async function() {
  try {
    const auth = await Pi.authenticate(['username', 'payments']);
    document.getElementById("user").innerText = "Halo, " + auth.user.username;
  } catch(e) { alert(e) }
}

window.bayar = async function() {
  const paymentData = { amount: 1, memo: "Test MyTrack", metadata: {product:"test"} };
  const callbacks = {
    onReadyForServerApproval: async (paymentId) => {
      document.getElementById("status").innerText = "Status: Approve...";
      await fetch("/api/payments/approve", {
        method: "POST", headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ paymentId })
      });
    },
    onReadyForServerCompletion: async (paymentId, txid) => {
      document.getElementById("status").innerText = "Status: Complete...";
      await fetch("/api/payments/complete", {
        method: "POST", headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ paymentId, txid })
      });
      document.getElementById("status").innerText = "SUKSES! Tx: " + txid;
    },
    onError: (err) => { document.getElementById("status").innerText = "Error: " + err }
  };
  Pi.createPayment(paymentData, callbacks);
}
