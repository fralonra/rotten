import {
  Engine as RotEngine,
  Scheduler
} from 'rot-js/lib'
import { Being } from './being'

export class Engine {
  engine: RotEngine
  constructor (beings: Being[]) {
    const scheduler = new Scheduler.Simple()
    beings.forEach(being => {
      scheduler.add(being, true)
    })
    this.engine = new RotEngine(scheduler)
  }

  start () {
    this.engine.start()
  }

  lock () {
    this.engine.lock()
  }

  unlock () {
    this.engine.unlock()
  }
}
