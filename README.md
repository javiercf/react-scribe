# React wrapper for Scribe Editor
see original [project](https://github.com/guardian/scribe)

usage:
```
import React from 'react'
import { render } from 'react-dom'
import ScribeEditor from 'react-scribe'

const myOptions = {
  commands: ['blockquote', 'code', 'h1', 'h2', 'h3', 'h4', 'h5',
      'linkPrompt', 'unlink', 'insertOrderedList', 'insertUnOrderedList',
      'removeFormat'
      ]
};

render(
  <ScribeEditor config={myOptions} />,
  document.getElementById('content')
);
```

