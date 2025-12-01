/**
 * Generates a random string of numbers of a specified length.
 * @param {number} length - The desired length of the string.
 * @returns {string} - A string consisting of random numbers.
 */
function getStringOfNumber(length) {
    return Array.from({ length: length }, () => Math.floor(Math.random() * 10)).join('');
}

module.exports = {
    getStringOfNumber
}