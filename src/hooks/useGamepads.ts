import { atom, useAtomValue } from 'jotai'

enum Events {
  CONNECT = 'gamepadconnected',
  DISCONNECT = 'gamepaddisconnected'
}

const gamepads = atom<Gamepad[]>([])
gamepads.onMount = setGamepads => {
  if (!navigator.getGamepads) {
    return
  }
  const update = () => setGamepads(
    navigator.getGamepads().filter(pad => pad !== null) as Gamepad[]
  )
  update()
  window.addEventListener(Events.CONNECT, update)
  window.addEventListener(Events.DISCONNECT, update)
  return () => {
    setGamepads([])
    window.removeEventListener(Events.CONNECT, update)
    window.removeEventListener(Events.DISCONNECT, update)
  }
}

const indices = atom(read => read(gamepads).map(pad => pad.index))
const connected = atom(read => read(gamepads).filter(pad => pad.connected).map(pad => pad.index))

export const useGamepads = () => useAtomValue(indices)
export const useConnectedGamepads = () => useAtomValue(connected)
