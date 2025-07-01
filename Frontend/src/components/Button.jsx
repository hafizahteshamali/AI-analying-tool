const Button = ({ onClick, className, text, disabled = false, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"} transition-all`}
    >
      {text}
    </button>
  )
}

export default Button