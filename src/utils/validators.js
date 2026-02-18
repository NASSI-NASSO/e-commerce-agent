/**
 * Validation utilities for forms
 */

/**
 * Validates an email address
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

/**
 * Validates password strength
 * Minimum 8 characters, at least one letter and one number
 * @param {string} password 
 * @returns {boolean}
 */
export const validatePassword = (password) => {
    return password.length >= 8 &&
        /[A-Za-z]/.test(password) &&
        /[0-9]/.test(password);
};
