import { SVGProps, useMemo } from 'react'
import { GradientName, gradientNames } from '../lib/gradients'
import { useAnimationFrame } from '../hooks/useAnimationFrame'
import { approachValue, mode, press } from '../lib/frame'
import { randomInt } from '../lib/math'

export type EyesProps = { index: number } & Omit<SVGProps<SVGSVGElement>, 'viewBox'>

export function Eyes ({ index, ...props }: EyesProps): JSX.Element {
  useAnimationFrame()
  const state = useMemo(() => ({
    id: `eyes-gamepad-${index}`,
    gradient: randomInt(gradientNames.length),
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

  const input = {
    r: gamepad.buttons[14].pressed,
    l: gamepad.buttons[15].pressed,
    b: gamepad.buttons[0].pressed,
    r1: gamepad.buttons[5].pressed,
    l1: gamepad.buttons[4].pressed,
    down: gamepad.buttons[13].pressed,
    r2: { axis: gamepad.axes[6], value: gamepad.buttons[7].value },
    l2: { axis: gamepad.axes[5], value: gamepad.buttons[6].value },
    right: { x: gamepad.axes[2], y: gamepad.axes[3] },
    left: { x: gamepad.axes[0], y: gamepad.axes[1] }
  }
  if (state.eyeL(input.l)) {
    state.gradient = (state.gradient + 1) % gradientNames.length
  }
  if (state.eyeR(input.r)) {
    let gradient = state.gradient - 1
    if (gradient < 0) {
      gradient = gradientNames.length - 1 
    }
    state.gradient = gradient
  }
  const lids = state.lids(input?.l1 ? 'left' : input?.r1 ? 'right' : undefined)
  const eyes = state.eyes(input?.b ? 'left' : input?.down ? 'right' : undefined)
  const gradient = gradientNames[state.gradient]
  return <svg viewBox='-300 -40 600 80' {...props}>
    {Eye({
      id: `${state.id}-left`,
      type: 'left',
      gradient,
      open: state.lidL(lids === 'right' ? input.r2 : input.l2),
      pupil: eyes === 'right' ? input.right : input.left
    })}
    {Eye({
      id: `${state.id}-right`,
      type: 'right',
      gradient,
      open: state.lidR(lids === 'left' ? input.l2 : input.r2),
      pupil: eyes === 'left' ? input.left : input.right 
    })}
  </svg>
}

interface EyeProps {
  id: string
  type: 'left' | 'right'
  gradient: GradientName
  open: number
  pupil: {
    x: number
    y: number
    size?: number
  }
}

function Eye ({ id, type, pupil, open, gradient }: EyeProps): JSX.Element {
  const deg = Math.atan2(pupil.y, pupil.x)
  const dist = Math.sqrt(pupil.x * pupil.x + pupil.y * pupil.y)
  const scale = type === 'left' ? -1 : 1
  const px = Math.cos(deg) * dist * 80
  const py = Math.sin(deg) * dist * (pupil.y > 0 ? 40 : 50)
  return <g className="eye eye-left" transform={`translate(${135 * scale},0)`}>
    <mask id={`mask-${id}`}>
      <use xlinkHref="#eye-shape" transform={`scale(${scale},${open})`} />
    </mask>
    <g mask={`url(#mask-${id})`}>
      <use xlinkHref="#eye-bg" />
      <circle cx={px} cy={py} r={30} fill={`url(#gradient-${gradient})`} />
      <circle cx={px} cy={py} r={13 + (pupil.size ?? 0.5) * 5} fill="#000" />
    </g>
  </g>
}
