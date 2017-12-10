import React from 'react';

const Switch = ({ on, onToggle, ...props }) => {
  return <input checked={on} onChange={onToggle} type="checkbox" {...props} />;
};

export default Switch;
