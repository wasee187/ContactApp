import { react } from 'babel-types';
import React from 'react';

const TextInputGroup = (props) => {
  const { label, type, name, value, onChange, error } = props;
  return (
    <div className='input-filed'>
      <label htmlFor={label}>{label}</label>
      <input type={type} onChange={onChange} value={value} name={name} />
      <span className='helper-text'>{error && error}</span>
    </div>
  );
};

export default TextInputGroup;
