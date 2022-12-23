// deno-lint-ignore-file no-explicit-any
// @deno-types="npm:@types/terminal-kit"
import tk from "npm:terminal-kit"

type Test = Omit<tk.ScreenBuffer.Options, "width" | "height"> & {
  width: Required<tk.ScreenBuffer.Options>["width"]
  height: Required<tk.ScreenBuffer.Options>["height"]
}

export const createScreenBuffer = (options: Test) => {
  const buffer = new tk.ScreenBuffer({
    ...options,
    width: options.width + 4,
    height: options.height + 2,
  })
  buffer.fill({ attr: { bgColor: 0 } })

  buffer.put({} as any, "╔" + "═".repeat(options.width + 2))
  buffer.put({ direction: "down" } as any, "╗" + "║".repeat(options.height))
  buffer.put({ direction: "left" } as any, "╝" + "═".repeat(options.width + 2))
  buffer.put({ direction: "up" } as any, "╚" + "║".repeat(options.height))
  buffer.draw()

  return buffer
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
