const USERS_KEY = "gameverseUsers";
const SESSION_KEY = "gameverseCurrentUser";

// Get all registered users
export function getUsers() {
    try {
        const users = JSON.parse(
            localStorage.getItem(USERS_KEY) || "{}"
        );

        return users && typeof users === "object" && !Array.isArray(users)
            ? users
            : {};

    } catch {
        return {};
    }
}

// Get the current logged-in user
export function getCurrentUser() {
    const currentUser = localStorage.getItem(SESSION_KEY);
    const users = getUsers();

    // Remove invalid sessions
    if (!currentUser || !users[currentUser]) {
        localStorage.removeItem(SESSION_KEY);
        return null;
    }

    return currentUser;
}

// Notify components when login/logout changes
function notifyAuthChange() {
    window.dispatchEvent(new Event("gameverseAuthChange"));
}

// Register a new account
export function signup(id, password) {
    const normalizedId = id.trim().toLowerCase();

    if (!normalizedId || !password) {
        return {
            success: false,
            message: "Please enter an ID and password.",
        };
    }

    if (normalizedId.length < 3) {
        return {
            success: false,
            message: "ID must contain at least 3 characters.",
        };
    }

    if (password.length < 6) {
        return {
            success: false,
            message: "Password must contain at least 6 characters.",
        };
    }

    const users = getUsers();

    if (users[normalizedId]) {
        return {
            success: false,
            message: "This ID already exists. Please log in.",
        };
    }

    users[normalizedId] = {
        id: normalizedId,
        password,
        theme: "dark",
    };

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(SESSION_KEY, normalizedId);

    notifyAuthChange();

    return {
        success: true,
        message: "Account created successfully!",
    };
}

// Login to an existing account
export function login(id, password) {
    const normalizedId = id.trim().toLowerCase();
    const users = getUsers();

    const user = users[normalizedId];

    if (!user) {
        return {
            success: false,
            message: "Account not found. Please sign up.",
        };
    }

    if (user.password !== password) {
        return {
            success: false,
            message: "Incorrect password.",
        };
    }

    localStorage.setItem(SESSION_KEY, normalizedId);

    notifyAuthChange();

    return {
        success: true,
        message: "Login successful!",
    };
}

// Logout without deleting the account
export function logout() {
    localStorage.removeItem(SESSION_KEY);

    document.body.classList.remove("light-theme");

    notifyAuthChange();
}

// Get the logged-in user's saved theme
export function getUserTheme() {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        return "dark";
    }

    const users = getUsers();

    return users[currentUser]?.theme || "dark";
}

// Save the theme for the current account
export function saveUserTheme(theme) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        return false;
    }

    const users = getUsers();

    if (!users[currentUser]) {
        return false;
    }

    users[currentUser].theme = theme;

    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return true;
}
