import Engine from './engine'
import Map from './map'
import Pedro from './pedro'
import Player from './player'

class Game {
  constructor () {
    this.engine = null
    this.map = null
    this.pedro = null
    this.player = null
    this.beings = []
  }

  init () {
    this._initMap()
    this.player = this._initBeing(Player, { ch: '@', fg: '#ff0' })
    this.pedro = this._initBeing(Pedro, { ch: 'P', fg: 'red' })
    this._initEngine()
  }

  draw (x, y, ch, fg, bg) {
    this.map.draw(x, y, ch, fg, bg)
  }

  getMap () {
    return this.map.getMap()
  }

  _initMap () {
    this.map = new Map()
  }

  _initBeing (What, option) {
    const cell = this.map.getFreeCells()
    const being = new What({
      x: cell[0],
      y: cell[1],
      game: this,
      ...option
    })
    this.beings.push(being)
    return being
  }

  _initEngine () {
    this.engine = new Engine(this.beings)
    this.engine.start()
  }
}

export default Game
