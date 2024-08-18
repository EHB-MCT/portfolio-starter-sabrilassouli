/**
 * Checks if the creator_id is valid.
 * @param {number} creatorId - The creator ID to check.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function checkCreatorId(creatorId) {
    return Number.isInteger(creatorId) && creatorId > 0;
}

/**
 * Checks if the creator_id is valid.
 * @param {number} questionId - The creator ID to check.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function checkQuestionId(questionId) {
    return Number.isInteger(questionId) && questionId > 0;
}


/**
 * Checks if the comment is valid.
 * @param {string} comment - The comment to check.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function checkComment(comment) {
    return typeof comment === 'string' && comment.length <= 500;
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
    checkQuestionId,
    checkComment,
    checkUpvotes
};