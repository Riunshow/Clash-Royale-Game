import React from 'react'
import PropTypes from 'prop-types'
import { withPixiApp, Sprite } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'
import { Howl } from 'howler'
import Context from './Context'
import Units from './Units'
import getTexture from '../../../libs/get-texture'
import getCurrentTime from '../../../libs/current-time'

const names = ['King', 'Barbarian', 'Goblin', 'Hog_Rider']

const states = [
  { row: 1, column: 1 },
  { row: 2, column: 1 },
  { row: 2, column: 2 },
]

class PlayGround extends React.Component {
  constructor(props) {
    super(props)

    this.soundEffects = {}
    this.initializeSoundEffects()
    this.startTime = getCurrentTime()
    this.latestClickTime = getCurrentTime()

    this.nameIndex = 0

    this.state = Object.assign(
      {
        speed: 1,
        name: names[this.nameIndex],
      },
      states[0]
    )
  }

  componentDidMount() {
    const { app } = this.props
    app.stage.interactive = true

    this.ticker = new PIXI.ticker.Ticker()
    this.ticker.stop()
    this.ticker.add(this.changeName)
    this.ticker.add(this.changeSpeed)
    this.ticker.start()

    app.stage.on('tap', () => {
      const { name } = this.state
      this.latestClickTime = getCurrentTime()

      this.soundEffects[name].play()
    })
  }

  componentWillUnmount() {
    this.ticker.destroy()
  }

  initializeSoundEffects = () => {
    names.forEach(name => {
      const src = PIXI.loader.resources[`${name}.mp3`].blobURL
      const sound = new Howl({ src, format: 'mp3' })
      this.soundEffects[name] = sound
    })
  }

  changeName = () => {
    const currentTime = getCurrentTime()
    const duration = currentTime - this.startTime

    if (duration > 2500) {
      const { nameIndex } = this
      this.nameIndex = nameIndex < names.length - 1 ? nameIndex + 1 : 0
      this.setState({ name: names[nameIndex] })
      this.startTime = currentTime
    }
  }

  changeSpeed = () => {
    const currentTime = getCurrentTime()
    const shouldAccerlate = currentTime - this.latestClickTime < 200

    const increaseStep = 1 / 40
    const decreaseStep = 1 / 10

    const { speed } = this.state
    if (speed > 8) {
      this.setState(states[2])
    } else if (speed > 4) {
      this.setState(states[1])
    } else {
      this.setState(states[0])
    }

    if (shouldAccerlate) {
      this.setState(prevState => {
        const { speed } = prevState
        const max = 15
        return speed < max ? { speed: speed + increaseStep } : { speed: max }
      })
    } else {
      this.setState(prevState => {
        const { speed } = prevState
        const min = 1
        return speed > min ? { speed: speed - decreaseStep } : { speed: min }
      })
    }
  }

  render() {
    const { name, row, column, speed } = this.state
    const clickTime = this.latestClickTime

    const value = {
      speed,
      clickTime,
    }

    return (
      <Context.Provider value={value}>
        <Sprite texture={getTexture('bg.jpg')} />
        <Units name={name} row={row} column={column} />
      </Context.Provider>
    )
  }
}

PlayGround.propTypes = {
  app: PropTypes.instanceOf(PIXI.Application).isRequired,
}

export default withPixiApp(PlayGround)
