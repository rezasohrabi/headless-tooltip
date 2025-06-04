import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';
import analyze from 'rollup-plugin-analyzer';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json'));

export default [
  {
    input: 'src/index.tsx',
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: false },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: false,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        sourceMap: false,
      }),
      postcss(),
      terser(),
      json(),
      analyze(),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'src/index.tsx',
    output: {
      file: pkg.types,
      format: 'esm',
    },
    plugins: [dts()],
  },
];
