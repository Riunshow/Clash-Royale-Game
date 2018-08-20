import React from 'react'
import PropTypes from 'prop-types'
import { PixiComponent, Container } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'
import { tween } from 'popmotion'
import spines from '../../../assets/spines' // eslint-disable-line
import Context from './Context'

function generateSpine(name) {
  const PSC = PIXI.spine.core
  const { skeleton, atlas } = spines[name]

  // preload atlas files and json of spine
  // https://github.com/pixijs/pixi-spine/blob/master/examples/preloaded_json.md
  const spineAtlas = new PSC.TextureAtlas(atlas, (imageFile, cb) => {
    // imageURL is resolved from .atlas file
    const {
      texture: { baseTexture },
    } = PIXI.loader.resources[imageFile]
    cb(baseTexture)
  })
  const spineAtlasLoader = new PSC.AtlasAttachmentLoader(spineAtlas)
  const spineJsonParser = new PSC.SkeletonJson(spineAtlasLoader)

  const spineData = spineJsonParser.readSkeletonData(skeleton)

  const spine = new PIXI.spine.Spine(spineData)
  spine.skeleton.setSkinByName(name)
  return spine
}

const Unit = PixiComponent('Unit', {
  create: props => {
    const { name } = props
    const spine = generateSpine(name)
    return spine
  },
  didMount: instance => {
    const animationName = 'Shaking'
    if (instance.state.hasAnimation(animationName)) {
      instance.state.setAnimation(0, animationName, true)
      instance.skeleton.setSlotsToSetupPose()
    }
  },
  applyProps: (instance, prevProps, props) => {
    const isMounted = prevProps.name
    if (!isMounted) {
      const { width, height, speed } = props

      const scale = Math.min(width / instance.width, height / instance.height)
      const localRect = instance.getLocalBounds()
      instance.position.set(-localRect.x * scale, -localRect.y * scale)

      instance.scale.set(scale)
      instance.state.timeScale = speed || 1
    } else {
      const { speed: prevSpeed, clickTime: prevClickTime } = prevProps
      const { speed, clickTime } = props

      if (prevSpeed !== speed) {
        instance.state.timeScale = speed
      }

      const isClicked = prevClickTime !== clickTime
      if (isClicked) {
        const container = instance.parent
        // eslint-disable-next-line new-cap
        const plus = new PIXI.Sprite.fromFrame('plus1.png')

        // resize
        const plusRatio = plus.width / plus.height
        plus.width = container.width * 0.2
        plus.height = plus.width / plusRatio

        // position
        plus.anchor.set(0.5, 1)
        plus.x = container.width / 2
        plus.y = 0

        // show
        container.addChild(plus)

        const update = ({ alpha, y }) => {
          plus.alpha = alpha
          plus.y = y
        }
        const complete = () => {
          container.removeChild(plus)
        }
        tween({
          from: {
            alpha: 1,
            y: 0,
          },
          to: {
            alpha: 0,
            y: -plus.height,
          },
          duration: 200,
        }).start(update, complete)
      }
    }
  },
})

class ContaineredUnit extends React.Component {
  constructor(props) {
    super(props)
    this.container = React.createRef()
  }

  componentDidMount() {
    const { current: container } = this.container
    container.pivot.x = container.width / 2
    container.pivot.y = container.height / 2
  }

  render() {
    const { x, y, width, height, ...restProps } = this.props

    return (
      <Context.Consumer>
        {({ speed, clickTime }) => (
          <Container
            ref={this.container}
            x={x}
            y={y}
            width={width}
            height={height}
          >
            <Unit
              width={width}
              height={height}
              speed={speed}
              clickTime={clickTime}
              {...restProps}
            />
          </Container>
        )}
      </Context.Consumer>
    )
  }
}

ContaineredUnit.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default ContaineredUnit
