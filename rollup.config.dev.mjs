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
    input: 'dev/index.dev.tsx',
    output: [
      { file: 'dev-dist/index.cjs', format: 'cjs', sourcemap: true },
      {
        file: 'dev-dist/index.mjs',
        format: 'esm',
        sourcemap: false,
      },
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(
          isDev ? 'development' : 'production',
        ),
        preventAssignment: true,
      }),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        preferBuiltins: false,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.dev.json',
        jsx: 'react-jsx',
        include: ['dev/**/*', 'src/**/*'],
        sourceMap: true,
      }),
      postcss(),
      serve({
        open: true,
        contentBase: ['dev-dist', '.'],
        port: 3001,
      }),
      livereload({
        watch: 'dev-dist',
        port: 3001,
      }),
      json(),
    ],
    external: [],
  },
  {
    input: 'dev/index.dev.tsx',
    output: {
      file: 'dev-dist/index.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
];
