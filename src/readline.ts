import { createInterface } from 'readline';

/**
 * Present the user with a prompt to enter some text. This assumes stdin and
 * stdout are connected to an interactive terminal (TTY).
 */
export function readline(prompt: string) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise<string>((resolve) => {
    rl.question(prompt.trim() + ' ', (value) => {
      rl.close();
      resolve(value);
    });
  });
}
