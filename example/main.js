import React from 'react'
import { render } from 'react-dom'
import ScribeEditor from '../src/main'

class DemoApp extends React.Component {
  render() {
    return (
      <ScribeEditor />
      )
  }
}

render(
  <DemoApp />,
  document.getElementById('main')
);
