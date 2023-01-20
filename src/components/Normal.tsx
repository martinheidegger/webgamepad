export interface NormalProps {
  value: number | undefined
}
export function Normal ({ value }: NormalProps): JSX.Element {
  return <svg viewBox='0 0 21 21' width="20" height="20">
    {value !== undefined ? <rect y={20 - value * 20} height={21} width={21} fill='#000' /> : null}
    <rect x={.5} y={.5} width={20} height={20} fill='rgba(0,0,0,0)' stroke={value !== undefined ? 'black' : '#aaa'} />
  </svg>
}
