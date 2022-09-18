export function randomInt(min: number, max: number): number {
  const random = Math.random();
  return Math.floor(min + random * (max - min));
}
