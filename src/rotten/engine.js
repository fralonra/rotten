import {
  Engine as RotEngine,
  Scheduler
} from 'rot-js/lib'

class Engine {
  constructor (beings) {
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

export default Engine
