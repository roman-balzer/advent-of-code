// @deno-types="npm:@types/react"
import React from "npm:react@17"
import { render, Box, Text, Transform } from "npm:ink"
import Color from "npm:ink-color-pipe"

type BaseProps = {
  board: {
    xmin: number
    xmax: number
    ymin: number
    ymax: number
  }
  field: ("." | "+" | "o" | "#")[][]
}

export const Base = ({ board, field = [] }: BaseProps) => {
  return (
    <Box flexDirection="column" padding={0}>
      <Box flexDirection="row">
        <Box width={6} borderStyle></Box>
        <Box height={5} borderStyle="round">
          {Array.from({ length: board.xmax - board.xmin }).map((_, i) =>
            (board.xmin + i) % 5 === 0 ? (
              <Box width={1} key={"filled-" + i}>
                <Text>{board.xmin + i}</Text>
              </Box>
            ) : (
              <Box width={1} key={"empty-" + i}></Box>
            )
          )}
        </Box>
      </Box>
      <Box flexDirection="row" marginTop={-1}>
        <Box
          flexDirection="column"
          width={6}
          borderStyle="round"
          marginLeft={1}
        >
          {Array.from({ length: board.ymax - board.ymin }).map((_, i) => (
            <Box height={1} key={"filled-" + i}>
              <Text>{String(board.ymin + i).padStart(3, "0")}</Text>
            </Box>
          ))}
        </Box>
        <Box borderStyle="single" marginLeft={-1} flexDirection="column">
          {field.map((row, i) => (
            <Text key={"row-" + i} flexDirection="row">
              {row.map((cell, j) => (
                <CellWithColor key={"cell-" + i + "-" + j} symbol={cell} />
              ))}
            </Text>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

const CellWithColor = ({ symbol }: { symbol: "." | "+" | "o" | "#" }) => {
  switch (symbol) {
    case ".":
      return <Color styles="white">.</Color>
    case "+":
      return (
        <Color styles="yellow" bold>
          ▼
        </Color>
      )
    case "o":
      return <Color styles="yellow">▒</Color>
    case "#":
      return <Color styles="bgWhite"> </Color>
    default:
      return <Color styles="white">.</Color>
  }
}
