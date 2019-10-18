class Being {
  constructor (option) {
    const { x, y, ch, fg, game } = option
    this.game = game
    this._x = x
    this._y = y
    this.ch = ch
    this.fg = fg
    this.map = this.game.getMap()
    this._draw()
  }

  _draw () {
    this.game.draw(this._x, this._y, this.ch, this.fg)
  }
}

export default Being
