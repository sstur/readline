const { join } = require('path');
const { spawnSync } = require('child_process');

const childPathRelative = './child.js';
const childPath = join(__dirname, childPathRelative);

/**
 * Present the user with a prompt to enter some text. This assumes stdin and
 * stdout are connected to an interactive terminal (TTY).
 *
 * @param {string} prompt
 * @returns {string}
 */
exports.readline = function readline(prompt) {
  const child = spawnSync(process.execPath, [childPath, prompt], {
    stdio: ['inherit', 'inherit', 'pipe'],
  });
  if (child.error) {
    throw child.error;
  }
  const stderr = child.stderr.toString();
  if (stderr === '') {
    // Child process terminated early, probably due to a SIGINT
    process.exit(130);
  }
  const result = JSON.parse(stderr);
  const answer = Object(result).answer;
  return typeof answer === 'string' ? answer : '';
};
