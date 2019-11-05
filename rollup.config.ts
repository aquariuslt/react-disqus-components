import typescript from 'rollup-plugin-typescript';

const pkg = require('./package.json');

const libraryName = pkg.name;

export default {
  input: `src/index.tsx`,
  output: [
    {
      file: pkg.main,
      name: libraryName,
      format: 'umd',
      sourcemap: true,
      globals: {
        react: 'React'
      }
    },
    { file: pkg.module, format: 'es', sourcemap: true }
  ],
  external: ['react'],

  plugins: [typescript()]
};
