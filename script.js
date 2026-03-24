// script.js

const backendUrl = "https://web3-backend-7xoj.onrender.com";

// ------------------ CONNECT WALLET FUNCTION ------------------
async function connectWallet() {
  const wallet = prompt("Enter your wallet address:");
  if (!wallet) return;

  // Login or create user
  try {
    const res = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet })
    });
    const user = await res.json();
    console.log("Login:", user);
    alert(`Welcome ${wallet}! You have ${user.points} points.`);
  } catch (err) {
    console.error(err);
    alert("Login failed. Try again!");
  }
}

// ------------------ CLAIM AIRDROP FUNCTION ------------------
async function claimAirdrop() {
  const wallet = prompt("Enter your wallet address:");
  if (!wallet) return;

  try {
    const res = await fetch(`${backendUrl}/claim`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet })
    });
    const data = await res.json();
    console.log("Claim:", data);
    alert(`Airdrop claimed! You now have ${data.points} points.`);
  } catch (err) {
    console.error(err);
    alert("Airdrop failed. Try again!");
  }
}

// ------------------ GET USER DATA FUNCTION ------------------
async function getUserData() {
  const wallet = prompt("Enter your wallet address:");
  if (!wallet) return;

  try {
    const res = await fetch(`${backendUrl}/user/${wallet}`);
    const data = await res.json();
    console.log("User data:", data);
    alert(`Wallet: ${wallet}\nPoints: ${data.points}\nTasks Completed: ${data.tasksCompleted}`);
  } catch (err) {
    console.error(err);
    alert("Failed to get user data.");
  }
}

// ------------------ HOOK BUTTONS ------------------

// Connect Wallet button in your center div
document.querySelector(".center button")?.addEventListener("click", connectWallet);

// Footer nav buttons
const navItems = document.querySelectorAll("nav span");
navItems.forEach((item) => {
  const text = item.textContent.trim().toLowerCase();
  if (text === "wallet") {
    item.addEventListener("click", getUserData);
  } else if (text === "airdrop") {
    item.addEventListener("click", claimAirdrop);
  } 
  // Home and Swap can stay for navigation only
});
