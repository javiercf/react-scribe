import React from 'react'
import ReactDOM from 'react-dom'
import Scribe from 'scribe-editor'
import Toolbar from 'scribe-plugin-toolbar'
import _ from 'lodash'
import optionMap from './optionMap'

/**
 * Default Options
 * commands: array of desired toolbar commands
 */

const defaultOptions = {
 'commands': ['blockquote', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'linkPrompt',
    'unlink', 'ol', 'ul']
};

/**
 * Toolbar Component
 */
class ScribeToolbar extends React.Component {
  render() {
    // Dynamically generate toolbar based on config
    // TODO: the button should probably be a component

    let toolBarOptions = [];
    for (var i in this.props.config) {
      toolBarOptions.push(
        <button key={i} data-command-name={this.props.config[i]['command']}>
          <i className={'fa ' + this.props.config[i]['display']} />
        </button>
      );
    }

    return (
      <div className='sc-toolbar'>
          <button data-command-name='bold'>
            <i className='fa fa-bold' />
          </button>
          <button data-command-name='italic'>
            <i className='fa fa-italic' />
          </button>
          <button data-command-name='underline'>
            <i className='fa fa-underline' />
          </button>
          {toolBarOptions}
          <button data-command-name='undo'>
            <i className='fa fa-undo' />
          </button>
          <button data-command-name='redo'>
            <i className='fa fa-repeat' />
          </button>
      </div>
    )
  }
}

/**
 * Main editor component
 */

class ScribeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.commands = this.commands.bind(this);
    this.parseConfig = this.parseConfig.bind(this);
    this.isControlled = this.isControlled.bind(this);
    this.updateContent = this.updateContent.bind(this);

    this.state = {
      value: this.isControlled() ? this.props.value : this.props.defaultValue
    }
  }

  isControlled() {
    return 'value' in this.props;
  }

  // generate commands has based on config prop
  commands() {
    let commands = {};
    this.props.config.commands.forEach( cmd => {
      commands[cmd] = _.get(optionMap, cmd)
    });
    return commands;
  }

  parseConfig() {
    let config = this.props.config;
    let newConfig = {
      'toolbarElements': {},
      'plugins': []
    };
    config.commands.forEach( cmd => {
      let command = _.get(optionMap, cmd);
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
    console.log(newConfig);
    return newConfig;
  }

  updateContent(value) {
    this.setState({ value: value });
  }

  // Bind scribe to Component and include Toolbar commands and options
  componentDidMount() {
    const editor = ReactDOM.findDOMNode(this.refs.editor);
    const scribe = new Scribe(editor);
    const toolbarElement = ReactDOM.findDOMNode(this.refs.toolbar);
    for (var i in this.parseConfig()['plugins']) {
      scribe.use(this.parseConfig()['plugins'][i]);
    }
    scribe.use(Toolbar(toolbarElement));
    this.parseConfig();
    // set initial content
    scribe.setContent(this.state.value);
    // update content
    scribe.on('content-changed', () => {
      this.updateContent(scribe.getHTML());
      if(this.props.onChange){
        this.props.onChange(scribe.getHTML());
      };
    });
  }

  render() {
    return (
      <div className='sc-container'>
        <ScribeToolbar config={this.parseConfig()['toolbarElements']} ref='toolbar' />
        <div className='sc-editor' ref='editor' />
      </div>
    )
  }
}

ScribeEditor.defaultProps = {
  config: defaultOptions,
};

export default ScribeEditor
