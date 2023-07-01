import { useRef, useState } from 'react';

export const Input = ({ type, inputRef,placeholder }) => {

  const [value, setValue] = useState('');

  const handleChange = () => {
    setValue(inputRef.current.value);
  };

  return (<input

    placeholder={placeholder}
    type={type}
    ref={inputRef}
    value={value}
    onChange={handleChange}
  />);
};
