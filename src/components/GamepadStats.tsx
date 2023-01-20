import { useAnimationFrame } from '../hooks/useAnimationFrame.js'
import { toInt } from '../lib/math.js'
import { Axis } from './Axis.js'
import { Axis2D } from './Axis2D.js'
import { Normal } from './Normal.js'

export interface GamepadStatsProps {
  index: number | string | undefined
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
    <dl>
      <dt>id</dt>
      <dd>{gamepad.id}</dd>
      <dt>timestamp</dt>
      <dd>{gamepad.timestamp}</dd>
    </dl>
    <div className="gamepad-axes">
      {axes.map(([x, y], index) => <div className="gamepad-axis2d" key={`axis-2d-${index}`}>{Axis2D({ x, y })}</div>)}
    </div>
    <div className="gamepad-buttons">
      {gamepad.buttons.map(({value}, index) => <div className="gamepad-button" key={`button-${index}`}>{Normal({ value })}</div>)}
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
