import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';
import serve from 'rollup-plugin-serve';
import replace from '@rollup/plugin-replace';
import fs from 'fs';
import livereload from 'rollup-plugin-livereload';

const pkg = JSON.parse(fs.readFileSync('./package.json'));

const isDev = process.env.NODE_ENV === 'development';

export default [
  {
    input: 'src/index.dev.tsx',
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(
          isDev ? 'development' : 'production',
        ),
        preventAssignment: true,
      }),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.dev.json',
      }),
      postcss(),
      serve({
        open: true,
        contentBase: ['dist', '.'],
        port: 3000,
      }),
      livereload({
        watch: 'dist',
        port: 3000,
      }),
      json(),
    ],
    external: [],
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
