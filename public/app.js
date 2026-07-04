Pi.init({ version: "2.0", sandbox: true, clientId: "MU0h1YCvr5HMSJdt_iNaR7YPv0T4qV7MtUnv5uGUz48" });

let currentUser = null;

async function login() {
  const auth = await Pi.authenticate(['username', 'payments']);
  currentUser = auth.user.username;
  document.getElementById("user").innerText = "Halo " + currentUser;
  cekStatus();
}

async function bayar() {
  if(!currentUser) return alert("Login dulu bro");

  // INI LOGIC NYA: BAYAR 0.01 PI UNTUK BUKA PREMIUM
  const paymentData = {
    amount: 0.01, // TESTNET PAKE 0.01
    memo: "Buka Premium MyTrack 30 Hari", 
    metadata: {
      product: "premium_30days",
      user: currentUser
    }
  };

  const callbacks = {
    onReadyForServerApproval: async (paymentId) => {
      document.getElementById("status").innerText = "Status: Menunggu Approve Server...";
      await fetch("/api/payments/approve", {
        method:"POST", 
        headers:{"Content-Type":"application/json"}, 
        body:JSON.stringify({paymentId})
      });
    },
    onReadyForServerCompletion: async (paymentId, txid) => {
      document.getElementById("status").innerText = "Status: Menyelesaikan...";
      await fetch("/api/payments/complete", {
        method:"POST", 
        headers:{"Content-Type":"application/json"}, 
        body:JSON.stringify({paymentId, txid})
      });
      
      // LOGIC SETELAH BAYAR SUKSES
      localStorage.setItem("premium_"+currentUser, Date.now() + 30*24*60*60*1000);
      document.getElementById("status").innerText = "SUKSES! Premium Aktif 30 Hari 🔥 Tx: " + txid;
      cekStatus();
    },
    onError: (e) => { document.getElementById("status").innerText = "Gagal: " + e }
  };
  Pi.createPayment(paymentData, callbacks);
}

// LOGIC CEK APAKAH UDAH PREMIUM
function cekStatus() {
  if(!currentUser) return;
  const exp = localStorage.getItem("premium_"+currentUser);
  if(exp && Date.now() < exp) {
    document.getElementById("status").innerText = "Kamu sudah Premium sampai: " + new Date(parseInt(exp)).toLocaleDateString();
    document.querySelector("button[onclick='bayar()']").style.display = "none";
  } else {
    document.getElementById("status").innerText = "Status: Gratis. Bayar 0.01 Pi untuk Premium";
  }
          }
