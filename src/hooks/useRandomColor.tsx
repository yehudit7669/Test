import { useState } from 'react'

const useRandomColor = () => {
  const [color, setColor] = useState('#000')

  const getRgb = () => Math.floor(Math.random() * 256)

  const rgbToHex = (r: number, g: number, b: number) =>
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')

  const generateRandomColor = () => {
    const color = {
      r: getRgb(),
      g: getRgb(),
      b: getRgb(),
    }

    const tempRandomColor = rgbToHex(color.r, color.g, color.b)
    setColor(tempRandomColor)

    return tempRandomColor
  }

  return { color, generateRandomColor }
}

export default useRandomColor
