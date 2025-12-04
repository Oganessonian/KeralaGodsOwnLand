//for login/signup form modal//

// Check if user is logged in when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateLoginState();
});

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    
    if (name && email) {
        // Store user data
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('isLoggedIn', 'true');
        
        alert(`Welcome ${name}! You are now logged in.`);
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
        
        // Update UI
        updateLoginState();
    }
});

// Function to update login state
function updateLoginState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginLink = document.querySelector('[aria-label="login/signupPage"]');
    
    if (isLoggedIn) {
        const userName = localStorage.getItem('userName');
        const firstName = userName.split(' ')[0];
        loginLink.innerHTML = `Welcome, ${firstName}! <small>(logout)</small>`;
        loginLink.href = "#";
        loginLink.onclick = logout;
    } else {
        loginLink.innerHTML = "Login/Signup";
        loginLink.setAttribute('data-bs-toggle', 'modal');
        loginLink.setAttribute('data-bs-target', '#loginModal');
        loginLink.onclick = null;
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isLoggedIn');
        updateLoginState();
        alert('You have been logged out successfully.');
    }
    return false; // Prevent default link behavior
}
// Add ESC key listener for logout
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && localStorage.getItem('isLoggedIn') === 'true') {
        if (confirm('Press OK to logout, or Cancel to stay logged in.')) {
            logout();
        }
    }
});