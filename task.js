const password = document.getElementById("password");
const blue= document.getElementById("blue");
const strengthBar = document.getElementById("strength");
const strengthText = document.getElementById("strengthText");
const message = document.getElementById("message");

// Show/Hide Password
blue.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        blue.textContent = "Hide";
    } else {
        password.type = "password";
        blue.textContent = "Show";
    }
});

// Password Checker
password.addEventListener("input", () => {
    const value = password.value;

    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);

    let missing = [];

    if (value.length < 8)
        missing.push("at least 8 characters");

    if (!hasUpper)
        missing.push("uppercase letter");

    if (!hasLower)
        missing.push("lowercase letter");

    if (!hasNumber)
        missing.push("number");

    if (!hasSpecial)
        missing.push("special character");

    // Weak
    if (value.length < 6) {
        strengthText.textContent = "Strength: Weak";
        strengthBar.style.width = "33%";
        strengthBar.style.background = "red";
        message.textContent = "Password is too short.";
    }

    // Medium
    else if (value.length >= 6 &&
             /[A-Za-z]/.test(value) &&
             /[0-9]/.test(value) &&
             !(hasUpper && hasLower && hasSpecial && value.length >= 8)) {

        strengthText.textContent = "Strength: Medium";
        strengthBar.style.width = "66%";
        strengthBar.style.background = "orange";

        if (missing.length > 0)
            message.textContent = "Missing: " + missing.join(", ");
        else
            message.textContent = "";
    }

    // Strong
    else if (
        value.length >= 8 &&
        hasUpper &&
        hasLower &&
        hasNumber &&
        hasSpecial
    ) {
        strengthText.textContent = "Strength: Strong";
        strengthBar.style.width = "100%";
        strengthBar.style.background = "green";
        message.textContent = "Excellent! Your password is secure.";
    }

    // Otherwise Medium
    else {
        strengthText.textContent = "Strength: Medium";
        strengthBar.style.width = "66%";
        strengthBar.style.background = "orange";
        message.textContent = "Missing: " + missing.join(", ");
    }

    // Empty Input
    if (value.length === 0) {
        strengthText.textContent = "Strength:";
        strengthBar.style.width = "0%";
        message.textContent = "";
    }
});