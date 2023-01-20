import { useLayoutEffect, useState } from 'react'

export function useAnimationFrame (): number {
  let [time, setTime] = useState<number>(0)
  useLayoutEffect(() => {
    const animate = () => {
      setTime(time += 1)
      frame = requestAnimationFrame(animate)
    }
    let frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [setTime])
  return time
}
