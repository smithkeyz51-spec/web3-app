async function connectWallet() {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    localStorage.setItem("wallet", accounts[0]);

    window.location.href = "dashboard.html";
  } else {
    alert("Install MetaMask");
  }
}
