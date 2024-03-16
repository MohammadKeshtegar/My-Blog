export function limitText(string) {
  return string.split(" ").slice(0, 3).join(" ");
}
