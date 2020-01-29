import {
  RNG
} from 'rot-js/lib'

export function getCell (cells: string[]): [number, number] {
  const index = Math.floor(RNG.getUniform() * cells.length)
  const key = cells.splice(index, 1)[0]
  const parts = key.split(',')
  const x = parseInt(parts[0], 10)
  const y = parseInt(parts[1], 10)
  return [x, y]
}
