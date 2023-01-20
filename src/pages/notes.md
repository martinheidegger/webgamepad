>>>

# JavaScript Gamepad API

::sub[by Martin Heidegger, OWDDM - Jan. 2023]

>>>

## Why?

>>>

## Todays plan

- [ ] How does the API work?
- [ ] What bugs are there?
- [ ] What can we do about that?

>>>

The basic API is so simple!


```typescript
const gamepads = navigator.getGamePads()
const gamepad = gamepads[0]
```

::gamepad-inspect{index=0}

>>>

Not so fast! Does it work after a refresh?

::gamepad-inspect{index=0}

>>>

For one, we have axes:

```typescript
const axis = gamepad.axes[0]
```

::gamepad-inspect{index=0 axis=0}
::gamepad-axis{index=0 axis=0}

>>>

But axis usually come in pairs

```typescript
const axes = gamepad.axes
const leftX = axes[0]
const leftY = axes[1]
```

::gamepad-inspect{index=0 axis=0}
::gamepad-inspect{index=0 axis=1}
::gamepad-axis-2d{index=0 x=0 y=1}

>>>

We also have buttons!

```typescript
const buttons = gamepads.buttons
const button = buttons[0]
```

::gamepad-inspect{index=0 button=0}
::gamepad-button{index=0 button=0}

>>>

Interesting are the shoulder buttons!

```typescript
const buttons = gamepads.buttons
const button = buttons[7]
```

::gamepad-inspect{index=0 button=7}
::gamepad-button{index=0 button=7}

>>>

`index` is important with `connected`. The `index` stays, even while disconnected.


```typescript
gamepad.connected // true | false
gamepad.index // number
```

::gamepad-inspect{index=0 field=connected}
::gamepad-inspect{index=0 field=index}

>>>

`timestamp` increments with every time new data arrives to the UI, its the time in
ms since the first render of the page (with nanosecond precision).

```typescript
gamepad.timestamp
```

::gamepad-inspect{index=0 field=timestamp}

>>>

`id` is a _helpful_ name for the controller.

```typescript
gamepad.id
```

::gamepad-inspect{index=0 field=id}

>>>

`mapping` can have the value `standard`, `xr-standard` → [link](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad/mapping)


```typescript
gamepad.mapping
```

::gamepad-inspect{index=0 field=mapping}

>>>

For XR we also have `hand`, `pose` however they only work with a `xr-standard` device. 😢

```typescript
gamepad.hand
gamepad.pose
gamepad.hapticActuators
```

::gamepad-inspect{index=0 field=hand}
::gamepad-inspect{index=0 field=pose}
::gamepad-inspect{index=0 field=hapticActuators}

>>>

Let's look at the whole gamepad again

::gamepad-stats{} 

>>>

### API Summary

- [ ] A button needs to be pressed before we can use it
- [ ] We do not know if a button is digital or analog!
- [ ] A controller _may_ be detected as 2
- [ ] Do not use the `id` as indentifier, use `index`!
- [ ] Use `getGamepads()` on every frame

>>>

### What is missing?

- [ ] Audio support
- [ ] Battery status
- [ ] Vibration API?! ... seriously...
- [ ] Controller Number indicator
- [ ] Touchpad
- [ ] System Panel to re-map controllers
- [ ] Correct controller name as given in Bluetoot settings
- [ ] Connection Mode information (bluetooth/cabled)

>>>

### Problems

- [ ] Different browsers, different axis
- [ ] Not the same name
- [ ] Not all buttons supported
- [ ] Firefox supports analog buttons as axis
- [ ] Firefox doesn't check the analog buttons at start
- [ ] Chrome does not reuse the Gamepad Objects
- [ ] Firefox

>>>

## The HID API

Chrome tried to be nasty
- [cnet: google capability security risk](https://www.cnet.com/tech/computing/google-plan-for-chrome-capability-has-a-big-security-risk/)
- [chrome developer: hid](https://developer.chrome.com/articles/hid/))

```typescript
await navigator.hid.requestDevice()
const [device] = await navigator.hid.getDevices()
await device?.open()
await device?.close()
```


>>>

Mozilla vetoed this!

[link](https://github.com/mozilla/standards-positions/issues/459)

>>>

### How does it work

**TODO ↓**

- hdiapi
- libhid
- hidcode spec
- 


>>>

## Where to go from here?

- [ ] Use it for tools and experimenting
- [ ] Try to hack together an extended Gamepad API using `hid`
- [ ] Demand First class support for controllers!
- [ ] Report bugs...


>>>

## One Last thing!

Did you know that it works on tablets?

