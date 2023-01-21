export interface Axis2DProps {
  x: number | undefined
  y: number | undefined
}
export function Axis2D ({ x, y }: Axis2DProps): JSX.Element {
  return <svg viewBox='0 0 21 21' width="3em">
    <rect x={.5} y={.5} width={20} height={20} fill='rgba(0,0,0,0)' strokeWidth={0.5} stroke={(x !== undefined && y !== undefined) ? '#aaa' : '#ddd'} />
    {x !== undefined ? <line y1={0} y2={21} x1={(x * 10) + 10.5} x2={(x * 10) + 10.5} strokeWidth={0.75} stroke='#000' /> : null}
    {y !== undefined ? <line x1={0} x2={21} y1={(y * 10) + 10.5} y2={(y * 10) + 10.5} strokeWidth={0.75} stroke='#000' /> : null}
  </svg>
}
