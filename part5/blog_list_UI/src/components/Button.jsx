const Button = ({ text, type = 'button', onClick = null, style }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn bg-green-200 ${style}`}>
      {text}
    </button>
  );
};

export default Button;
