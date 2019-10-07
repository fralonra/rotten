import {
  Display,
  Map as RotMap,
  RNG
} from 'rot-js/lib'

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

  _initDisplay () {
    this.display = new Display()
    document.body.appendChild(this.display.getContainer())
  }

  _generateMap () {
    const digger = new RotMap.Digger()
    function digCallback (x, y, value) {
      if (value) return

      const key = x + ',' + y
      this.map[key] = '.'
      this.freeCells.push(key)
    }
    digger.create(digCallback.bind(this))
  }

  _generateBoxes () {
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(RNG.getUniform() * this.freeCells.length)
      const key = this.freeCells.splice(index, 1)[0]
      this.map[key] = '*'
      if (!i) {
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
