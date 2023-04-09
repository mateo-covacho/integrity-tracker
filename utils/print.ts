export function print(color: any, text: any) {
  const colors = {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[38;5;226m	",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    reset: "\x1b[0m",
    orange: "\x1b[38;5;208m",
  };

  if (!(color in colors)) {
    console.log(typeof text === "object" ? JSON.stringify(text) : text);
  } else {
    // @ts-ignore
    console.log(`${colors[color]}${typeof text === "object" ? JSON.stringify(text) : text}${colors.reset}`);
  }
}
