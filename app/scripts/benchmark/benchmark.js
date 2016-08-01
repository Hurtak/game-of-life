import * as World from '../utils/world.js'
import { medium as testWorld } from './data.js'

export default () => {
  // config
  const worldIterations = 1
  const testReruns = 500

  // benchmarking
  const tickTimes = []
  for (let i = 0; i < testReruns; i++) {
    let world = testWorld

    for (let j = 0; j < worldIterations; j++) {
      const start = Date.now()

      world = World.tick(world)

      const end = Date.now()
      tickTimes.push(end - start)
    }
  }

  // data statistics
  const totalTime = tickTimes.reduce((total, current) => total + current, 0)
  const averageTime = totalTime / tickTimes.length

  const timesSorted = tickTimes.sort((a, b) => a - b)
  const smallestTime = timesSorted[0]
  const longestTime = timesSorted[timesSorted.length - 1]

  // outputting data
  console.log(`Benchmark number of runs: ${testReruns}`)
  console.log(`Benchmark number of world ticks per run: ${worldIterations}`)
  console.log('')
  console.log(`Benchmark average world tick time:  ${averageTime}ms`)
  console.log(`Benchmark quickets world tick time: ${smallestTime}ms`)
  console.log(`Benchmark longest world tick time:  ${longestTime}ms`)
  console.log('')
  console.log(`Benchmark total time: ${totalTime}ms`)
}
