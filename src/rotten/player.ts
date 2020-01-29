import { DIRS } from 'rot-js/lib'
import { Being, BeingOptions } from './being'

interface KeyMap {
  [key: number]: number
}

export interface PlayerOptions extends BeingOptions {
  ananas: string
}

const keyMap: KeyMap = {
  38: 0,
  33: 1,
  39: 2,
  34: 3,
  40: 4,
  35: 5,
  37: 6,
  36: 7
}

export class Player extends Being {
  private ananas: string
  constructor (options: PlayerOptions) {
    super(options)

    this.ananas = options.ananas
  }

  get position (): [number, number] {
    return [this.x, this.y]
  }

  act () {
    this.game.lock()
    window.addEventListener('keydown', this)
  }

  handleEvent (e: KeyboardEvent) {
    const code = e.keyCode
    if (code === 13 || code === 32) {
      this.checkBox()
      return
    }
    if (!(code in keyMap)) return
    this.move(code)
  }

  private checkBox () {
    const key = this.x + ',' + this.y
    if (this.game.getMap(key) !== '*') {
      window.alert('There is no box here!')
    } else if (key === this.ananas) {
      window.alert('Hooray! You found an ananas and won this game.')
      this.game.lock()
      window.removeEventListener('keydown', this)
    } else {
      window.alert('This box is empty :-(')
    }
  }

  private move (code: number) {
    const diff = DIRS[8][keyMap[code]]
    const newX = this.x + diff[0]
    const newY = this.y + diff[1]

    const newKey = newX + ',' + newY
    if (!(this.game.inMap(newKey))) return

    this.game.draw(this.x, this.y)
    this.x = newX
    this.y = newY
    this.draw()
    window.removeEventListener('keydown', this)
    this.game.unlock()
  }
}
