const { createInterface } = require('readline');

/**
 * Present the user with a prompt to enter some text. This assumes stdin and
 * stdout are connected to an interactive terminal (TTY).
 *
 * @param {string} prompt - The prompt to present to the user
 * @returns {Promise<string>}
 */
exports.readline = function readline(prompt) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(prompt.trim() + ' ', (value) => {
      rl.close();
      resolve(value);
    });
  });
};
