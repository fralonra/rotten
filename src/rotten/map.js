import {
  Display,
  Map as RotMap,
  RNG
} from 'rot-js/lib'
import { getCell } from './utils'

class Map {
  constructor () {
    this.ananas = null
    this.display = null
    this.map = {}
    this.freeCells = []

    this.init()
  }

  init () {
    this._initDisplay()
    this._generateMap()
    this._generateBoxes()
    this._drawWholeMap()
  }

  draw (x, y, ch, fg, bg) {
    if (ch === undefined) {
      ch = this.map[x + ',' + y]
    }
    this.display.draw(x, y, ch, fg, bg)
  }

  getMap () {
    return this.map
  }

  getFreeCells () {
    return getCell(this.freeCells)
  }

  _initDisplay () {
    this.display = new Display()
    document.body.appendChild(this.display.getContainer())
  }

  _generateMap () {
    const digger = new RotMap.Digger()
    const digCallback = (x, y, value) => {
      if (value) return

      const key = x + ',' + y
      this.map[key] = '.'
      this.freeCells.push(key)
    }
    digger.create(digCallback)
  }

  _generateBoxes () {
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(RNG.getUniform() * this.freeCells.length)
      const key = this.freeCells.splice(index, 1)[0]
      this.map[key] = '*'
      if (i === 0) {
        this.ananas = key
      }
    }
  }

  _drawWholeMap () {
    for (const key in this.map) {
      const parts = key.split(',')
      const x = parseInt(parts[0])
      const y = parseInt(parts[1])
      this.display.draw(x, y, this.map[key])
    }
  }
}

export default Map
