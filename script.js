document.addEventListener("DOMContentLoaded", () => {
  const backendUrl = "https://web3-backend-7xoj.onrender.com";

  // Connect Wallet button
  document.querySelector(".center button")?.addEventListener("click", async () => {
    const wallet = prompt("Enter your wallet address:");
    if (!wallet) return;

    try {
      const res = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet })
      });
      const data = await res.json();
      alert(`Welcome ${wallet}! You have ${data.points} points.`);
    } catch (err) {
      console.error(err);
      alert("Login failed. Try again!");
    }
  });

  // Footer nav buttons
  const navItems = document.querySelectorAll("nav span");
  navItems.forEach((item) => {
    const text = item.textContent.trim().toLowerCase();

    if (text === "wallet") {
      item.addEventListener("click", async () => {
        const wallet = prompt("Enter your wallet address:");
        if (!wallet) return;

        const res = await fetch(`${backendUrl}/user/${wallet}`);
        const data = await res.json();
        alert(`Wallet: ${wallet}\nPoints: ${data.points}\nTasks Completed: ${data.tasksCompleted}`);
      });
    } else if (text === "airdrop") {
      item.addEventListener("click", async () => {
        const wallet = prompt("Enter your wallet address:");
        if (!wallet) return;

        const res = await fetch(`${backendUrl}/claim`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wallet })
        });
        const data = await res.json();
        alert(`Airdrop claimed! Points: ${data.points}`);
      });
    }
  });
});
