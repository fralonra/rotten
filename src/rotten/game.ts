import { Being, BeingConstructor, BeingOptions } from './being'
import { Engine } from './engine'
import { GameMap } from './map'
import { Player, PlayerOptions } from './player'
import { Pedro, PedroOptions } from './pedro'

type UnitedBeingOptions = Partial<BeingOptions & PlayerOptions & PedroOptions>

class Game {
  private engine: Engine
  private map: GameMap
  private player: Player
  private beings: Being[] = []
  constructor () {
    this.initMap()
    this.initPlayer()
    this.initPedro()
    this.initEngine()
  }

  draw (x: number, y: number, ch?: string | string[], fg?: string, bg?: string) {
    this.map.draw(x, y, ch, fg, bg)
  }

  getMap (key: string): string {
    return this.map.get(key)
  }

  inMap (key: string): boolean {
    return this.map.has(key)
  }

  lock () {
    this.engine.lock()
  }

  unlock () {
    this.engine.unlock()
  }

  private initMap () {
    this.map = new GameMap()
  }

  private initPlayer () {
    this.player = this.initBeing(Player, { ch: '@', fg: '#ff0', ananas: this.map.ananas }) as Player
  }

  private initPedro () {
    this.initBeing(Pedro, { ch: 'P', fg: 'red', player: this.player })
  }

  private initBeing (What: BeingConstructor, option: UnitedBeingOptions): Being {
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

  private initEngine () {
    this.engine = new Engine(this.beings)
    this.engine.start()
  }
}

export default Game
