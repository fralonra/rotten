import {
  Display,
  Map as RotMap,
  RNG
} from 'rot-js/lib'
import * as ROT from 'rot-js/lib/constants'
import { getCell } from './utils'

const DEFAULT_WIDTH = ROT.DEFAULT_WIDTH
const DEFAULT_HEIGHT = ROT.DEFAULT_HEIGHT

type MapData = {
  [key: string]: string
}

export class GameMap {
  private _ananas: string
  private display: Display
  private map: MapData
  private freeCells: string[]
  constructor () {
    this.initDisplay()
    this.generateMap()
    this.generateBoxes()
    this.drawWholeMap()
  }

  get ananas (): string {
    return this._ananas
  }

  draw (x: number, y: number, ch?: string | string[], fg?: string, bg?: string) {
    if (ch === undefined) {
      ch = this.map[x + ',' + y]
    }
    this.display.draw(x, y, ch, fg, bg)
  }

  has (key: string): boolean {
    return key in this.map
  }

  get (key: string): string {
    return this.map[key]
  }

  getFreeCells (): [number, number] {
    return getCell(this.freeCells)
  }

  set (key: string, value: string) {
    this.map[key] = value
  }

  private initDisplay () {
    this.display = new Display({
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT
    })
    document.body.appendChild(this.display.getContainer())
  }

  private generateMap () {
    this.map = {} as MapData
    this.freeCells = [] as string[]
    const digger = new RotMap.Digger(DEFAULT_WIDTH, DEFAULT_HEIGHT)
    const digCallback = (x: number, y: number, value: number) => {
      if (value) return

      const key = x + ',' + y
      this.map[key] = '.'
      this.freeCells.push(key)
    }
    digger.create(digCallback)
  }

  private generateBoxes () {
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(RNG.getUniform() * this.freeCells.length)
      const key = this.freeCells.splice(index, 1)[0]
      this.map[key] = '*'
      if (i === 0) {
        this._ananas = key
      }
    }
  }

  private drawWholeMap () {
    for (const key of Object.keys(this.map)) {
      const parts = key.split(',')
      const x = parseInt(parts[0], 10)
      const y = parseInt(parts[1], 10)
      this.display.draw(x, y, this.map[key], null, null)
    }
  }
}
