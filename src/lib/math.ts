export function approach (prev: number | undefined, target: number, threshold: number = 0.001, factor: number = 0.5): number {
  if (prev === undefined) {
    return target
  }
  const diff = target - prev
  if (Math.abs(diff) < threshold) {
    return target
  }
  return prev + diff * factor
}

export function randomInt (max: number): number {
  return ((Math.random() * max) | 0) % max
}

export function randomEntry <T> (list: T[]): T {
  return list[randomInt(list.length)]
}
