import { createInterface } from 'readline';

const args = process.argv.slice(2);
const prompt = args[0] ?? '';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(prompt, (answer) => {
  rl.close();
  process.stderr.write(JSON.stringify({ answer }));
});
