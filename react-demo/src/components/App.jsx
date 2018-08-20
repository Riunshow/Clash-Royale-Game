import React from 'react'
import { Choose } from 'react-extras'
import 'pixi.js'
import 'pixi-spine'
import FullScreenStage from './FullScreenStage'
import PageLoading from './Pages/Loading'
import PagePlayGround from './Pages/PlayGround'

class App extends React.Component {
  state = {
    showPageLoading: true,
    showPagePlayGround: false,
  }

  gotoPagePlayGround = () => {
    this.setState({
      showPageLoading: false,
      showPagePlayGround: true,
    })
  }

  render() {
    const { showPageLoading, showPagePlayGround } = this.state

    return (
      <FullScreenStage>
        <Choose>
          <Choose.When condition={showPageLoading}>
            <PageLoading next={this.gotoPagePlayGround} />
          </Choose.When>

          <Choose.When condition={showPagePlayGround}>
            <PagePlayGround />
          </Choose.When>
        </Choose>
      </FullScreenStage>
    )
  }
}

export default App
