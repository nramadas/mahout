import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import less from 'rollup-plugin-less';
import includePaths from 'rollup-plugin-includepaths';

export default {
  entry: 'src/mahout.js',
  dest: 'mahout.js',
  format: 'iife',
  sourceMap: 'inline',
  moduleName: 'mahout',
  plugins: [
    includePaths({
      include: {},
      paths: ['src'],
      external: [],
      extensions: ['.js', '.json'],
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    less({
      option: {
        paths: ['src/lib'],
      },
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    eslint({
      exclude: [
        'src/**/*.less',
      ]
    }),
  ],
};
