import { useAnimationFrame } from '../hooks/useAnimationFrame.js'
import { toInt } from '../lib/math.js'
import { Normal } from './Normal.js'

export interface GamepadButtonProps {
  index: number | string
  button: number | string
}

export function GamepadButton ({ index, button }: GamepadButtonProps): JSX.Element {
  useAnimationFrame()
  const gamepad = navigator.getGamepads()[toInt(index)]
  const btn = gamepad?.buttons[toInt(button)]
  return Normal(btn ?? { value: 0 })
}
