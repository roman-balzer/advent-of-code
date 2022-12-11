const input = await Deno.readTextFile("./02/input.txt");

// A X Rock 1p
// B Y Paper 2p
// C Z Scissors 3p

const points = input
  .split(/\r?\n/)
  .filter((round) => round.length !== 0)
  .map((round) => round.split(" "))
  .map((curr) => {
    const [enemy, player] = curr;
    const shapePoint = player === "X" ? 1 : player === "Y" ? 2 : 3;
    const enemyShapePoint = enemy === "A" ? 1 : enemy === "B" ? 2 : 3;
    const roundPoint =
      shapePoint === enemyShapePoint
        ? 3
        : (enemy === "A" && player === "Y") ||
          (enemy === "B" && player === "Z") ||
          (enemy === "C" && player === "X")
        ? 6
        : 0;
    return shapePoint + roundPoint;
  })
  .reduce((acc, curr) => acc + curr, 0);

const points2 = input
  .split(/\r?\n/)
  .map((curr) => {
    switch (curr) {
      case "A X":
        return 1 + 3;
      case "A Y":
        return 2 + 6;
      case "A Z":
        return 3 + 0;
      case "B X":
        return 1 + 0;
      case "B Y":
        return 2 + 3;
      case "B Z":
        return 3 + 6;
      case "C X":
        return 1 + 6;
      case "C Y":
        return 2 + 0;
      case "C Z":
        return 3 + 3;
      default:
        return 0;
    }
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log("Points", points);
console.log("Points 2", points2);
