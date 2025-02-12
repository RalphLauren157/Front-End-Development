document.addEventListener("DOMContentLoaded", function() {
    const formTitle = document.getElementById("form-title");
    const confirmPasswordGroup = document.getElementById("confirm-password-group");
    const authBtn = document.querySelector(".auth-btn");
    const toggleForm = document.getElementById("toggle-login");
    const emailField = document.getElementById("email");
    const directLogin = document.getElementById("direct-login");

    let isSignup = true; // Start with signup mode

    function switchToLogin() {
        formTitle.innerText = "Log In";
        authBtn.innerText = "Log In";
        confirmPasswordGroup.style.display = "none";
        toggleForm.innerText = "Don't have an account? Sign Up";
        emailField.style.display = "none"; //hide email and confirm password in login mode
        isSignup = false;
    }

    // Toggle between Sign Up and Log In
    toggleForm.addEventListener("click", () => {
        if (isSignup) {switchToLogin();} 
        else {
            formTitle.innerText = "Sign Up";
            authBtn.innerText = "Sign Up";
            confirmPasswordGroup.style.display = "block";
            emailField.style.display = "block"; // Show email field for signup
            toggleForm.innerText = "Already have an account? Log In";
            isSignup = true;
        }
    });

    //Direct log in 
    if (window.location.href.includes("login.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("mode") === "login") {
            switchToLogin();
        }
    }
    // Modify the Sign In button to add "?mode=login" to the URL
    directLogin.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default link action
    window.location.href = "login.html?mode=login"; // Reload with login mode
    });

    const sample = [{
            username: "user123",
            password: "securePassword123"}
    ];
});