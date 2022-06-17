import { useCallback, useEffect, useRef } from 'react'
import constants from '../constants'

function fit(contains = false) {
  return (
    parentWidth,
    parentHeight,
    childWidth,
    childHeight,
    scale = 1,
    offsetX = 0.5,
    offsetY = 0.5
  ) => {
    const childRatio = childWidth / childHeight
    const parentRatio = parentWidth / parentHeight
    let width = parentWidth * scale
    let height = parentHeight * scale

    if (contains ? childRatio > parentRatio : childRatio < parentRatio) {
      height = width / childRatio
    } else {
      width = height * childRatio
    }

    return {
      width,
      height,
      offsetX: (parentWidth - width) * offsetX,
      offsetY: (parentHeight - height) * offsetY,
    }
  }
}

const PixelatedImage = ({ image, pixelation }) => {
  const prevPixelationRef = useRef(pixelation)

  const pixelateImage = useCallback(() => {
    const img1 = document.querySelector('#img1')
    const c = document.querySelector('canvas')
    const ctx = c.getContext('2d')

    const pixelatedImage = document.querySelector('#pixelated-img')
    pixelatedImage?.remove()

    let w = window.innerWidth
    let h = window.innerHeight

    c.width = w
    c.height = h

    const { offsetX, offsetY, width, height } = fit(true)(w, h, img1.width, img1.height)

    ctx.drawImage(img1, offsetX, offsetY, width, height)

    var pixelArr = ctx.getImageData(0, 0, w, h).data
    let sample_size = pixelation

    if (sample_size <= constants.PIXELATION_RATE) {
      return
    }

    ctx.clearRect(0, 0, w, h)

    for (let y = 0; y < h; y += sample_size) {
      for (let x = 0; x < w; x += sample_size) {
        let p = (x + y * w) * 4
        ctx.fillStyle =
          'rgba(' +
          pixelArr[p] +
          ',' +
          pixelArr[p + 1] +
          ',' +
          pixelArr[p + 2] +
          ',' +
          pixelArr[p + 3] +
          ')'
        ctx.fillRect(x, y, sample_size, sample_size)
      }
    }
  }, [pixelation])

  useEffect(() => {
    if (pixelation !== prevPixelationRef.current) {
      pixelateImage()
      prevPixelationRef.current = pixelation
    }
  }, [pixelation, pixelateImage])

  return (
    <div>
      <img src={image} id="img1" onLoad={pixelateImage} alt="src" />
      <canvas id="pixelated-canvas" />
      <div className="pixelated-img-container"></div>
    </div>
  )
}

export default PixelatedImage
