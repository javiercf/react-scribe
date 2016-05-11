import React, { Component } from 'react'
import { render } from 'react-dom'
import ScribeEditor from '../src/main'

const ShowCase = props => {
  return (
    <div className='sc-showCase'>
      { props.demoContent }
    </div>
    )
};

class DemoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'hello world'
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  render() {
    return (
      <div>
        <ScribeEditor defaultValue='hello world' onChange={this.handleChange} />
        <ShowCase demoContent={this.state.text} />
      </div>
    )
  }
}

render(
  <DemoApp />,
  document.getElementById('main')
);
