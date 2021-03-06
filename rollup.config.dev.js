import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default [{
  input: 'src/rotten/index.ts',
  plugins: [
    resolve(),
    typescript()
  ],
  output: {
    file: 'src/dist/rotten.js',
    format: 'umd',
    name: 'Rotten'
  }
}]