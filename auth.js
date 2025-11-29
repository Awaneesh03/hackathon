/**
 * CampusDash Authentication Manager
 * Centralized authentication system for all pages
 */

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.storageKey = 'campusdash_current_user';
        this.init();
    }

    /**
     * Initialize auth state from localStorage
     */
    init() {
        try {
            const userData = localStorage.getItem(this.storageKey);
            if (userData) {
                this.currentUser = JSON.parse(userData);
                console.log('✅ User session restored:', this.currentUser.email);
            }
        } catch (error) {
            console.error('❌ Auth init error:', error);
            this.logout();
        }
    }

    /**
     * Check if user is logged in
     * @returns {boolean}
     */
    isLoggedIn() {
        return this.currentUser !== null;
    }

    /**
     * Require authentication - redirect if not logged in
     * @param {string} redirectUrl - URL to redirect to after login
     */
    requireAuth(redirectUrl = null) {
        if (!this.isLoggedIn()) {
            const returnUrl = redirectUrl || window.location.pathname;
            localStorage.setItem('campusdash_return_url', returnUrl);
            window.location.href = '/login-simple.html';
            return false;
        }
        return true;
    }

    /**
     * Get current user data
     * @returns {object|null}
     */
    getUser() {
        return this.currentUser;
    }

    /**
     * Log in user
     * @param {object} userData - User data to store
     */
    login(userData) {
        this.currentUser = userData;
        localStorage.setItem(this.storageKey, JSON.stringify(userData));
        console.log('✅ User logged in:', userData.email);

        // Check for return URL
        const returnUrl = localStorage.getItem('campusdash_return_url');
        if (returnUrl) {
            localStorage.removeItem('campusdash_return_url');
            window.location.href = returnUrl;
        } else {
            window.location.href = '/index.html';
        }
    }

    /**
     * Log out user
     */
    logout() {
        this.currentUser = null;
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem('campusdash_return_url');
        console.log('✅ User logged out');
        window.location.href = '/index.html';
    }

    /**
     * Update UI elements based on auth state
     */
    updateUI() {
        const loginBtn = document.querySelector('[data-auth="login-btn"]');
        const logoutBtn = document.querySelector('[data-auth="logout-btn"]');
        const userNameEl = document.querySelector('[data-auth="user-name"]');
        const profileBtn = document.querySelector('[data-auth="profile-btn"]');

        if (this.isLoggedIn()) {
            // Show logged-in state
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'block';
            if (userNameEl) userNameEl.textContent = this.currentUser.name || this.currentUser.email;
            if (profileBtn) profileBtn.style.display = 'block';
        } else {
            // Show logged-out state
            if (loginBtn) loginBtn.style.display = 'block';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (userNameEl) userNameEl.textContent = '';
            if (profileBtn) profileBtn.style.display = 'none';
        }
    }

    /**
     * Check if user has a specific role
     * @param {string} role - Role to check (student, dasher, admin)
     * @returns {boolean}
     */
    hasRole(role) {
        return this.isLoggedIn() && this.currentUser.role === role;
    }

    /**
     * Show login required modal
     */
    showLoginRequired() {
        if (confirm('You need to login to access this feature. Go to login page?')) {
            window.location.href = '/login-simple.html';
        }
    }
}

// Create global instance
window.Auth = new AuthManager();

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.Auth.updateUI();

    // Attach logout handler to logout buttons
    document.querySelectorAll('[data-auth="logout-btn"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.Auth.logout();
        });
    });

    console.log('✅ Auth system initialized');
});
