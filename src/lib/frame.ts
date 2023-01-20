import { approach } from './math.js'

export function press () {
  let state = false
  return (newState: boolean) => {
    if (state !== newState) {
      state = newState
      if (newState) {
        return true
      }
    }
    return false
  }
}

export function mode <T> (): (newMode: T | undefined) => T | undefined {
  let mode: T | undefined
  return (newMode) => {
    if (newMode && mode) return mode
    mode = newMode
    return newMode
  }
}

export function approachValue (value: number): (target: { axis: number, value: number }) => number {
  return (target) => {
    if (target.axis !== undefined) return (target.axis + 1.0) / 2.0
    value = approach(value, target.value ?? 0)
    return value
  }
}
