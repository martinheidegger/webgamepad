export interface NormalProps {
  value: number | undefined
  pressed?: boolean
}
export function Normal ({ value, pressed }: NormalProps): JSX.Element {
  const active = pressed ? '#000' : '#aaa'
  return <svg viewBox='0 0 21 21' width="2em">
    {value !== undefined ? <rect y={20 - value * 20} height={21} width={21} fill={active} /> : null}
    <rect x={.5} y={.5} width={20} height={20} fill='rgba(0,0,0,0)' stroke={value !== undefined ? active : '#bbb'} />
  </svg>
}
