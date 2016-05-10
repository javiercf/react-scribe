import React from 'react'
import { render } from 'react-dom'
import ScribeEditor from '../src/main'

const DemoApp = React.createClass({
  handleChange: function(e) {
    console.log('whhhhh');
    console.log(e.target);
  },

  render: function() {
    return (
      <ScribeEditor defaultValue='hellooooo' onChange={this.handleChange} />
    )
  }
});

render(
  <DemoApp />,
  document.getElementById('main')
);
