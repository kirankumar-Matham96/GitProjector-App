import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const { id, label, ...inputProps } = props;
  return (
    <label htmlFor={id}>
      {label}
      <input id={id} ref={ref} {...inputProps} />
    </label>
  );
});

export default Input;
