import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import visualizer from 'rollup-plugin-visualizer';

const isProduction = process.env.PRODUCTION;
const output = isProduction
  ? [{ file: 'dist/react-error-reporter.min.js', format: 'umd', exports: 'named' }]
  : [
      {
        file: 'dist/react-error-reporter.es.js',
        format: 'es',
        exports: 'named',
      },
      {
        file: 'dist/react-error-reporter.js',
        format: 'umd',
        exports: 'named',
      },
    ];

export default {
  globals: { react: 'React', 'prop-types': 'PropTypes' },
  input: 'src/index.js',
  external: ['prop-types', 'react'],
  name: 'ErrorReporter',
  output,
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false,
            loose: true,
          },
        ],
        'react',
      ],
      plugins: [
        !isProduction && 'react-flow-props-to-prop-types',
        isProduction && 'transform-react-remove-prop-types',
        'transform-flow-strip-types',
        'transform-class-properties',
        'transform-object-rest-spread',
        'external-helpers',
      ].filter(Boolean),
      ignore: '**/*.test.js',
      exclude: 'node_modules/**',
    }),
    isProduction && uglify(),
    isProduction && visualizer({ filename: './bundle-stats.html' }),
  ].filter(Boolean),
};
