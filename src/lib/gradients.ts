import Color from 'color'

const red =  '#890B0B'
const raw = {
  red,
  orange: Color(red).rotate(20).lighten(0.5).hex(),
  brown: Color(red).rotate(35).hex(),
  lightGreen: Color(red).rotate(60).hex(),
  green: Color(red).rotate(100).hex(),
  torqoise: Color(red).rotate(170).hex(),
  blue: Color(red).rotate(230).lighten(0.2).hex(),
  lightBlue: Color(red).rotate(200).lighten(0.1).hex(),
  violet: Color(red).rotate(280).lighten(0.1).hex(),
  pink: Color(red).rotate(300).lighten(0.5).hex()
} as const

export type GradientName = keyof typeof raw
export const gradientNames = Object.keys(raw) as GradientName[]

export const gradients = Object.entries(raw).map(([name, hex]) => ({
  id: `gradient-${name}`,
  from: Color(hex).lighten(0.95).hex(),
  to: hex
}))
