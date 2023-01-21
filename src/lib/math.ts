export function approach (prev: number | undefined, target: number, factor: number = 0.5, threshold: number = 0.001): number {
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

export function toInt (input: any): number {
  if (input === null || input === undefined || input === false) return 0
  if (input === true) return 1
  if (typeof input === 'number') return input | 0
  if (typeof input !== 'string') return 0
  return parseInt(input, 10)
}
