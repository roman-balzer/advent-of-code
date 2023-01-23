import { getInput } from './testcases.ts'

const robotCosts = getInput(true) //?
const RESSOURCES = ['ore', 'clay', 'obsidian', 'geode'] as const
const max = 10

const init = {
  oreRobots: 1,
  clayRobots: 0,
  obsidianRobots: 0,
  geodeRobots: 0,
  ore: 0,
  clay: 0,
  obsidian: 0,
  geode: 0,
}
let minutes = 0

const collectResources = (state: typeof init): typeof init => {
  return {
    ...state,
    ore: state.ore + state.oreRobots,
    clay: state.clay + state.clayRobots,
    obsidian: state.obsidian + state.obsidianRobots,
    geode: state.geode + state.geodeRobots,
  }
}

const geodes = [] as any
robotCosts.forEach((robotCost) => {
  let states = [init] as Array<typeof init>

  const maxCost = RESSOURCES.reduce((acc, res) => {
    acc[res] = Math.max(
      ...Object.entries(robotCost).map(
        ([, val]) =>
          (val as Record<typeof RESSOURCES[number], number>)[res] || 0
      )
    )
    return acc
  }, {} as Record<typeof RESSOURCES[number], number>)
  console.log(`🚀TCL ~ maxCost`, maxCost)

  while (minutes < max) {
    console.log(`🚀TCL ~ minutes`, minutes, 'statesSize', states.length)

    minutes++
    const nextStates = [] as Array<typeof init>
    states.forEach((state) => {
      // console.log(`🚀TCL ~~~~~~~~~~~`)
      const canBuyOreRobot = state.ore >= robotCost.oreRobot.ore
      const canBuyClayRobot = state.ore >= robotCost.clayRobot.ore
      const canBuyObsidianRobot =
        state.ore >= robotCost.obsidianRobot.ore &&
        state.clay >= robotCost.obsidianRobot.clay
      const canBuyGeodeRobot =
        state.ore >= robotCost.geodeRobot.ore &&
        state.obsidian >= robotCost.geodeRobot.obsidian

      const next = collectResources(state) //?
      !canBuyObsidianRobot && !canBuyGeodeRobot
      nextStates.push(next)
      next.geode > 0 && geodes.push(next)

      // console.table({ state, next })

      // canBuyOreRobot && console.log('Buy Ore Robot')
      if (canBuyOreRobot && state.oreRobots < maxCost.ore)
        nextStates.push(
          {
            ...next,
            oreRobots: next.oreRobots + 1,
            ore: next.ore - robotCost.oreRobot.ore,
          } //?
        )
      // canBuyClayRobot && console.log('Buy Clay Robot')
      if (canBuyClayRobot && state.clayRobots < maxCost.clay)
        nextStates.push({
          ...next,
          clayRobots: next.clayRobots + 1,
          ore: next.ore - robotCost.clayRobot.ore,
        })
      // canBuyObsidianRobot && console.log('Buy Obsidian Robot')
      if (canBuyObsidianRobot && state.obsidianRobots < maxCost.obsidian)
        nextStates.push({
          ...next,
          obsidianRobots: next.obsidianRobots + 1,
          ore: next.ore - robotCost.obsidianRobot.ore,
          clay: next.clay - robotCost.obsidianRobot.clay,
        })
      // canBuyGeodeRobot && console.log('Buy Geode Robot')
      if (canBuyGeodeRobot)
        nextStates.push({
          ...next,
          geodeRobots: next.geodeRobots + 1,
          ore: next.ore - robotCost.geodeRobot.ore,
          obsidian: next.obsidian - robotCost.geodeRobot.obsidian,
        })
      // console.table(nextStates)
    })
    states = nextStates //?
  }
  console.table(states)
  console.table(geodes)
})
