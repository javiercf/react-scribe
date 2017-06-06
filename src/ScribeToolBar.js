import PropTypes from 'prop-types';
import React from 'react';

/**
 * Toolbar Component
 */

const ScribeToolbar = props => {
  const toolBarOptions = [];
  for (const i in props.config) {
    toolBarOptions.push(
      <button data-command-name={ props.config[i]['command'] } key={ i }
        type='button'
      >
        <i className={ `fa ${props.config[i]['display']}` } />
      </button>
    );
  }

  return (
    <div className='sc-toolbar'>
      <button data-command-name='bold' type='button'>
        <i className='fa fa-bold' />
      </button>
      <button data-command-name='italic' type='button'>
        <i className='fa fa-italic' />
      </button>
      <button data-command-name='underline' type='button'>
        <i className='fa fa-underline' />
      </button>
      { toolBarOptions }
      <button data-command-name='justifyCenter' type='button'>
        <i className='fa fa-align-center' />
      </button>
      <button data-command-name='justifyLeft' type='button'>
        <i className='fa fa-align-left' />
      </button>
      <button data-command-name='justifyRight' type='button'>
        <i className='fa fa-align-right' />
      </button>
      <button data-command-name='undo' type='button'>
        <i className='fa fa-undo' />
      </button>
      <button data-command-name='redo' type='button'>
        <i className='fa fa-repeat' />
      </button>
    </div>
  );

}

ScribeToolbar.propTypes = {
  config: PropTypes.shape({
    commands: PropTypes.arrayOf(PropTypes.shape({
      commmand: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
      action: PropTypes.func
    }))
  })
};

export default ScribeToolbar;
