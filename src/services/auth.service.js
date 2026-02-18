/**
 * Auth Service
 * Currently simulates authentication using localStorage
 */

const STORAGE_KEY = 'souk_user';
const USERS_KEY = 'registered_users';

export const authService = {
    login: (email, password) => {
        const registeredUsers = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const foundUser = registeredUsers.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const userSession = { email: foundUser.email, name: foundUser.name };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(userSession));
            return { success: true, user: userSession };
        }
        return { success: false, message: 'Invalid credentials' };
    },

    register: (userData) => {
        const registeredUsers = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

        if (registeredUsers.some(u => u.email === userData.email)) {
            return { success: false, message: 'Email already registered' };
        }

        registeredUsers.push(userData);
        localStorage.setItem(USERS_KEY, JSON.stringify(registeredUsers));
        return { success: true };
    },

    logout: () => {
        localStorage.removeItem(STORAGE_KEY);
    },

    getUser: () => {
        const savedUser = localStorage.getItem(STORAGE_KEY);
        return savedUser ? JSON.parse(savedUser) : null;
    }
};

export default authService;
