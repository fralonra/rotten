import resolve from 'rollup-plugin-node-resolve'

export default [{
  input: 'src/rotten/index.js',
  plugins: [
    resolve()
  ],
  output: {
    file: 'src/dist/rotten.js',
    format: 'umd',
    name: 'Rotten'
  }
}]