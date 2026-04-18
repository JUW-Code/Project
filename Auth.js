document.addEventListener("DOMContentLoaded", () => {
    // --- Authentication Logic ---
    const navbarAuth = document.getElementById("navbarAuth");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    
    const savedUser = localStorage.getItem("userName");

    const updateAuthUI = (name) => {
        if (name) {
            if (navbarAuth) {
                navbarAuth.innerHTML = `
                    <li class="nav-item">
                        <span class="nav-link">Welcome, ${name} 👋</span>
                    </li>
                    <li class="nav-item">
                        <button id="logoutBtn" class="btn btn-outline-danger ms-2 btn-sm">Logout</button>
                    </li>
                `;
                document.getElementById("logoutBtn")?.addEventListener("click", () => {
                    localStorage.removeItem("userName");
                    updateAuthUI(null);
                    alert("You have logged out!");
                });
            }
        } else {
            if (navbarAuth) {
                navbarAuth.innerHTML = `
                    <li class="nav-item">
                        <button class="btn btn-link nav-link me-2" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#signupModal">Sign Up</button>
                    </li>
                `;
            }
        }
    };

    updateAuthUI(savedUser);

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            if (email && password) {
                alert("Login successful!");
                localStorage.setItem("userName", email.split('@')[0]);
                updateAuthUI(email.split('@')[0]);
                const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
                modal?.hide();
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("signupName").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;

            if (name && email && password) {
                alert("Signup successful!");
                localStorage.setItem("userName", name);
                updateAuthUI(name);
                const modal = bootstrap.Modal.getInstance(document.getElementById("signupModal"));
                modal?.hide();
            }
        });
    }

    // --- Course Filtering Logic ---
    const searchBar = document.getElementById("searchBar") || document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const courses = document.querySelectorAll(".course-card, .card");

    const filterCourses = () => {
        const searchText = searchBar?.value.toLowerCase() || "";
        const selectedCategory = categoryFilter?.value || "all";

        courses.forEach(course => {
            // Some cards use h3, some use .card-title (h5)
            const titleElement = course.querySelector("h3") || course.querySelector(".card-title");
            if (!titleElement) return;

            const title = titleElement.textContent.toLowerCase();
            const category = course.getAttribute("data-category");

            const matchesSearch = title.includes(searchText);
            const matchesCategory = (selectedCategory === "all" || category === selectedCategory);

            if (matchesSearch && matchesCategory) {
                course.style.display = "block";
                course.closest('.col-md-4')?.classList.remove('d-none');
            } else {
                course.style.display = "none";
                course.closest('.col-md-4')?.classList.add('d-none');
            }
        });
    };

    if (searchBar) {
        searchBar.addEventListener("input", filterCourses);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterCourses);
    }

    // --- Back to Top Logic ---
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "flex";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // --- Scroll Effects (Progress & Reveal) ---
    const scrollProgress = document.getElementById("scroll-progress");
    const reveals = document.querySelectorAll(".reveal");

    const handleScroll = () => {
        // Progress Bar
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;
        const progress = (scrollPosition / scrollTotal) * 100;
        if (scrollProgress) scrollProgress.style.width = `${progress}%`;

        // Reveal Animation
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 150;

            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add("active");
            }
        });

        // Navbar Scrolled State
        const navbar = document.getElementById("mainNav");
        if (window.scrollY > 50) {
            navbar?.classList.add("scrolled");
        } else {
            navbar?.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
});