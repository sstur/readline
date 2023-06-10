import { extname } from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const childPathRelative = './child';
const ext = extname(fileURLToPath(import.meta.url));
const childPath = fileURLToPath(
  new URL(childPathRelative + ext, import.meta.url),
);

/**
 * @param {string} prompt
 */
export function readline(prompt) {
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
}
