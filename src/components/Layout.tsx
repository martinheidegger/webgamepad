import { Outlet } from 'react-router'
import { useGamepads } from '../hooks/useGamepads'
import { gradients } from '../lib/gradients'
import { Eyes } from './Eyes'

const eyePath = `
  M -101.0,   0.0
  C  -68.3, -42.5 -36.0, -64.0   -4.2, -64.0
  C   53.7, -64.0  88.8, -42.5  101.0,   0.0
  C   66.8,  34.9  31.8,  52.3   -4.2,  52.0
  C  -40.1,  52.0 -72.5,  34.4 -101.0,   0.0
  Z
`

export function Layout (): JSX.Element {
  const gamepads = useGamepads()
  return <>
    <svg width="0" height="0"><defs>
      <rect id='eye-bg' x={-150} y={-150} width={300} height={300} fill="white"/>
      <path id='eye-shape' d={eyePath} fill="white" />
      {gradients.map(gradient =>
        <radialGradient key={gradient.id} id={gradient.id} cx="50%" cy="50%" fx="50%" fy="50%" r="50%" gradientTransform="translate(0.500000,0.500000),rotate(90.000000),scale(1.000000,0.999053),translate(-0.500000,-0.500000)">
          <stop stopColor={gradient.from} offset="0%"></stop>
          <stop stopColor={gradient.to} offset="67.7350238%"></stop>
          <stop stopColor={gradient.to} offset="100"></stop>
        </radialGradient>
      )}
    </defs></svg>
    <div className="presentation">
      <Outlet />
      <div className="all-eyes">
        {gamepads.length === 0 ? <div className="no-gamepads">No Gamepads connected!</div> : null}
        {gamepads.map(index => <Eyes className='eyes' key={`gamepad-${index}`} index={index}/>)}
      </div>
    </div>
  </>
}
