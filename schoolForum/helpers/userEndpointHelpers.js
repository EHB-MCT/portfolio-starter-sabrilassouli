/**
 *Validates the username.
 *@param {string} name - The username to validate.
 *@returns {boolean} - Returns true if the username is valid, false otherwise.
 *
 */


function checkUserName(name) {
    // Check if name is a string and its length is within the valid range
    if (typeof name !== 'string' || name.length <= 1 || name.length > 20) {
        return false;
    }

    // Regular expression to allow only alphanumeric characters and spaces
    const validNamePattern = /^[a-zA-Z0-9 ]+$/;

    // Test name against the regular expression
    if (!validNamePattern.test(name)) {
        return false;
    }

    return true;
}

/**
 *Validates the email address.
 *@param {string} email - The email to validate.
 *@returns {boolean} - Returns true if the email is valid, false otherwise.
 */

function checkEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof email === 'string' && emailPattern.test(email);
}

/**
 *Validates the password.
 *@param {string} password - The password to validate.
 *@returns {boolean} - Returns true if the password is valid, false otherwise.
 */

function checkPassword(password) {
    return typeof password === 'string' && password.length >= 6;
}

/**
 *Validates the status.
 *@param {number} status - The status to validate.
 *@returns {boolean} - Returns true if the status is a non-negative integer, false otherwise.
 */
function checkStatus(status) {
    return Number.isInteger(status) && status >= 0 && status < 3;
}

module.exports = {
    checkUserName,
    checkEmail,
    checkPassword,
    checkStatus,
};