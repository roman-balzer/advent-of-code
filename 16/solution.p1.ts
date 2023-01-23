import { parseD16Input } from "./parse.ts"
console.time("ExecutionTime")

const valvesArr = await parseD16Input(!true)

const nonZeroValves = valvesArr.filter((v) => v.flow !== 0 || v.name === "AA")
const zeroValves = valvesArr.filter((v) => v.flow === 0 && v.name !== "AA")

zeroValves.forEach((outer) => {
  zeroValves.forEach((inner) => {
    if (outer === inner) return
    if (inner.leads.has(outer.name)) {
      const d = inner.leads.get(outer.name)!
      const outerArr = Array.from(outer.leads).filter(
        ([name]) => name !== inner.name
      )
      const innerArr = Array.from(inner.leads).filter(
        ([name]) => name !== outer.name
      )
      const mappedInner = innerArr
        .map(([name, dist]) => [name, dist + d] as [string, number])
        .filter((innerV) => !outer.leads.has(innerV[0]))
      const mappedOuter = outerArr
        .map(([name, dist]) => [name, dist + d] as [string, number])
        .filter((outerV) => !inner.leads.has(outerV[0]))
      outerArr.push(...mappedInner)
      innerArr.push(...mappedOuter)
      outer.leads = new Map(outerArr)
      inner.leads = new Map(innerArr)
    }
  })
})

zeroValves.forEach((zValve) => {
  nonZeroValves.forEach((nValve) => {
    if (nValve.leads.has(zValve.name)) {
      const distToZero = nValve.leads.get(zValve.name)!
      nValve.leads.delete(zValve.name)
      zValve.leads.forEach((dist, valve) => {
        valve !== nValve.name && nValve.leads.set(valve, dist + distToZero)
      })
    }
  })
})

nonZeroValves.forEach((outer) => {
  nonZeroValves.forEach((inner) => {
    if (outer === inner) return
    if (inner.leads.has(outer.name)) {
      const d = inner.leads.get(outer.name)!
      const outerArr = Array.from(outer.leads)
      const innerArr = Array.from(inner.leads)
      const mappedInner = innerArr
        .map(([name, dist]) => [name, dist + d] as [string, number])
        .filter((innerV) => !outer.leads.has(innerV[0]))
        .filter(([name]) => name !== outer.name)
      const mappedOuter = outerArr
        .map(([name, dist]) => [name, dist + d] as [string, number])
        .filter((outerV) => !inner.leads.has(outerV[0]))
        .filter(([name]) => name !== inner.name)
      outerArr.push(...mappedInner)
      innerArr.push(...mappedOuter)
      outer.leads = new Map(outerArr)
      inner.leads = new Map(innerArr)
    }
  })
})

const valvesMap = nonZeroValves.reduce(
  (acc, { name, leads, flow }) => acc.set(name, { flow, leads }),
  new Map<string, { flow: number; leads: Map<string, number> }>()
)
const valves = Array.from(valvesMap.keys()).filter((v) => v !== "AA")

const maxFlowPerPath = new Map<string, number>()

const walk = (
  nodeFrom: string,
  timeLeft: number,
  flow: number,
  nodesLeft: string[],
  path: string
) => {
  if (nodesLeft.length === 0) return
  const nodeStart = valvesMap.get(nodeFrom)!
  nodesLeft.forEach((nodeTo) => {
    const nodeDef = valvesMap.get(nodeTo)!
    const newTimerLeft = timeLeft - (nodeStart.leads.get(nodeTo)! + 1)
    const newFlow = flow + newTimerLeft * nodeDef.flow
    const newPath = `${path}-${nodeTo}`
    const newNodesLeft = nodesLeft.filter((v) => v !== nodeTo)
    if (newTimerLeft < 0) return
    maxFlowPerPath.set(newPath, newFlow)
    walk(nodeTo, newTimerLeft, newFlow, newNodesLeft, newPath)
  })
}

walk("AA", 30, 0, valves, "AA")

console.log(`🚀TCL ~ file: solution.p1.ts:94 ~ arr`, maxFlowPerPath)

console.log(
  `max distance`,
  Math.max(...Array.from(maxFlowPerPath).map((v) => v[1]))
)
console.timeEnd("ExecutionTime")
