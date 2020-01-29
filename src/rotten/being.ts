import Game from './game'

export interface BeingOptions {
  x: number
  y: number
  ch?: string
  fg?: string
  bg?: string
  game: Game
}

export type BeingConstructor = new (option: BeingOptions) => Being

export abstract class Being {
  protected x: number
  protected y: number
  protected ch: string
  protected fg: string
  protected bg: string
  protected game: Game
  constructor (options: BeingOptions) {
    this.x = options.x
    this.y = options.y
    this.ch = options.ch
    this.fg = options.fg
    this.bg = options.bg
    this.game = options.game
    this.draw()
  }

  get position (): [number, number] {
    return [this.x, this.y]
  }

  protected draw () {
    this.game.draw(this.x, this.y, this.ch, this.fg, this.bg)
  }

  abstract act (): void
}
