import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import 'web-candy/css/border-box.css'
import 'web-candy/css/native-font.css'
import './global-styles'
import App from './components/App'

const rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl)
