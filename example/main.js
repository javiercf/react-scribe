import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import ScribeEditor from '../src/ScribeEditor'

const ShowCase = props =>
  <div className='sc-showCase'>
    { props.demoContent }
  </div>;

ShowCase.propTypes = {
  demoContent: PropTypes.string
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
    const newState = Object.assign({}, this.state, { text: value });
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <ScribeEditor onChange={ this.handleChange } />
        <ShowCase demoContent={ this.state.text } />
      </div>
    )
  }
}

render(
  <DemoApp />,
  document.getElementById('main')
);
