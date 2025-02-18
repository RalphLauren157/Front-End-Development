document.addEventListener("DOMContentLoaded", function() {
    const formTitle = document.getElementById("form-title");
    const confirmPasswordGroup = document.getElementById("confirm-password-group");
    const authBtn = document.querySelector(".auth-btn");
    const toggleForm = document.getElementById("toggle-login");
    const emailField = document.getElementById("email");
    const directLogin = document.getElementById("direct-login");
    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");

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

    //user credentials
    const user = [{
            username: "user123",
            password: "secure123"}
    ];

    //Handle log in
    authBtn.addEventListener("click", function(event) {
        event.preventDefault();

        if (!isSignup) {
            const username = usernameField.value.trim();
            const password = passwordField.value.trim();

            const validUser = user.find(user => user.username === username && user.password === password); //validates the entered details against the sample user details

            if (validUser) {
                alert(`Welcome, ${username}! You are now logged in.`);
                sessionStorage.setItem("loggedInUser", username); //store login status
                window.location.href = "homepage.html";
            } else {
                alert("Incorrect username or password. Please try again.");
                usernameField.value = ""; // Clear username and password field
                passwordField.value = "";
            }
        }
    });
});