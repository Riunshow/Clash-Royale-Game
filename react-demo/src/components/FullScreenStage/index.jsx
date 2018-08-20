import React from 'react'
import PropTypes from 'prop-types'
import { Stage } from '@inlet/react-pixi'
import Scale from './Scale'

const FullScreenStage = ({ children }) => {
  const dpr = window.devicePixelRatio || 1
  const options = {
    antialias: true,
    resolution: dpr,
    backgroundColor: 0x0ffff0,
  }

  return (
    <Stage options={options}>
      <Scale />
      {children}
    </Stage>
  )
}

FullScreenStage.propTypes = {
  children: PropTypes.node,
}

FullScreenStage.defaultProps = {
  children: null,
}

export default FullScreenStage
