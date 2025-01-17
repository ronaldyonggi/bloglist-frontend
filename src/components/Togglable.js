import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      {!visible &&
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      }
      {visible &&
        <div>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>

      }
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable