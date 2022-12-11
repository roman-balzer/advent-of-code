const input = await Deno.readTextFile("./03/input.txt");
const dupes = input
  .split(/\r?\n/)
  .map((line) => {
    const head = line.split("").slice(0, line.length / 2);
    const tail = line.split("").slice(line.length / 2, line.length);
    const dupe = head.find((curr) => tail.includes(curr));
    return dupe;
  })
  .filter((curr): curr is string => curr !== undefined);

const points = dupes.map((dupe) => {
  const point = dupe.charCodeAt(0) - 96;
  return point > 0 ? point : dupe.charCodeAt(0) - 38;
});

console.log(`🚀TCL ~ file: solution.ts:3 ~ dupes ~ dupes`, dupes);
console.log(`🚀TCL ~ file: solution.ts:3 ~ points ~ points`, points);

console.log(
  "Sum of points: ",
  points.reduce((acc, curr) => acc + curr, 0)
);
