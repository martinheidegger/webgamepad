import { useAnimationFrame } from '../hooks/useAnimationFrame.js'
import { toInt } from '../lib/math.js'
import { Axis2D } from './Axis2D.js'

export interface GameAxis2DProps {
  index: number | string
  x: number | string
  y: number | string
}

export function GamepadAxis2D ({ index, x, y }: GameAxis2DProps): JSX.Element {
  useAnimationFrame()
  const gamepad = navigator.getGamepads()[toInt(index)]
  const xAxis = gamepad?.axes[toInt(x)]
  const yAxis = gamepad?.axes[toInt(y)]
  return Axis2D({ x: xAxis, y: yAxis })
}
