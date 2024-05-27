import { spawnSync } from 'child_process';
import { createInterface } from 'readline';

/**
 * Present the user with a prompt to enter some text. This assumes stdin and
 * stdout are connected to an interactive terminal (TTY).
 */
export function readline(prompt: string) {
  const promptArg = `prompt=${toBase64(prompt)}`;
  const child = spawnSync(process.execPath, [__filename, promptArg], {
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

// If we're being invoked by the above code we'll handle it here.
if (require.main === module) {
  const promptArg =
    process.argv.slice(2).find((arg) => arg.startsWith('prompt=')) ?? '';
  const value = promptArg.split('=').slice(1).join('=');
  const prompt = fromBase64(value);
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(prompt.trim() + ' ', (answer) => {
    rl.close();
    process.stderr.write(JSON.stringify({ answer }));
  });
}

function toBase64(value: string) {
  return Buffer.from(value, 'utf8').toString('base64');
}

function fromBase64(encoded: string) {
  try {
    const buffer = Buffer.from(encoded, 'base64');
    return buffer.toString('utf8');
  } catch (e) {
    return '';
  }
}
