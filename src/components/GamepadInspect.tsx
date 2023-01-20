import { useAnimationFrame } from '../hooks/useAnimationFrame.js'
import { toInt } from '../lib/math.js'

export interface GamepadInspectProps {
  index: string | number
  field?: 'index' | 'connected' | 'timestamp' | 'mapping' | 'id'
  axis?: string | number
  button?: string | number
}
export function GamepadInspect (props: GamepadInspectProps): JSX.Element {
  useAnimationFrame()
  let value: any
  let prefix: string = ''
  const gamepad = navigator.getGamepads()[toInt(props.index)]
  if (gamepad) {
    const gp = {
      id: gamepad.id,
      index: gamepad.index,
      timestamp: gamepad.timestamp,
      connected: gamepad.connected,
      axes: gamepad.axes,
      buttons: gamepad.buttons.map(button => ({
        pressed: button.pressed,
        touched: button.touched,
        value: button.value,
      })),
      hapticActuators: (gamepad.hapticActuators ?? []).map(actuator => ({
        type: actuator.type
      })),
      mapping: gamepad.mapping,
    }
    if (props.field !== undefined) {
      value = gp[props.field]
    } else if (props.axis !== undefined) {
      value = gp.axes[toInt(props.axis)]
    } else if (props.button !== undefined) {
      value = gp.buttons[toInt(props.button)]
    } else {
      value = gp
    }
  }
  if (props.field !== undefined) {
    prefix = `${props.field} = `
  }
  return <pre><code>{prefix + JSON.stringify(value, null, 2)}</code></pre>
}
