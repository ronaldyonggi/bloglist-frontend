const Error = ({message, divClass}) => {
  return message ? (
    <div className={divClass}>
      {message}
    </div>
  ) : null
}

export default Error