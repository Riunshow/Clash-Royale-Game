import React from 'react'
import PropTypes from 'prop-types'
import { For } from 'react-extras'
import * as PIXI from 'pixi.js'
import { withPixiApp, Container } from '@inlet/react-pixi'
import Unit from './Unit'

class Units extends React.Component {
  positions = () => {
    const { app, row, column } = this.props
    const { width, height } = app.screen

    const paddingX = 50
    const paddingY = 100
    const unitWidth = (width - 2 * paddingX) / row
    const unitHeight = (height - 2 * paddingY) / column

    let i
    let j
    const coordinates = []
    for (i = 0; i < row; i += 1) {
      for (j = 0; j < column; j += 1) {
        coordinates.push({
          x: paddingX + unitWidth * (0.5 + i),
          y: paddingY + unitHeight * (0.5 + j),
          width: unitWidth,
          height: unitHeight,
        })
      }
    }

    return coordinates
  }

  render() {
    const { name, row, column } = this.props

    return (
      <Container>
        <For
          of={this.positions()}
          render={({ width, height, x, y }, index) => (
            <Unit
              key={`${name}-${row}-${column}-${index}`}
              name={name}
              width={width}
              height={height}
              x={x}
              y={y}
            />
          )}
        />
      </Container>
    )
  }
}

Units.propTypes = {
  name: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  app: PropTypes.instanceOf(PIXI.Application).isRequired,
}

export default withPixiApp(Units)
