/**
 * Present the user with a prompt to enter some text. This assumes stdin and
 * stdout are connected to an interactive terminal (TTY).
 *
 * @param {string} prompt - The prompt to present to the user
 * @returns {string}
 */
export function readline(prompt: string): string;
