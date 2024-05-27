# readline

Read user input from the command line.

[Demo here](https://stackblitz.com/edit/node-fetbcf?file=readline-sync.js)

```sh
npm install @jot/readline
```

This comes in both a sync (blocking) version and an async (promises) version.

## Sync usage

```ts
import { readline } from '@jot/readline/sync';

const answer = readline('Enter something:');
console.log(`You entered: ${answer}`);
```

## Async usage

```ts
import { readline } from '@jot/readline';

const answer = await readline('Enter something:');
console.log(`You entered: ${answer}`);
```
