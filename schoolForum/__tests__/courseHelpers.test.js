const {
    checkCourseName,
    checkCourseDescription,
    checkCourseTeacher
} = require('../helpers/courseEndpointHelpers');

describe('Course Helper Functions', () => {

    // Tests for checkCourseName
    test('should return true for valid course names', () => {
        expect(checkCourseName('development V')).toBe(true);
        expect(checkCourseName('development 5')).toBe(true);
        expect(checkCourseName('design III')).toBe(true);
        expect(checkCourseName('design 3')).toBe(true);
    });

    test('should return false for invalid course names', () => {
        expect(checkCourseName('')).toBe(false); // Empty name
        expect(checkCourseName(null)).toBe(false); // Null value
        expect(checkCourseName(123)).toBe(false); // Non-string type
        expect(checkCourseName('a'.repeat(51))).toBe(false); // Name too long
        expect(checkCourseName('/^[a-zA-Z0-9 ]+$/')).toBe(false); // invalid characters
    });

    // Tests for checkCourseDescription
    test('should return true for valid course descriptions', () => {
        expect(checkCourseDescription('This course covers advanced programming concepts.')).toBe(true);
        expect(checkCourseDescription('A deep dive into the world of design.')).toBe(true);
    });

    test('should return false for invalid course descriptions', () => {
        expect(checkCourseDescription('')).toBe(true); // Empty description (optional)
        expect(checkCourseDescription(null)).toBe(false); // Null value
        expect(checkCourseDescription(123)).toBe(false); // Non-string type
        expect(checkCourseDescription('a'.repeat(201))).toBe(false); // Description too long
        expect(checkCourseDescription('/^[a-zA-Z0-9 ]+$/')).toBe(false); // invalid characters
    });

    // Tests for checkCourseTeacher
    test('should return true for valid teacher names', () => {
        expect(checkCourseTeacher('Jan Everaert')).toBe(true);
    });

    test('should return false for invalid teacher names', () => {
        expect(checkCourseTeacher('')).toBe(false); // Empty name
        expect(checkCourseTeacher(null)).toBe(false); // Null value
        expect(checkCourseTeacher(123)).toBe(false); // Non-string type
        expect(checkCourseTeacher('a'.repeat(51))).toBe(false); // Name too long
        expect(checkCourseTeacher('/^[a-zA-Z0-9 ]+$/')).toBe(false); // invalid characters
    });

});