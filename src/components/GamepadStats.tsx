import { useAnimationFrame } from '../hooks/useAnimationFrame.js'
import { toInt } from '../lib/math.js'
import { Axis } from './Axis.js'
import { Axis2D } from './Axis2D.js'
import { Normal } from './Normal.js'

export interface GamepadStatsProps {
  index: number | string | undefined
}

function sliced <T> (input: readonly T[], items: number): T[][] {
  const result: T[][] = []
  for (let start = 0; start < input.length;) {
    let end = start + items
    result.push(input.slice(start, end))
    start = end
  }
  return result
}

function GamepadStat (gamepad: Gamepad | null | undefined, index: number): JSX.Element {
  if (!gamepad) {
    return <div className="gamepad" key={`gamepad-${index}`}>
      <code>{gamepad === null ? 'null' : 'undefined'}</code> 
    </div>
  }
  const axes = gamepad.axes.reduce((pairs, axe, index) => {
    const pairIndex = index >> 1
    if (index % 2 === 0) {
      pairs[pairIndex] = [axe, 0]
    } else {
      pairs[pairIndex][1] = axe
    }
    return pairs
  }, [] as [x: number, y: number][])
  return <div className="gamepad" key={`gamepad-${index}`}>
    <h3>{gamepad.id}</h3>
    <sub>{gamepad.timestamp}</sub>
    <div className="gamepad-items">
      <div className="gamepad-axis">
        {axes.map(([x, y], index) => <div className="gamepad-axis2d" key={`axis-2d-${index}`}>{Axis2D({ x, y })}</div>)}
      </div>
      <div className="gamepad-buttons">
        {sliced(gamepad.buttons, 5).map(buttons => <div className="gamepad-buttonGroup">
          {buttons.map((btn, index) => <div className="gamepad-button" key={`button-${index}`}>{Normal(btn)}</div>)}
        </div>)}
      </div>
    </div>
  </div>
}

export function GamepadStats ({ index }: GamepadStatsProps): JSX.Element {
  useAnimationFrame()
  let gamepads = navigator.getGamepads()
  if (index) {
    gamepads = gamepads.filter(pad => pad?.index === toInt(index))
  }
  return <>
    {gamepads.map(GamepadStat)}
  </>
}
