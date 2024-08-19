


const {
    checkCreatorId,
    checkQuestionId,
    checkComment,
    checkUpvotes
} = require('../helpers/answerEndpointHelpers.js');

describe('Questions Helper Functions', () => {
    // Tests for checkCreatorId
    test('should return true for valid creator IDs', () => {
        expect(checkCreatorId(1)).toBe(true);
        expect(checkCreatorId(100)).toBe(true);
    });

    test('should return false for invalid creator IDs', () => {
        expect(checkCreatorId(-1)).toBe(false);
        expect(checkCreatorId(0)).toBe(false);
        expect(checkCreatorId('1')).toBe(false);
        expect(checkCreatorId('nevnzovo')).toBe(false);
        expect(checkCreatorId(null)).toBe(false);
    });

       // Tests for checkQuestionId
       test('should return true for valid question IDs', () => {
        expect(checkQuestionId(1)).toBe(true);
        expect(checkQuestionId(100)).toBe(true);
    });

    test('should return false for invalid question IDs', () => {
        expect(checkQuestionId(-1)).toBe(false);
        expect(checkQuestionId(0)).toBe(false);
        expect(checkQuestionId('1')).toBe(false);
        expect(checkQuestionId('nevnzovo')).toBe(false);
        expect(checkQuestionId(null)).toBe(false);
    });

    // Tests for checkComment
    test('should return true for valid comments', () => {
        expect(checkComment('While I am trying to connect my API with my database in tableplus but it wont connect. I am new to this; is there anything I am missing?.')).toBe(true);
    });

    test('should return false for invalid comments', () => {
        expect(checkComment('')).toBe(true); // Empty comment is valid
        expect(checkComment('x'.repeat(501))).toBe(false); // Comment too long
        expect(checkComment(123)).toBe(false); // Non-string type
        expect(checkComment(null)).toBe(false); // Null value
    });

    // Tests for checkUpvotes
    test('should return true for valid upvotes counts', () => {
        expect(checkUpvotes(0)).toBe(true);
        expect(checkUpvotes(5)).toBe(true);
    });

    test('should return false for invalid upvotes counts', () => {
        expect(checkUpvotes(-1)).toBe(false); // Negative number
        expect(checkUpvotes(1.5)).toBe(false); // Non-integer
        expect(checkUpvotes('5')).toBe(false); // Non-number type
    });
});