import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ id, children, buttonLabel }, refs) => {
  const [visible, setVisible] = useState(false)

  const visibilityStyle = (show) => (show ? '' : 'none')

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  const buttonVisibilityStyle = { display: visibilityStyle(!visible) }
  const childrenVisibilityStyle = { display: visibilityStyle(visible) }

  return (
    <div>
      <div style={buttonVisibilityStyle}>
        <button id={id ? id + '-button' : 'default-togglable-button'} onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={childrenVisibilityStyle} className='togglableContent'>
        { children }
        <button id={id ? id + '-button' : 'default-togglable-button'} onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable