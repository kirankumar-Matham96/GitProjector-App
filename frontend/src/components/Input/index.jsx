import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const { id, label, ...inputProps } = props;
  return <input id={id} ref={ref} {...inputProps} autoComplete="off" />;
});

export default Input;
