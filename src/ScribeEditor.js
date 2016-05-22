import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { findDOMNode } from 'react-dom';
import optionMap from './optionMap';
import Scribe from 'scribe-editor';
import ScribeToolbar from './ScribeToolBar';
import Toolbar from 'scribe-plugin-toolbar';
/**
 * Default Options
 * commands: array of desired toolbar commands
 */

const defaultOptions = ['blockquote', 'code', 'h2', 'linkPrompt',
    'unlink', 'ol', 'ul'];

/**
 * Main editor component
 */

class ScribeEditor extends Component {
  constructor(props) {
    super(props);
    this.parseConfig = this.parseConfig.bind(this);
    this.isControlled = this.isControlled.bind(this);
    this.updateContent = this.updateContent.bind(this);

    this.state = {
      value: this.props.value
    };
  }

  // Bind scribe to Component and include Toolbar commands and options
  componentDidMount() {
    const editor = findDOMNode(this.refs.editor);
    const scribe = new Scribe(editor);
    const toolbarElement = findDOMNode(this.refs.toolbar);
    for (const i in this.parseConfig()['plugins']) {
      scribe.use(this.parseConfig()['plugins'][i]);
    }
    scribe.use(Toolbar(toolbarElement));
    this.parseConfig();
    // set initial content
    scribe.setContent(this.state.value);
    // update content
    scribe.on('content-changed', () => {
      this.updateContent(scribe.getHTML());
      if (this.props.onChange) {
        this.props.onChange(scribe.getHTML());
      }
    });

    this.scribe = scribe;
  }

  componentWillReceiveProps(nextProps) {
    const value = this.isControlled() ? nextProps.value : nextProps.defaultValue;
    if (this.state.value !== value) {
      this.scribe.setContent(value);
    }
  }

  isControlled() {
    return 'value' in this.props;
  }

  parseConfig() {
    const config = this.props.config;
    const newConfig = {
      'toolbarElements': {},
      'plugins': []
    };
    config.forEach( cmd => {
      const command = _.get(optionMap, cmd);
      if (command) {
        if (command.hasOwnProperty('action')) {
          newConfig.plugins.push(command.action);
        }
        newConfig['toolbarElements'][cmd] = command;
      } else if (cmd.hasOwnProperty('action') &&
          cmd.hasOwnProperty('display')) {
        newConfig.plugins.push(cmd.action);
        newConfig.toolbarElements[cmd.command] = cmd;
      }
    });

    return newConfig;
  }

  updateContent(value) {
    this.setState({ value });
  }


  render() {
    return (
      <div className='sc-container'>
        <ScribeToolbar config={ this.parseConfig()['toolbarElements'] }
          ref='toolbar'
        />
        <div className='sc-editor' ref='editor' />
      </div>
    );
  }
}

ScribeEditor.propTypes = {
  config: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        command: PropTypes.string.isRequired,
        display: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired
      })
    ])
  ),
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};

ScribeEditor.defaultProps = {
  config: defaultOptions
};

export default ScribeEditor;
