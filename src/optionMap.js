import BlockQuoteCmd from 'scribe-plugin-blockquote-command'
import CodeCmd from 'scribe-plugin-code-command'
import FormatterCmd from 'scribe-plugin-formatter-html-ensure-semantic-elements'
import PlainTextCmd from 'scribe-plugin-formatter-plain-text-convert-new-lines-to-html'
import HeadingCmd from 'scribe-plugin-heading-command'
import UnlinkCmd from 'scribe-plugin-intelligent-unlink-command'
import LinkPromptCmd from 'scribe-plugin-link-prompt-command'
import SanitizerCmd from 'scribe-plugin-sanitizer'
import SmartListsCmd from 'scribe-plugin-smart-lists'

/**
 * Hashmap of commands
 */

const optionMap = {
  'blockquote': {
    'command': 'blockquote',
    'action': BlockQuoteCmd(),
    'display': 'fa-quote-left'
  },
  'code': {
    'command': 'code',
    'action': CodeCmd(),
    'display': 'fa-code'
  },
  'h1': {
    'command': 'h1',
    'action': HeadingCmd(1),
    'display': 'fa-header'
  },
  'h2': {
    'command': 'h2',
    'action': HeadingCmd(2),
    'display': 'fa-header'
  },
  'h3': {
    'command': 'h3',
    'action': HeadingCmd(3),
    'display': 'fa-header'
  },
  'h4': {
    'command': 'h4',
    'action': HeadingCmd(4),
    'display': 'fa-header'
  },
  'h5': {
    'command': 'h5',
    'action': HeadingCmd(5),
    'display': 'fa-header'
  },
  'linkPrompt': {
    'command': 'linkPrompt',
    'action': LinkPromptCmd(),
    'display': 'fa-link'
  },
  'unlink': {
    'command': 'unlink',
    'action': UnlinkCmd(),
    'display': 'fa-unlink'
  },
  'ol': {
    'command': 'insertOrderedList',
    'display': 'fa-list-ol'
  },
  'ul': {
    'command': 'insertUnOrderedList',
    'display': 'fa-list-ul'
  },
  'indent': {
    'command': 'indent',
    'display': 'fa-indent'
  },
  'outdent': {
    'command': 'outdent',
    'display': 'fa-outdent'
  },
  'superscript': {
    'command': 'superscript',
    'display': 'fa-superscript'
  },
  'subscript': {
    'command': 'subscript',
    'display': 'fa-subscript'
  },
  'cleanup': {
    'command': 'cleanup',
    'display': 'fa-eraser'
  }
};

export default optionMap
