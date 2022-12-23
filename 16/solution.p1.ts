import { parseD16Input } from "./parse.ts"

const valves = await parseD16Input(!true)

const nonZeroValves = valves.filter((v) => v.flow !== 0 || v.name === "AA")
const zeroValves = valves.filter((v) => v.flow === 0 && v.name !== "AA")

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
// console.log(`valvesMap`, valvesMap)

const keys = Array.from(valvesMap.keys()).filter((k) => k !== "AA")
console.log(`keys`, keys)

const calcFlow = (permutation: string[]) => {
  let timer = 30
  let flow = 0
  permutation.forEach((valve, idx, arr) => {
    const comingFrom = valvesMap.get(arr[idx - 1] || "AA")!
    const distance = comingFrom.leads.get(valve)!
    timer -= distance + 1
    flow += timer * valvesMap.get(valve)!.flow
  })
  return flow
}

const walkPaths = (nodes: string[]) => {
  const distances = nodes.map((val) => {
    const dist = [val].reduce((acc, valve, idx, arr) => {
      const comingFrom = valvesMap.get(arr[idx - 1] || "AA")!
      const distance = comingFrom.leads.get(valve)!
      return acc + distance
    }, 0)
    return {
      dist,
      path: [val],
      remainingNodes: nodes.filter((v) => val !== v),
    }
  })
  return distances
}

let startPoints = walkPaths(keys)
console.log(`🚀TCL ~ file: solution.p1.ts:161 ~ startPoints`, startPoints)

while (true) {
  startPoints = startPoints
    .map((path) => {
      const nexPaths = path.remainingNodes
        .map((nextP, _, arr) => {
          const prevNode = path.path[path.path.length - 1]
          return {
            dist: path.dist + valvesMap.get(prevNode)!.leads.get(nextP)!,
            path: [...path.path, nextP],
            remainingNodes: arr.filter((v) => v !== nextP),
          }
        })
        .filter((path) => path.dist <= 30)
      return [{ ...path, remainingNodes: [] }, ...nexPaths]
    })
    .flat()
  if (!startPoints.some((path) => path.remainingNodes.length > 0)) {
    break
  }
}

console.log(
  `🚀TCL ~ file: solution.p1.ts:161 ~ startPoints`,
  startPoints,
  startPoints.length
)

console.log(
  `distances`,
  calcFlow.sort((a, b) => b - a)
)
console.log(`max distance`, Math.max(...calcFlow))
