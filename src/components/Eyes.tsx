import { SVGProps, useMemo } from 'react'
import { GradientName, gradientNames } from '../lib/gradients.js'
import { useAnimationFrame } from '../hooks/useAnimationFrame.js'
import { approachValue, mode, press } from '../lib/frame.js'
import { randomInt } from '../lib/math.js'

export type EyesProps = { index: number } & Omit<SVGProps<SVGSVGElement>, 'viewBox'>

function extractButton (axis: number | undefined, aim: number): boolean | undefined {
  if (axis === undefined) return undefined
  return Math.abs(aim - axis) < 0.05
}

export function Eyes ({ index, ...props }: EyesProps): JSX.Element {
  useAnimationFrame()
  const state = useMemo(() => ({
    id: `eyes-gamepad-${index}`,
    gradient: randomInt(gradientNames.length),
    shake: approachValue(0, 0.005),
    pupil: approachValue(0.5, 0.05),
    lidL: approachValue(0),
    lidR: approachValue(0),
    eyeL: press(),
    eyeR: press(),
    lids: mode<'left' | 'right'>(),
    eyes: mode<'left' | 'right'>()
  }), [])

  // On Chrome we need to get the gamepad on every frame (-_-)
  const gamepad = navigator.getGamepads()[index]
  if (!gamepad || !gamepad.connected) return <></>

  const a = gamepad.buttons[1]?.pressed ?? false
  const x = gamepad.buttons[2]?.pressed ?? false
  const pupil = state.pupil({ value: a ? 1 : x ? 0 : 0.5 })
  const input = {
    up: extractButton(gamepad.axes[4], -1) ?? gamepad.buttons[12]?.pressed ?? false,
    down: extractButton(gamepad.axes[4], .15) ?? gamepad.buttons[13]?.pressed ?? false,
    right: extractButton(gamepad.axes[4], -.42) ?? gamepad.buttons[14]?.pressed ?? false,
    left: extractButton(gamepad.axes[4], .71) ?? gamepad.buttons[15]?.pressed ?? false,
    b: gamepad.buttons[0]?.pressed ?? false,
    a,
    rStickPress: gamepad.buttons[11]?.pressed ?? false,
    lStickPress: gamepad.buttons[10]?.pressed ?? false,
    r1: gamepad.buttons[5]?.pressed ?? false,
    l1: gamepad.buttons[4]?.pressed ?? false,
    r2: { axis: gamepad.axes[6], value: gamepad.buttons[7]?.value },
    l2: { axis: gamepad.axes[5], value: gamepad.buttons[6]?.value },
    axes1: { x: gamepad.axes[2], y: gamepad.axes[3], size: pupil },
    axes2: { x: gamepad.axes[0], y: gamepad.axes[1], size: pupil }
  }
  if (state.eyeL(input.left)) {
    state.gradient = (state.gradient + 1) % gradientNames.length
  }
  if (state.eyeR(input.right)) {
    let gradient = state.gradient - 1
    if (gradient < 0) {
      gradient = gradientNames.length - 1 
    }
    state.gradient = gradient
  }
  const lids = state.lids(input?.l1 ? 'left' : input?.r1 ? 'right' : undefined)
  const eyes = state.eyes(input?.lStickPress ? 'left' : input?.rStickPress ? 'right' : undefined)
  const gradient = gradientNames[state.gradient]
  const shake = state.shake({ value: (lids === 'left' ? input?.r1 : lids === 'right' ? input?.l1 : false ?? false) ?  1 : 0 })
  return <svg viewBox='-300 -40 600 80' {...props} shapeRendering='optimizeSpeed'>
    {Eye({
      id: `${state.id}-left`,
      type: 'left',
      gradient,
      shake,
      open: state.lidL(lids === 'right' ? input.r2 : input.l2),
      pupil: eyes === 'right' ? input.axes1 : input.axes2
    })}
    {Eye({
      id: `${state.id}-right`,
      type: 'right',
      gradient,
      shake,
      open: state.lidR(lids === 'left' ? input.l2 : input.r2),
      pupil: eyes === 'left' ? input.axes2 : input.axes1 
    })}
  </svg>
}

interface EyeProps {
  id: string
  type: 'left' | 'right'
  gradient: GradientName
  shake: number
  open: number
  pupil: {
    x: number
    y: number
    size?: number
  }
}

function Eye ({ id, type, pupil, open, gradient, shake }: EyeProps): JSX.Element {
  const deg = Math.atan2(pupil.y, pupil.x)
  const dist = Math.sqrt(pupil.x * pupil.x + pupil.y * pupil.y)
  const scale = type === 'left' ? -1 : 1
  const px = Math.cos(deg) * dist * 80 + shake * Math.random() * 8
  const py = Math.sin(deg) * dist * (pupil.y > 0 ? 40 : 50) + shake * Math.random() * 8
  return <g className="eye eye-left" transform={`translate(${135 * scale},0)`}>
    <mask id={`mask-${id}`}>
      <use xlinkHref="#eye-shape" transform={`scale(${scale},${open})`} />
    </mask>
    <g mask={`url(#mask-${id})`}>
      <use xlinkHref="#eye-bg" />
      <circle cx={px} cy={py} r={30} fill={`url(#gradient-${gradient})`} />
      <circle cx={px} cy={py} r={13 + (pupil.size ?? 0.5) * 12} fill="#000" />
    </g>
  </g>
}
