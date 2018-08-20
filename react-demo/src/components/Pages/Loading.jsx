import React from 'react'
import PropTypes from 'prop-types'
import { If } from 'react-extras'
import { Container, Text, withPixiApp } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'
import ordinaryImages from '../../assets/images' // eslint-disable-line
import { spineImages } from '../../assets/spines' // eslint-disable-line
import sounds from '../../assets/sounds' // eslint-disable-line

// extend PIXI loader to load audio properly
const { Resource } = PIXI.loaders
Resource.setExtensionXhrType('mp3', Resource.XHR_RESPONSE_TYPE.BLOB)
Resource.setExtensionLoadType('mp3', Resource.LOAD_TYPE.BLOB)

function parseBlobURL(resource, next) {
  const extensions = ['mp3']

  const { extension, xhrType } = resource
  if (extensions.includes(extension) && xhrType === 'blob') {
    const blob = resource.data
    const blobURL = URL.createObjectURL(blob)
    // eslint-disable-next-line
    resource.blobURL = blobURL
  }

  next()
}

class Loading extends React.Component {
  state = {
    isLoading: true,
  }

  componentDidMount() {
    setTimeout(this.load, 1000)
  }

  load = () => {
    PIXI.loader
      .add(ordinaryImages)
      .add(spineImages)
      .add(sounds)
      .use(parseBlobURL)
      .on('progress', (loader, resource) => {
        const { progress } = loader
        console.log(`[${progress}%] ${resource.name}`)
      })
      .load(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  render() {
    const { app, next } = this.props
    const { isLoading } = this.state

    const { width, height } = app.screen

    return (
      <Container>
        <Text
          text="快速点击屏幕打 CALL"
          anchor={0.5}
          x={width / 2}
          y={height / 2 - 200}
        />
        <If condition={!isLoading}>
          <Text
            text="立即打 CALL"
            anchor={0.5}
            x={width / 2}
            y={height / 2 + 200}
            interactive
            tap={next}
          />
        </If>
      </Container>
    )
  }
}

Loading.propTypes = {
  next: PropTypes.func.isRequired,
  app: PropTypes.instanceOf(PIXI.Application).isRequired,
}

export default withPixiApp(Loading)
