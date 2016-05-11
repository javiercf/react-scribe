# React wrapper for Scribe Editor
see original [project](https://github.com/guardian/scribe)

[demo](http://javiercf.github.io/react-scribe/)

You can include new commands following the scribe documentation and add them to the toolbar by including an object in the commands array of the following form:

```
{
  'command': '',
  'display': 'fa-icon',
  'action': function(scribe){}
}
```

### usage:

```
import React from 'react'
import { render } from 'react-dom'
import ScribeEditor from 'react-scribe'

const myOptions = {
  'commands': ['blockquote', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'linkPrompt',
    'unlink', 'ol', 'ul']
};

render(
  <ScribeEditor config={myOptions} />,
  document.getElementById('content')
);
```

Available props for the editor are:

```
config
onChange
value
defaultValue
```

Be sure to include the stylesheet provided and fontawesome in your html

