import { useTestCase } from "./parse.ts"
console.time("⌛ExecutionTime")

const { valves: valvesArr, p1, p2 } = useTestCase("3")
const valvesMap = valvesArr.reduce(
  (acc, { name, leads, flow }) => acc.set(name, { flow, leads }),
  new Map<string, { flow: number; leads: Map<string, number> }>()
)

const allPathsMap: typeof valvesMap = new Map()
const valves = [...valvesMap.keys()]

console.time("⌛Dikstra, Calculate all Paths")
valves.forEach((valveName) => {
  const visited: string[] = [valveName]
  const queue = [{ name: valveName, distTraveled: 0 }]
  const startValve = valvesMap.get(valveName)!
  const valveForPathing = { ...startValve, leads: new Map() }
  while (queue.length > 0) {
    const queueVal = queue.shift()!
    const valve = valvesMap.get(queueVal.name)!
    valve.leads.forEach((dist, lead) => {
      if (visited.includes(lead)) return
      visited.push(lead)
      queue.push({ name: lead, distTraveled: dist + queueVal.distTraveled })
      valveForPathing.leads.set(lead, dist + queueVal.distTraveled)
    })
  }
  allPathsMap.set(valveName, valveForPathing)
})

console.timeEnd(`⌛Dikstra, Calculate all Paths`)

console.time("⌛Calculate max flow of paths")
const maxFlowPerPath = new Map<string[], number>()
const walk = (
  path: string[],
  timeLeft: number,
  flow: number,
  nodesLeft: string[]
) => {
  if (nodesLeft.length === 0) maxFlowPerPath.set(path, flow)
  const nodeStart = allPathsMap.get(path[path.length - 1])!
  nodesLeft.forEach((nodeTo) => {
    const cost = nodeStart.leads.get(nodeTo)!
    const newTimerLeft = timeLeft - (cost + 1)
    maxFlowPerPath.set(path, flow)
    if (newTimerLeft <= 0) return
    walk(
      [...path, nodeTo],
      newTimerLeft,
      flow + newTimerLeft * allPathsMap.get(nodeTo)!.flow,
      nodesLeft.filter((v) => v !== nodeTo)
    )
  })
}

const nonZeroValves = valves.filter((v) => allPathsMap.get(v)!.flow > 0)
walk(["AA"], 26, 0, nonZeroValves)

let maxFlowAlone: [number, string[]] = [0, []]
maxFlowPerPath.forEach((flow, path) => {
  if (flow > maxFlowAlone[0]) {
    maxFlowAlone = [flow, path]
  }
})
console.timeEnd("⌛Calculate max flow of paths")
// console.log("Founds Paths:", maxFlowPerPath)
console.log("Founds Paths:", maxFlowPerPath.size)

console.log(`╔══ Challenge 1: Maximum Flow alone`)
console.log(`║ Expected`, p1.solution, p1.description)
console.log(`║ Result  `, maxFlowAlone[0], `|AA|${maxFlowAlone[1].join("|")}`)
console.log(`╚══════════════`)

const areArraysDisjoint = <T>(arr1: T[], arr2: T[]) =>
  arr1.every((value) => !arr2.includes(value) || value === "AA")

let maxFlow: [number, string[], string[]] = [0, [], []]

console.time("⌛Find disjoint Paths with max flow")
const size = maxFlowPerPath /*?*/.size
const path = [...maxFlowPerPath.entries()].sort((a, b) => b[1] - a[1])

let iter = 0

let lowestBound = size
for (let i = 0; i < lowestBound; i++) {
  // // // // i % 10_000 === 0 && console.log(`🚀TCL ~ i`, i)
  const [out_path, out_flow] = path[i]

  for (let j = i + 1; j < lowestBound; j++) {
    const [in_path, in_flow] = path[j]
    iter++
    const isDisjunct = areArraysDisjoint(out_path, in_path)
    const combinedFlow = out_flow + in_flow
    if (isDisjunct && combinedFlow > maxFlow[0]) {
      console.log(
        "test",
        i,
        j,
        size,
        `${out_flow} + ${in_flow} =`,
        combinedFlow
      )
      maxFlow = [combinedFlow, out_path, in_path]
      lowestBound = j
    }
  }
}
console.log(`╔══ Challenge 2: Maximum Flow, partnered with an elephant`)
console.log(`║ Expected`, p2.solution, p2.description.replace("\n", ""))
console.log(`║ Result  `, maxFlow, p1.description)
console.log(`║ Iterations  `, iter)
console.log(`╚══════════════`)
console.timeEnd("⌛Find disjoint Paths with max flow")

console.timeEnd("⌛ExecutionTime")
// */
