import React from 'react'
import PropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import { withPixiApp } from '@inlet/react-pixi'

class Scale extends React.Component {
  constructor(props) {
    super(props)
    this.scale()
  }

  componentDidMount() {
    window.addEventListener('resize', this.scale, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.scale, false)
  }

  scale = () => {
    const { app } = this.props

    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight

    app.renderer.autoResize = true
    app.renderer.resize(width, height)

    // const dpr = window.devicePixelRatio || 1
    // const scale = 1 / dpr
    // app.stage.scale.set(scale)
  }

  render() {
    return null
  }
}

Scale.propTypes = {
  app: PropTypes.instanceOf(PIXI.Application).isRequired,
}

export default withPixiApp(Scale)
