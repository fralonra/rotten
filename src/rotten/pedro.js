import { Path } from 'rot-js/lib'

class Pedro {
  constructor (x, y, game) {
    this.game = game
    this._x = x
    this._y = y
    this._draw()
  }

  get map () {
    return this.game.map ? this.game.map.map : null
  }

  act () {
    let [x, y] = this.game.player.position
    function passableCallback (x, y) {
      return (x + ',' + y in this.map)
    }
    const astar = new Path.AStar(x, y, passableCallback.bind(this), { topology: 4 })

    const path = []
    function pathCallback (x, y) {
      path.push([x, y])
    }
    astar.compute(this._x, this._y, pathCallback)

    path.shift()
    if (path.length === 1) {
      this.game.engine.lock()
      window.alert('this.game over - you were captured by Pedro!')
    } else {
      x = path[0][0]
      y = path[0][1]
      this.game.display.draw(this._x, this._y, this.map[this._x + ',' + this._y])
      this._x = x
      this._y = y
      this._draw()
    }
  }

  _draw () {
    this.game.display.draw(this._x, this._y, 'P', 'red')
  }
}

export default Pedro
