import BlockQuoteCmd from 'scribe-plugin-blockquote-command';
import CodeCmd from 'scribe-plugin-code-command';
import HeadingCmd from 'scribe-plugin-heading-command';
import LinkPromptCmd from 'scribe-plugin-link-prompt-command';
import UnlinkCmd from 'scribe-plugin-intelligent-unlink-command';

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
  'small': {
    'command': 'small',
    'action': scribe => {
      const fontCommand = new scribe.api.Command('fontSize');

      fontCommand.execute = function () {
        let newEl;
        if (!this.queryState()) {
          scribe.api.Command.prototype.execute.call(this, 3);
          const text = document.querySelector('font'),
            newEl = document.createElement('small');
          newEl.appendChild(document.createTextNode(text.innerText));
          text.parentNode.replaceChild(newEl, text);
        } else {
          scribe.api.Command.prototype.execute.call(this, 4);
          const text = document.querySelector('font');
          text.parentNode.parentNode.replaceChild(
            document.createTextNode(text.innerText),
            text.parentNode
          );
        }
      };

      fontCommand.queryState = function () {
        const selection = new scribe.api.Selection();
        return !! selection.getContaining(node => node.nodeName === 'SMALL');
      };

      fontCommand.queryEnabled = () => true;

      scribe.commands.small = fontCommand;
    },
    'display': 'fa-text-height'
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

export default optionMap;
