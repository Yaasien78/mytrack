Pi.init({ version: "2.0", sandbox: true, clientId: "MU0h1YCvr5HMSJdt_iNaR7YPv0T4qV7MtUnv5uGUz48" });

async function login() {
  const auth = await Pi.authenticate(['username', 'payments']);
  document.getElementById("user").innerText = "Halo " + auth.user.username;
}

async function bayar() {
  Pi.createPayment({amount: 1, memo: "Test", metadata: {}}, {
    onReadyForServerApproval: async (paymentId) => {
      document.getElementById("status").innerText = "Approve...";
      await fetch("/api/payments/approve", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId})});
    },
    onReadyForServerCompletion: async (paymentId, txid) => {
      await fetch("/api/payments/complete", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId, txid})});
      document.getElementById("status").innerText = "SUKSES! " + txid;
    },
    onError: (e) => alert("Error: " + e)
  });
}
