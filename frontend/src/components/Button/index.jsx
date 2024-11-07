const Button = ({ children, ...props }) => {
  console.log("🚀 ~ Button ~ props:", props);

  return <button {...props}>{children}</button>;
};

export default Button;
