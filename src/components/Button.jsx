
const Button = ({type, className, text, onclick}) => {
  return (
    <>
    {type ? (
      <button className={`${className}`} type={type}>{text}</button>
    ) : <button className={`${className}`} onClick={onclick}>{text}</button>}
    
    </>
  )
}

export default Button