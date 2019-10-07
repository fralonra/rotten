import {
  Engine,
  RNG,
  Scheduler
} from 'rot-js/lib'

import Map from './map'
import Pedro from './pedro'
import Player from './player'

class Game {
  constructor () {
    this.engine = null
    this.map = null
    this.pedro = null
    this.player = null

    this.init()
  }

  get display () {
    return this.map ? this.map.display : null
  }

  get freeCells () {
    return this.map ? this.map.freeCells : []
  }

  init () {
    this._initMap()
    this._initPlayer()
    this.pedro = this._initBeing(Pedro)
    this._initEngine()
  }

  _initMap () {
    this.map = new Map()
  }

  _initPlayer () {
    const index = Math.floor(RNG.getUniform() * this.freeCells.length)
    const key = this.freeCells.splice(index, 1)[0]
    const parts = key.split(',')
    const x = parseInt(parts[0])
    const y = parseInt(parts[1])
    this.player = new Player(x, y, this)
  }

  _initBeing (What) {
    const index = Math.floor(RNG.getUniform() * this.freeCells.length)
    const key = this.freeCells.splice(index, 1)[0]
    const parts = key.split(',')
    const x = parseInt(parts[0])
    const y = parseInt(parts[1])
    return new What(x, y, this)
  }

  _initEngine () {
    const scheduler = new Scheduler.Simple()
    scheduler.add(this.player, true)
    scheduler.add(this.pedro, true)
    this.engine = new Engine(scheduler)
    this.engine.start()
  }
}

export default Game
