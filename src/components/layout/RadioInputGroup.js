import React from 'react';

const RadioInputGroup = (props) => {
  const {
    label: radioLabel,
    name,
    type,
    value,
    onChange,
    selectedValue,
  } = props;
  return (
    <label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        checked={selectedValue === value}
      />
      <span>{radioLabel}</span>
    </label>
  );
};

export default RadioInputGroup;
