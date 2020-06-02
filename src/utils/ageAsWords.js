// Dependencies
const moment = require('moment');


/**
 * By providing a birthdate it returns
 * the age in words.
 * @param {String} date YYYY-MM-DD
 * @returns {String} Bithdate as words (Ex. "50 años")
 */
const ageAsWords = (date) => {
  try {
    const now = moment();
    const temp = moment(date, 'YYYY-MM-DD');
    const years = now.diff(temp, 'years');
    if (years) {
      const suffix = years > 1 ? 'años' : 'año';
      return `${years.toString()} ${suffix}`;
    }
    return 'N/A';
  } catch {
    return 'N/A';
  }
};

module.exports = ageAsWords;
