import { T1, T2, T3, T4, T5, T_Example, T_Input } from "./testcases.ts"

export const parseD16Input = async (example?: boolean) => {
  const input = await Deno.readTextFile(
    example ? "./16/input.example.txt" : "./16/input.txt"
  )

  const rules = input.matchAll(
    /Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? ([\w, ]+)/g
  )

  const valves = Array.from(rules, ([_, name, flow, leads]) => ({
    name,
    flow: Number(flow),
    leads: new Map(leads.split(", ").map((name) => [name, 1])),
  }))

  return valves
}

export const useTestCase = (
  testCase: "1" | "2" | "3" | "4" | "5" | "example" | "input"
) => {
  let data
  switch (testCase) {
    case "example":
      data = T_Example
      break
    case "input":
      data = T_Input
      break
    case "1":
      data = T1
      break
    case "2":
      data = T2
      break
    case "3":
      data = T3
      break
    case "4":
      data = T4
      break
    case "5":
      data = T5
      break
    default:
      data = T1
      break
  }

  const rules = data?.data.matchAll(
    /Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? ([\w, ]+)/g
  )

  const valves = Array.from(rules, ([_, name, flow, leads]) => ({
    name,
    flow: Number(flow),
    leads: new Map(leads.split(", ").map((name) => [name, 1])),
  }))

  return { valves, p1: data.p1, p2: data.p2 }
}
