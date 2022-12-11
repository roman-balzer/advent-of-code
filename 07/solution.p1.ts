const input = await Deno.readTextFile("./07/input.txt")

const cmdLines = input.split(/\r?\n/)

type Dir = { name: string; children: Array<Dir | File>; folderSize?: number }
type File = { name: string; size: number }

const tree = [] as Array<Dir | File>
let view = tree
cmdLines.forEach((cmdLine) => {
  if (cmdLine === "$ cd /" || cmdLine === "$ ls") return
  if (cmdLine.startsWith("$ cd")) {
    const dirName = cmdLine.split(" ")[2]
    view = view.find(
      (child): child is Dir => "children" in child && child.name === dirName
    )!.children
  } else if (cmdLine.startsWith("dir")) {
    const dirName = cmdLine.split(" ")[1]
    view.push({
      name: dirName,
      children: [{ name: "..", children: view } as Dir],
    })
  } else {
    const [size, fileName] = cmdLine.split(" ")
    view.push({ name: fileName, size: Number(size) })
  }
})

let sumOfBelow = 0

const sumOfDir = (dir: Array<Dir | File>): number => {
  const dirSize = dir.reduce((sum, child) => {
    if ("size" in child) return sum + child.size
    if (child.name === "..") return sum
    return sum + sumOfDir(child.children)
  }, 0)
  if (dirSize <= 100_000) {
    sumOfBelow += dirSize
  }
  return dirSize
}

sumOfDir(tree)
console.log(`🚀TCL ~ file: solution.ts:30 ~ sumOfBelow`, sumOfBelow)
