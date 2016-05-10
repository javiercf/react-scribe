import React from 'react'
import Scribe from 'scribe-editor'
import Toolbar from 'scribe-plugin-toolbar'
import BlockQuoteCmd from 'scribe-plugin-blockquote-command'
import CodeCmd from 'scribe-plugin-code-command'
import CurlyQuotesCmd from 'scribe-plugin-curly-quotes'
import FormatterCmd from 'scribe-plugin-formatter-html-ensure-semantic-elements'
import PlainTextCmd from 'scribe-plugin-formatter-plain-text-convert-new-lines-to-html'
import HeadingCmd from 'scribe-plugin-heading-command'
import InlineStylesCmd from 'scribe-plugin-inline-styles-to-elements'
import UnlinkCmd from 'scribe-plugin-intelligent-unlink-command'
import KeyBoardCmd from 'scribe-plugin-keyboard-shortcuts'
import LinkPromptCmd from 'scribe-plugin-link-prompt-command'
import SanitizerCmd from 'scribe-plugin-sanitizer'
import SmartListsCmd from 'scribe-plugin-smart-lists'
import _ from 'lodash'


/**
 * Hashmap of commands
 */

const optionMap = {
  'blockquote': BlockQuoteCmd(),
  'code': CodeCmd(),
  'h1': HeadingCmd(1),
  'h2': HeadingCmd(2),
  'h3': HeadingCmd(3),
  'h4': HeadingCmd(4),
  'h5': HeadingCmd(5),
  'linkPrompt': LinkPromptCmd(),
  'unlink': UnlinkCmd(),
  'insertOrderedList': SmartListsCmd(),
  'insertUnOrderedList': SmartListsCmd(),
  'removeFormat': FormatterCmd()
};

/**
 * Default Options
 * commands: array of desired toolbar commands
 * TODO: options: array of aditional options i.e. (formatting, keyboard, etc..)
 */

const defaultOptions = {
 'commands': ['blockquote', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'linkPrompt',
    'unlink', 'insertOrderedList', 'insertUnOrderedList', 'removeFormat'],
  'options': ''
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
      toolBarOptions.push(<button key={i} data-command-name={i}>{i}</button>);
    }

    return (
      <div className='sc-toolbar'>
          {toolBarOptions}
          <button data-command-name="indent">Indent</button>
          <button data-command-name="outdent">Outdent</button>
          <button data-command-name='undo'>Undo</button>
          <button data-command-name='redo'>Redo</button>
          <button data-command-name='cleanup'>Clean</button>
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
  }

  // generate commands has based on config prop

  commands() {
    let commands = {};
    this.props.config.commands.forEach( function(cmd) {
      commands[cmd] = _.get(optionMap, cmd)
    });
    return commands;
  }

  // Bind scribe to Component and include Toolbar commands and options
  componentDidMount() {
    const scribe = new Scribe(document.querySelector('.sc-editor'));
    const toolbarElement = document.querySelector('.sc-toolbar');
    for (var i in this.commands()) {
      scribe.use(this.commands()[i]);
    }
    scribe.use(CurlyQuotesCmd());
    scribe.use(KeyBoardCmd());
    scribe.use(InlineStylesCmd());
    scribe.use(Toolbar(toolbarElement));
  }

  render() {
    return (
      <div>
        <ScribeToolbar config={this.commands()} />
        <div className='sc-editor' />
      </div>
    )
  }
}

ScribeEditor.defaultProps = {
  config: defaultOptions
};

export default ScribeEditor
