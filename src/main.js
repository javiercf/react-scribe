import React from 'react'
import { render } from 'react-dom'
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
import NotingCmd from 'scribe-plugin-noting'
import SanitizerCmd from 'scribe-plugin-sanitizer'
import SmartListsCmd from 'scribe-plugin-smart-lists'


class ScribeEditor extends React.Component {
  componentDidMount() {
    var scribe = new Scribe(document.querySelector('.sc-editor'));
    var toolbarElement = document.querySelector('.sc-toolbar');
    scribe.use(BlockQuoteCommand());
    scribe.use(Toolbar(toolbarElement));
  }

  render() {
    return (
      <div>
        <div className='sc-toolbar' >
          <button data-command-name="blockquote">Blockquote</button>
          <button data-command-name="h2">H2</button>
        </div>
        <div className='sc-editor' />
      </div>
    )
  }
}

render(
  <ScribeEditor />,
  document.getElementById('main')
);
