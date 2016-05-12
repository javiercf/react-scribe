import _ from 'lodash';
import optionMap from './optionMap';
import React from 'react';
import Scribe from 'scribe-editor';
import Toolbar from 'scribe-plugin-toolbar';

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

const ScribeToolbar = props => {
  let toolBarOptions = [];
  for (const i in props.config) {
    toolBarOptions.push(
      <button data-command-name={ props.config[i]['command'] } key={ i } >
        <i className={ `fa ${props.config[i]['display']}` } />
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
      { toolBarOptions }
      <button data-command-name='undo'>
        <i className='fa fa-undo' />
      </button>
      <button data-command-name='redo'>
        <i className='fa fa-repeat' />
      </button>
    </div>
  );
};


/**
 * Main editor component
 */

class ScribeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.parseConfig = this.parseConfig.bind(this);
    this.isControlled = this.isControlled.bind(this);
    this.updateContent = this.updateContent.bind(this);

    this.state = {
      value: this.isControlled() ? this.props.value : this.props.defaultValue
    };
  }

  // Bind scribe to Component and include Toolbar commands and options
  componentDidMount() {
    const editor = this.editor;
    const scribe = new Scribe(editor);
    const toolbarElement = this.toolbar;
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
      if(this.props.onChange){
        this.props.onChange(scribe.getHTML());
      }
    });
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
    config.commands.forEach( cmd => {
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
          ref={ c => this.toolbar = c }
        />
        <div className='sc-editor' ref={ c => this.editor = c } />
      </div>
    );
  }
}

ScribeEditor.defaultProps = {
  config: defaultOptions
};

export default ScribeEditor;
