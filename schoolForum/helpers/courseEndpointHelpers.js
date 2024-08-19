/**
 * Checks if the provided name is valid.
 * @param {string} name - The name to be checked.
 * @returns {boolean} - Returns true if the name is valid (non-empty and unique), otherwise false.
 */
function checkCourseName(name) {
    const validNamePattern = /^[a-zA-Z0-9 ]+$/;

    // Test name against the regular expression
    if (!validNamePattern.test(name)) {
        return false;
    }
    return typeof name === 'string' && name.length > 0 && name.length <= 50;


}

/**
 * Checks if the provided description is valid.
 * @param {string} description - The description to be checked.
 * @returns {boolean} - Returns true if the description is valid (string), otherwise false.
 */
function checkCourseDescription(description) {
    // Valid characters: letters, numbers, spaces, and punctuation
    const validDescriptionPattern = /^[a-zA-Z0-9\s.,!?()'"]*$/;

    return typeof description === 'string' &&
        description.length <= 200 &&
        validDescriptionPattern.test(description);
}
/**
 * Checks if the provided teacher name is valid.
 * @param {string} teacher - The teacher's name to be checked.
 * @returns {boolean} - Returns true if the teacher's name is valid (string), otherwise false.
 */
function checkCourseTeacher(teacher) {
    const validNamePattern = /^[a-zA-Z\s]+$/;

    // Test name against the regular expression
    if (!validNamePattern.test(teacher)) {
        return false;
    }
    return typeof teacher === 'string' && teacher.length > 0 && teacher.length <= 50;
}

module.exports = {
    checkCourseName,
    checkCourseDescription,
    checkCourseTeacher,
};