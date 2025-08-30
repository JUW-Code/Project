console.log("script.js loaded ");
// SIGNUP

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!name || !email || !password) {
      document.getElementById("signupMessage").textContent = "All fields are required!";
      return;
    }

    // Save user in localStorage
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    document.getElementById("signupMessage").textContent = "Signup successful! You can now log in.";

    signupForm.reset();
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      document.getElementById("loginMessage").style.color = "green";
      document.getElementById("loginMessage").textContent = "Login successful!";

      // Store login status
      localStorage.setItem("isLoggedIn", "true");

      // Show welcome message in navbar
      const nav = document.querySelector(".navbar-nav");
      if (nav) {
        nav.innerHTML =`<li class="nav-item"><span class="nav-link">👋 Welcome, ${storedUser.name}</span></li>
        <li class="nav-item"><button class="btn btn-danger ms-2" onclick="logout()">Logout</button></li>
        `;
      }

      loginForm.reset();
    } else {
      document.getElementById("loginMessage").textContent = "Invalid email or password!";
    }
  });
}
window.addEventListener("DOMContentLoaded", () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (storedUser && isLoggedIn === "true") {
    const nav = document.querySelector(".navbar-nav");
    if (nav) {
      nav.innerHTML = `<li class="nav-item"><span class="nav-link">👋 Welcome, ${storedUser.name}</span></li>
      <li class="nav-item"><button class="btn btn-danger ms-2" onclick="logout()">Logout</button></li>
      `;
    }
  }
});

//logout
if (storedUser && storedUser.email === email && storedUser.password === password) {
  document.getElementById("loginMessage").style.color = "green";
  document.getElementById("loginMessage").textContent = "Login successful!";

  localStorage.setItem("isLoggedIn", "true");

  const nav = document.getElementById("navMenu");
  if (nav) {
    nav.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
      <li class="nav-item"><a class="nav-link" href="courses.html">Courses</a></li>
      <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
      <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
      <li class="nav-item"><span class="nav-link">👋 Welcome, ${storedUser.name}</span></li>
      <li class="nav-item"><button class="btn btn-danger ms-2" onclick="logout()">Logout</button></li>
    `;
  }

  loginForm.reset();
}
window.addEventListener("DOMContentLoaded", () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (storedUser && isLoggedIn === "true") {
    const nav = document.getElementById("navMenu");
    if (nav) {
      nav.innerHTML = `
        <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="courses.html">Courses</a></li>
        <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
        <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
        <li class="nav-item"><span class="nav-link">👋 Welcome, ${storedUser.name}</span></li>
        <li class="nav-item"><button class="btn btn-danger ms-2" onclick="logout()">Logout</button></li>
      `;
    }
  }
});
function logout(){
  localStorage.removeItem("isLoggedIn");
  location.reload();
}

//PROTECT COURSE-DETAILS PAGE
window.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if(window.location.pathname.includes("course-details.html")){
    if(isLoggedIn !== "true") {
      alert("You must log in to view this course!");
      window.location.href = "index.html";
    }
  }
})
