const {
    checkCreatorId,
    checkCourseId,
    checkTitle,
    checkDescription,
    checkViews,
    checkComments,
    checkUpvotes
} = require('../helpers/questionEndpointHelpers.js');

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

    // Tests for checkCourseId
    test('should return true for valid course IDs', () => {
        expect(checkCourseId(1)).toBe(true);
        expect(checkCourseId(100)).toBe(true);
    });

    test('should return false for invalid course IDs', () => {
        expect(checkCourseId(-1)).toBe(false);
        expect(checkCourseId(0)).toBe(false);
        expect(checkCourseId('1')).toBe(false);
        expect(checkCreatorId('nevnzovo')).toBe(false);
        expect(checkCourseId(null)).toBe(false);
    });

    // Tests for checkTitle
    test('should return true for valid titles', () => {
        expect(checkTitle('how do i fix this error')).toBe(true);
        expect(checkTitle('werkcolleges les 6 vraagje')).toBe(true);
    });

    test('should return false for invalid titles', () => {
        expect(checkTitle('')).toBe(false); // Empty title
        expect(checkTitle('a'.repeat(101))).toBe(false); // Title too long
        expect(checkTitle(123)).toBe(false); // Non-string type
        expect(checkTitle(null)).toBe(false); // Null value
    });

    // Tests for checkDescription
    test('should return true for valid descriptions', () => {
        expect(checkDescription('While I am trying to connect my API with my database in tableplus but it wont connect. I am new to this; is there anything I am missing?.')).toBe(true);
    });

    test('should return false for invalid descriptions', () => {
        expect(checkDescription('')).toBe(true); // Empty description is valid
        expect(checkDescription('x'.repeat(501))).toBe(false); // Description too long
        expect(checkDescription(123)).toBe(false); // Non-string type
        expect(checkDescription(null)).toBe(false); // Null value
    });

    // Tests for checkViews
    test('should return true for valid views counts', () => {
        expect(checkViews(0)).toBe(true);
        expect(checkViews(100)).toBe(true);
    });

    test('should return false for invalid views counts', () => {
        expect(checkViews(-1)).toBe(false); // Negative number
        expect(checkViews(1.5)).toBe(false); // Non-integer
        expect(checkViews('100')).toBe(false); // Non-number type
    });

    // Tests for checkComments
    test('should return true for valid comments counts', () => {
        expect(checkComments(0)).toBe(true);
        expect(checkComments(10)).toBe(true);
    });

    test('should return false for invalid comments counts', () => {
        expect(checkComments(-1)).toBe(false); // Negative number
        expect(checkComments(1.5)).toBe(false); // Non-integer
        expect(checkComments('10')).toBe(false); // Non-number type
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