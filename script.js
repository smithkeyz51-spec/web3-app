// script.js

// Your Render backend URL
const backendUrl = "https://web3-backend-7xoj.onrender.com";

// ------------------ LOGIN FUNCTION ------------------
async function login(wallet) {
  try {
    const res = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet })
    });
    const data = await res.json();
    console.log("Login response:", data);
    alert(`Welcome ${wallet}! You have ${data.points} points.`);
  } catch (err) {
    console.error(err);
    alert("Login failed. Try again!");
  }
}

// ------------------ CLAIM AIRDROP FUNCTION ------------------
async function claim(wallet) {
  try {
    const res = await fetch(`${backendUrl}/claim`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet })
    });
    const data = await res.json();
    console.log("Claim response:", data);
    alert(`Airdrop claimed! You now have ${data.points} points.`);
  } catch (err) {
    console.error(err);
    alert("Claim failed. Try again!");
  }
}

// ------------------ GET USER DATA FUNCTION ------------------
async function getUser(wallet) {
  try {
    const res = await fetch(`${backendUrl}/user/${wallet}`);
    const data = await res.json();
    console.log("User data:", data);
    alert(`User: ${wallet}\nPoints: ${data.points}\nTasks Completed: ${data.tasksCompleted}`);
  } catch (err) {
    console.error(err);
    alert("Failed to get user data.");
  }
}

// ------------------ BUTTON EVENT LISTENERS ------------------
document.querySelector("#login-btn")?.addEventListener("click", () => {
  const wallet = prompt("Enter your wallet address:");
  if (wallet) login(wallet);
});

document.querySelector("#claim-btn")?.addEventListener("click", () => {
  const wallet = prompt("Enter your wallet address:");
  if (wallet) claim(wallet);
});

document.querySelector("#get-user-btn")?.addEventListener("click", () => {
  const wallet = prompt("Enter your wallet address:");
  if (wallet) getUser(wallet);
});
