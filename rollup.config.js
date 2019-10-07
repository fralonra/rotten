import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'

export default [{
  input: 'src/rotten/index.js',
  plugins: [
    resolve(),
    terser()
  ],
  output: {
    file: 'src/dist/rotten.js',
    format: 'umd',
    name: 'Rotten'
  }
}]