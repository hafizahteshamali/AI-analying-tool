
const Button = ({type, className, text, onClick}) => {
  return (
    <>
    {type ? (
      <button className={`${className}`} type={type}>{text}</button>
    ) : <button className={`${className}`} onClick={onClick}>{text}</button>}
    
    </>
  )
}

export default Button