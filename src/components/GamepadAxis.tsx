import { useAnimationFrame } from '../hooks/useAnimationFrame.js'
import { toInt } from '../lib/math.js'
import { Axis } from './Axis.js'

export interface GameAxisProps {
  index: number | string
  axis: number | string
}

export function GamepadAxis ({ index, axis }: GameAxisProps): JSX.Element {
  useAnimationFrame()
  const gamepad = navigator.getGamepads()[toInt(index)]
  const value = gamepad?.axes[toInt(axis)]
  return Axis({ value })
}
