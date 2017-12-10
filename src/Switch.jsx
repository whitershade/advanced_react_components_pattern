import React from 'react';

const Switch = ({ on, onToggle, ...props }) => {
  return <input checked={on} onClick={onToggle} type="checkbox" {...props} />;
};

export default Switch;
