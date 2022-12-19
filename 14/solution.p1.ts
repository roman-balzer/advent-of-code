// @deno-types="npm:@types/terminal-kit"
import terminalKit from "npm:terminal-kit"

// const input = await Deno.readTextFile("./14/input.txt")

const term = terminalKit.terminal

term("Hello world!\n")

// This output 'red' in red
term.red("red")

// This output 'bold' in bold
term.bold("bold")

// output 'mixed' using bold, underlined & red, exposing the style-mixing syntax
term.bold.underline.red("mixed")

// printf() style formatting everywhere:
// this will output 'My name is Jack, I'm 32.' in green
term.green("My name is %s, I'm %d.\n", "Jack", 32)

// Since v0.16.x, style markup are supported as a shorthand.
// Those two lines produce the same result.
term("My name is ").red("Jack")(" and I'm ").green("32\n")
term("My name is ^rJack^ and I'm ^g32\n")
