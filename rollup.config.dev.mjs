import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';
import serve from 'rollup-plugin-serve';
import replace from '@rollup/plugin-replace';
import livereload from 'rollup-plugin-livereload';
import html from '@rollup/plugin-html';

export default [
  {
    input: 'dev/index.dev.tsx',
    output: [
      { file: 'dev-dist/index.cjs', format: 'cjs' },
      {
        file: 'dev-dist/index.mjs',
        format: 'esm',
      },
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
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
        include: ['dev/**/*.ts', 'dev/**/*.tsx', 'src/**/*.ts', 'src/**/*.tsx'],
        exclude: ['**/*.css', '**/*.scss', '**/*.sass'],
      }),
      postcss({
        extract: true,
        modules: false,
        minimize: false,
      }),
      json(),
      html({
        fileName: 'index.html',
        title: 'Tooltip Component',

        template: () => `
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>React Headless Tooltip</title>
            <link rel="stylesheet" href="./index.css" />
          </head>
          <body>
            <div id="root"></div>
            <script type="module" src="./index.mjs"></script>
          </body>
        </html>`,
      }),
      serve({
        open: true,
        contentBase: ['dev-dist', '.'],
        port: 3000,
      }),
      livereload({
        watch: 'dev-dist',
        port: 3000,
      }),
    ],
  },
  {
    input: 'dev/index.dev.tsx',
    output: {
      file: 'dev-dist/index.d.ts',
      format: 'esm',
    },
    external: [/\.css$/],
    plugins: [dts()],
  },
];
