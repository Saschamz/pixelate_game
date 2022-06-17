import { useCallback, useEffect, useState } from 'react'
import constants from '../constants'
import PixelatedImage from './PixelatedImage'
import Points from './Points'

const images = [
  // Logos 0-5
  require('../assets/images/logos/ikea.jpg'),
  require('../assets/images/logos/lego.png'),
  require('../assets/images/logos/pringles.png'),
  require('../assets/images/logos/Starbucks-Logo.png'),
  require('../assets/images/logos/tesla.png'),
  // Movies 6-11
  require('../assets/images/movies/delorean.jpeg'),
  require('../assets/images/movies/Gremlins-.jpeg'),
  require('../assets/images/movies/indina-jones.jpeg'),
  require('../assets/images/movies/jumanji.jpg'),
  require('../assets/images/movies/wilson.jpeg'),
  // People 12-17
  require('../assets/images/people/Anton.jpeg'),
  require('../assets/images/people/erik-k.png'),
  require('../assets/images/people/Gaben.jpeg'),
  require('../assets/images/people/jean-francois@2x.jpeg'),
  require('../assets/images/people/oprah-winfrey.jpeg'),
  // Places 18-23
  require('../assets/images/places/Colosseo_2020.jpeg'),
  require('../assets/images/places/england-stonehenge.jpeg'),
  require('../assets/images/places/iStock-95102820.jpeg'),
  require('../assets/images/places/sweden-stockholm-city-hall.jpeg'),
  require('../assets/images/places/sweden-stockholm-vasa2.jpeg'),
  require('../assets/images/places/eiffel.jpeg'),
  // Tech 24-29
  require('../assets/images/tech/disposable-camera.jpg'),
  require('../assets/images/tech/NES-Console-Set.png'),
  require('../assets/images/tech/nokia_3310.jpg'),
  require('../assets/images/tech/old-mac.jpeg'),
  require('../assets/images/tech/walkman.jpeg'),
]

const getImageTitle = imageIndex => {
  if (imageIndex < 5) {
    return 'Logos'
  }
  if (imageIndex < 10) {
    return 'Movies'
  }
  if (imageIndex < 15) {
    return 'People'
  }
  if (imageIndex < 21) {
    return 'Places'
  }
  return 'Tech'
}

const Game = () => {
  const [imageIndex, setImageIndex] = useState(0)
  const [points, setPoints] = useState(constants.POINTS_MAX)

  const switchImage = newIndex => {
    if (newIndex < 0 || newIndex === images.length) return

    setImageIndex(newIndex)
    setPoints(constants.POINTS_MAX)
  }

  const updatePoints = value =>
    setPoints(Math.max(constants.POINTS_MIN, Math.min(value, constants.POINTS_MAX)))
  const decreasePoints = () => updatePoints(points - constants.POINTS_RATE)
  const increasePoints = () => updatePoints(points + constants.POINTS_RATE)

  const handleKeyDown = useCallback(
    e => {
      switch (e.key) {
        case 'ArrowLeft':
          switchImage(imageIndex - 1)
          break
        case 'ArrowRight':
          switchImage(imageIndex + 1)
          break
        case 'ArrowDown':
          decreasePoints()
          break
        case 'ArrowUp':
          increasePoints()
          break
        default:
          break
      }
    },
    [imageIndex, points]
  )

  useEffect(() => {
    window.document.addEventListener('keydown', handleKeyDown)

    return () => window.document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div>
      <PixelatedImage pixelation={points * constants.PIXELATION_RATE} image={images[imageIndex]} />
      <Points
        points={points}
        title={getImageTitle(imageIndex) + ` — ${imageIndex + 1} / ${images.length}`}
      />
    </div>
  )
}
export default Game
