import { Path } from 'rot-js/lib'
import Being from './being'

class Pedro extends Being {
  act () {
    let [x, y] = this.game.player.position
    const passableCallback = (x, y) => (x + ',' + y in this.map)
    const astar = new Path.AStar(x, y, passableCallback, { topology: 4 })

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
      this.game.draw(this._x, this._y)
      this._x = x
      this._y = y
      this._draw()
    }
  }
}

export default Pedro
