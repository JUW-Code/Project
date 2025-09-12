document.addEventListener("DOMContentLoaded", () => {
  const navbarAuth = document.getElementById("navbarAuth");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const savedUser = localStorage.getItem("userName");
  if (savedUser) {
    showWelcome(savedUser);
  } else {
    showAuthButtons();
  }
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (email && password) {
      alert("Login successful!");
      localStorage.setItem("userName", email);
      showWelcome(email);
      const loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
      loginModal.hide();
    }
  });
  function showLoginSignup() {
    navbarAuth.innerHTML = `
    <li class="nav-item">
      <button class="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
    </li>
    <li class="nav-item">
      <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#signupModal">Sign Up</button>
    </li>
  `;
  }
  document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (name && email && password) {
      alert("Signup successful!");
      localStorage.setItem("userName", name);
      showWelcome(name);
      const signupModal = bootstrap.Modal.getInstance(document.getElementById("signupModal"));
      signupModal.hide();
    }
  });
  function showWelcome(name) {
    navbarAuth.innerHTML = `
      <li class="nav-item">
        <span class="nav-link">Welcome, ${name} 👋</span>
      </li>
      <li class="nav-item">
        <button id="logoutBtn" class="btn btn-outline-light ms-2">Logout</button>
      </li>
    `;

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("userName");
      showAuthButtons();
      alert("You have logged out!");
    });
  }
  function showAuthButtons() {
    navbarAuth.innerHTML = `
      <li class="nav-item">
        <button class="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
      </li>
      <li class="nav-item">
        <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#signupModal">Sign Up</button>
      </li>
    `;
  }
});


const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 1, behavior: "smooth" });
});
const searchBar = document.getElementById("searchBar");
    const categoryFilter = document.getElementById("categoryFilter");
    const courses = document.querySelectorAll(".course-card");

    function filterCourses() {
      const searchText = searchBar.value.toLowerCase();
      const category = categoryFilter.value;

      courses.forEach(course => {
        const title = course.querySelector(".card-title").textContent.toLowerCase();
        const matchCategory = category === "all" || course.dataset.category === category;
        const matchSearch = title.includes(searchText);

        if (matchCategory && matchSearch) {
          course.style.display = "block";
        } else {
          course.style.display = "none";
        }
      });
    }

    searchBar.addEventListener("keyup", filterCourses);
    categoryFilter.addEventListener("change", filterCourses);
    const searchInput = document.getElementById("searchInput");
const categoryFilters = document.getElementById("categoryFilter");
const courseCards = document.querySelectorAll(".card");

function filterCourses() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  courseCards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const category = card.getAttribute("data-category");

    const matchesSearch = title.includes(searchText);
    const matchesCategory = (selectedCategory === "all" || category === selectedCategory);

    if (matchesSearch && matchesCategory) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
searchInput.addEventListener("input", filterCourses);
categoryFilter.addEventListener("change", filterCourses); 