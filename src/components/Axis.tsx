export interface AxisProps {
  value: number | undefined
}
export function Axis ({ value }: AxisProps): JSX.Element {
  return <svg viewBox='0 0 21 21' width="20" height="20">
    {value !== undefined ? <line x1={0} x2={21} y1={value * 10 + 10.5} y2={value * 10 + 10.5} stroke='#000' /> : null}
    <rect x={.5} y={.5} width={20} height={20} fill='rgba(0,0,0,0)' stroke={value !== undefined ? 'black' : '#aaa'} />
  </svg>
}
