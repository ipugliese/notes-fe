import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Toggable = forwardRef(({children, buttonLabel}, refs) => {
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

    console.log('children: ', children)

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

export default Toggable