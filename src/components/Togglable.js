import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types'

const Togglable = forwardRef(({children, buttonLabel}, refs) => {
    const [visible, setVisible] = useState(false)

    const visibilityStyle = (show) => (show ? '' : 'none')

    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(refs, () => {
        return {
          toggleVisibility
        }
    })

    const buttonVisibilityStyle = { display: visibilityStyle(!visible)}
    const childrenVisibilityStyle = { display: visibilityStyle(visible)}

    return (
        <div>
            <div style={buttonVisibilityStyle}>
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={childrenVisibilityStyle}>
                { children }
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable