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
