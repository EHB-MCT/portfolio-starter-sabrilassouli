/**
 * Checks if the creator_id is valid.
 * @param {number} creatorId - The creator ID to check.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function checkCreatorId(creatorId) {
    return Number.isInteger(creatorId) && creatorId > 0;
}

/**
 * Checks if the course_id is valid.
 * @param {number} courseId - The course ID to check.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function checkCourseId(courseId) {
    return Number.isInteger(courseId) && courseId > 0;
}

/**
 * Checks if the title is valid.
 * @param {string} title - The title to check.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function checkTitle(title) {
    return typeof title === 'string' && title.length > 0 && title.length <= 100;
}

/**
 * Checks if the description is valid.
 * @param {string} description - The description to check.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function checkDescription(description) {
    return typeof description === 'string' && description.length <= 500;
}

/**
 * Checks if the views count is valid.
 * @param {number} views - The views count to check.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function checkViews(views) {
    return Number.isInteger(views) && views >= 0;
}

/**
 * Checks if the comments count is valid.
 * @param {number} comments - The comments count to check.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function checkComments(comments) {
    return Number.isInteger(comments) && comments >= 0;
}

/**
 * Checks if the upvotes count is valid.
 * @param {number} upvotes - The upvotes count to check.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function checkUpvotes(upvotes) {
    return Number.isInteger(upvotes) && upvotes >= 0;
}

module.exports = {
    checkCreatorId,
    checkCourseId,
    checkTitle,
    checkDescription,
    checkViews,
    checkComments,
    checkUpvotes
};
