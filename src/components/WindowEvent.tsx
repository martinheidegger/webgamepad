import { useLayoutEffect } from 'react'

export interface WindowEventProps {
  keydown?: (e: KeyboardEvent) => void
  keyup?: (e: KeyboardEvent) => void
}

export function WindowEvent (handlers: WindowEventProps): JSX.Element {
  useLayoutEffect(() => {
    queueMicrotask(() => {
      for (const [event, handler] of Object.entries(handlers)) {
        // document.body.addEventListener(event, handler)
        window.addEventListener(event, handler)
      }
    })
    return () => {
      queueMicrotask(() => {
        for (const [event, handler] of Object.entries(handlers)) {
          // document.body.removeEventListener(event, handler)
          window.removeEventListener(event, handler)
        }
      })
    }
  }, [handlers])
  return <></>
}