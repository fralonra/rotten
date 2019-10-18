import { DIRS } from 'rot-js/lib'
import Being from './being'

const keyMap = {
  38: 0,
  33: 1,
  39: 2,
  34: 3,
  40: 4,
  35: 5,
  37: 6,
  36: 7
}

class Player extends Being {
  get position () {
    return [this._x, this._y]
  }

  act () {
    this.game.engine.lock()
    window.addEventListener('keydown', this)
  }

  handleEvent (e) {
    const code = e.keyCode
    if (code === 13 || code === 32) {
      this._checkBox()
      return
    }
    if (!(code in keyMap)) return
    this._move(code)
  }

  _checkBox () {
    const key = this._x + ',' + this._y
    if (this.map[key] !== '*') {
      window.alert('There is no box here!')
    } else if (key === this.game.ananas) {
      window.alert('Hooray! You found an ananas and won this game.')
      this.game.engine.lock()
      window.removeEventListener('keydown', this)
    } else {
      window.alert('This box is empty :-(')
    }
  }

  _move (code) {
    const diff = DIRS[8][keyMap[code]]
    const newX = this._x + diff[0]
    const newY = this._y + diff[1]

    const newKey = newX + ',' + newY
    if (!(newKey in this.map)) return

    this.game.draw(this._x, this._y)
    this._x = newX
    this._y = newY
    this._draw()
    window.removeEventListener('keydown', this)
    this.game.engine.unlock()
  }
}

export default Player
