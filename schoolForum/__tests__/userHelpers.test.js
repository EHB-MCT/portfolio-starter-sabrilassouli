const {
    checkUserName,
    checkEmail,
    checkPassword,
    checkStatus
} = require('../helpers/userEndpointHelpers.js');

describe('User Validation Tests', () => {
    test('check name', () => {
        expect(checkUserName('')).toBe(false);
        expect(checkUserName(null)).toBe(false);
        expect(checkUserName(1)).toBe(false);
        expect(checkUserName('fknfnfrnfnfenmenvnfmenmzfnfmenfenmfnzfzpnfnpvhtegrezgheehjjert')).toBe(false); // too long
        expect(checkUserName('/^[a-zA-Z0-9 ]+$/')).toBe(false); // invalid characters
        expect(checkUserName('sabri')).toBe(true);
        expect(checkUserName('John Doe')).toBe(true); // valid with space
        expect(checkUserName('User123')).toBe(true); // valid alphanumeric
    });

    test('check email', () => {
        expect(checkEmail('')).toBe(false);
        expect(checkEmail(null)).toBe(false);
        expect(checkUserName('/^[a-zA-Z0-9 ]+$/')).toBe(false); // invalid characters
        expect(checkEmail('invalidemail')).toBe(false);
        expect(checkEmail('email@')).toBe(false);
        expect(checkEmail('email@domain')).toBe(false);
        expect(checkEmail('email@domain.')).toBe(false);
        expect(checkEmail('email@domain.com')).toBe(true);
    });

    test('check password', () => {
        expect(checkPassword('')).toBe(false);
        expect(checkPassword(null)).toBe(false);
        expect(checkPassword('short')).toBe(false); // less than 6 characters
        expect(checkPassword('validPassword')).toBe(true); // valid password
    });

    test('check status', () => {
        expect(checkStatus('')).toBe(false);
        expect(checkStatus(null)).toBe(false);
        expect(checkStatus(-1)).toBe(false); // negative integer
        expect(checkStatus(0)).toBe(true); // valid status
        expect(checkStatus(1)).toBe(true); // valid status
        expect(checkStatus(100)).toBe(false); // valid status
    });
});