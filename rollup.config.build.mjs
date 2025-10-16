import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { visualizer } from 'rollup-plugin-visualizer';

import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';
import fs from 'fs';
import { preserveUseClient } from './plugins.mjs';

const pkg = JSON.parse(fs.readFileSync('./package.json'));

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/headless-tooltip.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/headless-tooltip.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        sourceMap: true,
      }),
      terser(),
      json({
        compact: true,
      }),
      visualizer({
        brotliSize: true,
        gzipSize: true,
      }),
      preserveUseClient(),
    ],
    external: [...Object.keys(pkg.peerDependencies || {})],
  },
  {
    input: 'src/index.tsx',
    output: {
      file: pkg.types,
      format: 'esm',
    },
    plugins: [dts()],
  },
  // Wrapper emission moved to an npm script to avoid Rollup error
];
