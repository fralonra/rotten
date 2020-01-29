import { Path } from 'rot-js/lib'
import { Being, BeingOptions } from './being'
import { Player } from './player'

export interface PedroOptions extends BeingOptions {
  player: Player
}

export class Pedro extends Being {
  private player: Player
  constructor (options: PedroOptions) {
    super(options)

    this.player = options.player
  }

  act () {
    this.chasePlayer()
  }

  private chasePlayer () {
    const [playerX, playerY] = this.player.position
    let [pedroX, pedroY] = this.position
    const passableCallback = (x: number, y: number) => this.game.inMap(x + ',' + y)
    const astar = new Path.AStar(playerX, playerY, passableCallback, { topology: 4 })

    const path: [number, number][] = []
    function pathCallback (x: number, y: number) {
      path.push([x, y])
    }
    astar.compute(pedroX, pedroY, pathCallback)

    path.shift()
    if (path.length === 1) {
      this.game.lock()
      window.alert('this.game over - you were captured by Pedro!')
    } else {
      this.game.draw(pedroX, pedroY)
      pedroX = path[0][0]
      pedroY = path[0][1]
      this.x = pedroX
      this.y = pedroY
      this.draw()
    }
  }
}
