import typescript from '@rollup/plugin-typescript';
import cleanup from 'rollup-plugin-cleanup';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      strict: false,
      esModule: false,
    },
    external: ['readline'],
    plugins: [
      typescript({
        module: 'esnext',
      }),
      cleanup({
        extensions: ['js', 'ts'],
      }),
    ],
  },
  {
    input: 'dist/dts/index.d.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
  {
    input: 'src/sync/index.ts',
    output: {
      file: 'dist/sync/index.js',
      format: 'cjs',
      strict: false,
      esModule: false,
    },
    external: ['child_process', 'readline'],
    plugins: [
      typescript({
        module: 'esnext',
      }),
      cleanup({
        extensions: ['js', 'ts'],
      }),
    ],
  },
  {
    input: 'dist/dts/sync/index.d.ts',
    output: {
      file: 'dist/sync/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];
